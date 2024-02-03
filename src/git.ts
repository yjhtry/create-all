import path from 'node:path'
import { $ } from 'execa'
import { mvFiles, resolveLocalPath } from './utils'
import type { RepoConfig } from './config'

export function resolveRepoUrl(config: RepoConfig) {
  if (config.cloneType === 'folder')
    return `${config.url}.git`
  else
    return `${config.url}/${config.repoName}.git`
}

export async function handleClone(config: RepoConfig, projectName: string) {
  const { cloneType = 'repo', repoName } = config
  const repoUrl = resolveRepoUrl(config)

  if (cloneType === 'repo')
    await cloneRepo(repoUrl, projectName)
  else if (cloneType === 'folder')
    await cloneRepoFolder(repoUrl, projectName, repoName)
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
