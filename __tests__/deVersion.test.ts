import {promises as fs} from 'fs'
import mock from 'mock-fs'
import {deVersion, PACKAGE_LOCK_JSON} from '../src/deVersion'
import {EXPECTED_PACKAGE_LOCK, MOCK_FS} from './index'

describe('deVersion()', () => {
  beforeEach(async () => {
    mock(MOCK_FS)
  })
  afterEach(() => {
    mock.restore()
  })

  it('should overwrite `package-lock.json` and remove version from it', async () => {
    await deVersion()
    const content = await fs.readFile(PACKAGE_LOCK_JSON, 'utf-8')
    const obj = JSON.parse(content)
    expect(obj).toEqual(EXPECTED_PACKAGE_LOCK)
  })

  it('should throw error if missing `package-lock.json`', async () => {
    await fs.rm(PACKAGE_LOCK_JSON)
    await expect(deVersion()).rejects.toThrow(Error)
  })
})
