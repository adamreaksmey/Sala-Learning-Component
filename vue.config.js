const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  outputDir: 'dist',
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
  css: {
    extract: false,
  },
});
