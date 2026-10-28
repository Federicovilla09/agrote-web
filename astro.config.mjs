// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  // Dirección pública del sitio: se usa para armar links absolutos (por ejemplo, la imagen al compartir)
  site: 'https://agrote-web.vercel.app',
  integrations: [react()]
});