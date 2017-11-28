import parse from './parse';
import stringify from './stringify';
import './polyfill';

export default function omit(queryString, omits = []) {
  const oqs = parse(queryString);
  const nqs = Object
    .entries(oqs)
    .filter(([key, value]) => omits.indexOf(key) === -1)
    .reduce((a, [key, value]) => ({ ...a, [key]: value }), {});
  return stringify(nqs);
}
