export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@supabase/supabase-js)/)"
  ],
};