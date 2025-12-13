import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const define = {
    'import.meta.env.TMP_LOCALES': JSON.stringify(JSON.stringify(JSON.parse(readFileSync('../locales/en.json', 'utf8')))),
  };
  console.log(define);
  return {
    plugins: [react()],
    base: './',
    define,
  };
});
