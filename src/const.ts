const yjhtry = 'https://github.com/yjhtry'

export interface RepoConfig {
  url: string
  name: string
  type: 'repo' | 'folder'
  folder?: string
}

export interface RepoChoice {
  user: string
  title: string
  value: RepoConfig
  description: string
}

export const repoChoices = [
  {
    title: 'vue h5 template',
    value: {
      url: yjhtry,
      type: 'repo',
      folder: '',
      name: 'vue-h5-starter',
    },
    description: 'a vue h5 starter template',
  },
  {
    title: 'vue h5 template mock folder',
    value: {
      url: yjhtry,
      type: 'folder',
      folder: 'mock',
      name: 'vue-h5-starter-mock',
    },
    description: 'a vue h5 starter template',
  },
] as RepoChoice[]
