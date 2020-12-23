<!--suppress HtmlDeprecatedAttribute -->
<p align="center">
  <a href="https://github.com/mrauhu/deversion/actions"><img alt="typescript-action status" src="https://github.com/mrauhu/deversion/workflows/build-test/badge.svg"></a>
</p>

# Deversion

## Effective caching of `node_modules`

Makes it possible to use NPM caching when versioning. Removes `version` from `package-lock.json`.

## How to use in your workflow

Add `mrauhu/deversion` before `actions/cache` and setup cache `id` and `key`.

### Example

`.github/workflows/test.yml`
```yaml
name: 'test'
on:
  push:
    tags:
      - "v*"
    branches:
      - master

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      # Removes the `version` key from a `package-lock.json`
      - uses: mrauhu/deversion@master
      # Now you have same key if the dependencies is haven't changed
      - uses: actions/cache@v2
        id: cache
        with:
          path: node_modules
          key: ${{ runner.os }}-node_modules-${{ hashFiles('package-lock.json') }}
      # Only install if dependencies is changed or cache expired
      - if: steps.cache.outputs.cache-hit != 'true'
        run: npm install --no-audit --no-fund
      - run: npm test
```

<!--
## TODO:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
-->
