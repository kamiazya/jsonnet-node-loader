import { URL } from 'node:url';
import { parseUrl } from 'query-string';
import { Jsonnet } from '@hanazuki/node-jsonnet';

export function loadJsonnet(url: string): Promise<string> {
  const { url: filePath, query: options } = parseUrl(url);
  const jsonnet = new Jsonnet();
  for (const [key, value] of Object.entries(options)) {
    if (typeof value === 'string') {
      jsonnet.extString(key, value);
    }
  }
  return jsonnet.evaluateFile(new URL(filePath).pathname);
}
