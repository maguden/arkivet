import * as migration_20261016_185911 from './20261016_185911';
import * as migration_20261101_001827_arkivet from './20261101_001827_arkivet';

export const migrations = [
  {
    up: migration_20261016_185911.up,
    down: migration_20261016_185911.down,
    name: '20261016_185911',
  },
  {
    up: migration_20261101_001827_arkivet.up,
    down: migration_20261101_001827_arkivet.down,
    name: '20261101_001827_arkivet'
  },
];
