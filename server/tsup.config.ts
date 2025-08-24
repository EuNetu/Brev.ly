import { defineConfig } from 'tsup'

export default defineConfig({
  // CORREÇÃO AQUI: Aponte diretamente para o ficheiro do servidor
  entry: ['src/infra/http/server.ts'],
  clean: true,
  format: 'esm',
  outDir: 'dist',
  target: 'node22',
  sourcemap: true,
  // Adicione esta opção para ignorar o que não é código
  noExternal: [],
  skipNodeModulesBundle: true,
})