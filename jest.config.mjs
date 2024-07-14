export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@supabase/supabase-js)/)"
  ],
};