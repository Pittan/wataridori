const apng = require('apng-js')
import * as fs from 'fs'

export async function wait (time: number) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve() }, time)
  })
}

export async function deleteFile (filepath: string) {
  return new Promise((resolve, reject) => {
    fs.unlink(filepath, (err: any) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

export async function isDir (path: string) {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err: any, stats) => {
      if (err)
        return reject(err) //Handle error
      resolve(stats.isDirectory())
    })
  })
}

function toArrayBuffer(buffer: Buffer) {
  const ab = new ArrayBuffer(buffer.length)
  const view = new Uint8Array(ab)
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i]
  }
  return ab
}

export async function isAPNG (filepath: string) {
  return new Promise((resolve, reject) => {
    try {
      const arrayBuf = toArrayBuffer(fs.readFileSync(filepath))
      const pngInstance = apng.default(arrayBuf)
      // const pngInstance = apng.default(arrayBuf)
      resolve(!apng.isNotAPNG(pngInstance))
    } catch (e) {
      reject(e)
    }
  })
}
