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
    title: 'node cli starter template',
    value: {
      url: yjhtry,
      type: 'folder',
      folder: 'node-cli-starter',
      name: 'starter-templates',
    },
    description: 'a cli starter template based on node.js',
  },
] as RepoChoice[]
