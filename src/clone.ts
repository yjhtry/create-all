import prompts from 'prompts'
import { $ } from 'execa'
import picocolors from 'picocolors'
import { repoList } from './const'
import { getRepoName, resolveRepoUrl } from './utils'

// eslint-disable-next-line no-console
const log = console.log

export async function handleClone() {
  const response = await prompts([
    {
      type: 'select',
      name: 'project',
      message: 'Choose a project to clone',
      validate: value => value.length > 0,
      choices: repoList,
    },
    {
      type: 'text',
      name: 'projectName',
      message: 'project name',
      initial: pre => getRepoName(pre),
      validate: value => value.trim().length > 0,
    },
  ])

  const { project, projectName } = response

  await $({ stdio: 'inherit' })`git clone --progress ${resolveRepoUrl(project)} ${projectName}`

  log('\n')
  log(picocolors.green(`  cd ${projectName} && pnpm install`))
}
