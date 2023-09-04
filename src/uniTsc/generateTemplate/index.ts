import type { TemplateASTNode } from '@/types'
import {NodeTypes} from './nodeEnum'

export function generateTemplate(ast: TemplateASTNode) {
  let result = ''

  function traverse(ast: TemplateASTNode) {
    switch (ast.type) {
      case 1: // Element Node
        result += `<${ast.tag}`
        if (ast.props.length > 0) {
          ast.props.forEach((prop) => {
            result += ` ${prop.name}="${prop.value}"`
          })
        }
        result += '>'
        if (ast.children)
          ast.children.forEach(child => traverse(child))

        if (!ast.isSelfClosing)
          result += `</${ast.tag}>`

        break
      case 2: // Text Node
        result += ast.content
        break
      case 5: // Interpolation Node
        result += `{{${ast.content.content}}}`
        break
      default:
        break
    }
  }

  traverse(ast)
  console.log(result)
  return result
}
