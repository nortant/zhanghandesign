import { defineConfig } from 'astro/config';

// MapLibre GL 6 runs its GeoJSON/tile worker as a separate ES module; bundle it
// (with its shared chunk) as an ES worker, or vector layers silently fail to render.
export default defineConfig({
  output: 'static',
  site: 'https://zhanghandesign.com',
  vite: { worker: { format: 'es' } },
});
