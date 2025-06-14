const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  projectId: 'tn42ty',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
