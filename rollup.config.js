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
        format: 'esm',
        file: './lib/index.js',
      },
    ],
  },
];

export default options;
