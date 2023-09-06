import { describe, expect, it } from 'vitest'
import type { Node } from '.'
import { renderTemplate, transformTemplate } from '.'

describe('generate template', () => {
  it('render', () => {
    const content
= `<div v-model.number="2" :disabled="(disabled as boolean)">
<p @click="(e: Event) => foo(e, disabled)">
  {{foo ? get('aa') : get}}
  </p> 
</div>`
    expect(renderTemplate(content)).toMatchInlineSnapshot(`
      "<div v-model.number=\\"2\\" :disabled=\\"disabled\\">
      <p @click=\\"(e) => foo(e, disabled)\\">
        {{foo ? get('aa') : get}}
        </p> 
      </div>"
    `)
  })

  it('transform', () => {
    const node: Node = [
      {
        content: [
          '',
          {
            content: ['{{foo}}'],
            tag: 'p',
          },
          '',
        ],
        attrs: {
          'disabled': '',
          ':disabled': '(disabled as number)',
        },
        tag: 'div',
      },
    ]
    expect(transformTemplate(node)).toMatchInlineSnapshot(`
      [
        {
          "attrs": {
            ":disabled": "disabled",
            "disabled": "",
          },
          "content": [
            "",
            {
              "content": [
                "{{foo}}",
              ],
              "tag": "p",
            },
            "",
          ],
          "tag": "div",
        },
      ]
    `)
  })
})
