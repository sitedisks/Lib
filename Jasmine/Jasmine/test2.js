describe('A spec using beforeEach and afterEach!', function () {
    var foo = 0;

    beforeEach(() => {
        foo += 1;
    });

    afterEach(() => {
        foo = 0;
    });


    it('this will not pass', () => {
        expect(foo).toEqual(2);

    });

    it("says hello", function () {
        expect(helloWorld()).toEqual("Hello world!!");
    });

    it('can have more than one expectation', () => {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});

describe("A spy", function () {
    var foo, bar = null;

    beforeEach(function () {
        foo = { setBar: function (value) { bar = value; } };
        spyOn(foo, 'setBar');   //关键，设定要监听的对象的方法
        foo.setBar(123);
        foo.setBar(456, 'another param');
    });

    it("tracks that the spy was called", function () {
        expect(foo.setBar).toHaveBeenCalled();
    });

    it("tracks that the spy was called x times", function () {
        expect(foo.setBar).toHaveBeenCalledTimes(2);
    });

    it("tracks all the arguments of its calls", function () {
        expect(foo.setBar).toHaveBeenCalledWith(123);
        expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
    });

    it("stops all execution on a function", function () {
        expect(bar).toBeNull();
    });
});