module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  testMatch: ['**/?(*.)+(spec|test|tests).+(ts|js)'],
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        diagnostics: true,
        warnOnly: true,
        ignoreCodes: [
          18002, // The ‘files’ list in config file is empty. (it is strongly recommended to include this one)
        ],
        pretty: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageDirectory: './coverage/',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
  ],
  collectCoverage: false,
  reporters: ['default', ['jest-junit', { outputDirectory: './coverage' }]],
  testTimeout: 100000,
  moduleNameMapper: {
    '^jose/(.*)$': '<rootDir>/../../node_modules/jose/dist/node/cjs/$1',
    '^firebase-admin/(.*)$': '<rootDir>./node_modules/firebase-admin/$1',
  }
};