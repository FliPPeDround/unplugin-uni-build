import { describe, expect, test } from 'vitest'
import { parseSFC } from '..'

const files = import.meta.glob('./fixtures/*.vue', {
  eager: true,
  as: 'raw',
})

describe('fixtures', async () => {
  console.log(files)
  for (const [id, code] of Object.entries(files)) {
    console.log(code)
    test(id.replace(/\\/g, '/'), () => {
      const exec = () => parseSFC(code)
      if (id.includes('error'))
        expect(exec).toThrowErrorMatchingSnapshot()

      else
        expect(exec()).toMatchSnapshot()
    })
  }
})
