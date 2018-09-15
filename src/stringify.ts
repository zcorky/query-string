export interface Stringify {
  (params: Params): string
}

export interface Params {
  [key: string]: Value<string> | Value<number> | Value<boolean>
}

export type Value<T> = T | T[]

export const stringify: Stringify = (params = {}) => {
  return Object
    .keys(params)
    .map(key => {
      const value = params[key];

      if (Array.isArray(value)) {
        return (value as string[])
          // @TODO ts error
          .map(e => `${key}=${encodeURIComponent(e == null ? '' : e as any as string)}`) // tslint:disable-line
          .join('&');
      }

      return `${key}=${encodeURIComponent((value == null ? '' : value as any as string))}`; // tslint:disable-line
    })
    .join('&');
};
