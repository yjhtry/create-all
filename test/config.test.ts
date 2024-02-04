import { describe, expect, it } from 'vitest'
import { validateCloneConfig } from '../src/config'

describe('config mod', () => {
  it('should validate clone config', async () => {
    const config = {
      projectName: 'test',
      repoName: 'node-cli',
      title: 'node-cli',
      url: 'https://github.com/yjhtry/node-cli',
    }
    expect(validateCloneConfig(config)).toBeTruthy()
  })

  it('should throw url invalid error', async () => {
    const config = {
      projectName: 'test',
      repoName: 'node-cli',
      title: 'node-cli',
      url: 'https://baidu.com',
    }
    expect(() => validateCloneConfig(config)).rejects.toThrow('only support github url, your\'s: https://baidu.com')
  })
})
