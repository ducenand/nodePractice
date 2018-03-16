// const assert = require('assert');
const {should,expect,assert} = require('chai');
const {add,mul} = require('../src/math');

//最原始的测试方法
// if(add(2,3)===5){
//     console.log('0k');
// }else{
//     console.log('error');
// }

//node assert测试
// assert.equal(add(2,3),5,'错误');

should();

// add(2,3).should.equal(5);
expect(add(2,3)).to.equal(5);

// assert.equal(add(2,3),5);
