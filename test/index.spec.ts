import { expect } from 'chai';

import * as qs from '../src';
import { add } from '../src/add';
import { omit } from '../src/omit';
import { pick } from '../src/pick';

const queryString = {
  parse: qs.parse,
  stringify: qs.stringify,
  add,
  omit,
  pick,
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
    par = { code: '1213', h: 'hhhh' };
    add = { k: 'kkk' };
    strAfterAdd = 'code=1213&h=hhhh&k=kkk';
    omit = ['h'];
    strAfterOmit = 'code=1213';
    pick = ['h'];
    strAfterPick = 'h=hhhh';
  });

  it('parse:url', () => {
    expect(queryString.parse('http://example.com?x=1&y=2#z=c')).to.deep.equal({ x: '1', y: '2' });
  });
  
  it('parse:string', () => {
    expect(queryString.parse('?active=ok&j=k')).to.deep.equal({ active: 'ok', j: 'k' });
  })

  it('parse:array', () => {
    expect(queryString.parse('?sort=title&sort=createdAt&sort=-updatedAt')).to.deep.equal({ sort: ['title', 'createdAt', '-updatedAt'] });
  });

  it('parse:chinese', () => {
    expect(queryString.parse('?type=中文')).to.deep.equal({ type: '中文'  });
  });

  it('parse:value_is_url', () => {
    expect(queryString.parse('http://localhost:8000/?api=https://127.0.0.1/asdas?x=%E5%93%88%E5%93%88%E5%93%88%E5%93%88&b=true&c=fff#f')).to.deep.equal({
      api: 'https://127.0.0.1/asdas?x=哈哈哈哈',
      b: 'true',
      c: 'fff',
    });
  });

  it('stringify', () => {
    expect(queryString.stringify(par)).to.be.equal(str.slice(1));
  });

  it('stringify:array', () => {
    expect(queryString.stringify({
      title: 'stringify-title',
      sort: ['createdAt', 'updatedAt']
    })).to.be.equal('title=stringify-title&sort=createdAt&sort=updatedAt');
  });

  it('add', () => {
    expect(queryString.add(str, add)).to.be.equal(strAfterAdd);
  })
  
  it('omit', () => {
    expect(queryString.omit(str, omit)).to.be.equal(strAfterOmit);
  });

  it('pick', () => {
    expect(queryString.pick(str, pick)).to.be.equal(strAfterPick);
  })
});
