import { loadConfig } from 'unconfig'

export interface RepoConfig {
  title: string
  url: string
  description?: string
  repoName: string
  cloneType?: 'repo' | 'folder'
  children?: RepoConfig[]
}

export async function loadRepoConfig() {
  try {
    const { config: { config }, sources } = await loadConfig<{ config: RepoConfig[] }>({
      sources: [
        {
          parser: 'json',
          files: ['.create-all.json', 'create-all.json'],
          extensions: ['json', ''],
        },
      ],
    })

    if (sources.length === 0)
      throw new Error('no config file found')

    if (!config)
      throw new Error('invalid config')

    return config
  }
  catch (error) {
    throw new Error(`failed to load config: ${(error as any).message}`)
  }
}
