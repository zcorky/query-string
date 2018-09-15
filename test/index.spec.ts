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

  before(function () {
    str = '?code=1213&h=hhhh';
    par = { code: '1213', h: 'hhhh' };
    add = { k: 'kkk' };
    strAfterAdd = 'code=1213&h=hhhh&k=kkk';
  });

  it('parse:empty', () => {
    expect(queryString.parse('')).to.deep.equal({});
  });

  it('parse:url', () => {
    expect(queryString.parse('http://example.com?x=1&y=2#z=c')).to.deep.equal({ x: '1', y: '2' });
  });

  it('parse:search', () => {
    expect(queryString.parse('?active=ok&j=k')).to.deep.equal({ active: 'ok', j: 'k' });
  })

  it('parse:query', () => {
    expect(queryString.parse('active=ok&j=k')).to.deep.equal({ active: 'ok', j: 'k' });
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

  it('stringify:undefined', () => {
    expect(queryString.stringify({
      title: (undefined as any),
    })).to.be.equal('title=');
  });

  it('stringify:null', () => {
    expect(queryString.stringify({
      title: (null as any),
    })).to.be.equal('title=');
  });

  it('stringify:number', () => {
    expect(queryString.stringify({
      title: 1,
    })).to.be.equal('title=1');
  });

  it('stringify:boolean', () => {
    expect(queryString.stringify({
      title: false,
    })).to.be.equal('title=false');
  });

  it('stringify:array', () => {
    expect(queryString.stringify({
      title: 'stringify-title',
      sort: ['createdAt', 'updatedAt'],
      score: 10,
      expire: false,
      other: (null as any),
    })).to.be.equal('title=stringify-title&sort=createdAt&sort=updatedAt&score=10&expire=false&other=');
  });

  it('stringify:encode', () => {
    expect(queryString.stringify({
      title: '你好',
      age: ['10岁', '20岁'],
      score: 10,
      expire: false,
    })).to.be.equal('title=%E4%BD%A0%E5%A5%BD&age=10%E5%B2%81&age=20%E5%B2%81&score=10&expire=false');

    expect(queryString.stringify({
      title: '你好',
      age: ['10岁', '20岁'],
      score: 10,
      expire: false,
    })).to.be.not.equal('title=你好&age=10岁&age=20岁&score=10&expire=false');
  });

  it('add', () => {
    expect(queryString.add(str, add)).to.be.equal(strAfterAdd);
  })

  it('omit', () => {
    expect(queryString.omit('?code=1213&h=hhhh', ['h'])).to.be.equal('code=1213');
  });

  it('omit:empty', () => {
    expect(queryString.omit('?code=1213&h=hhhh', [])).to.be.equal('code=1213&h=hhhh');
  });

  it('pick', () => {
    expect(queryString.pick('?code=1213&h=hhhh', ['h'])).to.be.equal('h=hhhh');
  });

  it('pick:empty', () => {
    expect(queryString.pick('?code=1213&h=hhhh', [])).to.be.equal('');
  })
});
