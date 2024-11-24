import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-server';

const processArguments = process.argv;
let buildTarget = 'cdn' | 'nodePackage';
let devMode = false;

processArguments.forEach((arg) => {
  if (arg.includes('buildType=cdn')) {
    buildTarget = 'cdn';
  }

  if (arg.includes('mode=dev')) {
    devMode = true;
  }
});

const inputFile = buildTarget === 'cdn' ? './src/cdn.ts' : './src/index.ts';
const outputFile = buildTarget === 'cdn' ? 'dist/cdn.js' : 'dist/index.js';

const plugins = [
  nodeResolve(),
  commonjs({
    include: 'node_modules/**'
  }),
  typescript({
    tsconfig: './tsconfig.json'
  }),
  terser()
];

if (devMode) {
  plugins.push(
    serve({
      port: 9200,
      contentBase: ['dist']
    })
  );
}

function config() {
  return [
    {
      input: inputFile,
      output: {
        file: outputFile,
        format: 'esm',
        sourcemap: false
      },
      plugins
    }
  ];
}

export default config;
