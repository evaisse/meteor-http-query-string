# HttpQueryString


Isomorphic query string parser & query-builder. Despite being a meteor package, 
their is no dependency to any meteor package so you could use this package in any vanilla js project.


[![testing](https://travis-ci.org/evaisse/meteor-http-query-string.svg?branch=master)](https://travis-ci.org/evaisse/meteor-http-query-string)


# Install

    meteor add evaisse:http-query-string


# Quickstart


    HttpQueryString.parse("a=2&b[]=2&b[foo]=c&b[]=kjldjksl") => {"a":"2","b":["2","kjldjksl"]}
    HttpQueryString.stringify({"a":"2","b":["2","kjldjksl"]}) => "a=2&b[]=2&b[foo]=c&b[]=kjldjksl"
