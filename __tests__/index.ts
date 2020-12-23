import {PACKAGE_LOCK_JSON} from '../src/deVersion'

export const EXPECTED_PACKAGE_LOCK = {
  name: 'test'
}
export const ORIGINAL_PACKAGE_LOCK = {
  ...EXPECTED_PACKAGE_LOCK,
  version: '0.0.0'
}
export const MOCK_FS = {
  [PACKAGE_LOCK_JSON]: JSON.stringify(ORIGINAL_PACKAGE_LOCK)
}
