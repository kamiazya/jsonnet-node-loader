export type Format = 'builtin' | 'commonjs' | 'json' | 'module' | 'wasm';

export type ResolveResult = {
  format: Format;
  url: string;
};

export type LoadResult = {
  format: 'json';
  source: string | SharedArrayBuffer | Uint8Array;
};

export type ResolveHookContext = {
  conditions: string[];
  parentURL?: string;
};

export type LoadHookContext = {
  format: Format;
};
