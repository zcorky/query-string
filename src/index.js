export function parse(query = '') {
  const index = query.indexOf('?');
  const realQuery = index === -1 ? query : query.slice(index + 1);
  return realQuery
    .split('&')
    .reduce((a, b) => {
        const [key, value] = b.split('=');
        const decodedValue = decodeURIComponent(value || '');
        const parsedValue = parseInt(decodedValue, 10);
        if (!isNaN(parsedValue)) {
          return { ...a, [key]: parsedValue };
        } else if (['false', 'true'].includes(decodedValue)) {
          return { ...a, [key]: decodedValue === 'true' ? true : false };
        } else {
          return { ...a, [key]: decodedValue };
        }
      },
      {}
    );
}

export function stringify(query = {}) {
  return Object
    .entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value || '')}`)
    .join('&');
}

export function add(queryString, query = {}) {
  const oqs = parse(queryString);
  const nqs = Object.assign(oqs, query);
  return stringify(nqs);
}

export function omit(queryString, omits = []) {
  const oqs = parse(queryString);
  const nqs = Object
    .entries(oqs)
    .filter(([key, value]) => omits.indexOf(key) === -1)
    .reduce((a, [key, value]) => ({ ...a, [key]: value }), {});
  return stringify(nqs);
}

export function pick(queryString, omits = []) {
  const oqs = parse(queryString);
  const nqs = Object
    .entries(oqs)
    .filter(([key, value]) => omits.indexOf(key) !== -1)
    .reduce((a, [key, value]) => ({ ...a, [key]: value }), {});
  return stringify(nqs);
}

export default {
  parse,
  stringify,
  add,
  omit,
  pick,
};
