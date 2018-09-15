import { parse } from './parse';
import { stringify } from './stringify';

export interface Omit {
  (queryString: string, omits: string[]): string
}

export const omit: Omit = (queryString, omits = []) => {
  const oqs = parse(queryString);
  const nqs = Object
    .keys(oqs)
    .filter(key => omits.indexOf(key) === -1)
    .reduce((total, key) => (total[key] = oqs[key], total), {});

  return stringify(nqs);
};
