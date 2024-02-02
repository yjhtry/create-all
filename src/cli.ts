import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { showClonePrompts } from './clone'

// eslint-disable-next-line no-unused-expressions
yargs(hideBin(process.argv))
  .scriptName('create-all')
  .usage('$0 [args]')
  .command(
    'clone',
    'clone select repository into a newly created directory',
    showClonePrompts,
  )
  .showHelpOnFail(false)
  .alias('h', 'help')
  .version('version', version)
  .alias('v', 'version')
  .help()
  .argv
