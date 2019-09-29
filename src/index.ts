#!/usr/bin/env node
import { EsaClient } from './esa-client'
import { upload } from './upload'
import * as dotenv from 'dotenv'

const chalk = require('chalk')
const figlet = require('figlet')
const path = require('path')
const program = require('commander')

dotenv.config()
console.log(chalk.greenBright(figlet.textSync('wataridori')))

program
  .version('1.0.2')
  .arguments('<filename>')
  .description("CLI for Importing emoji to esa.io")
  .option('-a, --access-token <access-token>', 'esa access token (with write access)')
  .option('-t, --team-name <team-name>', 'team name (Usually, it is a sub domain)')
  .option('-d, --delete-succeeded-files', '')
  .option('--dry', `It won't upload.`)
  .option('--verbose', 'Show more details while processing.')
  // .option('-g, --convert-apng-to-gif', '') // TODO convert to gif (beta)
  // .option('-r, --convert-romaji-filename', '') // TODO convert to romaji (beta)
  .action((filename: any) => {
    const team = program.teamName || process.env.ESA_TEAM_NAME
    const token = program.accessToken || process.env.ESA_TOKEN

    if (!team || !token) {
      console.error(`Error: You have to specify both ${chalk.red('team name')} and ${chalk.red('access token')}. See help for more details.`)
      return
    }

    const client = new EsaClient(team, token)
    const filepath = path.resolve(process.cwd(), filename)
    const deleteSucceededFiles = program.deleteSucceededFiles
    const dry = program.dry
    const verbose = program.verbose
    upload({filepath, client, deleteSucceededFiles, dry, verbose})
  })
  .parse(process.argv)

if (!(program.args[0] || '').length) {
  program.outputHelp()
}
