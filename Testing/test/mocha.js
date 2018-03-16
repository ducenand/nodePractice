const {should, expect, assert} = require('chai');
const {add, mul ,cover} = require('../src/math');


describe('#math', () => {
    describe('add', () => {
        it('should return 5 when 2 + 3',()=>{
            expect(add(2,3),5);
        });
        // it.only 只执行这一个
        // it.skip 跳过这个执行
        it('should return -1 when 2 + -3',()=>{
            expect(add(2,-3),-1);
        });
    });
    describe('mul', () => {
        it('should return 6 when 2 * 3',()=>{
            expect(mul(2,3),6);
        })
    });

    describe('cover',()=>{
        it('should return 1 when cover(2,1)',()=>{
           expect(cover(2,1)).to.equal(1);
        });
        it('should return 1 when cover(1,2)',()=>{
            expect(cover(1,2)).to.equal(1);
        });

        it('should return 12 when cover(2,2)',()=>{
            expect(cover(2,2)).to.equal(12);
        });
    })
});