import type { PartialRequired } from '@yjhtry/types-func'
import { object, string } from 'yup'

export interface RepoConfig {
  title: string
  url?: string
  description?: string
  repoName: string
  cloneType?: 'repo' | 'folder'
  children?: RepoConfig[]
}

export type CloneConfig = PartialRequired<RepoConfig, 'url'> & { projectName: string }

const cloneRepoSchema = object({
  url: string()
    .trim()
    .required()
    .url()
    .test('github-url', ({ value }) => `only support github url, your's: ${value}`, value => value?.startsWith('https://github.com/')),
  description: string().trim(),
  repoName: string().trim().required(),
  cloneType: string().trim().oneOf(['repo', 'folder']),
  projectName: string().trim().required(),
})

export async function validateCloneConfig(config: CloneConfig) {
  try {
    const res = await cloneRepoSchema.validate(config)

    return res
  }
  catch (error) {
    throw new Error((error as any).message)
  }
}
