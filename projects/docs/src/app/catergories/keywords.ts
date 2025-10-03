import { NgDocGlobalKeyword } from '@ng-doc/core';

import { SignalrKeywords } from './features/signal-r/_keywords';
import { InterfacesKeywords } from './interfaces/_keywords';
import { ModelsKeywords } from './models/_keywords';
import { ProvidersKeywords } from './providers/_keywords';
import { TypesKeywords } from './types/_keywords';

export const DocsKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  ProvidersKeywords,
  InterfacesKeywords,
  ModelsKeywords,
  SignalrKeywords,
  TypesKeywords,
);
