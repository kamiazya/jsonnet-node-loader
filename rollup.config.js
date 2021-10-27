import typescript from 'rollup-plugin-typescript2';

/** @type {import('rollup').RollupOptions[]} */
const options = [
  {
    input: './src/index.ts',
    plugins: [typescript()],
    external: [
      'node:url',
      'query-string',
      '@hanazuki/node-jsonnet',
    ],
    output: [
      {
        format: 'cjs',
        file: './lib/index.js',
      },
      {
        format: 'esm',
        file: './lib/index.mjs',
      },
    ],
  },
];

export default options;
