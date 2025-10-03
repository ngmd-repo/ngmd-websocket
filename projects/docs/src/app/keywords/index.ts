import { NgDocGlobalKeyword } from '@ng-doc/core';

import { DocsKeywords } from '../catergories/keywords';

const GlobalKeywords: Record<string, NgDocGlobalKeyword> = {
  'signalr-lib': {
    url: 'https://www.npmjs.com/package/@microsoft/signalr',
    title: '@microsoft/signalr',
  },
};

export const AppKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  GlobalKeywords,
  DocsKeywords,
);
