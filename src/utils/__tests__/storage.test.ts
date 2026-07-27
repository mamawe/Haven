import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getProfileName, setProfileName, isFavorite, toggleFavorite, clearAllData,
} from '../storage'

describe('storage — profile names', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns default names when unset', () => {
    expect(getProfileName('me')).toBe('我')
    expect(getProfileName('partner')).toBe('伴侣')
  })

  it('round-trips a set name', () => {
    setProfileName('me', '妈妈')
    expect(getProfileName('me')).toBe('妈妈')
  })

  it('does not throw when localStorage.setItem throws (quota / private mode)', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem')
    spy.mockImplementation(() => { throw new Error('quota exceeded') })
    expect(() => setProfileName('me', 'X')).not.toThrow()
    spy.mockRestore()
  })
})

describe('storage — favorites', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('toggles a favorite on and off', () => {
    expect(isFavorite('a')).toBe(false)
    expect(toggleFavorite('a')).toBe(true)
    expect(isFavorite('a')).toBe(true)
    expect(toggleFavorite('a')).toBe(false)
    expect(isFavorite('a')).toBe(false)
  })
})

describe('storage — clearAllData', () => {
  it('removes only parent-calm-* keys', () => {
    localStorage.setItem('parent-calm-x', '1')
    localStorage.setItem('other-app', '2')
    clearAllData()
    expect(localStorage.getItem('parent-calm-x')).toBeNull()
    expect(localStorage.getItem('other-app')).toBe('2')
  })
})
