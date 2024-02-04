import path from 'node:path'
import { $ } from 'execa'
import { mvFiles, resolveLocalPath } from './utils'
import { type CloneConfig, type RepoConfig, validateCloneConfig } from './config'
import { checkFolderExists } from './fs'

export function resolveRepoUrl(config: RepoConfig) {
  if (config.cloneType === 'folder')
    return `${config.url}.git`
  else
    return `${config.url}/${config.repoName}.git`
}

export async function handleClone(config: CloneConfig) {
  const { cloneType = 'repo', repoName, projectName } = await validateCloneConfig(config)

  const projectPath = resolveLocalPath(projectName)

  if (checkFolderExists(projectPath))
    throw new Error(`project name: ${projectName} already exists.`)

  const repoUrl = resolveRepoUrl(config)

  if (cloneType === 'repo')
    await cloneRepo(repoUrl, projectName)
  else if (cloneType === 'folder')
    await cloneRepoFolder(repoUrl, projectName, repoName)

  await deleteRepoGit(projectName)
}

export async function cloneRepo(url: string, projectName: string) {
  await $({ stdio: 'inherit' })`git clone --depth=1 ${url} ${projectName}`
}

export async function cloneRepoFolder(url: string, projectName: string, folder: string) {
  await $({ stdio: 'inherit' })`git clone --no-checkout --depth=1 ${url} ${projectName}`

  const repoPath = resolveLocalPath(projectName)

  await $({ cwd: repoPath })`git sparse-checkout set --no-cone ${folder}/*`
  await $({ cwd: repoPath })`git checkout`

  // move files to project root and delete checkout folder
  await mvFiles(path.join(repoPath, folder), repoPath, true)
}

export async function deleteRepoGit(projectName: string) {
  await $`rm -rf ${path.join(resolveLocalPath(projectName), '.git')}`
}
