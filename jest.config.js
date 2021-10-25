/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"];
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
};
