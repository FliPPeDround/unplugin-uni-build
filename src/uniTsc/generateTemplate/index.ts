import { parser } from 'posthtml-parser'
import { render } from 'posthtml-render'
import { transformTypeScript } from '../transformTs2js'

export interface Node {
  tag: string
  attrs?: Record<string, string>
  content: Node[]
}

const transformTag = [':', 'v', '@']

function getContentInsideBraces(str: string) {
  const regex = /^\{\{([\s\S]*)\}\}$/
  const match = regex.exec(str)
  if (match)
    return match[1]

  else
    return false
}

export function renderTemplate(content: string) {
  const node = (parser(content) as unknown as Node[])
  const newNode = transformTemplate(node)
  return render(newNode)
}

export function transformTemplate(node: Node[]) {
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    if (typeof item === 'string') {
      const content = getContentInsideBraces(item)
      node[i] = content ? `{{${transformTypeScript(content).trim().slice(0, -1)}}}` : item
      continue
    }

    const { attrs, content } = item
    for (const key in attrs) {
      if (transformTag.includes(key[0])) {
        const code = attrs[key]
        const attrValue = transformTypeScript(code).trim().slice(0, -1)
        attrs[key] = attrValue
      }
    }
    item.content = transformTemplate(content)
  }

  return node
}
