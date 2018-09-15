import { parse } from './parse';
import { stringify } from './stringify';

export interface Pick {
  (queryString: string, picks: string[]): string
}

export const pick: Pick = (queryString, picks = []) => {
  const oqs = parse(queryString);
  const nqs = Object
    .keys(oqs)
    .filter(key => picks.indexOf(key) !== -1)
    .reduce((total, key) => (total[key] = oqs[key], total), {});
  return stringify(nqs);
}