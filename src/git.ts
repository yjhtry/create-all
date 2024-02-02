import path from 'node:path'
import { $ } from 'execa'
import { mvFiles, resolveLocalPath } from './utils'
import type { RepoConfig } from './const'

export function resolveRepoUrl(config: RepoConfig) {
  return `${config.url}/${config.name}.git`
}

export async function handleClone(config: RepoConfig, projectName: string) {
  const { type, folder = '' } = config
  const repoUrl = resolveRepoUrl(config)
  if (type === 'repo')
    await cloneRepo(repoUrl, projectName)
  else if (type === 'folder')
    await cloneRepoFolder(repoUrl, projectName, folder)
}

export async function cloneRepo(url: string, projectName: string) {
  await $({ stdio: 'inherit' })`git clone --depth=1 ${url} ${projectName}`
  await deleteRepoGit(projectName)
}

export async function cloneRepoFolder(url: string, projectName: string, folder: string) {
  await $({ stdio: 'inherit' })`git clone --no-checkout --depth=1 ${url} ${projectName}`

  const repoPath = resolveLocalPath(projectName)
  await $({ cwd: repoPath })`git sparse-checkout set --no-cone ${folder}/*`
  await $({ cwd: repoPath })`git checkout`

  await mvFiles(path.join(repoPath, folder), repoPath, true)

  await deleteRepoGit(projectName)
}

export async function deleteRepoGit(projectName: string) {
  await $`rm -rf ${path.join(resolveLocalPath(projectName), '.git')}`
}
