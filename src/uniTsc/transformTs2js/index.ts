import { transformSync } from 'esbuild'

export function transformTypeScript(code: string) {
  return transformSync(code, {
    loader: 'ts',
    treeShaking: false,
    charset: 'utf8',
  }).code
}
