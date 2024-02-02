import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import prompts from 'prompts'
import _debug from 'debug'
import { version } from '../package.json'

const debug = _debug('create-all')

// eslint-disable-next-line no-unused-expressions
yargs(hideBin(process.argv))
  .scriptName('create-all')
  .usage('$0 [args]')
  .command(
    'clone',
    'clone select repository into a newly created directory',
    async () => {
      const response = await prompts([
        {
          type: 'select',
          name: 'project',
          message: 'Choose a project to clone',
          validate: value => value.length > 0,
          choices: [
            { title: 'project1', value: 'aaa', description: 'description1' },
          ],
        },
        {
          type: 'text',
          name: 'projectName',
          message: 'project name',
          validate: value => value.trim().length > 0,
        },
      ])

      debug(response)
    },
  )
  .showHelpOnFail(false)
  .alias('h', 'help')
  .version('version', version)
  .alias('v', 'version')
  .help()
  .argv
