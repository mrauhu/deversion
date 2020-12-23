export interface PackageLockClean {
  [key: string]: unknown
}

export interface PackageLockObject extends PackageLockClean {
  version?: string
}

export function removeVersion(obj: PackageLockObject): PackageLockClean {
  delete obj.version
  return obj
}
