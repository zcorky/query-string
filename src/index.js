export function parse(query = '') {
  const index = query.indexOf('?');
  const realQuery = index === -1 ? query.split('#')[0] : query.slice(index + 1).split('#')[0];

  return realQuery
    .split('&')
    .reduce((a, b) => {
        const [key, value] = b.split('=');
        const decodedValue = decodeURIComponent(value || '');
        const parsedValue = parseInt(decodedValue, 10);
        if (!isNaN(parsedValue)) {
          return {
            ...a,
            [key]: a[key] === undefined ? parsedValue: !Array.isArray(a[key]) ? [a[key], parsedValue] : [...a[key], parsedValue],
          };
        } else if (['false', 'true'].includes(decodedValue)) {
          const v = decodedValue === 'true' ? true : false;
          return {
            ...a,
            [key]: a[key] === undefined ? v : !Array.isArray(a[key]) ? [a[key], v] : [...a[key], v],
          };
        } else {
          return {
            ...a,
            [key]: a[key] === undefined ? decodedValue : !Array.isArray(a[key]) ? [a[key], decodedValue] : [...a[key], decodedValue],
          };
        }
      },
      {},
    );
}

export function stringify(query = {}) {
  return Object
    .entries(query)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        let i = '';
        return value.map(e => `${key}=${encodeURIComponent(e || '')}`).join('&');
      }
      return `${key}=${encodeURIComponent(value || '')}`;
    })
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
