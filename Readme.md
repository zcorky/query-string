# query-string

> Easy query string in node and browser, without any dependencies, support parse/stringify/add/omit/pick.

### Install

```
$ npm install easy-query-string
```

### Usage

```javascript
// import
import { stringify, parse, add, omit, pick } from 'easy-query-string';

// 1 parse: support number/bool/string
parse('?token=Uakgb_J5m9g~0JDMbcJqLJ&active=true&offset=10&limit=100');
// => { token: 'Uakgb_J5m9g~0JDMbcJqLJ', active: true, offset: 10, limit: 100 }

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

### If More
* Recommend: [query-string](https://www.npmjs.com/package/query-string)
