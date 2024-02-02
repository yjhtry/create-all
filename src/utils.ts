import { repoList } from './const'

// get repository name from url
export function getRepoName(url: string) {
  const match = url.match(/\/([^/]+?)(?:\.git)?$/)
  if (match)
    return match[1]

  return url
}

export function resolveRepoUrl(value: string) {
  const repo = repoList.find(repo => repo.value === value)

  return `${repo?.user}/${repo?.value}.git`
}
