/* eslint-disable @typescript-eslint/ban-types */
import { URL } from 'node:url';
import { loadJsonnet } from './utils';
import { Format } from './types';

type FormatResult = { format: Format };

type TransformSourceContect = {
  format: Format;
  url: string;
};

type SourceResult = {
  source: string | SharedArrayBuffer | Uint8Array;
};

/** @deprecated {@link https://github.com/nodejs/node/pull/37468} */
export function getFormat(
  url: string,
  context: {},
  defaultGetFormat: (url: string, context: {}) => FormatResult,
): FormatResult | Promise<FormatResult> {
  if (new URL(url).pathname.endsWith('.jsonnet')) {
    return {
      format: 'json',
    };
  }
  return defaultGetFormat(url, context);
}

/** @deprecated {@link https://github.com/nodejs/node/pull/37468} */
export async function transformSource(
  source: string | SharedArrayBuffer | Uint8Array,
  context: TransformSourceContect,
  defaultTransformSource: (
    source: string | SharedArrayBuffer | Uint8Array,
    context: TransformSourceContect,
  ) => SourceResult,
): Promise<SourceResult> {
  const { url, format } = context;
  if (format === 'json' && new URL(url).pathname.endsWith('.jsonnet')) {
    const source = await loadJsonnet(url);
    return { source };
  }
  return defaultTransformSource(source, context);
}
