import path from 'node:path'
import { promises as fsp } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { mvFiles, resolveProjectPath } from '../src/utils'

describe('utils mod', () => {
  it('should word resolveLocalPath', () => {
    expect(resolveProjectPath('test')).toEqual(path.join(process.cwd(), 'test'))
  })

  it('should word mvFiles', async () => {
    const from = resolveProjectPath('test/move_from')
    const tempDir = resolveProjectPath(`test_${Date.now()}`)

    await fsp.mkdir(from)
    await fsp.writeFile(`${from}/test.txt`, 'test')

    await fsp.mkdir(tempDir)

    await mvFiles(from, tempDir)

    expect(await fsp.readdir(from)).toEqual([])
    expect(await fsp.readdir(tempDir)).toEqual(['test.txt'])

    await fsp.rm(tempDir, { recursive: true })
    await fsp.rm(from, { recursive: true })
  })
})
