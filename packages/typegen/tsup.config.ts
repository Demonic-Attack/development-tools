import { defineConfig } from 'tsup';

export default defineConfig({
    format: 'esm',
    target: 'esnext',
    dts: true,
    clean: true,
    sourcemap: true,
    minify: true,
    tsconfig: 'tsconfig.json',
    entry: ['index.ts'],
    outDir: 'dist',
});
