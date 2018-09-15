export interface Stringify {
  (params: Params): string
}

export interface Params {
  [key: string]: string | string[]
}

export const stringify: Stringify = (params = {}) => {
  return Object
    .keys(params)
    .map(key => {
      const value = params[key];

      if (Array.isArray(value)) {
        return value.map(e => `${key}=${encodeURIComponent(e || '')}`).join('&');
      }

      return `${key}=${encodeURIComponent(value || '')}`;
    })
    .join('&');
}