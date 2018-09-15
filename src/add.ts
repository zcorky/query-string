import { parse } from './parse';
import { stringify } from './stringify';

export interface Add {
  (queryString, params: Params): string
}

export interface Params {
  [key: string]: string | string[]
}

export const add: Add = (queryString, query = {}) => {
  const oqs = parse(queryString);
  const nqs = Object.assign(oqs, query);
  return stringify(nqs);
};
