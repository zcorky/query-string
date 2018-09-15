# query-string

[![NPM version](https://img.shields.io/npm/v/@zcorky/query-string.svg?style=flat)](https://www.npmjs.com/package/@zcorky/query-string)
[![Coverage Status](https://img.shields.io/coveralls/zcorky/query-string.svg?style=flat)](https://coveralls.io/r/zcorky/query-string)
[![Dependencies](https://david-dm.org/@zcorky/query-string/status.svg)](https://david-dm.org/@zcorky/query-string)
[![Build Status](https://travis-ci.com/zcorky/query-string.svg?branch=master)](https://travis-ci.com/zcorky/query-string)
![license](https://img.shields.io/github/license/zcorky/query-string.svg)
[![issues](https://img.shields.io/github/issues/zcorky/query-string.svg)](https://github.com/zcorky/query-string/issues)

> Easy query string in node and browser, without any dependencies, support parse/stringify/add/omit/pick.

### Install

```
$ npm install @zcorky/query-string
```

### Usage

```javascript
// import
import { stringify, parse } from '@zcorky/query-string';
import { add } from '@zcorky/query-string/lib/add';
import { omit } from '@zcorky/query-string/lib/omit';
import { pick } from '@zcorky/query-string/lib/pick';

// 1 parse: support number/bool/string
parse('?token=Uakgb_J5m9g~0JDMbcJqLJ&active=true&offset=10&limit=100');
// => { token: 'Uakgb_J5m9g~0JDMbcJqLJ', active: 'true', offset: '10', limit: '100' }

// 2 stringify
stringify({ active: true, offset: 10 });
// => 'active=true&offset=10'

// 3 add
add('?token=Uakgb_J5m9g~0JDMbcJqLJ', { lang: 'en' });
// => 'token=Uakgb_J5m9g~0JDMbcJqLJ&lang=en'

// 4 omit
omit('?token=Uakgb_J5m9g~0JDMbcJqLJ&offset=10', ['token']);
// => 'offset=10'

// 5 pick
pick('?token=Uakgb_J5m9g~0JDMbcJqLJ&offset=10', ['token']);
// => 'token=Uakgb_J5m9g~0JDMbcJqLJ'
```

### Relatived
* node querystring
* [query-string](https://www.npmjs.com/package/query-string)
