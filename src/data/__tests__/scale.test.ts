import { describe, it, expect } from 'vitest'
import { evaluateScore } from '../scale'

describe('evaluateScore() — EPDS', () => {
  it('low at <= 8', () => {
    expect(evaluateScore('epds', 0).level).toBe('low')
    expect(evaluateScore('epds', 8).level).toBe('low')
  })
  it('moderate at 9-12', () => {
    expect(evaluateScore('epds', 9).level).toBe('moderate')
    expect(evaluateScore('epds', 12).level).toBe('moderate')
  })
  it('high at 13-16', () => {
    expect(evaluateScore('epds', 13).level).toBe('high')
    expect(evaluateScore('epds', 16).level).toBe('high')
  })
  it('severe above 16', () => {
    expect(evaluateScore('epds', 17).level).toBe('severe')
    expect(evaluateScore('epds', 30).level).toBe('severe')
  })
})

describe('evaluateScore() — parenting anxiety', () => {
  it('low at <= 10', () => {
    expect(evaluateScore('parenting', 0).level).toBe('low')
    expect(evaluateScore('parenting', 10).level).toBe('low')
  })
  it('moderate at 11-17', () => {
    expect(evaluateScore('parenting', 11).level).toBe('moderate')
    expect(evaluateScore('parenting', 17).level).toBe('moderate')
  })
  it('high at 18-23', () => {
    expect(evaluateScore('parenting', 18).level).toBe('high')
    expect(evaluateScore('parenting', 23).level).toBe('high')
  })
  it('severe above 23', () => {
    expect(evaluateScore('parenting', 24).level).toBe('severe')
  })
})

describe('evaluateScore() — label shape', () => {
  it('returns a bilingual label', () => {
    const r = evaluateScore('epds', 5)
    expect(r.label.zh).toBeTruthy()
    expect(r.label.en).toBeTruthy()
  })
})
