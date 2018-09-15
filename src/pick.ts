import { parse } from './parse';
import { stringify } from './stringify';

export interface Pick {
  (queryString: string, picks: string[]): string
}

export const pick: Pick = (queryString, picks = []) => {
  if (!picks || picks.length === 0) return '';

  const oqs = parse(queryString);
  const nqs = Object
    .keys(oqs)
    .filter(key => picks.indexOf(key) !== -1)
    .reduce((total, key) => (total[key] = oqs[key], total), {});
  return stringify(nqs);
};
