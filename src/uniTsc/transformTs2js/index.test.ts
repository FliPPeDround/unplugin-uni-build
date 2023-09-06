import { describe, expect, it } from 'vitest'
import { transformTypeScript } from '.'

describe('generate template', () => {
  it('parser', async () => {
    const code = '2'
    expect(await transformTypeScript(code)).toMatchInlineSnapshot(`
      "2;
      "
    `)
  })
})
