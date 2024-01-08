export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.ts',
      "\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/styleMock.ts",
    },
    rootDir: "src",
    resolver: undefined,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'png'],
  };
  