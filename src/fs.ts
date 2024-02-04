import fs, { constants, promises as fsp } from 'node:fs'
import { dirname, parse, resolve } from 'node:path'
import process from 'node:process'

export interface FindUpOptions {
  /**
   * @default process.cwd
   */
  cwd?: string
  /**
   * @default path.parse(cwd).root
   */
  stopAt?: string
  /**
   * @default false
   */
  multiple?: boolean
  /**
   * @default true
   */
  allowSymlinks?: boolean
}

function existsSync(fp: string) {
  try {
    fs.accessSync(fp, constants.R_OK)
    return true
  }
  catch {
    return false
  }
}

export function checkFolderExists(folderPath: string) {
  try {
    const stats = fs.statSync(folderPath)
    return stats.isDirectory()
  }
  catch (error) {
    return false
  }
}

async function findUp(paths: string[], options: FindUpOptions = {}): Promise<string[]> {
  const {
    cwd = process.cwd(),
    stopAt = parse(cwd).root,
    multiple = false,
    allowSymlinks = true,
  } = options

  let current = cwd

  const files: string[] = []

  const stat = allowSymlinks ? fsp.stat : fsp.lstat

  while (current && current !== stopAt) {
    for (const path of paths) {
      const filepath = resolve(current, path)
      if (existsSync(filepath) && (await stat(filepath)).isFile()) {
        files.push(filepath)
        if (!multiple)
          return files
      }
    }
    const parent = dirname(current)
    if (parent === current)
      break
    current = parent
  }

  return files
}

async function readJson<T>(path: string) {
  const content = await fsp.readFile(path, 'utf-8')
  return JSON.parse(content) as T
}

export async function loadConfig<T>(filenames: string[]) {
  const [filepath] = await findUp(filenames)

  if (!filepath)
    return undefined

  return readJson<T>(filepath)
}
