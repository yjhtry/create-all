import { loadConfig } from 'unconfig'
import prompts, { type PromptObject } from 'prompts'

export interface RepoConfig {
  title: string
  url: string
  description?: string
  repoName: string
  cloneType?: 'repo' | 'folder'
  children?: RepoConfig[]
}

export async function loadRepoConfig() {
  const { config: { config } } = await loadConfig<{ config: RepoConfig[] }>({
    sources: [
      {
        parser: 'json',
        files: ['.create-all.json', 'create-all.json'],
        extensions: ['json', ''],
      },
    ],
  })

  return config
}
