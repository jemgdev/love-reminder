import { defineConfig } from "cypress";
const cucumber = require( 'cypress-cucumber-preprocessor').default
const browserify = require('@cypress/browserify-preprocessor')

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // @ts-ignore
      const options = {
        ...browserify.defaultOptions,
        typescript: require.resolve("typescript")
      }

      on('file:preprocessor', cucumber(options))
    },
    specPattern: 'cypress/e2e/*.feature',
  },
});
