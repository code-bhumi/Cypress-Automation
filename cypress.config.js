
import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
//import browserify from "@badeball/cypress-cucumber-preprocessor/browserify";
import browserify from "@cypress/browserify-preprocessor";

async function setupNodeEvents(on, config) { 
  
  await addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify(config));
  return config;
} 

export default defineConfig({

  defaultCommandTimeout: 6000, 
  reporter: 'mochawesome',
  env: {

    url : "https://rahulshettyacademy.com"
  },
  retries: {
    runMode: 1,
  },
  projectId: "ibg351",

  e2e: {
    
    setupNodeEvents,
    specPattern:'cypress/integration/examples/BDD*.feature'

  },
});
