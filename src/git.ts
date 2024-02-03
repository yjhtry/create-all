import process from 'node:process'
import path from 'node:path'
import { $ } from 'execa'
import { mvFiles, resolveLocalPath } from './utils'
import type { RepoConfig } from './config'
import { checkFolderExists } from './fs'

export function resolveRepoUrl(config: RepoConfig) {
  if (config.cloneType === 'folder')
    return `${config.url}.git`
  else
    return `${config.url}/${config.repoName}.git`
}

export async function handleClone(config: RepoConfig, projectName: string) {
  let { cloneType, repoName, url } = config

  // todo transform and validate use yup
  url = url.trim()
  repoName = repoName.trim()
  projectName = projectName.trim()

  if (!url.startsWith('https://github.com/'))
    throw new Error('invalid repo url, only support github.com repo url.')

  if (!repoName.length)
    throw new Error('invalid repo name.')

  if (cloneType && !['repo', 'folder'].includes(cloneType))
    throw new Error('invalid clone type.')

  if (!projectName.length)
    throw new Error('invalid project name.')

  if (checkFolderExists(resolveLocalPath(projectName)))
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
