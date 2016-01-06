
/*
    Test encoding
 */
Tinytest.add('encoding base scalar types', function (test) {

    test.equal(HttpQueryString.stringify({a:2}), "a=2");
    test.equal(HttpQueryString.stringify(null, "isNull"), "isNull");
    test.equal(HttpQueryString.stringify(function () {}, "isFunction"), "isFunction");

});

Tinytest.add('encoding complex types', function (test) {

    var obj = {
        isNull: null,
        isUndefined: undefined,
        isFunction: function () {},
        isFalse: false,
        isTrue: true,
        isString: "ééé",
        foo: [
            1,
            2
        ]
    };

    obj.foo.push(3);

    obj.foo.push({
        another: true,
        thing: null,
    });


    test.equal(HttpQueryString.stringify(obj), "isNull&isFalse&isTrue=1&isString=%C3%A9%C3%A9%C3%A9&foo%5B0%5D=1&foo%5B1%5D=2&foo%5B2%5D=3&foo%5B3%5D%5Banother%5D=1&foo%5B3%5D%5Bthing%5D");

});



Tinytest.add('parse base scalar types', function (test) {

    test.equal(HttpQueryString.parse('a=2').a, "2");

});


Tinytest.add('parse complex types', function (test) {

    test.equal(HttpQueryString.parse("a=2&b[]=2&b[foo]=c&b[]=kjldjksl").b[0], "2");
    test.equal(HttpQueryString.parse("a=2&b[]=2&b[foo]=c&b[]=kjldjksl").b.foo, "c");
    test.equal(HttpQueryString.parse("a=2&b[]=2&b[foo]=c&b[]=kjldjksl").b[1], "kjldjksl");

});
