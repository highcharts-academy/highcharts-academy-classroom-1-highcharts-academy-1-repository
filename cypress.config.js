const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "tests/**/*.test.cy.js",
    supportFile: "tests/support.cy.js",
  }
});
