import util from 'node:util';
import cp from 'node:child_process';

const execFile = util.promisify(cp.execFile);
const cwd = process.cwd();

async function run(filepath: string) {
  const { stdout } = await execFile(`node`, [
    '--experimental-loader',
    `${cwd}/lib/index.mjs`,
    `${cwd}/test/runner.mjs`,
    filepath,
  ]);
  return JSON.parse(stdout);
}

test('example.jsonnet can load and match snapshot', async () => {
  const data = await run('example.jsonnet');
  expect(data).toMatchInlineSnapshot(`
    Object {
      "person1": Object {
        "name": "Alice",
        "welcome": "Hello Alice!",
      },
      "person2": Object {
        "name": "Bob",
        "welcome": "Hello Bob!",
      },
    }
  `);
});

test('pass arguments to vars.jsonnet as query parameters', async () => {
  const data = await run('vars.jsonnet?foo=hoge&bar=fuga');
  expect(data).toMatchInlineSnapshot(`
    Object {
      "bar": "fuga",
      "foo": "hoge",
    }
  `);
});
