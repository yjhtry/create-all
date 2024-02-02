const yjhtry = 'https://github.com/yjhtry'

export interface RepoConfig {
  user: string
  title: string
  path: string
  value: string
  description: string
}

export const repoList = [
  {
    user: yjhtry,
    title: 'vue h5 template',
    path: '',
    value: 'vue-h5-starter',
    description: 'a vue h5 starter template',
  },
] as RepoConfig[]
