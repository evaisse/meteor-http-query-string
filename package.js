Package.describe({
    name: 'evaisse:http-query-string',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Meteor isomorphic RFC 3986 compliant url encoded query serializer/deserializer',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/evaisse/meteor-http-query-string.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.4.1');
    api.use('ecmascript');
    api.export('HttpQueryString');
    api.addFiles('http-query-string.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('evaisse:http-query-string');
    api.addFiles('http-query-string-tests.js');
});
