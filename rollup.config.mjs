import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/plugin.js',
  output: {
    format: 'umd',
    name: 'SalaLearningComponent',
    file: 'dist/SalaLearningComponent.umd.js',
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue'],
  plugins: [
    resolve(),
    commonjs(),
    vue({ css: true, compileTemplate: true })
  ]
};
