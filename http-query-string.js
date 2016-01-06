/**
 * @see https://en.wikipedia.org/wiki/Percent-encoding#The_application.2Fx-www-form-urlencoded_type
 * @author evaisse@gmail.com
 *
 * HttpQueryString.parse("a=2&b[]=2&b[foo]=c&b[]=kjldjksl")
 * HttpQueryString.stringify({"a":2,"b":[2,"kjldjksl"]})
 */

/**
 * Stringify a javascript object to his query string representation
 *    {"a":2,"b":[2,"kjldjksl"]} => "a=2&b[]=2&b[foo]=c&b[]=kjldjksl"
 *
 * @param  {Object} obj     JS plain Object
 * @return {String} http querystring string representation of input object
 */
HttpQueryString.stringify = function (obj) {
    var str = [],
        prefix = arguments[1];

    Object.keys(obj).forEach(function (p) {
        var k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
        if (typeof v == "object") {
            str.push(HttpQueryString.stringify(v, k));
        } else if (v === null || v === undefined || )
    });

    return str.join("&");
};

/**
 * Stringify a javascript object to his query string representation
 *
 *    "a=2&b[]=2&b[foo]=c&b[]=kjldjksl" => {"a":2,"b":[2,"kjldjksl"]}
 *
 * @param  {String} querystring query string object to parse
 * @return {Object} obj     JS plain Object
 */
HttpQueryString.parse = function (querystring, coerce) {
    var obj = {},
        types = {
            'true': true,
            'false': false,
            'null': null
        };

    // Iterate over all name=value pairs.
    querystring.replace(/\+/g, ' ').split('&').forEach(function (v, j) {
        var param = v.split('='),
            key = decodeURIComponent(param[0]),
            val,
            cur = obj,
            i = 0,

            // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
            // into its component parts.
            keys = key.split(']['),
            keys_last = keys.length - 1;

        // If the first keys part contains [ and the last ends with ], then []
        // are correctly balanced.
        if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
            // Remove the trailing ] from the last keys part.
            keys[keys_last] = keys[keys_last].replace(/\]$/, '');

            // Split first keys part into two parts on the [ and add them back onto
            // the beginning of the keys array.
            keys = keys.shift().split('[').concat(keys);

            keys_last = keys.length - 1;
        } else {
            // Basic 'foo' style key.
            keys_last = 0;
        }

        // Are we dealing with a name=value pair, or just a name?
        if (param.length === 2) {
            val = decodeURIComponent(param[1]);

            // Coerce values.
            if (coerce) {
                val = val && !isNaN(val) ? +val // number
                    : val === 'undefined' ? undefined // undefined
                    : types[val] !== undefined ? types[val] // true, false, null
                    : val; // string
            }

            if (keys_last) {
                // Complex key, build deep object structure based on a few rules:
                // * The 'cur' pointer starts at the object top-level.
                // * [] = array push (n is set to array length), [n] = array if n is
                //   numeric, otherwise object.
                // * If at the last keys part, set the value.
                // * For each keys part, if the current level is undefined create an
                //   object or array based on the type of the next keys part.
                // * Move the 'cur' pointer to the next level.
                // * Rinse & repeat.
                for (; i <= keys_last; i++) {
                    key = keys[i] === '' ? cur.length : keys[i];
                    cur = cur[key] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
                }

            } else {
                // Simple key, even simpler rules, since only scalars and shallow
                // arrays are allowed.

                if (Array.isArray(obj[key])) {
                    // val is already an array, so push on the next value.
                    obj[key].push(val);

                } else if (obj[key] !== undefined) {
                    // val isn't an array, but since a second value has been specified,
                    // convert val into an array.
                    obj[key] = [obj[key], val];

                } else {
                    // val is a scalar.
                    obj[key] = val;
                }
            }

        } else if (key) {
            // No value was defined, so set something meaningful.
            obj[key] = null;
        }
    });

    return obj;
};
