import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from './types'
import uniTsc from './uniTsc'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const filter = createFilter(
    options?.include,
    options?.exclude || /node_modules/,
  )
  return {
    name: 'unplugin-uni-build',
    // apply: 'build',
    enforce: 'post',
    transformInclude(id) {
      if (filter(id))
        console.log(id)

      return filter(id)
    },
    transform(code, id) {
      return uniTsc(code, id)
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
