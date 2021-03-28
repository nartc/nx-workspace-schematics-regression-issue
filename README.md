This repo is attempting to reproduce a potential regression in `@nrwl/workspace` schematics between v10 and v11

## Branches

### main

`main` branch is using Nx v10. The steps to get to the current state of `main` branch is as follows:

- `npx create-nx-workspace@10 --cli=angular --preset=empty`
- `cd workspace-name`
- `npm i -D @nrwl/nx-plugin@10`
- `npx ng generate @nrwl/nx-plugin:plugin test-plugin --importPath=@workspace-name/test-plugin`
- Modify `schematics.spec.ts` to `runExternalSchematicAsync` with `@nrwl/workspace:workspace` to create an empty Workspace

> This allows to pass in additional options instead of using `createEmptyWorkspace()`

There is one test that is asserting that the created Workspace will have `angular.json` file. The test will pass on `main` branch

### nx-11

`nx-11` branch is using Nx v11. The steps to get from `main` branch to the current state of `nx-11` branch is as follows:

- `npx nx migrate @nrwl/workspace`
- `npm i --legacy-peer-deps`
- `npx nx migrate --run-migrations=migrations.json`

Now the test will fail on `nx-11` branch as `@nrwl/workspace:workspace` does not seem to generate `angular.json` (or `workspace.json`) anymore.
