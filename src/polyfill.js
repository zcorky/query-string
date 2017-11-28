Object.entries = Object.entries || function (object) {
  return Object.keys(object).map(k => [k, object[k]]);
};