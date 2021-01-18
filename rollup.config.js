const { rollup } = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

rollup({
  input: 'src/scripts/page.js',
  plugins: [
    nodeResolve({
      mainFields: ['module', 'jsnext', 'main'],
      browser: true,
    }),
    commonjs(),
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
}).then((bundle) => (
  bundle.write({
    format: 'es',
    file: 'site/theme/public/scripts/page.min.js',
  })
)).then(() => {
  console.log('page.min.js bundle created!');
}).catch((error) => {
  console.log(error);
});

rollup({
  input: 'src/scripts/edit.js',
  plugins: [
    nodeResolve({
      mainFields: ['module', 'jsnext', 'main'],
      browser: true,
    }),
    commonjs(),
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
}).then((bundle) => (
  bundle.write({
    format: 'es',
    file: 'site/theme/public/scripts/edit.min.js',
  })
)).then(() => {
  console.log('edit.min.js bundle created!');
}).catch((error) => {
  console.log(error);
});

// Unminified
rollup({
  input: 'src/scripts/page.js',
  plugins: [
    nodeResolve({
      mainFields: ['module', 'jsnext', 'main'],
      browser: true,
    }),
    commonjs(),
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}).then((bundle) => (
  bundle.write({
    format: 'es',
    file: 'site/theme/public/scripts/page.js',
  })
)).then(() => {
  console.log('page.js bundle created!');
}).catch((error) => {
  console.log(error);
});

rollup({
  input: 'src/scripts/edit.js',
  plugins: [
    nodeResolve({
      mainFields: ['module', 'jsnext', 'main'],
      browser: true,
    }),
    commonjs(),
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}).then((bundle) => (
  bundle.write({
    format: 'es',
    file: 'site/theme/public/scripts/edit.js',
  })
)).then(() => {
  console.log('edit.js bundle created!');
}).catch((error) => {
  console.log(error);
});
