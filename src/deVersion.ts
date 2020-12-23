import {promises as fs} from 'fs'
import {PackageLockObject, removeVersion} from './removeVersion'

export const PACKAGE_LOCK_JSON = './package-lock.json'

export async function deVersion(filepath = PACKAGE_LOCK_JSON): Promise<void> {
  const input = await fs.readFile(filepath, 'utf-8')

  let obj: PackageLockObject = JSON.parse(input)
  obj = removeVersion(obj)

  const output = JSON.stringify(obj, null, '  ')
  await fs.writeFile(filepath, output)
}
