import prompts from 'prompts'
import picocolors from 'picocolors'
import { type RepoConfig, loadRepoConfig } from './config'
import { handleClone } from './git'

// eslint-disable-next-line no-console
const log = console.log

export async function showClonePrompts() {
  const treeData = await loadRepoConfig()

  const getChoices = (data: RepoConfig[]) => {
    return data.map((item) => {
      const { url, children } = item
      return {
        ...item,
        value: url ? item : children,
      }
    })
  }

  let selectedNode: RepoConfig | RepoConfig[] | null = treeData

  while (Array.isArray(selectedNode) && selectedNode.length > 0) {
    const res: { repoConfig: RepoConfig | RepoConfig[] } = await prompts({
      type: 'select',
      name: 'repoConfig',
      message: '请选择一个节点：',
      choices: getChoices(selectedNode),
    })

    selectedNode = res.repoConfig

    if (!Array.isArray(res.repoConfig))
      break
  }

  const { projectName } = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'project name',
      initial: (selectedNode as any).repoName,
      validate: value => value.trim().length > 0,
    },
  ])

  handleClone(selectedNode as RepoConfig, projectName)

  log('\n')
  log(picocolors.green(`  cd ${projectName} && pnpm install`))
}