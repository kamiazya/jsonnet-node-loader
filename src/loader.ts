import { URL } from 'node:url';
import { loadJsonnet } from './utils';
import type { ResolveHookContext, ResolveResult, LoadHookContext, LoadResult } from './types';

export function resolve(
  specifier: string,
  context: ResolveHookContext,
  next: (specifier: string, context: ResolveHookContext) => ResolveResult,
): ResolveResult {
  const url = new URL(specifier, context.parentURL);
  if (url.pathname.endsWith('.jsonnet')) {
    return {
      format: 'json',
      url: url.href,
    };
  }
  return next(specifier, context);
}

export async function load(
  url: string,
  context: LoadHookContext,
  defaultLoad: (url: string, context: LoadHookContext) => LoadResult,
): Promise<LoadResult> {
  const { format } = context;
  if (format === 'json' && new URL(url).pathname.endsWith('.jsonnet')) {
    const source = await loadJsonnet(url);
    return { format, source };
  }
  return defaultLoad(url, context);
}
