
/*
    Test encoding
 */
Tinytest.add('encoding base scalar types', function (test) {

    test.equal(HttpQueryString.stringify({a:2}), "a=2");

});



Tinytest.add('parse base scalar types', function (test) {

    test.equal(HttpQueryString.parse('a=2').a, "2");


});


Tinytest.add('parse complex types', function (test) {

});
