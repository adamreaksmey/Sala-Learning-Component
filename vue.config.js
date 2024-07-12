const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  outputDir: "dist",
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      }
    },
  },
  css: {
    extract: false,
  },
});
