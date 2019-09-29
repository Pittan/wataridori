import { ESA_API_INTERVAL, EsaClient } from './esa-client'
import { deleteFile, isAPNG, isDir, wait } from './utils'
import ora = require('ora')
import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk'
import { Ora } from 'ora'
import { ESA_DEFINED_EMOJIS } from './esa-defined-emojis'

export interface UploadParam {
  filepath: string
  client: EsaClient
  deleteSucceededFiles?: boolean
  dry?: boolean
  verbose?: boolean
}

interface options {
  deleteSucceededFiles?: boolean
  dry?: boolean
  verbose?: boolean
}

export async function upload (param: UploadParam) {
  const spinner = ora({
    discardStdin: false,
    text: `Uploading emoji to ${param.client.teamName}.esa.io...`
  }).start()

  const options: options = {
    deleteSucceededFiles: param.deleteSucceededFiles,
    dry: param.dry,
    verbose: param.verbose
  }

  if (options.dry && options.verbose) spinner.info('Running on dry mode...')

  const isDirectory = await isDir(param.filepath)
  if (isDirectory) {
    fs.readdir(param.filepath, async (err: any, directoryFiles: string[]) => {
      if (err) {
        spinner.fail(err)
        return
      }
      await uploadInternal(directoryFiles, spinner, param, options)
    })
  } else {
    const files = [param.filepath]
    await uploadInternal(files, spinner, param, options)
  }
}

async function uploadInternal (files: string[], spinner: Ora, param: UploadParam, options: options) {
  const list = await filterFiles(files, param.filepath, spinner, options)
  const length = list.length

  if (length === 0) {
    spinner.succeed(`No files can be uploaded to esa.io.`)
    return
  }
  spinner.info(`${length} acceptable PNG file(s) found!`)
  spinner.info(`This upload process will take about ${(length - 1) * ESA_API_INTERVAL / 1000} seconds.`)

  for(let i = 0; i < list.length; i++) {
    const timeoutMs = options.dry || (i + 1 === list.length) ? 0 : ESA_API_INTERVAL
    try {
      spinner.start(`Uploading ${chalk.red(list[i].name)}... (${i + 1} of ${length})`)
      const result = await uploadFile(list[i].fullPath, param.client, options)
      spinner.succeed(`Successfully uploaded as ${chalk.red(result)}. (${i + 1} of ${length})`)

      spinner.start('Waiting for next file...')
      await wait(timeoutMs)
    } catch (e) {
      spinner.fail(e)
      spinner.start('Waiting for next file...')
      await wait(timeoutMs)
    }
  }
  spinner.succeed('Done!')
}

async function uploadFile (filepath: string, client: EsaClient, options?: any): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const name = path.basename(filepath, path.extname(filepath))

    try {
      if (options.dry) {
        resolve(name)
        return
      }

      await client.upload({filepath, name})
      if (options.deleteSucceededFiles) {
        await deleteFile(filepath)
      }

      resolve(name)
    } catch (e) {
      const obj = JSON.parse(e.error)
      reject(`API Error: ${obj.message}`)
    }
  })
}

async function filterFiles (files: string[], filePath: string, spinner: Ora, options: options): Promise<Array<{name: string, fullPath: string}>> {
  return new Promise(async (resolve, reject) => {
    // At this point, we're just working for png files.
    files = files.filter(f => f.endsWith('.png'))

    if (options.verbose) spinner.info(`${files.length} PNG file(s) found!`)

    // Make sure that all files are not APNG.
    // To do so, we have to remove APNGs from the file list.
    // (esa.io API server returns 500 for APNG files for now.)
    // Also, we transform data objects for later processing.
    let result: Array<{name: string, fullPath: string}> = []
    for(let i = 0; i < files.length; i++) {
      const p = path.resolve(filePath, files[i])
      const name = path.basename(p, path.extname(p))

      const isAnimatedPNG = await isAPNG(p)
      if (!isAnimatedPNG) {
        result.push({
          name: name,
          fullPath: p
        })
        continue
      }
      if (options.verbose) {
        spinner.info(`${chalk.red(name)} can't be uploaded because this file is APNG.`)
      }
    }

    // esa.io only accepts emoji name for alphabet, number, and some character(-_) only.
    result = result.filter(i => {
      let result = /[a-z\d-_]+/.test(i.name)
      if (!result && options.verbose) {
        spinner.info(`${chalk.red(i.name)} can't be uploaded because this name is not accepted by esa.io.`)
      }
      return result
    })
    // filter all pre-defined emojis on esa.io
    .filter(i => !ESA_DEFINED_EMOJIS.includes(i.name))

    resolve(result)
  })
}
