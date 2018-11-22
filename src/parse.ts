export interface ParsedValue {
  [key: string]: string | string[]
}

export const parse = <T extends ParsedValue>(query = ''): T & ParsedValue => {
  const index = (query).indexOf('?');
  const realQuery = index === -1 ? query.split('#')[0] : query.slice(index + 1).split('#')[0];

  return realQuery
    .split('&')
    .filter(e => !!e) // remove ''
    .reduce((total, item) => {
        const [key, ...vs] = item.split('=');
        const value = decodeURIComponent(vs.join('='));

        if (!total[key]) {
          total[key] = value;
        } else if (Array.isArray(total[key])) {
          total[key].push(value);
        } else {
          total[key] = [total[key], value];
        }

        return total;
      },
      {},
    ) as T & ParsedValue;
};
