import { describe, expect, test } from 'vitest'
import { parseSFC } from '..'

const files = import.meta.glob('./fixtures/*.vue', {
  eager: true,
  as: 'raw',
})

describe('fixtures', async () => {
  for (const [id, code] of Object.entries(files)) {
    test(id.replace(/\\/g, '/'), () => {
      const exec = () => parseSFC(code)
      if (id.includes('error'))
        expect(exec).toThrowErrorMatchingSnapshot()

      else
        expect(exec()).toMatchSnapshot()
    })
  }
})
