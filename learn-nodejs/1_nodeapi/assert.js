const assert = require('assert');

(function test() {
    function handleAssertExpression(func, ...argus) {
        try {
            func(...argus);
        } catch (e) {
            console.log(
            `func: ${func.name}\n${e}`);
        }
    }

    handleAssertExpression(() => {
        throw new assert.AssertionError({
            message: 'errmsg',
        });
    });

    /**
     * assert.AssertionError类
     */
    const { message } = new assert.AssertionError({
        actual: 1,
        expected: 2,
        operator: 'strictEqual',
    });
    try {
        assert.strictEqual(1, 2);
    } catch (err) {
        assert(err instanceof assert.AssertionError);
        assert.strictEqual(err.message, message);
        assert.strictEqual(err.name, 'AssertionError [ERR_ASSERTION]');
        assert.strictEqual(err.actual, 1);
        assert.strictEqual(err.expected, 2);
        assert.strictEqual(err.code, 'ERR_ASSERTION');
        assert.strictEqual(err.operator, 'strictEqual');
        assert.strictEqual(err.generatedMessage, true);
    }

    /**
     * assert
     */
    handleAssertExpression(assert, 1 == 2);


    /**
     * assert.deepStrictEqual
     * 深度相等：子对象的可枚举自身属性也通过以下规则进行递归计算
     *  */
    handleAssertExpression(assert.deepStrictEqual, { a: 1 }, { a: 2 });

    const date = new Date();
    const object = {};
    const fakeDate = {};
    Object.setPrototypeOf(fakeDate, Date.prototype);
    
    assert(date.__proto__ === Date.prototype);
    assert(Date.prototype.__proto__ === Object.prototype);
    assert(fakeDate.__proto__ === Date.prototype);
    assert(typeof date === 'object');
    assert(typeof fakeDate === 'object');

    handleAssertExpression(assert.deepStrictEqual, date, fakeDate);

    //原型不同
    handleAssertExpression(assert.deepStrictEqual, object, fakeDate);

    //类型标签不同,类型标签怎么获取？
    handleAssertExpression(assert.deepStrictEqual, date, fakeDate);

    //SameValue比较
    handleAssertExpression(assert.deepStrictEqual, NaN, NaN);

    //解封装后的数字不同
    handleAssertExpression(assert.deepStrictEqual, new Number(1), new Number(2));

    //通过
    handleAssertExpression(assert.deepStrictEqual, new String('foo'), new String('foo'));

    //使用SameValue 比较的零不同
    handleAssertExpression(assert.deepStrictEqual, 0, -0);

    const s1 = Symbol();
    const s2 = Symbol();
    //通过
    handleAssertExpression(assert.deepStrictEqual, { [s1]: 1 }, { [s1]: 1 });

    //symbol不同
    handleAssertExpression(assert.deepStrictEqual, { [s1]: 1 }, { [s2]: 1 });

    
    const obj1 = {
        a: {
            b: 1,
        }
    };
    const obj2 = Object.create(obj1);
     
    assert(obj2.__proto__ === obj1);
    assert(obj1.__proto__ === Object.prototype);
})();