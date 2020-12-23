import {promises as fs} from 'fs'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {promisify} from 'util'
import {EXPECTED_PACKAGE_LOCK, ORIGINAL_PACKAGE_LOCK} from './index'

const execFile = promisify(cp.execFile)

const FILENAME = './test.json'

// shows how the runner will run a javascript action with env / stdout protocol
describe('deversion Github Action', () => {
  beforeAll(async () => {
    const str = JSON.stringify(ORIGINAL_PACKAGE_LOCK, null, '  ')
    await fs.writeFile(FILENAME, str)
  })

  afterAll(async () => {
    await fs.rm(FILENAME)
  })

  it('should run with env variable', async () => {
    process.env['INPUT_FILENAME'] = FILENAME

    const node = process.execPath
    const argument = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    }
    await execFile(node, [argument], options)

    const content = await fs.readFile(FILENAME, 'utf-8')
    const obj = JSON.parse(content)
    expect(obj).toEqual(EXPECTED_PACKAGE_LOCK)
  })
})
