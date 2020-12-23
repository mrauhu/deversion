import * as core from '@actions/core'
import {deVersion} from './deVersion'

async function run(): Promise<void> {
  const filename: string = core.getInput('filename', {
    required: false
  })
  try {
    core.debug(`Overwriting \`${filename}\``)
    await deVersion(filename)
  } catch (error) {
    core.setFailed(error.message)
  }
}

// eslint-disable-next-line github/no-then
run().then(() => {})
