import prompts from 'prompts'
import picocolors from 'picocolors'
import { type RepoConfig, repoChoices } from './const'
import { handleClone } from './git'

// eslint-disable-next-line no-console
const log = console.log

function getInitialProjectName(config: RepoConfig) {
  return config.name
}

export async function showClonePrompts() {
  const response = await prompts([
    {
      type: 'select',
      name: 'config',
      message: 'Choose a project to clone',
      validate: value => value.length > 0,
      choices: repoChoices,
    },
    {
      type: 'text',
      name: 'projectName',
      message: 'project name',
      initial: getInitialProjectName,
      validate: value => value.trim().length > 0,
    },
  ])

  const { config, projectName } = response

  handleClone(config, projectName)

  log('\n')
  log(picocolors.green(`  cd ${projectName} && pnpm install`))
}
