
Tinytest.add('Test encoding', function (test) {

    test.equal(HttpQueryString.stringify({a:2}), "a=2");

});


Tinytest.add('Test parsing', function (test) {

    test.equal(HttpQueryString.parse('a=2').a, "2");

});
