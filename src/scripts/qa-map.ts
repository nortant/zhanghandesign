import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// The worker is a separate module in MapLibre 6; let Vite bundle it and hand MapLibre the URL.
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
maplibregl.setWorkerUrl(workerUrl);

const el = document.getElementById("qa-map");
if (el) init(el);

async function getJSON(url: string) { const r = await fetch(url); if (!r.ok) throw new Error(url); return r.json(); }

async function init(container: HTMLElement) {
  const [extent, corners] = await Promise.all([getJSON("/s1/extent.geojson"), getJSON("/s1/hillshade_corners.json")]);
  const ring: number[][] = extent.features[0].geometry.coordinates[0];
  const lons = ring.map((c) => c[0]), lats = ring.map((c) => c[1]);
  const map = new maplibregl.Map({
    container,
    style: { version: 8, sources: {}, layers: [{ id: "bg", type: "background", paint: { "background-color": "#eef0ea" } }] },
    bounds: [[Math.min(...lons), Math.min(...lats)], [Math.max(...lons), Math.max(...lats)]],
    fitBoundsOptions: { padding: 24 }, attributionControl: false, maxZoom: 22,
  });
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
  map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");

  (window as unknown as { __qaMap: maplibregl.Map }).__qaMap = map;   // used by the automated page check
  map.on("load", () => {
    map.addSource("hillshade", { type: "image", url: "/s1/hillshade.png", coordinates: corners });
    for (const n of ["extent", "contours", "tree_canopy", "linework", "field_points", "qa_issues"])
      map.addSource(n, { type: "geojson", data: `/s1/${n}.geojson` });

    const add = (layer: maplibregl.LayerSpecification, group: string) => { map.addLayer(layer); groups[group] = [...(groups[group] ?? []), layer.id]; };
    const groups: Record<string, string[]> = {};
    add({ id: "hillshade", type: "raster", source: "hillshade", paint: { "raster-opacity": 0.55 } }, "hillshade");
    add({ id: "extent", type: "line", source: "extent", paint: { "line-color": "#b0269e", "line-width": 1.5, "line-dasharray": [4, 2] } }, "linework");
    add({ id: "trees", type: "fill", source: "tree_canopy", paint: { "fill-color": "#4caf50", "fill-opacity": 0.18, "fill-outline-color": "#2e7d32" } }, "trees");
    add({ id: "contours-minor", type: "line", source: "contours", filter: ["==", ["get", "kind"], "minor"], paint: { "line-color": "#b07a3c", "line-width": 0.6 } }, "contours");
    add({ id: "contours-major", type: "line", source: "contours", filter: ["==", ["get", "kind"], "major"], paint: { "line-color": "#6b3d10", "line-width": 1.6 } }, "contours");
    add({ id: "linework", type: "line", source: "linework", paint: {
      "line-color": ["match", ["get", "code"], "LIP", "#111111", "SW", "#e67e22", "DW", "#8e5a2b", "#1565c0"], "line-width": 1.6 } }, "linework");
    add({ id: "points", type: "circle", source: "field_points", paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 16, 1.5, 21, 4],
      "circle-color": ["match", ["get", "code"], "GS", "#6b7280", "LIP", "#111111", "SW", "#e67e22", "TREE", "#2e7d32", "CON", "#1b5e20", "#1565c0"] } }, "points");
    add({ id: "qa", type: "circle", source: "qa_issues", paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 16, 6, 21, 12], "circle-color": "rgba(0,0,0,0)",
      "circle-stroke-color": ["case", ["==", ["get", "seeded"], ""], "#d68910", "#c62828"], "circle-stroke-width": 2.5 } }, "qa");

    document.querySelectorAll<HTMLInputElement>(".toggles input[data-group]").forEach((cb) => {
      const apply = () => (groups[cb.dataset.group!] ?? []).forEach((id) => map.setLayoutProperty(id, "visibility", cb.checked ? "visible" : "none"));
      cb.addEventListener("change", apply); apply();
    });

    map.on("mouseenter", "qa", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "qa", () => (map.getCanvas().style.cursor = ""));
    map.on("click", "qa", (e) => {
      const f = e.features?.[0]; if (!f) return;
      const p = f.properties as Record<string, string>;
      const dl = document.createElement("dl"); dl.className = "popup";
      const row = (k: string, v: string) => { if (!v) return; const dt = document.createElement("dt"); dt.textContent = k; const dd = document.createElement("dd"); dd.textContent = v; dl.append(dt, dd); };
      row("Point", `${p.P} · ${p.D}`); row("QA found", p.findings.replaceAll(" | ", "\n")); row("Reviewer action", p.action.replaceAll(" | ", "; "));
      row("Rule", p.rule.replaceAll(" | ", "; ")); row("Seeded error", p.seeded || "none (false alarm or consequence of another error)");
      new maplibregl.Popup({ maxWidth: "340px" }).setLngLat((f.geometry as GeoJSON.Point).coordinates as [number, number]).setDOMContent(dl).addTo(map);
    });
  });
}
