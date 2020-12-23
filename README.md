<!--suppress HtmlDeprecatedAttribute -->
<p align="center">
  <a href="https://github.com/mrauhu/deversion/actions"><img alt="typescript-action status" src="https://github.com/mrauhu/deversion/workflows/build-test/badge.svg"></a>
</p>

# mrauhu/deversion

> Github Action that removes `version` from `package-lock.json`.

Superpowers the `node_modules` cache step. Lets you skip the installation step even if the version of your Node.js package was bumped via `npm version`.

## Usage

Add `mrauhu/deversion` before `actions/cache`, setup cache `id` and check cache hit after:

```yaml
- uses: mrauhu/deversion@master
- uses: actions/cache@v2
  id: cache
  with:
    path: node_modules
    key: ${{ runner.os }}-node_modules-${{ hashFiles('package-lock.json') }}
- if: steps.cache.outputs.cache-hit != 'true'
  run: npm ci
```

### Example

`.github/workflows/npm-publish.yml`

```yaml
name: Node.js package
on:
  push:
    tags:
      - "v*"

jobs:
  test-and-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 12
          registry-url: https://npm.pkg.github.com/
      # Removes the `version` key from a `package-lock.json`
      - uses: mrauhu/deversion@master
      # Now you have same key if the dependencies is haven't changed
      - uses: actions/cache@v2
        id: cache
        with:
          path: node_modules
          key: ${{ runner.os }}-node_modules-${{ hashFiles('package-lock.json') }}
      # Install if dependencies is changed or cache expired
      - if: steps.cache.outputs.cache-hit != 'true'
        run: npm ci
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

<!--
## TODO:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
-->
