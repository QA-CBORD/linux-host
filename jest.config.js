/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  "preset": "jest-preset-angular",
  "coverageReporters": ['html-spa'],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setup.jest.ts"
  ],
  "transformIgnorePatterns": [
     "!node_modules/"
  ],
  "roots": [
    "<rootDir>/src/"
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/cypress/",
    "<rootDir>/src/test.ts",
  ],
  "moduleNameMapper": {
    "^@core(.*)$": "<rootDir>/src/app/core/$1",
    "^@sections(.*)$": "<rootDir>/src/app/sections/$1",
    "^@shared(.*)$": "<rootDir>/src/app/shared/$1",
    "^@environments/environment-data": "<rootDir>/src/environments/environment-data.ts",
    "^@environments/environment": "<rootDir>/src/environments/environment.ts",
    "^src(.*)$": "<rootDir>/src/$1"
  }
};