import { parse } from '@vue/compiler-sfc'
import type { descriptorSFC } from '@/types'

export function parseSFC(code: string) {
  const { descriptor } = parse(code)
  const output: descriptorSFC = {
    template: null,
    script: undefined,
    scriptSetup: undefined,
    styles: [],
  }

  if (descriptor.template)
    output.template = descriptor.template?.content

  if (descriptor.script?.lang === 'ts' || descriptor.scriptSetup?.lang === 'ts') {
    if (descriptor.script?.content)
      output.script = descriptor.script.content

    if (descriptor.scriptSetup?.content)
      output.scriptSetup = descriptor.scriptSetup.content
  }

  descriptor.styles.forEach((style) => {
    if (style.lang) {
      output.styles!.push({
        content: style.content,
        lang: style.lang,
        scoped: style.scoped || false,
      })
    }
  })

  return output
}
