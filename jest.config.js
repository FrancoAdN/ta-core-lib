module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './lib',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    './**/*.ts',
    '!./**/index.ts',
    '!main.ts',
    '!./**/*.module.ts',
    '!./**/*.interceptor.ts',
    '!./**/*.decorator.ts',
    '!./**/content/**/*',
    '!./**/s3/*',
  ],
  testPathIgnorePatterns: [],
  globals: {
    'ts-jest': {
      tsconfig: {
        emitDecoratorMetadata: false,
      },
    },
  },
  coverageThreshold: {
    global: {
      branches: 98,
      functions: 98,
      lines: 98,
      statements: 98,
    },
  },
  testEnvironment: 'node',
};
