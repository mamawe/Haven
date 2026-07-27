import { describe, it, expect } from 'vitest'
import { pick } from '../index'

describe('pick()', () => {
  it('returns empty string for null/undefined', () => {
    expect(pick(null, 'zh')).toBe('')
    expect(pick(undefined, 'en')).toBe('')
  })

  it('returns a plain string as-is', () => {
    expect(pick('hello', 'zh')).toBe('hello')
    expect(pick('hello', 'en')).toBe('hello')
  })

  it('resolves a Localized value by language', () => {
    const v = { zh: '你好', en: 'Hello' }
    expect(pick(v, 'zh')).toBe('你好')
    expect(pick(v, 'en')).toBe('Hello')
  })
})
