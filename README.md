# Han Zhang — Portfolio

Survey CAD, geomatics and landscape technician portfolio, targeting Alberta employers.

Built with [Astro](https://astro.build) · Deployed on [Cloudflare Pages](https://pages.cloudflare.com)

---

**Domain:** zhanghandesign.com

## Layout

| Path | Purpose |
|---|---|
| `src/pages/index.astro`, `about.astro`, `contact.astro` | Marketing pages |
| `src/pages/projects/` | Projects index + one page per scenario (S1–S5) |
| `src/data/projects.ts` | Shared project list (id, target role, status, summary) used by the home and projects pages |
| `src/data/s1_metrics.json`, `s3_metrics.json` | Numbers shown on the S1/S3 pages — generated, not hand-typed |
| `public/s1/`, `public/s3/` | Map layers (GeoJSON), images and downloads (PDF/DWG/DXF/CSV) for the completed scenarios |
| `src/content/earlyExperience/` | Condensed, English write-ups of pre-relocation construction-drawing work (2019–2023, China) |

## Publishing boundary

The S1/S3 project pages and their static assets are **exported snapshots** from the private lab repo
(`zhanghan-geo-lab`, not public), where the actual data pipeline, raw data and scripts live. This repo never runs that
pipeline at build time — `npm run build` only needs Node, no Python/PDAL/GDAL toolchain. When a scenario is
updated or a new one (S2a/S2b/S4/S5) is finished in the lab repo, its generated `public/sN/` assets, `sN_metrics.json`
and page template are copied here and committed as static files.

## Development

```bash
npm ci
npm run dev       # http://localhost:4321
npm run build      # -> dist/
```
