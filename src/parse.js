export default function parse(query = '') {
  const index = query.indexOf('?');
  const realQuery = index === -1 ? query.split('#')[0] : query.slice(index + 1).split('#')[0];

  return realQuery
    .split('&')
    .reduce((a, b) => {
        const [key, value] = b.split('=');

        return {
          ...a,
          [key]: [...a[key], value],
        };
        
        /*
        const decodedValue = decodeURIComponent(value || true);
        const parsedValue = parseInt(decodedValue, 10);
        if (!isNaN(parsedValue)) {
          return {
            ...a,
            [key]: a[key] === undefined ? parsedValue: !Array.isArray(a[key]) ? [a[key], parsedValue] : [...a[key], parsedValue],
          };
        } else if (['false', 'true'].indexOf(decodedValue) !== -1) {
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
        */
      },
      {},
    );
}
