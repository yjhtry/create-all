import process from 'node:process'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { checkFolderExists, loadConfig } from '../src/fs'

describe('fs findUp', () => {
  it('should find package.json', async () => {
    const result = await loadConfig<{ name: string }>(['package.json'])
    expect(result?.name).toEqual('@yjhtry/create-all')
  })

  it('should not find package.md', async () => {
    const result = await loadConfig<{ name: string }>(['package.md'])
    expect(result).toBeUndefined()
  })
})

describe('fs checkFolderExists', () => {
  it('should check test folder exists', async () => {
    const result = await checkFolderExists(path.resolve(process.cwd(), 'test'))
    expect(result).toBeTruthy()
  })

  it('should tested test folder not exists', async () => {
    const result = await checkFolderExists(path.resolve(process.cwd(), 'tested'))
    expect(result).toBeFalsy()
  })
})
