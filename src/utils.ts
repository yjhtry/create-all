import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export function resolveProjectPath(projectName: string) {
  return path.join(process.cwd(), projectName)
}

export async function mvFiles(from: string, to: string, deleteFrom = false) {
  const files = fs.readdirSync(from)

  const mvTasks = files.map((file) => {
    return new Promise((resolve, reject) => {
      const sourcePath = path.join(from, file)
      const destinationPath = path.join(to, file)
      return fs.rename(sourcePath, destinationPath, (err) => {
        if (err)
          reject(err)
        else resolve(true)
      })
    })
  })

  await Promise.all(mvTasks)

  if (deleteFrom)
    fs.rmdirSync(from)
}
