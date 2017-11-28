const expect = require('expect');
const qs = require('../lib');
const add = require('../lib/add');
const omit = require('../lib/omit');
const pick = require('../lib/pick');

const queryString = {
  parse: qs.default.parse,
  stringify: qs.default.stringify,
  add: add.default,
  omit: omit.default,
  pick: pick.default,
};

describe('query-string', () => {
  let str;
  let par;
  let add;
  let strAfterAdd;
  let omit;
  let strAfterOmit;
  let pick;
  let strAfterPick;

  before(function () {
    str = '?code=1213&h=hhhh';
    par = { code: 1213, h: 'hhhh' };
    add = { k: 'kkk' };
    strAfterAdd = 'code=1213&h=hhhh&k=kkk';
    omit = ['h'];
    strAfterOmit = 'code=1213';
    pick = ['h'];
    strAfterPick = 'h=hhhh';
  });

  it('parse:url', () => {
    expect(queryString.parse('http://example.com?x=1&y=2#z=c')).toEqual({ x: 1, y: 2});
  });
  
  it('parse:number', () => {
    expect(queryString.parse(str)).toEqual(par);
  });

  it('parse:bool:true', () => {
    expect(queryString.parse('?active=true&j=k')).toEqual({ active: true, j: 'k' });
  })

  it('parse:bool:false', () => {
    expect(queryString.parse('?active=false&j=k')).toEqual({ active: false, j: 'k' });
  })
  
  it('parse:string', () => {
    expect(queryString.parse('?active=ok&j=k')).toEqual({ active: 'ok', j: 'k' });
  })

  it('parse:array', () => {
    expect(queryString.parse('?sort=title&sort=createdAt&sort=-updatedAt')).toEqual({ sort: ['title', 'createdAt', '-updatedAt'] });
  });

  it('stringify', () => {
    expect(queryString.stringify(par)).toEqual(str.slice(1));
  });

  it('stringify:array', () => {
    expect(queryString.stringify({
      title: 'stringify-title',
      sort: ['createdAt', 'updatedAt']
    })).toEqual('title=stringify-title&sort=createdAt&sort=updatedAt');
  });

  it('add', () => {
    expect(queryString.add(str, add)).toEqual(strAfterAdd);
  })
  
  it('omit', () => {
    expect(queryString.omit(str, omit)).toEqual(strAfterOmit);
  })

  it('pick', () => {
    expect(queryString.pick(str, pick)).toEqual(strAfterPick);
  })
});
