const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ibg351',

  defaultCommandTimeout: 6000, 
  env: {

    url : "https://rahulshettyacademy.com"
  },
  retries: {
    runMode: 1,
  },
  projectId: "ibg351",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:'cypress/integration/examples/*.js'
  },
});
