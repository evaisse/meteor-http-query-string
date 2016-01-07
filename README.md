

HttpQueryString
====

[![testing](https://travis-ci.org/evaisse/meteor-http-query-string.svg?branch=master)](https://travis-ci.org/evaisse/meteor-http-query-string)


    meteor add evaisse:http-query-string

Isomorphic query string parser/builder
---


    HttpQueryString.parse("a=2&b[]=2&b[foo]=c&b[]=kjldjksl") => {"a":"2","b":["2","kjldjksl"]}
    HttpQueryString.stringify({"a":"2","b":["2","kjldjksl"]}) => "a=2&b[]=2&b[foo]=c&b[]=kjldjksl"
