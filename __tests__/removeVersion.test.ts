import {removeVersion} from '../src/removeVersion'

describe('removeVersion()', () => {
  it('should remove version from object', () => {
    expect(
      removeVersion({
        version: '0.0.0'
      })
    ).toEqual({})
  })
})
