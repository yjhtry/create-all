import { describe, expect, it } from 'vitest'
import { findUp } from '../src/fs'

describe('fs', () => {
  it('should find up', async () => {
    const result = await findUp(['.create-all.json'])
    expect(result).toEqual(['/package.json'])
  })
})
