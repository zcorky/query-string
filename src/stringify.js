import './polyfill';

export default function stringify(query = {}) {
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