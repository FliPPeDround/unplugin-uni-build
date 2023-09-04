import { describe, expect, it } from 'vitest'
import { generateTemplate } from '.'

describe('generate template', () => {
  it('base', () => {
    const ast = {
      type: 1,
      ns: 0,
      tag: 'template',
      tagType: 0,
      props: [],
      isSelfClosing: false,
      children: [
        {
          type: 2,
          content: '  ',
        },
        {
          type: 1,
          ns: 0,
          tag: 'div',
          tagType: 0,
          props: [],
          isSelfClosing: false,
          children: [
            {
              type: 2,
              content: '    ',
            },
            {
              type: 5,
              content: {
                type: 4,
                isStatic: false,
                constType: 0,
                content: 'foo',
              },
            },
            {
              type: 2,
              content: '\n  ',
            },
          ],
        },
        {
          type: 2,
          content: '\n',
        },
      ],
    }
    expect(generateTemplate(ast)).toBe(`
<template>
  <div>
    {{ foo }}
  </div>
</template>`)
  })
})
