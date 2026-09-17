import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// The worker is a separate module in MapLibre 6; let Vite bundle it and hand MapLibre the URL.
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
maplibregl.setWorkerUrl(workerUrl);

const el = document.getElementById("s3-map");
if (el) init(el);

async function getJSON(url: string) { const r = await fetch(url); if (!r.ok) throw new Error(url); return r.json(); }

async function init(container: HTMLElement) {
  const [park, corners] = await Promise.all([getJSON("/s3/park.geojson"), getJSON("/s3/hillshade_corners.json")]);
  const ring: number[][] = park.features[0].geometry.coordinates[0];
  const lons = ring.map((c) => c[0]), lats = ring.map((c) => c[1]);
  const map = new maplibregl.Map({
    container,
    style: { version: 8, sources: {}, layers: [{ id: "bg", type: "background", paint: { "background-color": "#eef0ea" } }] },
    bounds: [[Math.min(...lons), Math.min(...lats)], [Math.max(...lons), Math.max(...lats)]],
    fitBoundsOptions: { padding: 24 }, attributionControl: false, maxZoom: 22,
  });
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
  map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");
  (window as unknown as { __s3Map: maplibregl.Map }).__s3Map = map;   // used by the automated page check

  map.on("load", () => {
    map.addSource("hillshade", { type: "image", url: "/s3/hillshade.png", coordinates: corners });
    for (const n of ["park", "context_linework", "contours_proposed", "grading_limit", "existing_trees", "tpz", "protection_fence", "ground_protection",
                     "no_dig", "staging", "pavement", "path_centreline", "seating_node", "site_furniture", "rain_garden", "rain_garden_planting",
                     "shrub_beds", "shrubs", "new_trees", "spot_elevations", "flow_crossings"])
      map.addSource(n, { type: "geojson", data: `/s3/${n}.geojson` });

    const groups: Record<string, string[]> = {};
    const add = (layer: maplibregl.LayerSpecification, group: string) => { map.addLayer(layer); groups[group] = [...(groups[group] ?? []), layer.id]; };

    add({ id: "hillshade", type: "raster", source: "hillshade", paint: { "raster-opacity": 0.5 } }, "surface");
    add({ id: "contours", type: "line", source: "contours_proposed", paint: {
      "line-color": "#8d5a26", "line-width": ["case", ["get", "index"], 1.4, 0.6] } }, "surface");
    add({ id: "grading", type: "line", source: "grading_limit", paint: { "line-color": "#b0269e", "line-width": 1.2, "line-dasharray": [3, 2] } }, "surface");
    add({ id: "park", type: "line", source: "park", paint: { "line-color": "#333", "line-width": 1.5 } }, "base");
    add({ id: "context", type: "line", source: "context_linework", paint: { "line-color": "#9aa0a6", "line-width": 1 } }, "base");
    add({ id: "trees-existing", type: "fill", source: "existing_trees", paint: {
      "fill-color": ["case", ["get", "in_inventory"], "#4caf50", "#9e9e9e"], "fill-opacity": 0.2, "fill-outline-color": "#2e7d32" } }, "trees");
    add({ id: "tpz", type: "line", source: "tpz", paint: { "line-color": "#2e7d32", "line-width": 0.8, "line-dasharray": [2, 2] } }, "trees");
    add({ id: "fence", type: "line", source: "protection_fence", paint: { "line-color": "#ff7f00", "line-width": 2 } }, "protection");
    add({ id: "mats", type: "fill", source: "ground_protection", paint: { "fill-color": "#6a3d9a", "fill-opacity": 0.35 } }, "protection");
    add({ id: "staging", type: "fill", source: "staging", paint: { "fill-color": "#cab2d6", "fill-opacity": 0.6, "fill-outline-color": "#6a3d9a" } }, "protection");
    add({ id: "pavement", type: "fill", source: "pavement", paint: { "fill-color": "#6f6f6f", "fill-opacity": 0.85 } }, "path");
    add({ id: "nodig", type: "line", source: "no_dig", paint: { "line-color": "#1b9e77", "line-width": 4 } }, "path");
    add({ id: "centreline", type: "line", source: "path_centreline", paint: { "line-color": "#111", "line-width": 0.8, "line-dasharray": [4, 3] } }, "path");
    add({ id: "seat", type: "fill", source: "seating_node", paint: { "fill-color": "#c68b3c", "fill-opacity": 0.9 } }, "path");
    add({ id: "rain-garden", type: "fill", source: "rain_garden", paint: {
      "fill-color": ["case", ["==", ["get", "name"], "rain_garden_base"], "#2b6ca3", "#9ecae1"], "fill-opacity": 0.75 } }, "rain");
    add({ id: "beds", type: "fill", source: "shrub_beds", paint: { "fill-color": "#e7d7b0", "fill-opacity": 0.9, "fill-outline-color": "#8c6d31" } }, "planting");
    add({ id: "shrubs", type: "circle", source: "shrubs", paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 16, 2, 21, 6],
      "circle-color": ["match", ["get", "key"], "DF", "#f0b400", "RA", "#9acd32", "#7b2d43"] } }, "planting");
    add({ id: "new-trees", type: "circle", source: "new_trees", paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 16, 6, 21, 16], "circle-color": "#2c7a3f", "circle-opacity": 0.85,
      "circle-stroke-color": "#14401f", "circle-stroke-width": 1.5 } }, "planting");
    add({ id: "furniture", type: "circle", source: "site_furniture", paint: {
      "circle-radius": 5, "circle-color": "#8d6e63", "circle-stroke-color": "#3e2723", "circle-stroke-width": 1.5 } }, "path");
    add({ id: "spots", type: "circle", source: "spot_elevations", paint: {
      "circle-radius": 4, "circle-color": "#1565c0", "circle-stroke-color": "#fff", "circle-stroke-width": 1 } }, "surface");
    add({ id: "crossings", type: "circle", source: "flow_crossings", paint: {
      "circle-radius": 6, "circle-color": "rgba(0,0,0,0)", "circle-stroke-color": "#e08214", "circle-stroke-width": 2.5 } }, "surface");

    document.querySelectorAll<HTMLInputElement>(".toggles input[data-group]").forEach((cb) => {
      const apply = () => (groups[cb.dataset.group!] ?? []).forEach((id) => map.setLayoutProperty(id, "visibility", cb.checked ? "visible" : "none"));
      cb.addEventListener("change", apply); apply();
    });

    const popup = (lngLat: [number, number], rows: [string, string][]) => {
      const dl = document.createElement("dl"); dl.className = "popup";
      for (const [k, v] of rows) { if (!v) continue; const dt = document.createElement("dt"); dt.textContent = k; const dd = document.createElement("dd"); dd.textContent = v; dl.append(dt, dd); }
      new maplibregl.Popup({ maxWidth: "340px" }).setLngLat(lngLat).setDOMContent(dl).addTo(map);
    };
    const clickable = ["new-trees", "trees-existing", "beds", "rain-garden", "nodig", "spots", "crossings", "furniture"];
    for (const id of clickable) {
      map.on("mouseenter", id, () => (map.getCanvas().style.cursor = "pointer"));
      map.on("mouseleave", id, () => (map.getCanvas().style.cursor = ""));
    }
    map.on("click", (e) => {
      const f = map.queryRenderedFeatures(e.point, { layers: clickable })[0];
      if (!f) return;
      const p = f.properties as Record<string, string>;
      const at: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      if (f.layer.id === "new-trees") popup(at, [["New tree", `${p.tag} · ${p.botanical}`], ["Common name", p.common], ["Why here", p.role],
                                                 ["Mature spread", `${p.mature_spread_m} m (drawn at 2/3)`]]);
      else if (f.layer.id === "trees-existing") popup(at, [["Existing tree", `${p.tag}${p.botanical ? " · " + p.botanical : ""}`],
        ["Canopy", `${p.canopy_m} m`], ["Condition", { G: "good", F: "fair", P: "poor" }[p.condition] ?? p.condition],
        ["Status", p.in_inventory === "true" || p.in_inventory === true as unknown as string ? "within 6 m of work: in the tree protection plan, retained" : "outside the work area, retained"]]);
      else if (f.layer.id === "beds") popup(at, [["Shrub bed", `${p.bed} · ${p.purpose}`], ["Area", `${p.area_m2} m²`], ["Planting", p.shrubs]]);
      else if (f.layer.id === "rain-garden") popup(at, [["Rain garden", p.name.replace(/_/g, " ")], ["Design elevation", p.z ? `${p.z} m` : ""]]);
      else if (f.layer.id === "nodig") popup(at, [["No-dig path segment", `${p.part.replace("spur_", "")} · ${p.length_m} m`],
        ["Build-up", `${Math.round(Number(p.buildup_min_m) * 1000)} mm minimum above existing grade`], ["Why", "the path runs under a drip line: no excavation"]]);
      else if (f.layer.id === "spots") popup(at, [["Spot elevation", p.label], ["Design", `${p.z} m CGVD2013`]]);
      else if (f.layer.id === "crossings") popup(at, [["Overland flow crossing", `${p.catchment_m2} m² catchment`], ["Treatment", p.treatment]]);
      else if (f.layer.id === "furniture") popup(at, [["Site furniture", p.item]]);
    });
  });
}
