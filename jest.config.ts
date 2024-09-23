module.exports = {
  collectCoverage: true,
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test",
        outputName: "junit.xml",
      },
    ],
  ],
  coverageReporters: ["cobertura", "html"],
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/hooks/",
    "<rootDir>/src/slices/",
    "<rootDir>/src/mocks/",
    "<rootDir>/src/types/",
    "<rootDir>/src/constants/",
    "<rootDir>/src/pages/",
    "<rootDir>/src/language/",
    "<rootDir>/src/store/",
    "<rootDir>/src/middleware.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFiles: ["<rootDir>/src/mocks/setupTests.mock.ts"],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i": `<rootDir>/src/mocks/file.mock.ts`,
    "^.+\\.svg$": "<rootDir>/src/mocks/svgTransform.mock.ts",

    // Handle module aliases
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/__mocks__/(.*)$": "<rootDir>/src/__mocks__/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@/service/(.*)$": "<rootDir>/src/service/$1",
    "^@/config/(.*)$": "<rootDir>/src/config/$1",
    "^@/store/(.*)$": "<rootDir>/src/store/$1",
    "^@root/(.*)$": "<rootDir>/../$1",
    "^@/contexts/(.*)$": "<rootDir>/src/contexts/$1",
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/dist",
    "<rootDir>/public",
  ],
  testEnvironment: "jsdom",
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
