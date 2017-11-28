import parse from './parse';
import stringify from './stringify';

export default function add(queryString, query = {}) {
  const oqs = parse(queryString);
  const nqs = Object.assign(oqs, query);
  return stringify(nqs);
}