import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { join } from 'path';

import { TestPluginSchematicSchema } from './schema';

describe('test-plugin schematic', () => {
  let appTree: UnitTestTree;
  const options: TestPluginSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@nx-test-schematics/test-plugin',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(async (done) => {
    appTree = await testRunner.runExternalSchematicAsync(
      '@nrwl/workspace',
      'workspace',
      {
        name: 'workspace',
        style: 'scss',
        skipInstall: true,
        skipGit: true,
        commit: false,
        cli: 'angular',
        preset: 'empty'
      }
    ).toPromise();
    done();
  });

  it('should have angular.json', () => {
    expect(appTree.exists('/angular.json')).toBeTruthy();
  });
});
