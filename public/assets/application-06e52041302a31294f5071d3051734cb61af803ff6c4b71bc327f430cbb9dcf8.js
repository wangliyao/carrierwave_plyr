/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);












/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=t(e,document):"function"==typeof define&&define.amd?define([],function(){return t(e,document)}):e.plyr=t(e,document)}("undefined"!=typeof window?window:this,function(e,t){"use strict";function n(){var e,n,r,a=navigator.userAgent,s=navigator.appName,o=""+parseFloat(navigator.appVersion),i=parseInt(navigator.appVersion,10),l=!1,u=!1,c=!1,d=!1;return navigator.appVersion.indexOf("Windows NT")!==-1&&navigator.appVersion.indexOf("rv:11")!==-1?(l=!0,s="IE",o="11"):(n=a.indexOf("MSIE"))!==-1?(l=!0,s="IE",o=a.substring(n+5)):(n=a.indexOf("Chrome"))!==-1?(c=!0,s="Chrome",o=a.substring(n+7)):(n=a.indexOf("Safari"))!==-1?(d=!0,s="Safari",o=a.substring(n+7),(n=a.indexOf("Version"))!==-1&&(o=a.substring(n+8))):(n=a.indexOf("Firefox"))!==-1?(u=!0,s="Firefox",o=a.substring(n+8)):(e=a.lastIndexOf(" ")+1)<(n=a.lastIndexOf("/"))&&(s=a.substring(e,n),o=a.substring(n+1),s.toLowerCase()===s.toUpperCase()&&(s=navigator.appName)),(r=o.indexOf(";"))!==-1&&(o=o.substring(0,r)),(r=o.indexOf(" "))!==-1&&(o=o.substring(0,r)),i=parseInt(""+o,10),isNaN(i)&&(o=""+parseFloat(navigator.appVersion),i=parseInt(navigator.appVersion,10)),{name:s,version:i,isIE:l,isFirefox:u,isChrome:c,isSafari:d,isIos:/(iPad|iPhone|iPod)/g.test(navigator.platform),isIphone:/(iPhone|iPod)/g.test(navigator.userAgent),isTouch:"ontouchstart"in t.documentElement}}function r(e,t){var n=e.media;if("video"===e.type)switch(t){case"video/webm":return!(!n.canPlayType||!n.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/,""));case"video/mp4":return!(!n.canPlayType||!n.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/,""));case"video/ogg":return!(!n.canPlayType||!n.canPlayType('video/ogg; codecs="theora"').replace(/no/,""))}else if("audio"===e.type)switch(t){case"audio/mpeg":return!(!n.canPlayType||!n.canPlayType("audio/mpeg;").replace(/no/,""));case"audio/ogg":return!(!n.canPlayType||!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/,""));case"audio/wav":return!(!n.canPlayType||!n.canPlayType('audio/wav; codecs="1"').replace(/no/,""))}return!1}function a(e){if(!t.querySelectorAll('script[src="'+e+'"]').length){var n=t.createElement("script");n.src=e;var r=t.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r)}}function s(e,t){return Array.prototype.indexOf&&e.indexOf(t)!==-1}function o(e,t,n){return e.replace(new RegExp(t.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1"),"g"),n)}function i(e,t){e.length||(e=[e]);for(var n=e.length-1;n>=0;n--){var r=n>0?t.cloneNode(!0):t,a=e[n],s=a.parentNode,o=a.nextSibling;return r.appendChild(a),o?s.insertBefore(r,o):s.appendChild(r),r}}function l(e){e&&e.parentNode.removeChild(e)}function u(e,t){e.insertBefore(t,e.firstChild)}function c(e,t){for(var n in t)e.setAttribute(n,O.boolean(t[n])&&t[n]?"":t[n])}function d(e,n,r){var a=t.createElement(e);c(a,r),u(n,a)}function p(e){return e.replace(".","")}function m(e,t,n){if(e)if(e.classList)e.classList[n?"add":"remove"](t);else{var r=(" "+e.className+" ").replace(/\s+/g," ").replace(" "+t+" ","");e.className=r+(n?" "+t:"")}}function f(e,t){return!!e&&(e.classList?e.classList.contains(t):new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className))}function y(e,n){var r=Element.prototype,a=r.matches||r.webkitMatchesSelector||r.mozMatchesSelector||r.msMatchesSelector||function(e){return[].indexOf.call(t.querySelectorAll(e),this)!==-1};return a.call(e,n)}function b(e,t,n,r,a){g(e,t,function(t){n&&n.apply(e,[t]),r.apply(e,[t])},a)}function v(e,t,n,r,a){var s=t.split(" ");if(O.boolean(a)||(a=!1),e instanceof NodeList)for(var o=0;o<e.length;o++)e[o]instanceof Node&&v(e[o],arguments[1],arguments[2],arguments[3]);else for(var i=0;i<s.length;i++)e[r?"addEventListener":"removeEventListener"](s[i],n,a)}function g(e,t,n,r){e&&v(e,t,n,!0,r)}function h(e,t,n,r){if(e&&t){O.boolean(n)||(n=!1);var a=new CustomEvent(t,{bubbles:n,detail:r});e.dispatchEvent(a)}}function k(e,t){if(e)return t=O.boolean(t)?t:!e.getAttribute("aria-pressed"),e.setAttribute("aria-pressed",t),t}function w(e,t){return 0===e||0===t||isNaN(e)||isNaN(t)?0:(e/t*100).toFixed(2)}function x(){var e=arguments;if(e.length){if(1===e.length)return e[0];for(var t=Array.prototype.shift.call(e),n=e.length,r=0;r<n;r++){var a=e[r];for(var s in a)a[s]&&a[s].constructor&&a[s].constructor===Object?(t[s]=t[s]||{},x(t[s],a[s])):t[s]=a[s]}return t}}function T(e){var t=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;return e.match(t)?RegExp.$2:e}function S(e){var t=/^.*(vimeo.com\/|video\/)(\d+).*/;return e.match(t)?RegExp.$2:e}function _(){var e={supportsFullScreen:!1,isFullScreen:function(){return!1},requestFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",element:null,prefix:""},n="webkit o moz ms khtml".split(" ");if(O.undefined(t.cancelFullScreen))for(var r=0,a=n.length;r<a;r++){if(e.prefix=n[r],!O.undefined(t[e.prefix+"CancelFullScreen"])){e.supportsFullScreen=!0;break}if(!O.undefined(t.msExitFullscreen)&&t.msFullscreenEnabled){e.prefix="ms",e.supportsFullScreen=!0;break}}else e.supportsFullScreen=!0;return e.supportsFullScreen&&(e.fullScreenEventName="ms"===e.prefix?"MSFullscreenChange":e.prefix+"fullscreenchange",e.isFullScreen=function(e){switch(O.undefined(e)&&(e=t.body),this.prefix){case"":return t.fullscreenElement===e;case"moz":return t.mozFullScreenElement===e;default:return t[this.prefix+"FullscreenElement"]===e}},e.requestFullScreen=function(e){return O.undefined(e)&&(e=t.body),""===this.prefix?e.requestFullScreen():e[this.prefix+("ms"===this.prefix?"RequestFullscreen":"RequestFullScreen")]()},e.cancelFullScreen=function(){return""===this.prefix?t.cancelFullScreen():t[this.prefix+("ms"===this.prefix?"ExitFullscreen":"CancelFullScreen")]()},e.element=function(){return""===this.prefix?t.fullscreenElement:t[this.prefix+"FullscreenElement"]}),e}function E(v,E){function A(e,t,n,r){h(e,t,n,x({},r,{plyr:Ue}))}function j(t,n){E.debug&&e.console&&(n=Array.prototype.slice.call(n),O.string(E.logPrefix)&&E.logPrefix.length&&n.unshift(E.logPrefix),console[t].apply(console,n))}function V(){return{url:E.iconUrl,absolute:0===E.iconUrl.indexOf("http")||Be.browser.isIE}}function R(){var e=[],t=V(),n=(t.absolute?"":t.url)+"#"+E.iconPrefix;return s(E.controls,"play-large")&&e.push('<button type="button" data-plyr="play" class="plyr__play-large">','<svg><use xlink:href="'+n+'-play" /></svg>','<span class="plyr__sr-only">'+E.i18n.play+"</span>","</button>"),e.push('<div class="plyr__controls">'),s(E.controls,"restart")&&e.push('<button type="button" data-plyr="restart">','<svg><use xlink:href="'+n+'-restart" /></svg>','<span class="plyr__sr-only">'+E.i18n.restart+"</span>","</button>"),s(E.controls,"rewind")&&e.push('<button type="button" data-plyr="rewind">','<svg><use xlink:href="'+n+'-rewind" /></svg>','<span class="plyr__sr-only">'+E.i18n.rewind+"</span>","</button>"),s(E.controls,"play")&&e.push('<button type="button" data-plyr="play">','<svg><use xlink:href="'+n+'-play" /></svg>','<span class="plyr__sr-only">'+E.i18n.play+"</span>","</button>",'<button type="button" data-plyr="pause">','<svg><use xlink:href="'+n+'-pause" /></svg>','<span class="plyr__sr-only">'+E.i18n.pause+"</span>","</button>"),s(E.controls,"fast-forward")&&e.push('<button type="button" data-plyr="fast-forward">','<svg><use xlink:href="'+n+'-fast-forward" /></svg>','<span class="plyr__sr-only">'+E.i18n.forward+"</span>","</button>"),s(E.controls,"progress")&&(e.push('<span class="plyr__progress">','<label for="seek{id}" class="plyr__sr-only">Seek</label>','<input id="seek{id}" class="plyr__progress--seek" type="range" min="0" max="100" step="0.1" value="0" data-plyr="seek">','<progress class="plyr__progress--played" max="100" value="0" role="presentation"></progress>','<progress class="plyr__progress--buffer" max="100" value="0">',"<span>0</span>% "+E.i18n.buffered,"</progress>"),E.tooltips.seek&&e.push('<span class="plyr__tooltip">00:00</span>'),e.push("</span>")),s(E.controls,"current-time")&&e.push('<span class="plyr__time">','<span class="plyr__sr-only">'+E.i18n.currentTime+"</span>",'<span class="plyr__time--current">00:00</span>',"</span>"),s(E.controls,"duration")&&e.push('<span class="plyr__time">','<span class="plyr__sr-only">'+E.i18n.duration+"</span>",'<span class="plyr__time--duration">00:00</span>',"</span>"),s(E.controls,"mute")&&e.push('<button type="button" data-plyr="mute">','<svg class="icon--muted"><use xlink:href="'+n+'-muted" /></svg>','<svg><use xlink:href="'+n+'-volume" /></svg>','<span class="plyr__sr-only">'+E.i18n.toggleMute+"</span>","</button>"),s(E.controls,"volume")&&e.push('<span class="plyr__volume">','<label for="volume{id}" class="plyr__sr-only">'+E.i18n.volume+"</label>",'<input id="volume{id}" class="plyr__volume--input" type="range" min="'+E.volumeMin+'" max="'+E.volumeMax+'" value="'+E.volume+'" data-plyr="volume">','<progress class="plyr__volume--display" max="'+E.volumeMax+'" value="'+E.volumeMin+'" role="presentation"></progress>',"</span>"),s(E.controls,"captions")&&e.push('<button type="button" data-plyr="captions">','<svg class="icon--captions-on"><use xlink:href="'+n+'-captions-on" /></svg>','<svg><use xlink:href="'+n+'-captions-off" /></svg>','<span class="plyr__sr-only">'+E.i18n.toggleCaptions+"</span>","</button>"),s(E.controls,"fullscreen")&&e.push('<button type="button" data-plyr="fullscreen">','<svg class="icon--exit-fullscreen"><use xlink:href="'+n+'-exit-fullscreen" /></svg>','<svg><use xlink:href="'+n+'-enter-fullscreen" /></svg>','<span class="plyr__sr-only">'+E.i18n.toggleFullscreen+"</span>","</button>"),e.push("</div>"),e.join("")}function q(){if(Be.supported.full&&("audio"!==Be.type||E.fullscreen.allowAudio)&&E.fullscreen.enabled){var e=N.supportsFullScreen;e||E.fullscreen.fallback&&!X()?(Je((e?"Native":"Fallback")+" fullscreen enabled"),m(Be.container,E.classes.fullscreen.enabled,!0)):Je("Fullscreen not supported and fallback disabled"),Be.buttons&&Be.buttons.fullscreen&&k(Be.buttons.fullscreen,!1),$()}}function D(){if("video"===Be.type){B(E.selectors.captions)||Be.videoContainer.insertAdjacentHTML("afterbegin",'<div class="'+p(E.selectors.captions)+'"></div>'),Be.usingTextTracks=!1,Be.media.textTracks&&(Be.usingTextTracks=!0);for(var e,t="",n=Be.media.childNodes,r=0;r<n.length;r++)"track"===n[r].nodeName.toLowerCase()&&(e=n[r].kind,"captions"!==e&&"subtitles"!==e||(t=n[r].getAttribute("src")));if(Be.captionExists=!0,""===t?(Be.captionExists=!1,Je("No caption track found")):Je("Caption track found; URI: "+t),Be.captionExists){for(var a=Be.media.textTracks,s=0;s<a.length;s++)a[s].mode="hidden";if(Y(Be),(Be.browser.isIE&&Be.browser.version>=10||Be.browser.isFirefox&&Be.browser.version>=31)&&(Je("Detected browser with known TextTrack issues - using manual fallback"),Be.usingTextTracks=!1),Be.usingTextTracks){Je("TextTracks supported");for(var o=0;o<a.length;o++){var i=a[o];"captions"!==i.kind&&"subtitles"!==i.kind||g(i,"cuechange",function(){this.activeCues[0]&&"text"in this.activeCues[0]?H(this.activeCues[0].getCueAsHTML()):H()})}}else if(Je("TextTracks not supported so rendering captions manually"),Be.currentCaption="",Be.captions=[],""!==t){var l=new XMLHttpRequest;l.onreadystatechange=function(){if(4===l.readyState)if(200===l.status){var e,t=[],n=l.responseText,r="\r\n";n.indexOf(r+r)===-1&&(r=n.indexOf("\r\r")!==-1?"\r":"\n"),t=n.split(r+r);for(var a=0;a<t.length;a++){e=t[a],Be.captions[a]=[];var s=e.split(r),o=0;s[o].indexOf(":")===-1&&(o=1),Be.captions[a]=[s[o],s[o+1]]}Be.captions.shift(),Je("Successfully loaded the caption file via AJAX")}else ze(E.logPrefix+"There was a problem loading the caption file via AJAX")},l.open("get",t,!0),l.send()}}else m(Be.container,E.classes.captions.enabled)}}function H(e){var n=B(E.selectors.captions),r=t.createElement("span");n.innerHTML="",O.undefined(e)&&(e=""),O.string(e)?r.innerHTML=e.trim():r.appendChild(e),n.appendChild(r);n.offsetHeight}function W(e){function t(e,t){var n=[];n=e.split(" --> ");for(var r=0;r<n.length;r++)n[r]=n[r].replace(/(\d+:\d+:\d+\.\d+).*/,"$1");return a(n[t])}function n(e){return t(e,0)}function r(e){return t(e,1)}function a(e){if(null===e||void 0===e)return 0;var t,n=[],r=[];return n=e.split(","),r=n[0].split(":"),t=Math.floor(60*r[0]*60)+Math.floor(60*r[1])+Math.floor(r[2])}if(!Be.usingTextTracks&&"video"===Be.type&&Be.supported.full&&(Be.subcount=0,e=O.number(e)?e:Be.media.currentTime,Be.captions[Be.subcount])){for(;r(Be.captions[Be.subcount][0])<e.toFixed(1);)if(Be.subcount++,Be.subcount>Be.captions.length-1){Be.subcount=Be.captions.length-1;break}Be.media.currentTime.toFixed(1)>=n(Be.captions[Be.subcount][0])&&Be.media.currentTime.toFixed(1)<=r(Be.captions[Be.subcount][0])?(Be.currentCaption=Be.captions[Be.subcount][1],H(Be.currentCaption)):H()}}function Y(){if(Be.buttons.captions){m(Be.container,E.classes.captions.enabled,!0);var e=Be.storage.captionsEnabled;O.boolean(e)||(e=E.captions.defaultActive),e&&(m(Be.container,E.classes.captions.active,!0),k(Be.buttons.captions,!0))}}function U(e){return Be.container.querySelectorAll(e)}function B(e){return U(e)[0]}function X(){try{return e.self!==e.top}catch(e){return!0}}function $(){function e(e){9===e.which&&Be.isFullscreen&&(e.target!==r||e.shiftKey?e.target===n&&e.shiftKey&&(e.preventDefault(),r.focus()):(e.preventDefault(),n.focus()))}var t=U("input:not([disabled]), button:not([disabled])"),n=t[0],r=t[t.length-1];g(Be.container,"keydown",e)}function J(e,t){if(O.string(t))d(e,Be.media,{src:t});else if(t.constructor===Array)for(var n=t.length-1;n>=0;n--)d(e,Be.media,t[n])}function z(){if(E.loadSprite){var e=V();e.absolute?(Je("AJAX loading absolute SVG sprite"+(Be.browser.isIE?" (due to IE)":"")),C(e.url,"sprite-plyr")):Je("Sprite will be used as external resource directly")}var n=E.html;Je("Injecting custom controls"),n||(n=R()),n=o(n,"{seektime}",E.seekTime),n=o(n,"{id}",Math.floor(1e4*Math.random()));var r;if(O.string(E.selectors.controls.container)&&(r=t.querySelector(E.selectors.controls.container)),O.htmlElement(r)||(r=Be.container),r.insertAdjacentHTML("beforeend",n),E.tooltips.controls)for(var a=U([E.selectors.controls.wrapper," ",E.selectors.labels," .",E.classes.hidden].join("")),s=a.length-1;s>=0;s--){var i=a[s];m(i,E.classes.hidden,!1),m(i,E.classes.tooltip,!0)}}function G(){try{return Be.controls=B(E.selectors.controls.wrapper),Be.buttons={},Be.buttons.seek=B(E.selectors.buttons.seek),Be.buttons.play=U(E.selectors.buttons.play),Be.buttons.pause=B(E.selectors.buttons.pause),Be.buttons.restart=B(E.selectors.buttons.restart),Be.buttons.rewind=B(E.selectors.buttons.rewind),Be.buttons.forward=B(E.selectors.buttons.forward),Be.buttons.fullscreen=B(E.selectors.buttons.fullscreen),Be.buttons.mute=B(E.selectors.buttons.mute),Be.buttons.captions=B(E.selectors.buttons.captions),Be.progress={},Be.progress.container=B(E.selectors.progress.container),Be.progress.buffer={},Be.progress.buffer.bar=B(E.selectors.progress.buffer),Be.progress.buffer.text=Be.progress.buffer.bar&&Be.progress.buffer.bar.getElementsByTagName("span")[0],Be.progress.played=B(E.selectors.progress.played),Be.progress.tooltip=Be.progress.container&&Be.progress.container.querySelector("."+E.classes.tooltip),Be.volume={},Be.volume.input=B(E.selectors.volume.input),Be.volume.display=B(E.selectors.volume.display),Be.duration=B(E.selectors.duration),Be.currentTime=B(E.selectors.currentTime),Be.seekTime=U(E.selectors.seekTime),!0}catch(e){return ze("It looks like there is a problem with your controls HTML"),Q(!0),!1}}function K(){m(Be.container,E.selectors.container.replace(".",""),Be.supported.full)}function Q(e){e&&s(E.types.html5,Be.type)?Be.media.setAttribute("controls",""):Be.media.removeAttribute("controls")}function Z(e){var t=E.i18n.play;if(O.string(E.title)&&E.title.length&&(t+=", "+E.title,Be.container.setAttribute("aria-label",E.title)),Be.supported.full&&Be.buttons.play)for(var n=Be.buttons.play.length-1;n>=0;n--)Be.buttons.play[n].setAttribute("aria-label",t);O.htmlElement(e)&&e.setAttribute("title",E.i18n.frameTitle.replace("{title}",E.title))}function ee(){var t=null;Be.storage={},L.supported&&E.storage.enabled&&(e.localStorage.removeItem("plyr-volume"),t=e.localStorage.getItem(E.storage.key),t&&(/^\d+(\.\d+)?$/.test(t)?te({volume:parseFloat(t)}):Be.storage=JSON.parse(t)))}function te(t){L.supported&&E.storage.enabled&&(x(Be.storage,t),e.localStorage.setItem(E.storage.key,JSON.stringify(Be.storage)))}function ne(){if(!Be.media)return void ze("No media element found!");if(Be.supported.full&&(m(Be.container,E.classes.type.replace("{0}",Be.type),!0),s(E.types.embed,Be.type)&&m(Be.container,E.classes.type.replace("{0}","video"),!0),m(Be.container,E.classes.stopped,E.autoplay),m(Be.container,E.classes.isIos,Be.browser.isIos),m(Be.container,E.classes.isTouch,Be.browser.isTouch),"video"===Be.type)){var e=t.createElement("div");e.setAttribute("class",E.classes.videoWrapper),i(Be.media,e),Be.videoContainer=e}s(E.types.embed,Be.type)&&re()}function re(){var n,r=t.createElement("div"),s=Be.type+"-"+Math.floor(1e4*Math.random());switch(Be.type){case"youtube":n=T(Be.embedId);break;case"vimeo":n=S(Be.embedId);break;default:n=Be.embedId}for(var o=U('[id^="'+Be.type+'-"]'),i=o.length-1;i>=0;i--)l(o[i]);if(m(Be.media,E.classes.videoWrapper,!0),m(Be.media,E.classes.embedWrapper,!0),"youtube"===Be.type)Be.media.appendChild(r),r.setAttribute("id",s),O.object(e.YT)?se(n,r):(a(E.urls.youtube.api),e.onYouTubeReadyCallbacks=e.onYouTubeReadyCallbacks||[],e.onYouTubeReadyCallbacks.push(function(){se(n,r)}),e.onYouTubeIframeAPIReady=function(){e.onYouTubeReadyCallbacks.forEach(function(e){e()})});else if("vimeo"===Be.type)if(Be.supported.full?Be.media.appendChild(r):r=Be.media,r.setAttribute("id",s),O.object(e.Vimeo))oe(n,r);else{a(E.urls.vimeo.api);var u=e.setInterval(function(){O.object(e.Vimeo)&&(e.clearInterval(u),oe(n,r))},50)}else if("soundcloud"===Be.type){var d=t.createElement("iframe");d.loaded=!1,g(d,"load",function(){d.loaded=!0}),c(d,{src:"https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/"+n,id:s}),r.appendChild(d),Be.media.appendChild(r),e.SC||a(E.urls.soundcloud.api);var p=e.setInterval(function(){e.SC&&d.loaded&&(e.clearInterval(p),ie.call(d))},50)}}function ae(){Be.supported.full&&(We(),Ye()),Z(B("iframe"))}function se(t,n){Be.embed=new e.YT.Player(n.id,{videoId:t,playerVars:{autoplay:E.autoplay?1:0,controls:Be.supported.full?0:1,rel:0,showinfo:0,iv_load_policy:3,cc_load_policy:E.captions.defaultActive?1:0,cc_lang_pref:"en",wmode:"transparent",modestbranding:1,disablekb:1,origin:"*"},events:{onError:function(e){A(Be.container,"error",!0,{code:e.data,embed:e.target})},onReady:function(t){var n=t.target;Be.media.play=function(){n.playVideo(),Be.media.paused=!1},Be.media.pause=function(){n.pauseVideo(),Be.media.paused=!0},Be.media.stop=function(){n.stopVideo(),Be.media.paused=!0},Be.media.duration=n.getDuration(),Be.media.paused=!0,Be.media.currentTime=0,Be.media.muted=n.isMuted(),E.title=n.getVideoData().title,Be.supported.full&&Be.media.querySelector("iframe").setAttribute("tabindex","-1"),ae(),A(Be.media,"timeupdate"),A(Be.media,"durationchange"),e.clearInterval(Xe.buffering),Xe.buffering=e.setInterval(function(){Be.media.buffered=n.getVideoLoadedFraction(),(null===Be.media.lastBuffered||Be.media.lastBuffered<Be.media.buffered)&&A(Be.media,"progress"),Be.media.lastBuffered=Be.media.buffered,1===Be.media.buffered&&(e.clearInterval(Xe.buffering),A(Be.media,"canplaythrough"))},200)},onStateChange:function(t){var n=t.target;switch(e.clearInterval(Xe.playing),t.data){case 0:Be.media.paused=!0,A(Be.media,"ended");break;case 1:Be.media.paused=!1,Be.media.seeking&&A(Be.media,"seeked"),Be.media.seeking=!1,A(Be.media,"play"),A(Be.media,"playing"),Xe.playing=e.setInterval(function(){Be.media.currentTime=n.getCurrentTime(),A(Be.media,"timeupdate")},100),Be.media.duration!==n.getDuration()&&(Be.media.duration=n.getDuration(),A(Be.media,"durationchange"));break;case 2:Be.media.paused=!0,A(Be.media,"pause")}A(Be.container,"statechange",!1,{code:t.data})}}})}function oe(t,n){Be.embed=new e.Vimeo.Player(n,{id:parseInt(t),loop:E.loop,autoplay:E.autoplay,byline:!1,portrait:!1,title:!1}),Be.media.play=function(){Be.embed.play(),Be.media.paused=!1},Be.media.pause=function(){Be.embed.pause(),Be.media.paused=!0},Be.media.stop=function(){Be.embed.stop(),Be.media.paused=!0},Be.media.paused=!0,Be.media.currentTime=0,ae(),Be.embed.getCurrentTime().then(function(e){Be.media.currentTime=e,A(Be.media,"timeupdate")}),Be.embed.getDuration().then(function(e){Be.media.duration=e,A(Be.media,"durationchange")}),Be.embed.on("loaded",function(){O.htmlElement(Be.embed.element)&&Be.supported.full&&Be.embed.element.setAttribute("tabindex","-1")}),Be.embed.on("play",function(){Be.media.paused=!1,A(Be.media,"play"),A(Be.media,"playing")}),Be.embed.on("pause",function(){Be.media.paused=!0,A(Be.media,"pause")}),Be.embed.on("timeupdate",function(e){Be.media.seeking=!1,Be.media.currentTime=e.seconds,A(Be.media,"timeupdate")}),Be.embed.on("progress",function(e){Be.media.buffered=e.percent,A(Be.media,"progress"),1===parseInt(e.percent)&&A(Be.media,"canplaythrough")}),Be.embed.on("seeked",function(){Be.media.seeking=!1,A(Be.media,"seeked"),A(Be.media,"play")}),Be.embed.on("ended",function(){Be.media.paused=!0,A(Be.media,"ended")})}function ie(){Be.embed=e.SC.Widget(this),Be.embed.bind(e.SC.Widget.Events.READY,function(){Be.media.play=function(){Be.embed.play(),Be.media.paused=!1},Be.media.pause=function(){Be.embed.pause(),Be.media.paused=!0},Be.media.stop=function(){Be.embed.seekTo(0),Be.embed.pause(),Be.media.paused=!0},Be.media.paused=!0,Be.media.currentTime=0,Be.embed.getDuration(function(e){Be.media.duration=e/1e3,ae()}),Be.embed.getPosition(function(e){Be.media.currentTime=e,A(Be.media,"timeupdate")}),Be.embed.bind(e.SC.Widget.Events.PLAY,function(){Be.media.paused=!1,A(Be.media,"play"),A(Be.media,"playing")}),Be.embed.bind(e.SC.Widget.Events.PAUSE,function(){Be.media.paused=!0,A(Be.media,"pause")}),Be.embed.bind(e.SC.Widget.Events.PLAY_PROGRESS,function(e){Be.media.seeking=!1,Be.media.currentTime=e.currentPosition/1e3,A(Be.media,"timeupdate")}),Be.embed.bind(e.SC.Widget.Events.LOAD_PROGRESS,function(e){Be.media.buffered=e.loadProgress,A(Be.media,"progress"),1===parseInt(e.loadProgress)&&A(Be.media,"canplaythrough")}),Be.embed.bind(e.SC.Widget.Events.FINISH,function(){Be.media.paused=!0,A(Be.media,"ended")})})}function le(){"play"in Be.media&&Be.media.play()}function ue(){"pause"in Be.media&&Be.media.pause()}function ce(e){return O.boolean(e)||(e=Be.media.paused),e?le():ue(),e}function de(e){O.number(e)||(e=E.seekTime),me(Be.media.currentTime-e)}function pe(e){O.number(e)||(e=E.seekTime),me(Be.media.currentTime+e)}function me(e){var t=0,n=Be.media.paused,r=fe();O.number(e)?t=e:O.object(e)&&s(["input","change"],e.type)&&(t=e.target.value/e.target.max*r),t<0?t=0:t>r&&(t=r),Ne(t);try{Be.media.currentTime=t.toFixed(4)}catch(e){}if(s(E.types.embed,Be.type)){switch(Be.type){case"youtube":Be.embed.seekTo(t);break;case"vimeo":Be.embed.setCurrentTime(t.toFixed(0));break;case"soundcloud":Be.embed.seekTo(1e3*t)}n&&ue(),A(Be.media,"timeupdate"),Be.media.seeking=!0,A(Be.media,"seeking")}Je("Seeking to "+Be.media.currentTime+" seconds"),W(t)}function fe(){var e=parseInt(E.duration),t=0;return null===Be.media.duration||isNaN(Be.media.duration)||(t=Be.media.duration),isNaN(e)?t:e}function ye(){m(Be.container,E.classes.playing,!Be.media.paused),m(Be.container,E.classes.stopped,Be.media.paused),Me(Be.media.paused)}function be(){P={x:e.pageXOffset||0,y:e.pageYOffset||0}}function ve(){e.scrollTo(P.x,P.y)}function ge(e){var n=N.supportsFullScreen;if(n){if(!e||e.type!==N.fullScreenEventName)return N.isFullScreen(Be.container)?N.cancelFullScreen():(be(),N.requestFullScreen(Be.container)),void(Be.isFullscreen=N.isFullScreen(Be.container));Be.isFullscreen=N.isFullScreen(Be.container)}else Be.isFullscreen=!Be.isFullscreen,t.body.style.overflow=Be.isFullscreen?"hidden":"";m(Be.container,E.classes.fullscreen.active,Be.isFullscreen),$(Be.isFullscreen),Be.buttons&&Be.buttons.fullscreen&&k(Be.buttons.fullscreen,Be.isFullscreen),A(Be.container,Be.isFullscreen?"enterfullscreen":"exitfullscreen",!0),!Be.isFullscreen&&n&&ve()}function he(e){if(O.boolean(e)||(e=!Be.media.muted),k(Be.buttons.mute,e),Be.media.muted=e,0===Be.media.volume&&ke(E.volume),s(E.types.embed,Be.type)){switch(Be.type){case"youtube":Be.embed[Be.media.muted?"mute":"unMute"]();break;case"vimeo":case"soundcloud":Be.embed.setVolume(Be.media.muted?0:parseFloat(E.volume/E.volumeMax))}A(Be.media,"volumechange")}}function ke(e){var t=E.volumeMax,n=E.volumeMin;if(O.undefined(e)&&(e=Be.storage.volume),(null===e||isNaN(e))&&(e=E.volume),e>t&&(e=t),e<n&&(e=n),Be.media.volume=parseFloat(e/t),Be.volume.display&&(Be.volume.display.value=e),s(E.types.embed,Be.type)){switch(Be.type){case"youtube":Be.embed.setVolume(100*Be.media.volume);break;case"vimeo":case"soundcloud":Be.embed.setVolume(Be.media.volume)}A(Be.media,"volumechange")}0===e?Be.media.muted=!0:Be.media.muted&&e>0&&he()}function we(e){var t=Be.media.muted?0:Be.media.volume*E.volumeMax;O.number(e)||(e=E.volumeStep),ke(t+e)}function xe(e){var t=Be.media.muted?0:Be.media.volume*E.volumeMax;O.number(e)||(e=E.volumeStep),ke(t-e)}function Te(){var e=Be.media.muted?0:Be.media.volume*E.volumeMax;Be.supported.full&&(Be.volume.input&&(Be.volume.input.value=e),Be.volume.display&&(Be.volume.display.value=e)),te({volume:e}),m(Be.container,E.classes.muted,0===e),Be.supported.full&&Be.buttons.mute&&k(Be.buttons.mute,0===e)}function Se(e){Be.supported.full&&Be.buttons.captions&&(O.boolean(e)||(e=Be.container.className.indexOf(E.classes.captions.active)===-1),Be.captionsEnabled=e,k(Be.buttons.captions,Be.captionsEnabled),m(Be.container,E.classes.captions.active,Be.captionsEnabled),A(Be.container,Be.captionsEnabled?"captionsenabled":"captionsdisabled",!0),te({captionsEnabled:Be.captionsEnabled}))}function _e(e){var t="waiting"===e.type;clearTimeout(Xe.loading),Xe.loading=setTimeout(function(){m(Be.container,E.classes.loading,t),Me(t)},t?250:0)}function Ee(e){if(Be.supported.full){var t=Be.progress.played,n=0,r=fe();if(e)switch(e.type){case"timeupdate":case"seeking":if(Be.controls.pressed)return;n=w(Be.media.currentTime,r),"timeupdate"===e.type&&Be.buttons.seek&&(Be.buttons.seek.value=n);break;case"playing":case"progress":t=Be.progress.buffer,n=function(){var e=Be.media.buffered;return e&&e.length?w(e.end(0),r):O.number(e)?100*e:0}()}Ce(t,n)}}function Ce(e,t){if(Be.supported.full){if(O.undefined(t)&&(t=0),O.undefined(e)){if(!Be.progress||!Be.progress.buffer)return;e=Be.progress.buffer}O.htmlElement(e)?e.value=t:e&&(e.bar&&(e.bar.value=t),e.text&&(e.text.innerHTML=t))}}function Fe(e,t){if(t){isNaN(e)&&(e=0),Be.secs=parseInt(e%60),Be.mins=parseInt(e/60%60),Be.hours=parseInt(e/60/60%60);var n=parseInt(fe()/60/60%60)>0;Be.secs=("0"+Be.secs).slice(-2),Be.mins=("0"+Be.mins).slice(-2),t.innerHTML=(n?Be.hours+":":"")+Be.mins+":"+Be.secs}}function Ae(){if(Be.supported.full){var e=fe()||0;!Be.duration&&E.displayDuration&&Be.media.paused&&Fe(e,Be.currentTime),Be.duration&&Fe(e,Be.duration),Pe()}}function Ie(e){Fe(Be.media.currentTime,Be.currentTime),e&&"timeupdate"===e.type&&Be.media.seeking||Ee(e)}function Ne(e){O.number(e)||(e=0);var t=fe(),n=w(e,t);Be.progress&&Be.progress.played&&(Be.progress.played.value=n),Be.buttons&&Be.buttons.seek&&(Be.buttons.seek.value=n)}function Pe(e){var t=fe();if(E.tooltips.seek&&Be.progress.container&&0!==t){var n=Be.progress.container.getBoundingClientRect(),r=0,a=E.classes.tooltip+"--visible";if(e)r=100/n.width*(e.pageX-n.left);else{if(!f(Be.progress.tooltip,a))return;r=Be.progress.tooltip.style.left.replace("%","")}r<0?r=0:r>100&&(r=100),Fe(t/100*r,Be.progress.tooltip),Be.progress.tooltip.style.left=r+"%",e&&s(["mouseenter","mouseleave"],e.type)&&m(Be.progress.tooltip,a,"mouseenter"===e.type)}}function Me(t){if(E.hideControls&&"audio"!==Be.type){var n=0,r=!1,a=t,o=f(Be.container,E.classes.loading);if(O.boolean(t)||(t&&t.type?(r="enterfullscreen"===t.type,a=s(["mousemove","touchstart","mouseenter","focus"],t.type),s(["mousemove","touchmove"],t.type)&&(n=2e3),"focus"===t.type&&(n=3e3)):a=f(Be.container,E.classes.hideControls)),e.clearTimeout(Xe.hover),a||Be.media.paused||o){if(m(Be.container,E.classes.hideControls,!1),Be.media.paused||o)return;Be.browser.isTouch&&(n=3e3)}a&&Be.media.paused||(Xe.hover=e.setTimeout(function(){(!Be.controls.pressed&&!Be.controls.hover||r)&&m(Be.container,E.classes.hideControls,!0)},n))}}function Oe(e){if(!O.undefined(e))return void Le(e);var t;switch(Be.type){case"youtube":t=Be.embed.getVideoUrl();break;case"vimeo":Be.embed.getVideoUrl.then(function(e){t=e});break;case"soundcloud":Be.embed.getCurrentSound(function(e){t=e.permalink_url});break;default:t=Be.media.currentSrc}return t||""}function Le(e){function n(){if(Be.embed=null,l(Be.media),"video"===Be.type&&Be.videoContainer&&l(Be.videoContainer),Be.container&&Be.container.removeAttribute("class"),"type"in e&&(Be.type=e.type,"video"===Be.type)){var n=e.sources[0];"type"in n&&s(E.types.embed,n.type)&&(Be.type=n.type)}switch(Be.supported=F(Be.type),Be.type){case"video":Be.media=t.createElement("video");break;case"audio":Be.media=t.createElement("audio");break;case"youtube":case"vimeo":case"soundcloud":Be.media=t.createElement("div"),Be.embedId=e.sources[0].src}u(Be.container,Be.media),O.boolean(e.autoplay)&&(E.autoplay=e.autoplay),s(E.types.html5,Be.type)&&(E.crossorigin&&Be.media.setAttribute("crossorigin",""),E.autoplay&&Be.media.setAttribute("autoplay",""),"poster"in e&&Be.media.setAttribute("poster",e.poster),E.loop&&Be.media.setAttribute("loop","")),m(Be.container,E.classes.fullscreen.active,Be.isFullscreen),m(Be.container,E.classes.captions.active,Be.captionsEnabled),K(),s(E.types.html5,Be.type)&&J("source",e.sources),ne(),s(E.types.html5,Be.type)&&("tracks"in e&&J("track",e.tracks),Be.media.load()),(s(E.types.html5,Be.type)||s(E.types.embed,Be.type)&&!Be.supported.full)&&(We(),Ye()),E.title=e.title,Z()}return O.object(e)&&"sources"in e&&e.sources.length?(m(Be.container,E.classes.ready,!1),ue(),Ne(),Ce(),qe(),void De(n,!1)):void ze("Invalid source format")}function je(e){"video"===Be.type&&Be.media.setAttribute("poster",e)}function Ve(){function n(){var e=ce(),t=Be.buttons[e?"play":"pause"],n=Be.buttons[e?"pause":"play"];if(n=n&&n.length>1?n[n.length-1]:n[0]){var r=f(t,E.classes.tabFocus);setTimeout(function(){n.focus(),r&&(m(t,E.classes.tabFocus,!1),m(n,E.classes.tabFocus,!0))},100)}}function r(){var e=t.activeElement;return e=e&&e!==t.body?t.querySelector(":focus"):null}function a(e){return e.keyCode?e.keyCode:e.which}function o(e){for(var t in Be.buttons){var n=Be.buttons[t];if(O.nodeList(n))for(var r=0;r<n.length;r++)m(n[r],E.classes.tabFocus,n[r]===e);else m(n,E.classes.tabFocus,n===e)}}function i(e){function t(){var e=Be.media.duration;O.number(e)&&me(e/10*(n-48))}var n=a(e),r="keydown"===e.type,o=r&&n===u;if(O.number(n))if(r){var i=[48,49,50,51,52,53,54,56,57,32,75,38,40,77,39,37,70,67];switch(s(i,n)&&(e.preventDefault(),e.stopPropagation()),n){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:o||t();break;case 32:case 75:o||ce();break;case 38:we();break;case 40:xe();break;case 77:o||he();break;case 39:pe();break;case 37:de();break;case 70:ge();break;case 67:o||Se()}!N.supportsFullScreen&&Be.isFullscreen&&27===n&&ge(),u=n}else u=null}var l=Be.browser.isIE?"change":"input";if(E.keyboardShorcuts.focused){var u=null;E.keyboardShorcuts.global&&g(e,"keydown keyup",function(e){var t=a(e),n=r(),o=[48,49,50,51,52,53,54,56,57,75,77,70,67],l=I().length;1!==l||!s(o,t)||O.htmlElement(n)&&y(n,E.selectors.editable)||i(e)}),g(Be.container,"keydown keyup",i)}g(e,"keyup",function(e){var t=a(e),n=r();9===t&&o(n)}),g(t.body,"click",function(){m(B("."+E.classes.tabFocus),E.classes.tabFocus,!1)});for(var c in Be.buttons){var d=Be.buttons[c];g(d,"blur",function(){m(d,"tab-focus",!1);
})}b(Be.buttons.play,"click",E.listeners.play,n),b(Be.buttons.pause,"click",E.listeners.pause,n),b(Be.buttons.restart,"click",E.listeners.restart,me),b(Be.buttons.rewind,"click",E.listeners.rewind,de),b(Be.buttons.forward,"click",E.listeners.forward,pe),b(Be.buttons.seek,l,E.listeners.seek,me),b(Be.volume.input,l,E.listeners.volume,function(){ke(Be.volume.input.value)}),b(Be.buttons.mute,"click",E.listeners.mute,he),b(Be.buttons.fullscreen,"click",E.listeners.fullscreen,ge),N.supportsFullScreen&&g(t,N.fullScreenEventName,ge),b(Be.buttons.captions,"click",E.listeners.captions,Se),g(Be.progress.container,"mouseenter mouseleave mousemove",Pe),E.hideControls&&(g(Be.container,"mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen",Me),g(Be.controls,"mouseenter mouseleave",function(e){Be.controls.hover="mouseenter"===e.type}),g(Be.controls,"mousedown mouseup touchstart touchend touchcancel",function(e){Be.controls.pressed=s(["mousedown","touchstart"],e.type)}),g(Be.controls,"focus blur",Me,!0)),g(Be.volume.input,"wheel",function(e){e.preventDefault();var t=e.webkitDirectionInvertedFromDevice,n=E.volumeStep/5;(e.deltaY<0||e.deltaX>0)&&(t?xe(n):we(n)),(e.deltaY>0||e.deltaX<0)&&(t?we(n):xe(n))})}function Re(){if(g(Be.media,"timeupdate seeking",Ie),g(Be.media,"timeupdate",W),g(Be.media,"durationchange loadedmetadata",Ae),g(Be.media,"ended",function(){"video"===Be.type&&E.showPosterOnEnd&&("video"===Be.type&&H(),me(),Be.media.load())}),g(Be.media,"progress playing",Ee),g(Be.media,"volumechange",Te),g(Be.media,"play pause ended",ye),g(Be.media,"waiting canplay seeked",_e),E.clickToPlay&&"audio"!==Be.type){var e=B("."+E.classes.videoWrapper);if(!e)return;e.style.cursor="pointer",g(e,"click",function(){E.hideControls&&Be.browser.isTouch&&!Be.media.paused||(Be.media.paused?le():Be.media.ended?(me(),le()):ue())})}E.disableContextMenu&&g(Be.media,"contextmenu",function(e){e.preventDefault()}),g(Be.media,E.events.concat(["keyup","keydown"]).join(" "),function(e){A(Be.container,e.type,!0)})}function qe(){if(s(E.types.html5,Be.type)){for(var e=Be.media.querySelectorAll("source"),t=0;t<e.length;t++)l(e[t]);Be.media.setAttribute("src",E.blankUrl),Be.media.load(),Je("Cancelled network requests")}}function De(n,r){function a(){clearTimeout(Xe.cleanUp),O.boolean(r)||(r=!0),O.function(n)&&n.call($e),r&&(Be.init=!1,Be.container.parentNode.replaceChild($e,Be.container),t.body.style.overflow="",A($e,"destroyed",!0))}if(!Be.init)return null;switch(Be.type){case"youtube":e.clearInterval(Xe.buffering),e.clearInterval(Xe.playing),Be.embed.destroy(),a();break;case"vimeo":Be.embed.unload().then(a),Xe.cleanUp=e.setTimeout(a,200);break;case"video":case"audio":Q(!0),a()}}function He(){if(Be.init)return null;if(N=_(),Be.browser=n(),O.htmlElement(Be.media)){ee();var e=v.tagName.toLowerCase();"div"===e?(Be.type=v.getAttribute("data-type"),Be.embedId=v.getAttribute("data-video-id"),v.removeAttribute("data-type"),v.removeAttribute("data-video-id")):(Be.type=e,E.crossorigin=null!==v.getAttribute("crossorigin"),E.autoplay=E.autoplay||null!==v.getAttribute("autoplay"),E.loop=E.loop||null!==v.getAttribute("loop")),Be.supported=F(Be.type),Be.supported.basic&&(Be.container=i(v,t.createElement("div")),Be.container.setAttribute("tabindex",0),K(),Je(""+Be.browser.name+" "+Be.browser.version),ne(),(s(E.types.html5,Be.type)||s(E.types.embed,Be.type)&&!Be.supported.full)&&(We(),Ye(),Z()),Be.init=!0)}}function We(){if(!Be.supported.full)return ze("Basic support only",Be.type),l(B(E.selectors.controls.wrapper)),l(B(E.selectors.buttons.play)),void Q(!0);var e=!U(E.selectors.controls.wrapper).length;e&&z(),G()&&(e&&Ve(),Re(),Q(),q(),D(),ke(),Te(),Ie(),ye())}function Ye(){e.setTimeout(function(){A(Be.media,"ready")},0),m(Be.media,M.classes.setup,!0),m(Be.container,E.classes.ready,!0),Be.media.plyr=Ue,E.autoplay&&le()}var Ue,Be=this,Xe={};Be.media=v;var $e=v.cloneNode(!0),Je=function(){j("log",arguments)},ze=function(){j("warn",arguments)};return Je("Config",E),Ue={getOriginal:function(){return $e},getContainer:function(){return Be.container},getEmbed:function(){return Be.embed},getMedia:function(){return Be.media},getType:function(){return Be.type},getDuration:fe,getCurrentTime:function(){return Be.media.currentTime},getVolume:function(){return Be.media.volume},isMuted:function(){return Be.media.muted},isReady:function(){return f(Be.container,E.classes.ready)},isLoading:function(){return f(Be.container,E.classes.loading)},isPaused:function(){return Be.media.paused},on:function(e,t){return g(Be.container,e,t),this},play:le,pause:ue,stop:function(){ue(),me()},restart:me,rewind:de,forward:pe,seek:me,source:Oe,poster:je,setVolume:ke,togglePlay:ce,toggleMute:he,toggleCaptions:Se,toggleFullscreen:ge,toggleControls:Me,isFullscreen:function(){return Be.isFullscreen||!1},support:function(e){return r(Be,e)},destroy:De},He(),Be.init?Ue:null}function C(e,n){var r=new XMLHttpRequest;if(!O.string(n)||!O.htmlElement(t.querySelector("#"+n))){var a=t.createElement("div");a.setAttribute("hidden",""),O.string(n)&&a.setAttribute("id",n),t.body.insertBefore(a,t.body.childNodes[0]),"withCredentials"in r&&(r.open("GET",e,!0),r.onload=function(){a.innerHTML=r.responseText},r.send())}}function F(e){var r=n(),a=r.isIE&&r.version<=9,s=r.isIos,o=r.isIphone,i=!!t.createElement("audio").canPlayType,l=!!t.createElement("video").canPlayType,u=!1,c=!1;switch(e){case"video":u=l,c=u&&!a&&!o;break;case"audio":u=i,c=u&&!a;break;case"vimeo":u=!0,c=!a&&!s;break;case"youtube":u=!0,c=!a&&!s,s&&!o&&r.version>=10&&(c=!0);break;case"soundcloud":u=!0,c=!a&&!o;break;default:u=i&&l,c=u&&!a}return{basic:u,full:c}}function A(e,n){function r(e,t){f(t,M.classes.hook)||a.push({target:e,media:t})}var a=[],s=[],o=[M.selectors.html5,M.selectors.embed].join(",");if(O.string(e)?e=t.querySelectorAll(e):O.htmlElement(e)?e=[e]:O.nodeList(e)||O.array(e)||O.string(e)||(O.undefined(n)&&O.object(e)&&(n=e),e=t.querySelectorAll(o)),O.nodeList(e)&&(e=Array.prototype.slice.call(e)),!F().basic||!e.length)return!1;for(var i=0;i<e.length;i++){var l=e[i],u=l.querySelectorAll(o);if(u.length)for(var c=0;c<u.length;c++)r(l,u[c]);else y(l,o)&&r(l,l)}return a.forEach(function(e){var t=e.target,r=e.media,a=!1;r===t&&(a=!0);var o={};try{o=JSON.parse(t.getAttribute("data-plyr"))}catch(e){}var i=x({},M,n,o);if(!i.enabled)return null;var l=new E(r,i);if(O.object(l)){if(i.debug){var u=i.events.concat(["setup","statechange","enterfullscreen","exitfullscreen","captionsenabled","captionsdisabled"]);g(l.getContainer(),u.join(" "),function(e){console.log([i.logPrefix,"event:",e.type].join(" "),e.detail.plyr)})}h(l.getContainer(),"setup",!0,{plyr:l}),s.push(l)}}),s}function I(e){if(O.string(e)?e=t.querySelector(e):O.undefined(e)&&(e=t.body),O.htmlElement(e)){var n=e.querySelectorAll("."+M.classes.setup),r=[];return Array.prototype.slice.call(n).forEach(function(e){O.object(e.plyr)&&r.push(e.plyr)}),r}return[]}var N,P={x:0,y:0},M={enabled:!0,debug:!1,autoplay:!1,loop:!1,seekTime:10,volume:10,volumeMin:0,volumeMax:10,volumeStep:1,duration:null,displayDuration:!0,loadSprite:!0,iconPrefix:"plyr",iconUrl:"https://cdn.plyr.io/2.0.11/plyr.svg",blankUrl:"https://cdn.selz.com/plyr/blank.mp4",clickToPlay:!0,hideControls:!0,showPosterOnEnd:!1,disableContextMenu:!0,keyboardShorcuts:{focused:!0,global:!1},tooltips:{controls:!1,seek:!0},selectors:{html5:"video, audio",embed:"[data-type]",editable:"input, textarea, select, [contenteditable]",container:".plyr",controls:{container:null,wrapper:".plyr__controls"},labels:"[data-plyr]",buttons:{seek:'[data-plyr="seek"]',play:'[data-plyr="play"]',pause:'[data-plyr="pause"]',restart:'[data-plyr="restart"]',rewind:'[data-plyr="rewind"]',forward:'[data-plyr="fast-forward"]',mute:'[data-plyr="mute"]',captions:'[data-plyr="captions"]',fullscreen:'[data-plyr="fullscreen"]'},volume:{input:'[data-plyr="volume"]',display:".plyr__volume--display"},progress:{container:".plyr__progress",buffer:".plyr__progress--buffer",played:".plyr__progress--played"},captions:".plyr__captions",currentTime:".plyr__time--current",duration:".plyr__time--duration"},classes:{setup:"plyr--setup",ready:"plyr--ready",videoWrapper:"plyr__video-wrapper",embedWrapper:"plyr__video-embed",type:"plyr--{0}",stopped:"plyr--stopped",playing:"plyr--playing",muted:"plyr--muted",loading:"plyr--loading",hover:"plyr--hover",tooltip:"plyr__tooltip",hidden:"plyr__sr-only",hideControls:"plyr--hide-controls",isIos:"plyr--is-ios",isTouch:"plyr--is-touch",captions:{enabled:"plyr--captions-enabled",active:"plyr--captions-active"},fullscreen:{enabled:"plyr--fullscreen-enabled",active:"plyr--fullscreen-active"},tabFocus:"tab-focus"},captions:{defaultActive:!1},fullscreen:{enabled:!0,fallback:!0,allowAudio:!1},storage:{enabled:!0,key:"plyr"},controls:["play-large","play","progress","current-time","mute","volume","captions","fullscreen"],i18n:{restart:"Restart",rewind:"Rewind {seektime} secs",play:"Play",pause:"Pause",forward:"Forward {seektime} secs",played:"played",buffered:"buffered",currentTime:"Current time",duration:"Duration",volume:"Volume",toggleMute:"Toggle Mute",toggleCaptions:"Toggle Captions",toggleFullscreen:"Toggle Fullscreen",frameTitle:"Player for {title}"},types:{embed:["youtube","vimeo","soundcloud"],html5:["video","audio"]},urls:{vimeo:{api:"https://player.vimeo.com/api/player.js"},youtube:{api:"https://www.youtube.com/iframe_api"},soundcloud:{api:"https://w.soundcloud.com/player/api.js"}},listeners:{seek:null,play:null,pause:null,restart:null,rewind:null,forward:null,mute:null,volume:null,captions:null,fullscreen:null},events:["ready","ended","progress","stalled","playing","waiting","canplay","canplaythrough","loadstart","loadeddata","loadedmetadata","timeupdate","volumechange","play","pause","error","seeking","seeked","emptied"],logPrefix:"[Plyr]"},O={object:function(e){return null!==e&&"object"==typeof e},array:function(e){return null!==e&&"object"==typeof e&&e.constructor===Array},number:function(e){return null!==e&&("number"==typeof e&&!isNaN(e-0)||"object"==typeof e&&e.constructor===Number)},string:function(e){return null!==e&&("string"==typeof e||"object"==typeof e&&e.constructor===String)},boolean:function(e){return null!==e&&"boolean"==typeof e},nodeList:function(e){return null!==e&&e instanceof NodeList},htmlElement:function(e){return null!==e&&e instanceof HTMLElement},function:function(e){return null!==e&&"function"==typeof e},undefined:function(e){return null!==e&&"undefined"==typeof e}},L={supported:function(){if(!("localStorage"in e))return!1;try{e.localStorage.setItem("___test","OK");var t=e.localStorage.getItem("___test");return e.localStorage.removeItem("___test"),"OK"===t}catch(e){return!1}return!1}()};return{setup:A,supported:F,loadSprite:C,get:I}}),function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}"function"!=typeof window.CustomEvent&&(e.prototype=window.Event.prototype,window.CustomEvent=e)}();
(function() {
  jQuery(function() {
    $("a[rel~=popover], .has-popover").popover();
    return $("a[rel~=tooltip], .has-tooltip").tooltip();
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
/**
 * @license
 * Video.js 5.18.4 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.videojs=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-big-play-button"},b.prototype.handleClick=function(a){this.player_.play();var b=this.player_.getChild("controlBar"),c=b&&b.getChild("playToggle");if(!c)return void this.player_.focus();this.setTimeout(function(){c.focus()},1)},b}(i["default"]);l.prototype.controlText_="Play Video",k["default"].registerComponent("BigPlayButton",l),c["default"]=l},{2:2,5:5}],2:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(3),i=d(h),j=a(5),k=d(j),l=a(86),m=d(l),n=a(88),o=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"button",b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};b=(0,n.assign)({className:this.buildCSSClass()},b),"button"!==a&&(m["default"].warn("Creating a Button with an HTML element of "+a+" is deprecated; use ClickableComponent instead."),b=(0,n.assign)({tabIndex:0},b),c=(0,n.assign)({role:"button"},c)),c=(0,n.assign)({type:"button","aria-live":"polite"},c);var d=k["default"].prototype.createEl.call(this,a,b,c);return this.createControlTextEl(d),d},b.prototype.addChild=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=this.constructor.name;return m["default"].warn("Adding an actionable (user controllable) child to a Button ("+c+") is not supported; use a ClickableComponent instead."),k["default"].prototype.addChild.call(this,a,b)},b.prototype.enable=function(){a.prototype.enable.call(this),this.el_.removeAttribute("disabled")},b.prototype.disable=function(){a.prototype.disable.call(this),this.el_.setAttribute("disabled","disabled")},b.prototype.handleKeyPress=function(b){32!==b.which&&13!==b.which&&a.prototype.handleKeyPress.call(this,b)},b}(i["default"]);k["default"].registerComponent("Button",o),c["default"]=o},{3:3,5:5,86:86,88:88}],3:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(82),n=d(m),o=a(83),p=d(o),q=a(86),r=e(q),s=a(94),t=e(s),u=a(88),v=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.emitTapEvents(),e.enable(),e}return h(b,a),b.prototype.createEl=function(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};c=(0,u.assign)({className:this.buildCSSClass(),tabIndex:0},c),"button"===b&&r["default"].error("Creating a ClickableComponent with an HTML element of "+b+" is not supported; use a Button instead."),d=(0,u.assign)({role:"button","aria-live":"polite"},d),this.tabIndex_=c.tabIndex;var e=a.prototype.createEl.call(this,b,c,d);return this.createControlTextEl(e),e},b.prototype.createControlTextEl=function(a){return this.controlTextEl_=l.createEl("span",{className:"vjs-control-text"}),a&&a.appendChild(this.controlTextEl_),this.controlText(this.controlText_,a),this.controlTextEl_},b.prototype.controlText=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.el();if(!a)return this.controlText_||"Need Text";var c=this.localize(a);return this.controlText_=a,this.controlTextEl_.innerHTML=c,this.nonIconControl||b.setAttribute("title",c),this},b.prototype.buildCSSClass=function(){return"vjs-control vjs-button "+a.prototype.buildCSSClass.call(this)},b.prototype.enable=function(){return this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),"undefined"!=typeof this.tabIndex_&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on("tap",this.handleClick),this.on("click",this.handleClick),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur),this},b.prototype.disable=function(){return this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),"undefined"!=typeof this.tabIndex_&&this.el_.removeAttribute("tabIndex"),this.off("tap",this.handleClick),this.off("click",this.handleClick),this.off("focus",this.handleFocus),this.off("blur",this.handleBlur),this},b.prototype.handleClick=function(a){},b.prototype.handleFocus=function(a){n.on(t["default"],"keydown",p.bind(this,this.handleKeyPress))},b.prototype.handleKeyPress=function(b){32===b.which||13===b.which?(b.preventDefault(),this.handleClick(b)):a.prototype.handleKeyPress&&a.prototype.handleKeyPress.call(this,b)},b.prototype.handleBlur=function(a){n.off(t["default"],"keydown",p.bind(this,this.handleKeyPress))},b}(j["default"]);j["default"].registerComponent("ClickableComponent",v),c["default"]=v},{5:5,81:81,82:82,83:83,86:86,88:88,94:94}],4:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.controlText(d&&d.controlText||g.localize("Close")),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-close-button "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.trigger({type:"close",bubbles:!1})},b}(i["default"]);k["default"].registerComponent("CloseButton",l),c["default"]=l},{2:2,5:5}],5:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a(95),h=e(g),i=a(81),j=d(i),k=a(83),l=d(k),m=a(85),n=d(m),o=a(82),p=d(o),q=a(86),r=e(q),s=a(91),t=e(s),u=a(87),v=e(u),w=function(){function a(b,c,d){if(f(this,a),!b&&this.play?this.player_=b=this:this.player_=b,this.options_=(0,v["default"])({},this.options_),c=this.options_=(0,v["default"])(this.options_,c),this.id_=c.id||c.el&&c.el.id,!this.id_){var e=b&&b.id&&b.id()||"no_player";this.id_=e+"_component_"+n.newGUID()}this.name_=c.name||null,c.el?this.el_=c.el:c.createEl!==!1&&(this.el_=this.createEl()),this.children_=[],this.childIndex_={},this.childNameIndex_={},c.initChildren!==!1&&this.initChildren(),this.ready(d),c.reportTouchActivity!==!1&&this.enableTouchActivity()}return a.prototype.dispose=function(){if(this.trigger({type:"dispose",bubbles:!1}),this.children_)for(var a=this.children_.length-1;a>=0;a--)this.children_[a].dispose&&this.children_[a].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.off(),this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),j.removeElData(this.el_),this.el_=null},a.prototype.player=function(){return this.player_},a.prototype.options=function(a){return r["default"].warn("this.options() has been deprecated and will be moved to the constructor in 6.0"),a?(this.options_=(0,v["default"])(this.options_,a),this.options_):this.options_},a.prototype.el=function(){return this.el_},a.prototype.createEl=function(a,b,c){return j.createEl(a,b,c)},a.prototype.localize=function(a){var b=this.player_.language&&this.player_.language(),c=this.player_.languages&&this.player_.languages();if(!b||!c)return a;var d=c[b];if(d&&d[a])return d[a];var e=b.split("-")[0],f=c[e];return f&&f[a]?f[a]:a},a.prototype.contentEl=function(){return this.contentEl_||this.el_},a.prototype.id=function(){return this.id_},a.prototype.name=function(){return this.name_},a.prototype.children=function(){return this.children_},a.prototype.getChildById=function(a){return this.childIndex_[a]},a.prototype.getChild=function(a){if(a)return a=(0,t["default"])(a),this.childNameIndex_[a]},a.prototype.addChild=function(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.children_.length,e=void 0,f=void 0;if("string"==typeof b){f=(0,t["default"])(b),c||(c={}),c===!0&&(r["default"].warn("Initializing a child component with `true` is deprecated.Children should be defined in an array when possible, but if necessary use an object instead of `true`."),c={});var g=c.componentClass||f;c.name=f;var h=a.getComponent(g);if(!h)throw new Error("Component "+g+" does not exist");if("function"!=typeof h)return null;e=new h(this.player_||this,c)}else e=b;if(this.children_.splice(d,0,e),"function"==typeof e.id&&(this.childIndex_[e.id()]=e),f=f||e.name&&(0,t["default"])(e.name()),f&&(this.childNameIndex_[f]=e),"function"==typeof e.el&&e.el()){var i=this.contentEl().children,j=i[d]||null;this.contentEl().insertBefore(e.el(),j)}return e},a.prototype.removeChild=function(a){if("string"==typeof a&&(a=this.getChild(a)),a&&this.children_){for(var b=!1,c=this.children_.length-1;c>=0;c--)if(this.children_[c]===a){b=!0,this.children_.splice(c,1);break}if(b){this.childIndex_[a.id()]=null,this.childNameIndex_[a.name()]=null;var d=a.el();d&&d.parentNode===this.contentEl()&&this.contentEl().removeChild(a.el())}}},a.prototype.initChildren=function(){var b=this,c=this.options_.children;if(c){var d=this.options_,e=function(a){var c=a.name,e=a.opts;if(void 0!==d[c]&&(e=d[c]),e!==!1){e===!0&&(e={}),e.playerOptions=b.options_.playerOptions;var f=b.addChild(c,e);f&&(b[c]=f)}},f=void 0,g=a.getComponent("Tech");f=Array.isArray(c)?c:Object.keys(c),f.concat(Object.keys(this.options_).filter(function(a){return!f.some(function(b){return"string"==typeof b?a===b:a===b.name})})).map(function(a){var d=void 0,e=void 0;return"string"==typeof a?(d=a,e=c[d]||b.options_[d]||{}):(d=a.name,e=a),{name:d,opts:e}}).filter(function(b){var c=a.getComponent(b.opts.componentClass||(0,t["default"])(b.name));return c&&!g.isTech(c)}).forEach(e)}},a.prototype.buildCSSClass=function(){return""},a.prototype.on=function(a,b,c){var d=this;if("string"==typeof a||Array.isArray(a))p.on(this.el_,a,l.bind(this,b));else{var e=a,f=b,g=l.bind(this,c),h=function(){return d.off(e,f,g)};h.guid=g.guid,this.on("dispose",h);var i=function(){return d.off("dispose",h)};i.guid=g.guid,a.nodeName?(p.on(e,f,g),p.on(e,"dispose",i)):"function"==typeof a.on&&(e.on(f,g),e.on("dispose",i))}return this},a.prototype.off=function(a,b,c){if(!a||"string"==typeof a||Array.isArray(a))p.off(this.el_,a,b);else{var d=a,e=b,f=l.bind(this,c);this.off("dispose",f),a.nodeName?(p.off(d,e,f),p.off(d,"dispose",f)):(d.off(e,f),d.off("dispose",f))}return this},a.prototype.one=function(a,b,c){var d=this,e=arguments;if("string"==typeof a||Array.isArray(a))p.one(this.el_,a,l.bind(this,b));else{var f=a,g=b,h=l.bind(this,c),i=function j(){d.off(f,g,j),h.apply(null,e)};i.guid=h.guid,this.on(f,g,i)}return this},a.prototype.trigger=function(a,b){return p.trigger(this.el_,a,b),this},a.prototype.ready=function(a){var b=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a&&(this.isReady_?b?a.call(this):this.setTimeout(a,1):(this.readyQueue_=this.readyQueue_||[],this.readyQueue_.push(a))),this},a.prototype.triggerReady=function(){this.isReady_=!0,this.setTimeout(function(){var a=this.readyQueue_;this.readyQueue_=[],a&&a.length>0&&a.forEach(function(a){a.call(this)},this),this.trigger("ready")},1)},a.prototype.$=function(a,b){return j.$(a,b||this.contentEl())},a.prototype.$$=function(a,b){return j.$$(a,b||this.contentEl())},a.prototype.hasClass=function(a){return j.hasElClass(this.el_,a)},a.prototype.addClass=function(a){return j.addElClass(this.el_,a),this},a.prototype.removeClass=function(a){return j.removeElClass(this.el_,a),this},a.prototype.toggleClass=function(a,b){return j.toggleElClass(this.el_,a,b),this},a.prototype.show=function(){return this.removeClass("vjs-hidden"),this},a.prototype.hide=function(){return this.addClass("vjs-hidden"),this},a.prototype.lockShowing=function(){return this.addClass("vjs-lock-showing"),this},a.prototype.unlockShowing=function(){return this.removeClass("vjs-lock-showing"),this},a.prototype.getAttribute=function(a){return j.getAttribute(this.el_,a)},a.prototype.setAttribute=function(a,b){return j.setAttribute(this.el_,a,b),this},a.prototype.removeAttribute=function(a){return j.removeAttribute(this.el_,a),this},a.prototype.width=function(a,b){return this.dimension("width",a,b)},a.prototype.height=function(a,b){return this.dimension("height",a,b)},a.prototype.dimensions=function(a,b){return this.width(a,!0).height(b)},a.prototype.dimension=function(a,b,c){if(void 0!==b)return null!==b&&b===b||(b=0),(""+b).indexOf("%")!==-1||(""+b).indexOf("px")!==-1?this.el_.style[a]=b:this.el_.style[a]="auto"===b?"":b+"px",c||this.trigger("resize"),this;if(!this.el_)return 0;var d=this.el_.style[a],e=d.indexOf("px");return e!==-1?parseInt(d.slice(0,e),10):parseInt(this.el_["offset"+(0,t["default"])(a)],10)},a.prototype.currentDimension=function(a){var b=0;if("width"!==a&&"height"!==a)throw new Error("currentDimension only accepts width or height value");if("function"==typeof h["default"].getComputedStyle){var c=h["default"].getComputedStyle(this.el_);b=c.getPropertyValue(a)||c[a]}if(b=parseFloat(b),0===b){var d="offset"+(0,t["default"])(a);b=this.el_[d]}return b},a.prototype.currentDimensions=function(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}},a.prototype.currentWidth=function(){return this.currentDimension("width")},a.prototype.currentHeight=function(){return this.currentDimension("height")},a.prototype.focus=function(){this.el_.focus()},a.prototype.blur=function(){this.el_.blur()},a.prototype.emitTapEvents=function(){var a=0,b=null,c=void 0;this.on("touchstart",function(d){1===d.touches.length&&(b={pageX:d.touches[0].pageX,pageY:d.touches[0].pageY},a=(new Date).getTime(),c=!0)}),this.on("touchmove",function(a){if(a.touches.length>1)c=!1;else if(b){var d=a.touches[0].pageX-b.pageX,e=a.touches[0].pageY-b.pageY,f=Math.sqrt(d*d+e*e);f>10&&(c=!1)}});var d=function(){c=!1};this.on("touchleave",d),this.on("touchcancel",d),this.on("touchend",function(d){if(b=null,c===!0){(new Date).getTime()-a<200&&(d.preventDefault(),this.trigger("tap"))}})},a.prototype.enableTouchActivity=function(){if(this.player()&&this.player().reportUserActivity){var a=l.bind(this.player(),this.player().reportUserActivity),b=void 0;this.on("touchstart",function(){a(),this.clearInterval(b),b=this.setInterval(a,250)});var c=function(c){a(),this.clearInterval(b)};this.on("touchmove",a),this.on("touchend",c),this.on("touchcancel",c)}},a.prototype.setTimeout=function(a,b){a=l.bind(this,a);var c=h["default"].setTimeout(a,b),d=function(){this.clearTimeout(c)};return d.guid="vjs-timeout-"+c,this.on("dispose",d),c},a.prototype.clearTimeout=function(a){h["default"].clearTimeout(a);var b=function(){};return b.guid="vjs-timeout-"+a,this.off("dispose",b),a},a.prototype.setInterval=function(a,b){a=l.bind(this,a);var c=h["default"].setInterval(a,b),d=function(){this.clearInterval(c)};return d.guid="vjs-interval-"+c,this.on("dispose",d),c},a.prototype.clearInterval=function(a){h["default"].clearInterval(a);var b=function(){};return b.guid="vjs-interval-"+a,this.off("dispose",b),a},a.registerComponent=function(b,c){if(b){if(b=(0,t["default"])(b),a.components_||(a.components_={}),"Player"===b&&a.components_[b]){var d=a.components_[b];if(d.players&&Object.keys(d.players).length>0&&Object.keys(d.players).map(function(a){return d.players[a]}).every(Boolean))throw new Error("Can not register Player component after player has been created")}return a.components_[b]=c,c}},a.getComponent=function(b){if(b)return b=(0,t["default"])(b),a.components_&&a.components_[b]?a.components_[b]:h["default"]&&h["default"].videojs&&h["default"].videojs[b]?(r["default"].warn("The "+b+" component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"),h["default"].videojs[b]):void 0},a.extend=function(b){b=b||{},r["default"].warn("Component.extend({}) has been deprecated,  use videojs.extend(Component, {}) instead");var c=b.init||b.init||this.prototype.init||this.prototype.init||function(){},d=function(){c.apply(this,arguments)};d.prototype=Object.create(this.prototype),d.prototype.constructor=d,d.extend=a.extend;for(var e in b)b.hasOwnProperty(e)&&(d.prototype[e]=b[e]);return d},a}();w.registerComponent("Component",w),c["default"]=w},{81:81,82:82,83:83,85:85,86:86,87:87,91:91,95:95}],6:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(36),i=d(h),j=a(5),k=d(j),l=a(7),m=d(l),n=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e(this,b),d.tracks=c.audioTracks&&c.audioTracks();var g=f(this,a.call(this,c,d));return g.el_.setAttribute("aria-label","Audio Menu"),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-audio-button "+a.prototype.buildCSSClass.call(this)},b.prototype.createItems=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],b=this.player_.audioTracks&&this.player_.audioTracks();if(!b)return a;for(var c=0;c<b.length;c++){var d=b[c];a.push(new m["default"](this.player_,{track:d,selectable:!0}))}return a},b}(i["default"]);n.prototype.controlText_="Audio Track",k["default"].registerComponent("AudioTrackButton",n),c["default"]=n},{36:36,5:5,7:7}],7:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(48),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d){f(this,b);var e=d.track,h=c.audioTracks();d.label=e.label||e.language||"Unknown",d.selected=e.enabled;var i=g(this,a.call(this,c,d));if(i.track=e,h){var j=n.bind(i,i.handleTracksChange);h.addEventListener("change",j),i.on("dispose",function(){h.removeEventListener("change",j)})}return i}return h(b,a),b.prototype.handleClick=function(b){var c=this.player_.audioTracks();if(a.prototype.handleClick.call(this,b),c)for(var d=0;d<c.length;d++){var e=c[d];e.enabled=e===this.track}},b.prototype.handleTracksChange=function(a){this.selected(this.track.enabled)},b}(j["default"]);l["default"].registerComponent("AudioTrackMenuItem",o),c["default"]=o},{48:48,5:5,83:83}],8:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h);a(12),a(32),a(33),a(35),a(34),a(10),a(18),a(9),a(38),a(40),a(11),a(25),a(27),a(29),a(24),a(6),a(13),a(21);var j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-control-bar",dir:"ltr"},{role:"group"})},b}(i["default"]);j.prototype.options_={children:["playToggle","volumeMenuButton","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subtitlesButton","captionsButton","audioTrackButton","fullscreenToggle"]},i["default"].registerComponent("ControlBar",j),c["default"]=j},{10:10,11:11,12:12,13:13,18:18,21:21,24:24,25:25,27:27,29:29,32:32,33:33,34:34,35:35,38:38,40:40,5:5,6:6,9:9}],9:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.on(c,"fullscreenchange",g.handleFullscreenChange),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-fullscreen-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleFullscreenChange=function(a){this.player_.isFullscreen()?this.controlText("Non-Fullscreen"):this.controlText("Fullscreen")},b.prototype.handleClick=function(a){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()},b}(i["default"]);l.prototype.controlText_="Fullscreen",k["default"].registerComponent("FullscreenToggle",l),c["default"]=l},{2:2,5:5}],10:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateShowing(),e.on(e.player(),"durationchange",e.updateShowing),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-live-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Stream Type")+"</span>"+this.localize("LIVE")},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateShowing=function(a){this.player().duration()===1/0?this.show():this.hide()},b}(j["default"]);j["default"].registerComponent("LiveDisplay",m),c["default"]=m},{5:5,81:81}],11:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(2),j=e(i),k=a(5),l=e(k),m=a(81),n=d(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"volumechange",e.update),c.tech_&&c.tech_.featuresVolumeControl===!1&&e.addClass("vjs-hidden"),e.on(c,"loadstart",function(){this.update(),c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}),e}return h(b,a),b.prototype.buildCSSClass=function(){return"vjs-mute-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.player_.muted(!this.player_.muted())},b.prototype.update=function(a){var b=this.player_.volume(),c=3;0===b||this.player_.muted()?c=0:b<.33?c=1:b<.67&&(c=2);var d=this.player_.muted()?"Unmute":"Mute";this.controlText()!==d&&this.controlText(d);for(var e=0;e<4;e++)n.removeElClass(this.el_,"vjs-vol-"+e);n.addElClass(this.el_,"vjs-vol-"+c)},b}(j["default"]);o.prototype.controlText_="Mute",l["default"].registerComponent("MuteToggle",o),c["default"]=o},{2:2,5:5,81:81}],12:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.on(c,"play",g.handlePlay),g.on(c,"pause",g.handlePause),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-play-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.player_.paused()?this.player_.play():this.player_.pause()},b.prototype.handlePlay=function(a){this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.controlText("Pause")},b.prototype.handlePause=function(a){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.controlText("Play")},b}(i["default"]);l.prototype.controlText_="Play",k["default"].registerComponent("PlayToggle",l),c["default"]=l},{2:2,5:5}],13:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(47),j=e(i),k=a(49),l=e(k),m=a(14),n=e(m),o=a(5),p=e(o),q=a(81),r=d(q),s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateVisibility(),e.updateLabel(),e.on(c,"loadstart",e.updateVisibility),e.on(c,"ratechange",e.updateLabel),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this);return this.labelEl_=r.createEl("div",{className:"vjs-playback-rate-value",innerHTML:1}),b.appendChild(this.labelEl_),b},b.prototype.buildCSSClass=function(){return"vjs-playback-rate "+a.prototype.buildCSSClass.call(this)},b.prototype.createMenu=function(){var a=new l["default"](this.player()),b=this.playbackRates()
;if(b)for(var c=b.length-1;c>=0;c--)a.addChild(new n["default"](this.player(),{rate:b[c]+"x"}));return a},b.prototype.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())},b.prototype.handleClick=function(a){for(var b=this.player().playbackRate(),c=this.playbackRates(),d=c[0],e=0;e<c.length;e++)if(c[e]>b){d=c[e];break}this.player().playbackRate(d)},b.prototype.playbackRates=function(){return this.options_.playbackRates||this.options_.playerOptions&&this.options_.playerOptions.playbackRates},b.prototype.playbackRateSupported=function(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0},b.prototype.updateVisibility=function(a){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")},b.prototype.updateLabel=function(a){this.playbackRateSupported()&&(this.labelEl_.innerHTML=this.player().playbackRate()+"x")},b}(j["default"]);s.prototype.controlText_="Playback Rate",p["default"].registerComponent("PlaybackRateMenuButton",s),c["default"]=s},{14:14,47:47,49:49,5:5,81:81}],14:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(48),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=d.rate,h=parseFloat(g,10);d.label=g,d.selected=1===h,d.selectable=!0;var i=f(this,a.call(this,c,d));return i.label=g,i.rate=h,i.on(c,"ratechange",i.update),i}return g(b,a),b.prototype.handleClick=function(b){a.prototype.handleClick.call(this),this.player().playbackRate(this.rate)},b.prototype.update=function(a){this.selected(this.player().playbackRate()===this.rate)},b}(i["default"]);l.prototype.contentElType="button",k["default"].registerComponent("PlaybackRateMenuItem",l),c["default"]=l},{48:48,5:5}],15:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.partEls_=[],e.on(c,"progress",e.update),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Loaded")+"</span>: 0%</span>"})},b.prototype.update=function(a){var b=this.player_.buffered(),c=this.player_.duration(),d=this.player_.bufferedEnd(),e=this.partEls_,f=function(a,b){var c=a/b||0;return 100*(c>=1?1:c)+"%"};this.el_.style.width=f(d,c);for(var g=0;g<b.length;g++){var h=b.start(g),i=b.end(g),j=e[g];j||(j=this.el_.appendChild(l.createEl()),e[g]=j),j.style.left=f(h,d),j.style.width=f(i-h,d)}for(var k=e.length;k>b.length;k--)this.el_.removeChild(e[k-1]);e.length=b.length},b}(j["default"]);j["default"].registerComponent("LoadProgressBar",m),c["default"]=m},{5:5,81:81}],16:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(83),n=d(m),o=a(84),p=e(o),q=a(80),r=e(q),s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return d.playerOptions&&d.playerOptions.controlBar&&d.playerOptions.controlBar.progressControl&&d.playerOptions.controlBar.progressControl.keepTooltipsInside&&(e.keepTooltipsInside=d.playerOptions.controlBar.progressControl.keepTooltipsInside),e.keepTooltipsInside&&(e.tooltip=l.createEl("div",{className:"vjs-time-tooltip"}),e.el().appendChild(e.tooltip),e.addClass("vjs-keep-tooltips-inside")),e.update(0,0),c.on("ready",function(){e.on(c.controlBar.progressControl.el(),"mousemove",n.throttle(n.bind(e,e.handleMouseMove),25))}),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-mouse-display"})},b.prototype.handleMouseMove=function(a){var b=this.player_.duration(),c=this.calculateDistance(a)*b,d=a.pageX-l.findElPosition(this.el().parentNode).left;this.update(c,d)},b.prototype.update=function(a,b){var c=(0,p["default"])(a,this.player_.duration());if(this.el().style.left=b+"px",this.el().setAttribute("data-current-time",c),this.keepTooltipsInside){var d=this.clampPosition_(b),e=b-d+1,f=parseFloat((0,r["default"])(this.tooltip,"width")),g=f/2;this.tooltip.innerHTML=c,this.tooltip.style.right="-"+(g-e)+"px"}},b.prototype.calculateDistance=function(a){return l.getPointerPosition(this.el().parentNode,a).x},b.prototype.clampPosition_=function(a){if(!this.keepTooltipsInside)return a;var b=parseFloat((0,r["default"])(this.player().el(),"width")),c=parseFloat((0,r["default"])(this.tooltip,"width")),d=c/2,e=a;return a<d?e=Math.ceil(d):a>b-d&&(e=Math.floor(b-d)),e},b}(j["default"]);j["default"].registerComponent("MouseTimeDisplay",s),c["default"]=s},{5:5,80:80,81:81,83:83,84:84}],17:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(83),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateDataAttr(),e.on(c,"timeupdate",e.updateDataAttr),c.ready(l.bind(e,e.updateDataAttr)),d.playerOptions&&d.playerOptions.controlBar&&d.playerOptions.controlBar.progressControl&&d.playerOptions.controlBar.progressControl.keepTooltipsInside&&(e.keepTooltipsInside=d.playerOptions.controlBar.progressControl.keepTooltipsInside),e.keepTooltipsInside&&e.addClass("vjs-keep-tooltips-inside"),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-play-progress vjs-slider-bar",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"})},b.prototype.updateDataAttr=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();this.el_.setAttribute("data-current-time",(0,n["default"])(b,this.player_.duration()))},b}(j["default"]);j["default"].registerComponent("PlayProgressBar",o),c["default"]=o},{5:5,83:83,84:84}],18:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h);a(19),a(16);var j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})},b}(i["default"]);j.prototype.options_={children:["seekBar"]},i["default"].registerComponent("ProgressControl",j),c["default"]=j},{16:16,19:19,5:5}],19:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(57),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=a(84),p=e(o),q=a(80),r=e(q);a(15),a(17),a(20);var s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"timeupdate",e.updateProgress),e.on(c,"ended",e.updateProgress),c.ready(n.bind(e,e.updateProgress)),d.playerOptions&&d.playerOptions.controlBar&&d.playerOptions.controlBar.progressControl&&d.playerOptions.controlBar.progressControl.keepTooltipsInside&&(e.keepTooltipsInside=d.playerOptions.controlBar.progressControl.keepTooltipsInside),e.keepTooltipsInside&&(e.tooltipProgressBar=e.addChild("TooltipProgressBar")),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-progress-holder"},{"aria-label":"progress bar"})},b.prototype.updateProgress=function(a){if(this.updateAriaAttributes(this.el_),this.keepTooltipsInside){this.updateAriaAttributes(this.tooltipProgressBar.el_),this.tooltipProgressBar.el_.style.width=this.bar.el_.style.width;var b=parseFloat((0,r["default"])(this.player().el(),"width")),c=parseFloat((0,r["default"])(this.tooltipProgressBar.tooltip,"width")),d=this.tooltipProgressBar.el().style;d.maxWidth=Math.floor(b-c/2)+"px",d.minWidth=Math.ceil(c/2)+"px",d.right="-"+c/2+"px"}},b.prototype.updateAriaAttributes=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();a.setAttribute("aria-valuenow",(100*this.getPercent()).toFixed(2)),a.setAttribute("aria-valuetext",(0,p["default"])(b,this.player_.duration()))},b.prototype.getPercent=function(){var a=this.player_.currentTime()/this.player_.duration();return a>=1?1:a},b.prototype.handleMouseDown=function(b){this.player_.scrubbing(!0),this.videoWasPlaying=!this.player_.paused(),this.player_.pause(),a.prototype.handleMouseDown.call(this,b)},b.prototype.handleMouseMove=function(a){var b=this.calculateDistance(a)*this.player_.duration();b===this.player_.duration()&&(b-=.1),this.player_.currentTime(b)},b.prototype.handleMouseUp=function(b){a.prototype.handleMouseUp.call(this,b),this.player_.scrubbing(!1),this.videoWasPlaying&&this.player_.play()},b.prototype.stepForward=function(){this.player_.currentTime(this.player_.currentTime()+5)},b.prototype.stepBack=function(){this.player_.currentTime(this.player_.currentTime()-5)},b}(j["default"]);s.prototype.options_={children:["loadProgressBar","mouseTimeDisplay","playProgressBar"],barName:"playProgressBar"},s.prototype.playerEvent="timeupdate",l["default"].registerComponent("SeekBar",s),c["default"]=s},{15:15,17:17,20:20,5:5,57:57,80:80,83:83,84:84}],20:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(83),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateDataAttr(),e.on(c,"timeupdate",e.updateDataAttr),c.ready(l.bind(e,e.updateDataAttr)),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-tooltip-progress-bar vjs-slider-bar",innerHTML:'<div class="vjs-time-tooltip"></div>\n        <span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"});return this.tooltip=b.querySelector(".vjs-time-tooltip"),b},b.prototype.updateDataAttr=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),c=(0,n["default"])(b,this.player_.duration());this.el_.setAttribute("data-current-time",c),this.tooltip.innerHTML=c},b}(j["default"]);j["default"].registerComponent("TooltipProgressBar",o),c["default"]=o},{5:5,83:83,84:84}],21:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(22),i=d(h),j=a(5),k=d(j),l=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-custom-control-spacer "+a.prototype.buildCSSClass.call(this)},b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,{className:this.buildCSSClass()});return b.innerHTML="&nbsp;",b},b}(i["default"]);k["default"].registerComponent("CustomControlSpacer",l),c["default"]=l},{22:22,5:5}],22:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-spacer "+a.prototype.buildCSSClass.call(this)},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b}(i["default"]);i["default"].registerComponent("Spacer",j),c["default"]=j},{5:5}],23:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(31),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b),d.track={player:c,kind:d.kind,label:d.kind+" settings",selectable:!1,"default":!1,mode:"disabled"},d.selectable=!1;var g=f(this,a.call(this,c,d));return g.addClass("vjs-texttrack-settings"),g.controlText(", opens "+d.kind+" settings dialog"),g}return g(b,a),b.prototype.handleClick=function(a){this.player().getChild("textTrackSettings").show(),this.player().getChild("textTrackSettings").el_.focus()},b}(i["default"]);k["default"].registerComponent("CaptionSettingsMenuItem",l),c["default"]=l},{31:31,5:5}],24:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(30),i=d(h),j=a(5),k=d(j),l=a(23),m=d(l),n=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));return h.el_.setAttribute("aria-label","Captions Menu"),h}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-captions-button "+a.prototype.buildCSSClass.call(this)},b.prototype.createItems=function(){var b=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||(b.push(new m["default"](this.player_,{kind:this.kind_})),this.hideThreshold_+=1),a.prototype.createItems.call(this,b)},b}(i["default"]);n.prototype.kind_="captions",n.prototype.controlText_="Captions",k["default"].registerComponent("CaptionsButton",n),c["default"]=n},{23:23,30:30,5:5}],25:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(30),i=d(h),j=a(5),k=d(j),l=a(26),m=d(l),n=a(91),o=d(n),p=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));return h.el_.setAttribute("aria-label","Chapters Menu"),h}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-chapters-button "+a.prototype.buildCSSClass.call(this)},b.prototype.update=function(b){this.track_&&(!b||"addtrack"!==b.type&&"removetrack"!==b.type)||this.setTrack(this.findChaptersTrack()),a.prototype.update.call(this)},b.prototype.setTrack=function(a){if(this.track_!==a){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){var b=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);b&&b.removeEventListener("load",this.updateHandler_),this.track_=null}if(this.track_=a,this.track_){this.track_.mode="hidden";var c=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);c&&c.addEventListener("load",this.updateHandler_)}}},b.prototype.findChaptersTrack=function(){for(var a=this.player_.textTracks()||[],b=a.length-1;b>=0;b--){var c=a[b];if(c.kind===this.kind_)return c}},b.prototype.getMenuCaption=function(){return this.track_&&this.track_.label?this.track_.label:this.localize((0,o["default"])(this.kind_))},b.prototype.createMenu=function(){return this.options_.title=this.getMenuCaption(),a.prototype.createMenu.call(this)},b.prototype.createItems=function(){var a=[];if(!this.track_)return a;var b=this.track_.cues;if(!b)return a;for(var c=0,d=b.length;c<d;c++){var e=b[c],f=new m["default"](this.player_,{track:this.track_,cue:e});a.push(f)}return a},b}(i["default"]);p.prototype.kind_="chapters",p.prototype.controlText_="Chapters",k["default"].registerComponent("ChaptersButton",p),c["default"]=p},{26:26,30:30,5:5,91:91}],26:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(48),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d){f(this,b);var e=d.track,h=d.cue,i=c.currentTime();d.selectable=!0,d.label=h.text,d.selected=h.startTime<=i&&i<h.endTime;var j=g(this,a.call(this,c,d));return j.track=e,j.cue=h,e.addEventListener("cuechange",n.bind(j,j.update)),j}return h(b,a),b.prototype.handleClick=function(b){a.prototype.handleClick.call(this),this.player_.currentTime(this.cue.startTime),this.update(this.cue.startTime)},b.prototype.update=function(a){var b=this.cue,c=this.player_.currentTime();this.selected(b.startTime<=c&&c<b.endTime)},b}(j["default"]);l["default"].registerComponent("ChaptersTrackMenuItem",o),c["default"]=o},{48:48,5:5,83:83}],27:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(30),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d,e){f(this,b);var h=g(this,a.call(this,c,d,e));h.el_.setAttribute("aria-label","Descriptions Menu");var i=c.textTracks();if(i){var j=n.bind(h,h.handleTracksChange);i.addEventListener("change",j),h.on("dispose",function(){i.removeEventListener("change",j)})}return h}return h(b,a),b.prototype.handleTracksChange=function(a){for(var b=this.player().textTracks(),c=!1,d=0,e=b.length;d<e;d++){var f=b[d];if(f.kind!==this.kind_&&"showing"===f.mode){c=!0;break}}c?this.disable():this.enable()},b.prototype.buildCSSClass=function(){return"vjs-descriptions-button "+a.prototype.buildCSSClass.call(this)},b}(j["default"]);o.prototype.kind_="descriptions",o.prototype.controlText_="Descriptions",l["default"].registerComponent("DescriptionsButton",o),c["default"]=o},{30:30,5:5,83:83}],28:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(31),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b),d.track={player:c,kind:d.kind,label:d.kind+" off","default":!1,mode:"disabled"},d.selectable=!0;var g=f(this,a.call(this,c,d));return g.selected(!0),g}return g(b,a),b.prototype.handleTracksChange=function(a){for(var b=this.player().textTracks(),c=!0,d=0,e=b.length;d<e;d++){var f=b[d];if(f.kind===this.track.kind&&"showing"===f.mode){c=!1;break}}this.selected(c)},b}(i["default"]);k["default"].registerComponent("OffTextTrackMenuItem",l),c["default"]=l},{31:31,5:5}],29:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(30),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));return h.el_.setAttribute("aria-label","Subtitles Menu"),h}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-subtitles-button "+a.prototype.buildCSSClass.call(this)},b}(i["default"]);l.prototype.kind_="subtitles",l.prototype.controlText_="Subtitles",k["default"].registerComponent("SubtitlesButton",l),c["default"]=l},{30:30,5:5}],30:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(36),i=d(h),j=a(5),k=d(j),l=a(31),m=d(l),n=a(28),o=d(n),p=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e(this,b),d.tracks=c.textTracks(),f(this,a.call(this,c,d))}return g(b,a),b.prototype.createItems=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];a.push(new o["default"](this.player_,{kind:this.kind_})),this.hideThreshold_+=1;var b=this.player_.textTracks();if(!b)return a;for(var c=0;c<b.length;c++){var d=b[c];d.kind===this.kind_&&a.push(new m["default"](this.player_,{track:d,selectable:!0}))}return a},b}(i["default"]);k["default"].registerComponent("TextTrackButton",p),c["default"]=p},{28:28,31:31,36:36,5:5}],31:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},j=a(48),k=e(j),l=a(5),m=e(l),n=a(83),o=d(n),p=a(95),q=e(p),r=a(94),s=e(r),t=function(a){function b(c,d){f(this,b);var e=d.track,h=c.textTracks();d.label=e.label||e.language||"Unknown",d.selected=e["default"]||"showing"===e.mode;var j=g(this,a.call(this,c,d));if(j.track=e,h){var k=o.bind(j,j.handleTracksChange);h.addEventListener("change",k),j.on("dispose",function(){h.removeEventListener("change",k)})}if(h&&void 0===h.onchange){var l=void 0;j.on(["tap","click"],function(){if("object"!==i(q["default"].Event))try{l=new q["default"].Event("change")}catch(a){}l||(l=s["default"].createEvent("Event"),l.initEvent("change",!0,!0)),h.dispatchEvent(l)})}return j}return h(b,a),b.prototype.handleClick=function(b){var c=this.track.kind,d=this.player_.textTracks();if(a.prototype.handleClick.call(this,b),d)for(var e=0;e<d.length;e++){var f=d[e];f.kind===c&&(f===this.track?f.mode="showing":f.mode="disabled")}},b.prototype.handleTracksChange=function(a){this.selected("showing"===this.track.mode)},b}(k["default"]);m["default"].registerComponent("TextTrackMenuItem",t),c["default"]=t},{48:48,5:5,83:83,94:94,95:95}],32:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,
configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"timeupdate",e.updateContent),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-current-time vjs-time-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00'},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),c=this.localize("Current Time"),d=(0,n["default"])(b,this.player_.duration());d!==this.formattedTime_&&(this.formattedTime_=d,this.contentEl_.innerHTML='<span class="vjs-control-text">'+c+"</span> "+d)},b}(j["default"]);j["default"].registerComponent("CurrentTimeDisplay",o),c["default"]=o},{5:5,81:81,84:84}],33:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"durationchange",e.updateContent),e.on(c,"timeupdate",e.updateContent),e.on(c,"loadedmetadata",e.updateContent),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-duration vjs-time-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Duration Time")+"</span> 0:00"},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(a){var b=this.player_.duration();if(b&&this.duration_!==b){this.duration_=b;var c=this.localize("Duration Time"),d=(0,n["default"])(b);this.contentEl_.innerHTML='<span class="vjs-control-text">'+c+"</span> "+d}},b}(j["default"]);j["default"].registerComponent("DurationDisplay",o),c["default"]=o},{5:5,81:81,84:84}],34:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"timeupdate",e.updateContent),e.on(c,"durationchange",e.updateContent),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-remaining-time vjs-time-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Remaining Time")+"</span> -0:00"},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(a){if(this.player_.duration()){var b=this.localize("Remaining Time"),c=(0,n["default"])(this.player_.remainingTime());c!==this.formattedTime_&&(this.formattedTime_=c,this.contentEl_.innerHTML='<span class="vjs-control-text">'+b+"</span> -"+c)}},b}(j["default"]);j["default"].registerComponent("RemainingTimeDisplay",o),c["default"]=o},{5:5,81:81,84:84}],35:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-time-control vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},b}(i["default"]);i["default"].registerComponent("TimeDivider",j),c["default"]=j},{5:5}],36:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(47),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d){f(this,b);var e=d.tracks,h=g(this,a.call(this,c,d));if(h.items.length<=1&&h.hide(),!e)return g(h);var i=n.bind(h,h.update);return e.addEventListener("removetrack",i),e.addEventListener("addtrack",i),h.player_.on("dispose",function(){e.removeEventListener("removetrack",i),e.removeEventListener("addtrack",i)}),h}return h(b,a),b}(j["default"]);l["default"].registerComponent("TrackButton",o),c["default"]=o},{47:47,5:5,83:83}],37:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(57),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m);a(39);var o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"volumechange",e.updateARIAAttributes),c.ready(n.bind(e,e.updateARIAAttributes)),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":"volume level"})},b.prototype.handleMouseMove=function(a){this.checkMuted(),this.player_.volume(this.calculateDistance(a))},b.prototype.checkMuted=function(){this.player_.muted()&&this.player_.muted(!1)},b.prototype.getPercent=function(){return this.player_.muted()?0:this.player_.volume()},b.prototype.stepForward=function(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)},b.prototype.stepBack=function(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)},b.prototype.updateARIAAttributes=function(a){var b=(100*this.player_.volume()).toFixed(2);this.el_.setAttribute("aria-valuenow",b),this.el_.setAttribute("aria-valuetext",b+"%")},b}(j["default"]);o.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},o.prototype.playerEvent="volumechange",l["default"].registerComponent("VolumeBar",o),c["default"]=o},{39:39,5:5,57:57,83:83}],38:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h);a(37);var j=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return c.tech_&&c.tech_.featuresVolumeControl===!1&&g.addClass("vjs-hidden"),g.on(c,"loadstart",function(){c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}),g}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control"})},b}(i["default"]);j.prototype.options_={children:["volumeBar"]},i["default"].registerComponent("VolumeControl",j),c["default"]=j},{37:37,5:5}],39:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},b}(i["default"]);i["default"].registerComponent("VolumeLevel",j),c["default"]=j},{5:5}],40:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(83),j=e(i),k=a(5),l=d(k),m=a(54),n=d(m),o=a(53),p=d(o),q=a(11),r=d(q),s=a(37),t=d(s),u=function(a){function b(c){function d(){c.tech_&&c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f(this,b),void 0===e.inline&&(e.inline=!0),void 0===e.vertical&&(e.inline?e.vertical=!1:e.vertical=!0),e.volumeBar=e.volumeBar||{},e.volumeBar.vertical=!!e.vertical;var h=g(this,a.call(this,c,e));return h.on(c,"volumechange",h.volumeUpdate),h.on(c,"loadstart",h.volumeUpdate),d.call(h),h.on(c,"loadstart",d),h.on(h.volumeBar,["slideractive","focus"],function(){this.addClass("vjs-slider-active")}),h.on(h.volumeBar,["sliderinactive","blur"],function(){this.removeClass("vjs-slider-active")}),h.on(h.volumeBar,["focus"],function(){this.addClass("vjs-lock-showing")}),h.on(h.volumeBar,["blur"],function(){this.removeClass("vjs-lock-showing")}),h}return h(b,a),b.prototype.buildCSSClass=function(){var b="";return b=this.options_.vertical?"vjs-volume-menu-button-vertical":"vjs-volume-menu-button-horizontal","vjs-volume-menu-button "+a.prototype.buildCSSClass.call(this)+" "+b},b.prototype.createPopup=function(){var a=new n["default"](this.player_,{contentElType:"div"}),b=new t["default"](this.player_,this.options_.volumeBar);return a.addChild(b),this.menuContent=a,this.volumeBar=b,this.attachVolumeBarEvents(),a},b.prototype.handleClick=function(b){r["default"].prototype.handleClick.call(this),a.prototype.handleClick.call(this)},b.prototype.attachVolumeBarEvents=function(){this.menuContent.on(["mousedown","touchdown"],j.bind(this,this.handleMouseDown))},b.prototype.handleMouseDown=function(a){this.on(["mousemove","touchmove"],j.bind(this.volumeBar,this.volumeBar.handleMouseMove)),this.on(this.el_.ownerDocument,["mouseup","touchend"],this.handleMouseUp)},b.prototype.handleMouseUp=function(a){this.off(["mousemove","touchmove"],j.bind(this.volumeBar,this.volumeBar.handleMouseMove))},b}(p["default"]);u.prototype.volumeUpdate=r["default"].prototype.update,u.prototype.controlText_="Mute",l["default"].registerComponent("VolumeMenuButton",u),c["default"]=u},{11:11,37:37,5:5,53:53,54:54,83:83}],41:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=a(50),k=d(j),l=a(87),m=d(l),n=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.on(c,"error",g.open),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-error-display "+a.prototype.buildCSSClass.call(this)},b.prototype.content=function(){var a=this.player().error();return a?this.localize(a.message):""},b}(k["default"]);n.prototype.options_=(0,m["default"])(k["default"].prototype.options_,{fillAlways:!0,temporary:!1,uncloseable:!0}),i["default"].registerComponent("ErrorDisplay",n),c["default"]=n},{5:5,50:50,87:87}],42:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}c.__esModule=!0;var e=a(82),f=d(e),g=function(){};g.prototype.allowedEvents_={},g.prototype.on=function(a,b){var c=this.addEventListener;this.addEventListener=function(){},f.on(this,a,b),this.addEventListener=c},g.prototype.addEventListener=g.prototype.on,g.prototype.off=function(a,b){f.off(this,a,b)},g.prototype.removeEventListener=g.prototype.off,g.prototype.one=function(a,b){var c=this.addEventListener;this.addEventListener=function(){},f.one(this,a,b),this.addEventListener=c},g.prototype.trigger=function(a){var b=a.type||a;"string"==typeof a&&(a={type:b}),a=f.fixEvent(a),this.allowedEvents_[b]&&this["on"+b]&&this["on"+b](a),f.trigger(this,a)},g.prototype.dispatchEvent=g.prototype.trigger,c["default"]=g},{82:82}],43:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},f=a(86),g=d(f),h=a(88),i=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+(void 0===b?"undefined":e(b)));a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(a.super_=b)},j=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=function(){a.apply(this,arguments)},d={};(0,h.isObject)(b)?("function"==typeof b.init&&(g["default"].warn("Constructor logic via init() is deprecated; please use constructor() instead."),b.constructor=b.init),b.constructor!==Object.prototype.constructor&&(c=b.constructor),d=b):"function"==typeof b&&(c=b),i(c,a);for(var e in d)d.hasOwnProperty(e)&&(c.prototype[e]=d[e]);return c};c["default"]=j},{86:86,88:88}],44:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;for(var e=a(94),f=d(e),g={},h=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],i=h[0],j=void 0,k=0;k<h.length;k++)if(h[k][1]in f["default"]){j=h[k];break}if(j)for(var l=0;l<j.length;l++)g[i[l]]=j[l];c["default"]=g},{94:94}],45:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner",dir:"ltr"})},b}(i["default"]);i["default"].registerComponent("LoadingSpinner",j),c["default"]=j},{5:5}],46:[function(a,b,c){"use strict";function d(a){if(a instanceof d)return a;"number"==typeof a?this.code=a:"string"==typeof a?this.message=a:(0,e.isObject)(a)&&("number"==typeof a.code&&(this.code=a.code),(0,e.assign)(this,a)),this.message||(this.message=d.defaultMessages[this.code]||"")}c.__esModule=!0;var e=a(88);d.prototype.code=0,d.prototype.message="",d.prototype.status=null,d.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],d.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."};for(var f=0;f<d.errorTypes.length;f++)d[d.errorTypes[f]]=f,d.prototype[d.errorTypes[f]]=f;c["default"]=d},{88:88}],47:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(3),j=e(i),k=a(5),l=e(k),m=a(49),n=e(m),o=a(81),p=d(o),q=a(83),r=d(q),s=a(91),t=e(s),u=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f(this,b);var e=g(this,a.call(this,c,d));return e.update(),e.enabled_=!0,e.el_.setAttribute("aria-haspopup","true"),e.el_.setAttribute("role","menuitem"),e.on("keydown",e.handleSubmenuKeyPress),e}return h(b,a),b.prototype.update=function(){var a=this.createMenu();this.menu&&this.removeChild(this.menu),this.menu=a,this.addChild(a),this.buttonPressed_=!1,this.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?this.hide():this.show()},b.prototype.createMenu=function(){var a=new n["default"](this.player_);if(this.hideThreshold_=0,this.options_.title){var b=p.createEl("li",{className:"vjs-menu-title",innerHTML:(0,t["default"])(this.options_.title),tabIndex:-1});this.hideThreshold_+=1,a.children_.unshift(b),p.insertElFirst(b,a.contentEl())}if(this.items=this.createItems(),this.items)for(var c=0;c<this.items.length;c++)a.addItem(this.items[c]);return a},b.prototype.createItems=function(){},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b.prototype.buildCSSClass=function(){var b="vjs-menu-button";return b+=this.options_.inline===!0?"-inline":"-popup","vjs-menu-button "+b+" "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.one(this.menu.contentEl(),"mouseleave",r.bind(this,function(a){this.unpressButton(),this.el_.blur()})),this.buttonPressed_?this.unpressButton():this.pressButton()},b.prototype.handleKeyPress=function(b){27===b.which||9===b.which?(this.buttonPressed_&&this.unpressButton(),9!==b.which&&b.preventDefault()):38===b.which||40===b.which?this.buttonPressed_||(this.pressButton(),b.preventDefault()):a.prototype.handleKeyPress.call(this,b)},b.prototype.handleSubmenuKeyPress=function(a){27!==a.which&&9!==a.which||(this.buttonPressed_&&this.unpressButton(),9!==a.which&&a.preventDefault())},b.prototype.pressButton=function(){this.enabled_&&(this.buttonPressed_=!0,this.menu.lockShowing(),this.el_.setAttribute("aria-expanded","true"),this.menu.focus())},b.prototype.unpressButton=function(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-expanded","false"),this.el_.focus())},b.prototype.disable=function(){return this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-expanded","false"),this.enabled_=!1,a.prototype.disable.call(this)},b.prototype.enable=function(){return this.enabled_=!0,a.prototype.enable.call(this)},b}(j["default"]);l["default"].registerComponent("MenuButton",u),c["default"]=u},{3:3,49:49,5:5,81:81,83:83,91:91}],48:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(3),i=d(h),j=a(5),k=d(j),l=a(88),m=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.selectable=d.selectable,g.selected(d.selected),g.selectable?g.el_.setAttribute("role","menuitemcheckbox"):g.el_.setAttribute("role","menuitem"),g}return g(b,a),b.prototype.createEl=function(b,c,d){return this.nonIconControl=!0,a.prototype.createEl.call(this,"li",(0,l.assign)({className:"vjs-menu-item",innerHTML:this.localize(this.options_.label),tabIndex:-1},c),d)},b.prototype.handleClick=function(a){this.selected(!0)},b.prototype.selected=function(a){this.selectable&&(a?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected")):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText(" ")))},b}(i["default"]);k["default"].registerComponent("MenuItem",m),c["default"]=m},{3:3,5:5,88:88}],49:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(83),n=d(m),o=a(82),p=d(o),q=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.focusedChild_=-1,e.on("keydown",e.handleKeyPress),e}return h(b,a),b.prototype.addItem=function(a){this.addChild(a),a.on("click",n.bind(this,function(a){this.unlockShowing()}))},b.prototype.createEl=function(){var b=this.options_.contentElType||"ul";this.contentEl_=l.createEl(b,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");var c=a.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return c.setAttribute("role","presentation"),c.appendChild(this.contentEl_),p.on(c,"click",function(a){a.preventDefault(),a.stopImmediatePropagation()}),c},b.prototype.handleKeyPress=function(a){37===a.which||40===a.which?(a.preventDefault(),this.stepForward()):38!==a.which&&39!==a.which||(a.preventDefault(),this.stepBack())},b.prototype.stepForward=function(){var a=0;void 0!==this.focusedChild_&&(a=this.focusedChild_+1),this.focus(a)},b.prototype.stepBack=function(){var a=0;void 0!==this.focusedChild_&&(a=this.focusedChild_-1),this.focus(a)},b.prototype.focus=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,b=this.children().slice();b.length&&b[0].className&&/vjs-menu-title/.test(b[0].className)&&b.shift(),b.length>0&&(a<0?a=0:a>=b.length&&(a=b.length-1),this.focusedChild_=a,b[a].el_.focus())},b}(j["default"]);j["default"].registerComponent("Menu",q),c["default"]=q},{5:5,81:81,82:82,83:83}],50:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(81),j=e(i),k=a(83),l=e(k),m=a(5),n=d(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.opened_=e.hasBeenOpened_=e.hasBeenFilled_=!1,e.closeable(!e.options_.uncloseable),e.content(e.options_.content),e.contentEl_=j.createEl("div",{className:"vjs-modal-dialog-content"},{role:"document"}),e.descEl_=j.createEl("p",{className:"vjs-modal-dialog-description vjs-offscreen",id:e.el().getAttribute("aria-describedby")}),j.textContent(e.descEl_,e.description()),e.el_.appendChild(e.descEl_),e.el_.appendChild(e.contentEl_),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":this.id()+"_description","aria-hidden":"true","aria-label":this.label(),role:"dialog"})},b.prototype.buildCSSClass=function(){return"vjs-modal-dialog vjs-hidden "+a.prototype.buildCSSClass.call(this)},b.prototype.handleKeyPress=function(a){27===a.which&&this.closeable()&&this.close()},b.prototype.label=function(){return this.options_.label||this.localize("Modal Window")},b.prototype.description=function(){var a=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(a+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),a},b.prototype.open=function(){if(!this.opened_){var a=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!a.paused(),this.wasPlaying_&&a.pause(),this.closeable()&&this.on(this.el_.ownerDocument,"keydown",l.bind(this,this.handleKeyPress)),a.controls(!1),this.show(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}return this},b.prototype.opened=function(a){return"boolean"==typeof a&&this[a?"open":"close"](),this.opened_},b.prototype.close=function(){if(this.opened_){var a=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&a.play(),this.closeable()&&this.off(this.el_.ownerDocument,"keydown",l.bind(this,this.handleKeyPress)),a.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger("modalclose"),this.options_.temporary&&this.dispose()}return this},b.prototype.closeable=function c(a){if("boolean"==typeof a){var c=this.closeable_=!!a,b=this.getChild("closeButton");if(c&&!b){var d=this.contentEl_;this.contentEl_=this.el_,b=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=d,this.on(b,"close",this.close)}!c&&b&&(this.off(b,"close",this.close),this.removeChild(b),b.dispose())}return this.closeable_},b.prototype.fill=function(){return this.fillWith(this.content())},b.prototype.fillWith=function(a){var b=this.contentEl(),c=b.parentNode,d=b.nextSibling;return this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,
c.removeChild(b),this.empty(),j.insertContent(b,a),this.trigger("modalfill"),d?c.insertBefore(b,d):c.appendChild(b),this},b.prototype.empty=function(){return this.trigger("beforemodalempty"),j.emptyEl(this.contentEl()),this.trigger("modalempty"),this},b.prototype.content=function(a){return void 0!==a&&(this.content_=a),this.content_},b}(n["default"]);o.prototype.options_={temporary:!0},n["default"].registerComponent("ModalDialog",o),c["default"]=o},{5:5,81:81,83:83}],51:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(94),l=e(k),m=a(95),n=e(m),o=a(82),p=d(o),q=a(81),r=d(q),s=a(83),t=d(s),u=a(85),v=d(u),w=a(78),x=d(w),y=a(86),z=e(y),A=a(91),B=e(A),C=a(90),D=a(79),E=a(89),F=d(E),G=a(44),H=e(G),I=a(46),J=e(I),K=a(97),L=e(K),M=a(88),N=a(87),O=e(N),P=a(69),Q=e(P),R=a(50),S=e(R),T=a(62),U=e(T),V=a(63),W=e(V),X=a(76),Y=e(X);a(61),a(59),a(55),a(68),a(45),a(1),a(4),a(8),a(41),a(71),a(60);var Z=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","ratechange","volumechange","texttrackchange"],$=function(a){function b(c,d,e){if(f(this,b),c.id=c.id||"vjs_video_"+v.newGUID(),d=(0,M.assign)(b.getTagSettings(c),d),d.initChildren=!1,d.createEl=!1,d.reportTouchActivity=!1,!d.language)if("function"==typeof c.closest){var h=c.closest("[lang]");h&&(d.language=h.getAttribute("lang"))}else for(var i=c;i&&1===i.nodeType;){if(r.getElAttributes(i).hasOwnProperty("lang")){d.language=i.getAttribute("lang");break}i=i.parentNode}var j=g(this,a.call(this,null,d,e));if(!j.options_||!j.options_.techOrder||!j.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(j.tag=c,j.tagAttributes=c&&r.getElAttributes(c),j.language(j.options_.language),d.languages){var k={};Object.getOwnPropertyNames(d.languages).forEach(function(a){k[a.toLowerCase()]=d.languages[a]}),j.languages_=k}else j.languages_=b.prototype.options_.languages;j.cache_={},j.poster_=d.poster||"",j.controls_=!!d.controls,c.controls=!1,j.scrubbing_=!1,j.el_=j.createEl();var l=(0,O["default"])(j.options_);if(d.plugins){var m=d.plugins;Object.getOwnPropertyNames(m).forEach(function(a){"function"==typeof this[a]?this[a](m[a]):z["default"].error("Unable to find plugin:",a)},j)}return j.options_.playerOptions=l,j.initChildren(),j.isAudio("audio"===c.nodeName.toLowerCase()),j.controls()?j.addClass("vjs-controls-enabled"):j.addClass("vjs-controls-disabled"),j.el_.setAttribute("role","region"),j.isAudio()?j.el_.setAttribute("aria-label","audio player"):j.el_.setAttribute("aria-label","video player"),j.isAudio()&&j.addClass("vjs-audio"),j.flexNotSupported_()&&j.addClass("vjs-no-flex"),x.IS_IOS||j.addClass("vjs-workinghover"),b.players[j.id_]=j,j.userActive(!0),j.reportUserActivity(),j.listenForUserActivity_(),j.on("fullscreenchange",j.handleFullscreenChange_),j.on("stageclick",j.handleStageClick_),j}return h(b,a),b.prototype.dispose=function(){this.trigger("dispose"),this.off("dispose"),this.styleEl_&&this.styleEl_.parentNode&&this.styleEl_.parentNode.removeChild(this.styleEl_),b.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&this.tech_.dispose(),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var b=this.tag,c=void 0,d=this.playerElIngest_=b.parentNode&&b.parentNode.hasAttribute&&b.parentNode.hasAttribute("data-vjs-player");c=this.el_=d?b.parentNode:a.prototype.createEl.call(this,"div"),b.setAttribute("tabindex","-1"),b.removeAttribute("width"),b.removeAttribute("height");var e=r.getElAttributes(b);if(Object.getOwnPropertyNames(e).forEach(function(a){"class"===a?c.className+=" "+e[a]:c.setAttribute(a,e[a])}),b.playerId=b.id,b.id+="_html5_api",b.className="vjs-tech",b.player=c.player=this,this.addClass("vjs-paused"),n["default"].VIDEOJS_NO_DYNAMIC_STYLE!==!0){this.styleEl_=F.createStyleElement("vjs-styles-dimensions");var f=r.$(".vjs-styles-defaults"),g=r.$("head");g.insertBefore(this.styleEl_,f?f.nextSibling:g.firstChild)}this.width(this.options_.width),this.height(this.options_.height),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio);for(var h=b.getElementsByTagName("a"),i=0;i<h.length;i++){var j=h.item(i);r.addElClass(j,"vjs-hidden"),j.setAttribute("hidden","hidden")}return b.initNetworkState_=b.networkState,b.parentNode&&!d&&b.parentNode.insertBefore(c,b),r.insertElFirst(b,c),this.children_.unshift(b),this.el_=c,c},b.prototype.width=function(a){return this.dimension("width",a)},b.prototype.height=function(a){return this.dimension("height",a)},b.prototype.dimension=function(a,b){var c=a+"_";if(void 0===b)return this[c]||0;if(""===b)this[c]=void 0;else{var d=parseFloat(b);if(isNaN(d))return z["default"].error('Improper value "'+b+'" supplied for for '+a),this;this[c]=d}return this.updateStyleEl_(),this},b.prototype.fluid=function(a){if(void 0===a)return!!this.fluid_;this.fluid_=!!a,a?this.addClass("vjs-fluid"):this.removeClass("vjs-fluid"),this.updateStyleEl_()},b.prototype.aspectRatio=function(a){if(void 0===a)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(a))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=a,this.fluid(!0),this.updateStyleEl_()},b.prototype.updateStyleEl_=function(){if(n["default"].VIDEOJS_NO_DYNAMIC_STYLE===!0){var a="number"==typeof this.width_?this.width_:this.options_.width,b="number"==typeof this.height_?this.height_:this.options_.height,c=this.tech_&&this.tech_.el();return void(c&&(a>=0&&(c.width=a),b>=0&&(c.height=b)))}var d=void 0,e=void 0,f=void 0,g=void 0;f=void 0!==this.aspectRatio_&&"auto"!==this.aspectRatio_?this.aspectRatio_:this.videoWidth()>0?this.videoWidth()+":"+this.videoHeight():"16:9";var h=f.split(":"),i=h[1]/h[0];d=void 0!==this.width_?this.width_:void 0!==this.height_?this.height_/i:this.videoWidth()||300,e=void 0!==this.height_?this.height_:d*i,g=/^[^a-zA-Z]/.test(this.id())?"dimensions-"+this.id():this.id()+"-dimensions",this.addClass(g),F.setTextContent(this.styleEl_,"\n      ."+g+" {\n        width: "+d+"px;\n        height: "+e+"px;\n      }\n\n      ."+g+".vjs-fluid {\n        padding-top: "+100*i+"%;\n      }\n    ")},b.prototype.loadTech_=function(a,b){var c=this;this.tech_&&this.unloadTech_(),"Html5"!==a&&this.tag&&(U["default"].getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=a,this.isReady_=!1;var d=(0,M.assign)({source:b,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:this.id()+"_"+a+"_api",videoTracks:this.videoTracks_,textTracks:this.textTracks_,audioTracks:this.audioTracks_,autoplay:this.options_.autoplay,preload:this.options_.preload,loop:this.options_.loop,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"]},this.options_[a.toLowerCase()]);this.tag&&(d.tag=this.tag),b&&(this.currentType_=b.type,b.src===this.cache_.src&&this.cache_.currentTime>0&&(d.startTime=this.cache_.currentTime),this.cache_.sources=null,this.cache_.source=b,this.cache_.src=b.src);var e=U["default"].getTech(a);e||(e=j["default"].getComponent(a)),this.tech_=new e(d),this.tech_.ready(t.bind(this,this.handleTechReady_),!0),Q["default"].jsonToTextTracks(this.textTracksJson_||[],this.tech_),Z.forEach(function(a){c.on(c.tech_,a,c["handleTech"+(0,B["default"])(a)+"_"])}),this.on(this.tech_,"loadstart",this.handleTechLoadStart_),this.on(this.tech_,"waiting",this.handleTechWaiting_),this.on(this.tech_,"canplay",this.handleTechCanPlay_),this.on(this.tech_,"canplaythrough",this.handleTechCanPlayThrough_),this.on(this.tech_,"playing",this.handleTechPlaying_),this.on(this.tech_,"ended",this.handleTechEnded_),this.on(this.tech_,"seeking",this.handleTechSeeking_),this.on(this.tech_,"seeked",this.handleTechSeeked_),this.on(this.tech_,"play",this.handleTechPlay_),this.on(this.tech_,"firstplay",this.handleTechFirstPlay_),this.on(this.tech_,"pause",this.handleTechPause_),this.on(this.tech_,"durationchange",this.handleTechDurationChange_),this.on(this.tech_,"fullscreenchange",this.handleTechFullscreenChange_),this.on(this.tech_,"error",this.handleTechError_),this.on(this.tech_,"loadedmetadata",this.updateStyleEl_),this.on(this.tech_,"posterchange",this.handleTechPosterChange_),this.on(this.tech_,"textdata",this.handleTechTextData_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode===this.el()||"Html5"===a&&this.tag||r.insertElFirst(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)},b.prototype.unloadTech_=function(){this.videoTracks_=this.videoTracks(),this.textTracks_=this.textTracks(),this.audioTracks_=this.audioTracks(),this.textTracksJson_=Q["default"].textTracksToJson(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1},b.prototype.tech=function(a){if(a&&a.IWillNotUseThisInPlugins)return this.tech_;var b="\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ";throw n["default"].alert(b),new Error(b)},b.prototype.addTechControlsListeners_=function(){this.removeTechControlsListeners_(),this.on(this.tech_,"mousedown",this.handleTechClick_),this.on(this.tech_,"touchstart",this.handleTechTouchStart_),this.on(this.tech_,"touchmove",this.handleTechTouchMove_),this.on(this.tech_,"touchend",this.handleTechTouchEnd_),this.on(this.tech_,"tap",this.handleTechTap_)},b.prototype.removeTechControlsListeners_=function(){this.off(this.tech_,"tap",this.handleTechTap_),this.off(this.tech_,"touchstart",this.handleTechTouchStart_),this.off(this.tech_,"touchmove",this.handleTechTouchMove_),this.off(this.tech_,"touchend",this.handleTechTouchEnd_),this.off(this.tech_,"mousedown",this.handleTechClick_)},b.prototype.handleTechReady_=function(){if(this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_(),(this.src()||this.currentSrc())&&this.tag&&this.options_.autoplay&&this.paused()){try{delete this.tag.poster}catch(a){(0,z["default"])("deleting tag.poster throws in some browsers",a)}this.play()}},b.prototype.handleTechLoadStart_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-seeking"),this.error(null),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):(this.trigger("loadstart"),this.trigger("firstplay"))},b.prototype.hasStarted=function(a){return void 0!==a?(this.hasStarted_!==a&&(this.hasStarted_=a,a?(this.addClass("vjs-has-started"),this.trigger("firstplay")):this.removeClass("vjs-has-started")),this):!!this.hasStarted_},b.prototype.handleTechPlay_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")},b.prototype.handleTechWaiting_=function(){var a=this;this.addClass("vjs-waiting"),this.trigger("waiting"),this.one("timeupdate",function(){return a.removeClass("vjs-waiting")})},b.prototype.handleTechCanPlay_=function(){this.removeClass("vjs-waiting"),this.trigger("canplay")},b.prototype.handleTechCanPlayThrough_=function(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")},b.prototype.handleTechPlaying_=function(){this.removeClass("vjs-waiting"),this.trigger("playing")},b.prototype.handleTechSeeking_=function(){this.addClass("vjs-seeking"),this.trigger("seeking")},b.prototype.handleTechSeeked_=function(){this.removeClass("vjs-seeking"),this.trigger("seeked")},b.prototype.handleTechFirstPlay_=function(){this.options_.starttime&&(z["default"].warn("Passing the `starttime` option to the player will be deprecated in 6.0"),this.currentTime(this.options_.starttime)),this.addClass("vjs-has-started"),this.trigger("firstplay")},b.prototype.handleTechPause_=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")},b.prototype.handleTechEnded_=function(){this.addClass("vjs-ended"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")},b.prototype.handleTechDurationChange_=function(){this.duration(this.techGet_("duration"))},b.prototype.handleTechClick_=function(a){0===a.button&&this.controls()&&(this.paused()?this.play():this.pause())},b.prototype.handleTechTap_=function(){this.userActive(!this.userActive())},b.prototype.handleTechTouchStart_=function(){this.userWasActive=this.userActive()},b.prototype.handleTechTouchMove_=function(){this.userWasActive&&this.reportUserActivity()},b.prototype.handleTechTouchEnd_=function(a){a.preventDefault()},b.prototype.handleFullscreenChange_=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")},b.prototype.handleStageClick_=function(){this.reportUserActivity()},b.prototype.handleTechFullscreenChange_=function(a,b){b&&this.isFullscreen(b.isFullscreen),this.trigger("fullscreenchange")},b.prototype.handleTechError_=function(){var a=this.tech_.error();this.error(a)},b.prototype.handleTechTextData_=function(){var a=null;arguments.length>1&&(a=arguments[1]),this.trigger("textdata",a)},b.prototype.getCache=function(){return this.cache_},b.prototype.techCall_=function(a,b){if(this.tech_&&!this.tech_.isReady_)this.tech_.ready(function(){this[a](b)},!0);else try{this.tech_&&this.tech_[a](b)}catch(c){throw(0,z["default"])(c),c}},b.prototype.techGet_=function(a){if(this.tech_&&this.tech_.isReady_)try{return this.tech_[a]()}catch(b){throw void 0===this.tech_[a]?(0,z["default"])("Video.js: "+a+" method not defined for "+this.techName_+" playback technology.",b):"TypeError"===b.name?((0,z["default"])("Video.js: "+a+" unavailable on "+this.techName_+" playback technology element.",b),this.tech_.isReady_=!1):(0,z["default"])(b),b}},b.prototype.play=function(){return this.src()||this.currentSrc()?this.techCall_("play"):this.tech_.one("loadstart",function(){this.play()}),this},b.prototype.pause=function(){return this.techCall_("pause"),this},b.prototype.paused=function(){return this.techGet_("paused")!==!1},b.prototype.scrubbing=function(a){return void 0!==a?(this.scrubbing_=!!a,a?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing"),this):this.scrubbing_},b.prototype.currentTime=function(a){return void 0!==a?(this.techCall_("setCurrentTime",a),this):(this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime)},b.prototype.duration=function(a){return void 0===a?this.cache_.duration||0:(a=parseFloat(a)||0,a<0&&(a=1/0),a!==this.cache_.duration&&(this.cache_.duration=a,a===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),this.trigger("durationchange")),this)},b.prototype.remainingTime=function(){return this.duration()-this.currentTime()},b.prototype.buffered=function c(){var c=this.techGet_("buffered");return c&&c.length||(c=(0,C.createTimeRange)(0,0)),c},b.prototype.bufferedPercent=function(){return(0,D.bufferedPercent)(this.buffered(),this.duration())},b.prototype.bufferedEnd=function(){var a=this.buffered(),b=this.duration(),c=a.end(a.length-1);return c>b&&(c=b),c},b.prototype.volume=function(a){var b=void 0;return void 0!==a?(b=Math.max(0,Math.min(1,parseFloat(a))),this.cache_.volume=b,this.techCall_("setVolume",b),this):(b=parseFloat(this.techGet_("volume")),isNaN(b)?1:b)},b.prototype.muted=function(a){return void 0!==a?(this.techCall_("setMuted",a),this):this.techGet_("muted")||!1},b.prototype.supportsFullScreen=function(){return this.techGet_("supportsFullScreen")||!1},b.prototype.isFullscreen=function(a){return void 0!==a?(this.isFullscreen_=!!a,this):!!this.isFullscreen_},b.prototype.requestFullscreen=function(){var a=H["default"];return this.isFullscreen(!0),a.requestFullscreen?(p.on(l["default"],a.fullscreenchange,t.bind(this,function b(c){this.isFullscreen(l["default"][a.fullscreenElement]),this.isFullscreen()===!1&&p.off(l["default"],a.fullscreenchange,b),this.trigger("fullscreenchange")})),this.el_[a.requestFullscreen]()):this.tech_.supportsFullScreen()?this.techCall_("enterFullScreen"):(this.enterFullWindow(),this.trigger("fullscreenchange")),this},b.prototype.exitFullscreen=function(){var a=H["default"];return this.isFullscreen(!1),a.requestFullscreen?l["default"][a.exitFullscreen]():this.tech_.supportsFullScreen()?this.techCall_("exitFullScreen"):(this.exitFullWindow(),this.trigger("fullscreenchange")),this},b.prototype.enterFullWindow=function(){this.isFullWindow=!0,this.docOrigOverflow=l["default"].documentElement.style.overflow,p.on(l["default"],"keydown",t.bind(this,this.fullWindowOnEscKey)),l["default"].documentElement.style.overflow="hidden",r.addElClass(l["default"].body,"vjs-full-window"),this.trigger("enterFullWindow")},b.prototype.fullWindowOnEscKey=function(a){27===a.keyCode&&(this.isFullscreen()===!0?this.exitFullscreen():this.exitFullWindow())},b.prototype.exitFullWindow=function(){this.isFullWindow=!1,p.off(l["default"],"keydown",this.fullWindowOnEscKey),l["default"].documentElement.style.overflow=this.docOrigOverflow,r.removeElClass(l["default"].body,"vjs-full-window"),this.trigger("exitFullWindow")},b.prototype.canPlayType=function(a){for(var b=void 0,c=0,d=this.options_.techOrder;c<d.length;c++){var e=(0,B["default"])(d[c]),f=U["default"].getTech(e);if(f||(f=j["default"].getComponent(e)),f){if(f.isSupported()&&(b=f.canPlayType(a)))return b}else z["default"].error('The "'+e+'" tech is undefined. Skipped browser support check for that tech.')}return""},b.prototype.selectSource=function(a){var b=this,c=this.options_.techOrder.map(B["default"]).map(function(a){return[a,U["default"].getTech(a)||j["default"].getComponent(a)]}).filter(function(a){var b=a[0],c=a[1];return c?c.isSupported():(z["default"].error('The "'+b+'" tech is undefined. Skipped browser support check for that tech.'),!1)}),d=function(a,b,c){var d=void 0;return a.some(function(a){return b.some(function(b){if(d=c(a,b))return!0})}),d},e=void 0,f=function(a){return function(b,c){return a(c,b)}},g=function(a,c){var d=a[0];if(a[1].canPlaySource(c,b.options_[d.toLowerCase()]))return{source:c,tech:d}};return e=this.options_.sourceOrder?d(a,c,f(g)):d(c,a,g),e||!1},b.prototype.src=function(a){if(void 0===a)return this.techGet_("src");var b=U["default"].getTech(this.techName_);return b||(b=j["default"].getComponent(this.techName_)),Array.isArray(a)?this.sourceList_(a):"string"==typeof a?this.src({src:a}):a instanceof Object&&(a.type&&!b.canPlaySource(a,this.options_[this.techName_.toLowerCase()])?this.sourceList_([a]):(this.cache_.sources=null,this.cache_.source=a,this.cache_.src=a.src,this.currentType_=a.type||"",this.ready(function(){b.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",a):this.techCall_("src",a.src),"auto"===this.options_.preload&&this.load(),this.options_.autoplay&&this.play()},!0))),this},b.prototype.sourceList_=function(a){var b=this.selectSource(a);b?(b.tech===this.techName_?this.src(b.source):this.loadTech_(b.tech,b.source),this.cache_.sources=a):(this.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0),this.triggerReady())},b.prototype.load=function(){return this.techCall_("load"),this},b.prototype.reset=function(){return this.loadTech_((0,B["default"])(this.options_.techOrder[0]),null),this.techCall_("reset"),this},b.prototype.currentSources=function(){var a=this.currentSource(),b=[];return 0!==Object.keys(a).length&&b.push(a),this.cache_.sources||b},b.prototype.currentSource=function(){var a={},b=this.currentSrc();return b&&(a.src=b),this.cache_.source||a},b.prototype.currentSrc=function(){return this.techGet_("currentSrc")||this.cache_.src||""},b.prototype.currentType=function(){return this.currentType_||""},b.prototype.preload=function(a){return void 0!==a?(this.techCall_("setPreload",a),this.options_.preload=a,this):this.techGet_("preload")},b.prototype.autoplay=function(a){return void 0!==a?(this.techCall_("setAutoplay",a),this.options_.autoplay=a,this):this.techGet_("autoplay",a)},b.prototype.loop=function(a){return void 0!==a?(this.techCall_("setLoop",a),this.options_.loop=a,this):this.techGet_("loop")},b.prototype.poster=function(a){return void 0===a?this.poster_:(a||(a=""),this.poster_=a,this.techCall_("setPoster",a),this.trigger("posterchange"),this)},b.prototype.handleTechPosterChange_=function(){!this.poster_&&this.tech_&&this.tech_.poster&&(this.poster_=this.tech_.poster()||"",this.trigger("posterchange"))},b.prototype.controls=function(a){return void 0!==a?(a=!!a,this.controls_!==a&&(this.controls_=a,this.usingNativeControls()&&this.techCall_("setControls",a),a?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_())),this):!!this.controls_},b.prototype.usingNativeControls=function(a){return void 0!==a?(a=!!a,this.usingNativeControls_!==a&&(this.usingNativeControls_=a,a?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols"))),this):!!this.usingNativeControls_},b.prototype.error=function(a){return void 0===a?this.error_||null:null===a?(this.error_=a,this.removeClass("vjs-error"),this.errorDisplay&&this.errorDisplay.close(),this):(this.error_=new J["default"](a),this.addClass("vjs-error"),z["default"].error("(CODE:"+this.error_.code+" "+J["default"].errorTypes[this.error_.code]+")",this.error_.message,this.error_),this.trigger("error"),this)},b.prototype.reportUserActivity=function(a){this.userActivity_=!0},b.prototype.userActive=function(a){return void 0!==a?(a=!!a,a!==this.userActive_&&(this.userActive_=a,a?(this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive")):(this.userActivity_=!1,this.tech_&&this.tech_.one("mousemove",function(a){a.stopPropagation(),a.preventDefault()}),this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive"))),this):this.userActive_},b.prototype.listenForUserActivity_=function(){var a=void 0,b=void 0,c=void 0,d=t.bind(this,this.reportUserActivity),e=function(a){a.screenX===b&&a.screenY===c||(b=a.screenX,c=a.screenY,d())},f=function(){d(),this.clearInterval(a),a=this.setInterval(d,250)},g=function(b){d(),this.clearInterval(a)};this.on("mousedown",f),this.on("mousemove",e),this.on("mouseup",g),this.on("keydown",d),this.on("keyup",d);var h=void 0;this.setInterval(function(){if(this.userActivity_){this.userActivity_=!1,this.userActive(!0),this.clearTimeout(h);var a=this.options_.inactivityTimeout;a>0&&(h=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},a))}},250)},b.prototype.playbackRate=function(a){return void 0!==a?(this.techCall_("setPlaybackRate",a),this):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("playbackRate"):1},b.prototype.isAudio=function(a){return void 0!==a?(this.isAudio_=!!a,this):!!this.isAudio_},b.prototype.videoTracks=function(){return this.tech_?this.tech_.videoTracks():(this.videoTracks_=this.videoTracks_||new Y["default"],this.videoTracks_)},b.prototype.audioTracks=function(){return this.tech_?this.tech_.audioTracks():(this.audioTracks_=this.audioTracks_||new W["default"],this.audioTracks_)},b.prototype.textTracks=function(){if(this.tech_)return this.tech_.textTracks()},b.prototype.remoteTextTracks=function(){if(this.tech_)return this.tech_.remoteTextTracks()},b.prototype.remoteTextTrackEls=function(){if(this.tech_)return this.tech_.remoteTextTrackEls()},b.prototype.addTextTrack=function(a,b,c){if(this.tech_)return this.tech_.addTextTrack(a,b,c)},b.prototype.addRemoteTextTrack=function(a,b){if(this.tech_)return this.tech_.addRemoteTextTrack(a,b)},b.prototype.removeRemoteTextTrack=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=a.track,c=void 0===b?arguments[0]:b;if(this.tech_)return this.tech_.removeRemoteTextTrack(c)},b.prototype.videoWidth=function(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0},b.prototype.videoHeight=function(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0},b.prototype.language=function(a){return void 0===a?this.language_:(this.language_=String(a).toLowerCase(),this)},b.prototype.languages=function(){return(0,O["default"])(b.prototype.options_.languages,this.languages_)},b.prototype.toJSON=function(){var a=(0,O["default"])(this.options_),b=a.tracks;a.tracks=[];for(var c=0;c<b.length;c++){var d=b[c];d=(0,O["default"])(d),d.player=void 0,a.tracks[c]=d}return a},b.prototype.createModal=function(a,b){var c=this;b=b||{},b.content=a||"";var d=new S["default"](this,b);return this.addChild(d),d.on("dispose",function(){c.removeChild(d)}),d.open()},b.getTagSettings=function(a){var b={sources:[],tracks:[]},c=r.getElAttributes(a),d=c["data-setup"];if(r.hasElClass(a,"vjs-fluid")&&(c.fluid=!0),null!==d){var e=(0,L["default"])(d||"{}"),f=e[0],g=e[1];f&&z["default"].error(f),(0,M.assign)(c,g)}if((0,M.assign)(b,c),a.hasChildNodes())for(var h=a.childNodes,i=0,j=h.length;i<j;i++){var k=h[i],l=k.nodeName.toLowerCase();"source"===l?b.sources.push(r.getElAttributes(k)):"track"===l&&b.tracks.push(r.getElAttributes(k))}return b},b.prototype.flexNotSupported_=function(){var a=l["default"].createElement("i");return!("flexBasis"in a.style||"webkitFlexBasis"in a.style||"mozFlexBasis"in a.style||"msFlexBasis"in a.style||"msFlexOrder"in a.style)},b}(j["default"]);$.players={};var _=n["default"].navigator;$.prototype.options_={techOrder:["html5","flash"],html5:{},flash:{},defaultVolume:0,inactivityTimeout:2e3,playbackRates:[],children:["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","controlBar","errorDisplay","textTrackSettings"],language:_&&(_.languages&&_.languages[0]||_.userLanguage||_.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media."},["ended","seeking","seekable","networkState","readyState"].forEach(function(a){$.prototype[a]=function(){return this.techGet_(a)}}),Z.forEach(function(a){$.prototype["handleTech"+(0,B["default"])(a)+"_"]=function(){return this.trigger(a)}}),j["default"].registerComponent("Player",$),c["default"]=$},{1:1,4:4,41:41,44:44,45:45,46:46,5:5,50:50,55:55,59:59,60:60,61:61,62:62,63:63,68:68,69:69,71:71,76:76,78:78,79:79,8:8,81:81,82:82,83:83,85:85,86:86,87:87,88:88,89:89,90:90,91:91,94:94,95:95,97:97}],52:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a(51),f=d(e),g=function(a,b){f["default"].prototype[a]=b};c["default"]=g},{51:51}],53:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(3),i=d(h),j=a(5),k=d(j),l=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e(this,b);var g=f(this,a.call(this,c,d));return g.update(),g}return g(b,a),b.prototype.update=function(){var a=this.createPopup();this.popup&&this.removeChild(this.popup),this.popup=a,this.addChild(a),this.items&&0===this.items.length?this.hide():this.items&&this.items.length>1&&this.show()},b.prototype.createPopup=function(){},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b.prototype.buildCSSClass=function(){var b="vjs-menu-button";return b+=this.options_.inline===!0?"-inline":"-popup","vjs-menu-button "+b+" "+a.prototype.buildCSSClass.call(this)},b}(i["default"]);k["default"].registerComponent("PopupButton",l),c["default"]=l},{3:3,5:5}],54:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(83),n=d(m),o=a(82),p=d(o),q=function(a){function b(){return f(this,b),g(this,a.apply(this,arguments))}return h(b,a),b.prototype.addItem=function(a){this.addChild(a),a.on("click",n.bind(this,function(){this.unlockShowing()}))},b.prototype.createEl=function(){var b=this.options_.contentElType||"ul";this.contentEl_=l.createEl(b,{className:"vjs-menu-content"});var c=a.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return c.appendChild(this.contentEl_),p.on(c,"click",function(a){a.preventDefault(),a.stopImmediatePropagation()}),c},b}(j["default"]);j["default"].registerComponent("Popup",q),c["default"]=q},{5:5,81:81,82:82,83:83}],55:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(3),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=a(81),p=d(o),q=a(78),r=d(q),s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.update(),c.on("posterchange",n.bind(e,e.update)),e}return h(b,a),b.prototype.dispose=function(){
this.player().off("posterchange",this.update),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var a=p.createEl("div",{className:"vjs-poster",tabIndex:-1});return r.BACKGROUND_SIZE_SUPPORTED||(this.fallbackImg_=p.createEl("img"),a.appendChild(this.fallbackImg_)),a},b.prototype.update=function(a){var b=this.player().poster();this.setSrc(b),b?this.show():this.hide()},b.prototype.setSrc=function(a){if(this.fallbackImg_)this.fallbackImg_.src=a;else{var b="";a&&(b='url("'+a+'")'),this.el_.style.backgroundImage=b}},b.prototype.handleClick=function(a){this.player_.controls()&&(this.player_.paused()?this.player_.play():this.player_.pause())},b}(j["default"]);l["default"].registerComponent("PosterImage",s),c["default"]=s},{3:3,5:5,78:78,81:81,83:83}],56:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){b&&(p=b),n["default"].setTimeout(q,a)}c.__esModule=!0,c.hasLoaded=c.autoSetupTimeout=c.autoSetup=void 0;var g=a(81),h=e(g),i=a(82),j=e(i),k=a(94),l=d(k),m=a(95),n=d(m),o=!1,p=void 0,q=function(){if(h.isReal()){var a=l["default"].getElementsByTagName("video"),b=l["default"].getElementsByTagName("audio"),c=[];if(a&&a.length>0)for(var d=0,e=a.length;d<e;d++)c.push(a[d]);if(b&&b.length>0)for(var g=0,i=b.length;g<i;g++)c.push(b[g]);if(c&&c.length>0)for(var j=0,k=c.length;j<k;j++){var m=c[j];if(!m||!m.getAttribute){f(1);break}if(void 0===m.player){var n=m.getAttribute("data-setup");null!==n&&p(m)}}else o||f(1)}};h.isReal()&&"complete"===l["default"].readyState?o=!0:j.one(n["default"],"load",function(){o=!0});var r=function(){return o};c.autoSetup=q,c.autoSetupTimeout=f,c.hasLoaded=r},{81:81,82:82,94:94,95:95}],57:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(88),n=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.bar=e.getChild(e.options_.barName),e.vertical(!!e.options_.vertical),e.on("mousedown",e.handleMouseDown),e.on("touchstart",e.handleMouseDown),e.on("focus",e.handleFocus),e.on("blur",e.handleBlur),e.on("click",e.handleClick),e.on(c,"controlsvisible",e.update),e.on(c,e.playerEvent,e.update),e}return h(b,a),b.prototype.createEl=function(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return c.className=c.className+" vjs-slider",c=(0,m.assign)({tabIndex:0},c),d=(0,m.assign)({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},d),a.prototype.createEl.call(this,b,c,d)},b.prototype.handleMouseDown=function(a){var b=this.bar.el_.ownerDocument;a.preventDefault(),l.blockTextSelection(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(b,"mousemove",this.handleMouseMove),this.on(b,"mouseup",this.handleMouseUp),this.on(b,"touchmove",this.handleMouseMove),this.on(b,"touchend",this.handleMouseUp),this.handleMouseMove(a)},b.prototype.handleMouseMove=function(a){},b.prototype.handleMouseUp=function(){var a=this.bar.el_.ownerDocument;l.unblockTextSelection(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(a,"mousemove",this.handleMouseMove),this.off(a,"mouseup",this.handleMouseUp),this.off(a,"touchmove",this.handleMouseMove),this.off(a,"touchend",this.handleMouseUp),this.update()},b.prototype.update=function(){if(this.el_){var a=this.getPercent(),b=this.bar;if(b){("number"!=typeof a||a!==a||a<0||a===1/0)&&(a=0);var c=(100*a).toFixed(2)+"%";this.vertical()?b.el().style.height=c:b.el().style.width=c}}},b.prototype.calculateDistance=function(a){var b=l.getPointerPosition(this.el_,a);return this.vertical()?b.y:b.x},b.prototype.handleFocus=function(){this.on(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},b.prototype.handleKeyPress=function(a){37===a.which||40===a.which?(a.preventDefault(),this.stepBack()):38!==a.which&&39!==a.which||(a.preventDefault(),this.stepForward())},b.prototype.handleBlur=function(){this.off(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},b.prototype.handleClick=function(a){a.stopImmediatePropagation(),a.preventDefault()},b.prototype.vertical=function(a){return void 0===a?this.vertical_||!1:(this.vertical_=!!a,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal"),this)},b}(j["default"]);j["default"].registerComponent("Slider",n),c["default"]=n},{5:5,81:81,88:88}],58:[function(a,b,c){"use strict";function d(a){return a.streamingFormats={"rtmp/mp4":"MP4","rtmp/flv":"FLV"},a.streamFromParts=function(a,b){return a+"&"+b},a.streamToParts=function(a){var b={connection:"",stream:""};if(!a)return b;var c=a.search(/&(?!\w+=)/),d=void 0;return c!==-1?d=c+1:(c=d=a.lastIndexOf("/")+1,0===c&&(c=d=a.length)),b.connection=a.substring(0,c),b.stream=a.substring(d,a.length),b},a.isStreamingType=function(b){return b in a.streamingFormats},a.RTMP_RE=/^rtmp[set]?:\/\//i,a.isStreamingSrc=function(b){return a.RTMP_RE.test(b)},a.rtmpSourceHandler={},a.rtmpSourceHandler.canPlayType=function(b){return a.isStreamingType(b)?"maybe":""},a.rtmpSourceHandler.canHandleSource=function(b,c){var d=a.rtmpSourceHandler.canPlayType(b.type);return d?d:a.isStreamingSrc(b.src)?"maybe":""},a.rtmpSourceHandler.handleSource=function(b,c,d){var e=a.streamToParts(b.src);c.setRtmpConnection(e.connection),c.setRtmpStream(e.stream)},a.registerSourceHandler(a.rtmpSourceHandler),a}c.__esModule=!0,c["default"]=d},{}],59:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a){A["set"+(a.charAt(0).toUpperCase()+a.slice(1))]=function(b){return this.el_.vjs_setProperty(a,b)}}function j(a){A[a]=function(){return this.el_.vjs_getProperty(a)}}c.__esModule=!0;for(var k=a(62),l=e(k),m=a(81),n=d(m),o=a(92),p=d(o),q=a(90),r=a(58),s=e(r),t=a(5),u=e(t),v=a(95),w=e(v),x=a(88),y=w["default"].navigator,z=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return c.source&&e.ready(function(){this.setSource(c.source)},!0),c.startTime&&e.ready(function(){this.load(),this.play(),this.currentTime(c.startTime)},!0),w["default"].videojs=w["default"].videojs||{},w["default"].videojs.Flash=w["default"].videojs.Flash||{},w["default"].videojs.Flash.onReady=b.onReady,w["default"].videojs.Flash.onEvent=b.onEvent,w["default"].videojs.Flash.onError=b.onError,e.on("seeked",function(){this.lastSeekTarget_=void 0}),e}return h(b,a),b.prototype.createEl=function(){var a=this.options_;if(!a.swf){a.swf="//vjs.zencdn.net/swf/5.3.0/video-js.swf"}var c=a.techId,d=(0,x.assign)({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:a.autoplay,preload:a.preload,loop:a.loop,muted:a.muted},a.flashVars),e=(0,x.assign)({wmode:"opaque",bgcolor:"#000000"},a.params),f=(0,x.assign)({id:c,name:c,"class":"vjs-tech"},a.attributes);return this.el_=b.embed(a.swf,d,e,f),this.el_.tech=this,this.el_},b.prototype.play=function(){this.ended()&&this.setCurrentTime(0),this.el_.vjs_play()},b.prototype.pause=function(){this.el_.vjs_pause()},b.prototype.src=function(a){return void 0===a?this.currentSrc():this.setSrc(a)},b.prototype.setSrc=function(a){var b=this;a=p.getAbsoluteURL(a),this.el_.vjs_src(a),this.autoplay()&&this.setTimeout(function(){return b.play()},0)},b.prototype.seeking=function(){return void 0!==this.lastSeekTarget_},b.prototype.setCurrentTime=function(b){var c=this.seekable();c.length&&(b=b>c.start(0)?b:c.start(0),b=b<c.end(c.length-1)?b:c.end(c.length-1),this.lastSeekTarget_=b,this.trigger("seeking"),this.el_.vjs_setProperty("currentTime",b),a.prototype.setCurrentTime.call(this))},b.prototype.currentTime=function(){return this.seeking()?this.lastSeekTarget_||0:this.el_.vjs_getProperty("currentTime")},b.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.vjs_getProperty("currentSrc")},b.prototype.duration=function c(){if(0===this.readyState())return NaN;var c=this.el_.vjs_getProperty("duration");return c>=0?c:1/0},b.prototype.load=function(){this.el_.vjs_load()},b.prototype.poster=function(){this.el_.vjs_getProperty("poster")},b.prototype.setPoster=function(){},b.prototype.seekable=function(){var a=this.duration();return 0===a?(0,q.createTimeRange)():(0,q.createTimeRange)(0,a)},b.prototype.buffered=function(){var a=this.el_.vjs_getProperty("buffered");return 0===a.length?(0,q.createTimeRange)():(0,q.createTimeRange)(a[0][0],a[0][1])},b.prototype.supportsFullScreen=function(){return!1},b.prototype.enterFullScreen=function(){return!1},b}(l["default"]),A=z.prototype,B="rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","),C="networkState,readyState,initialTime,startOffsetTime,paused,ended,videoWidth,videoHeight".split(","),D=0;D<B.length;D++)j(B[D]),i(B[D]);for(var E=0;E<C.length;E++)j(C[E]);z.isSupported=function(){return z.version()[0]>=10},l["default"].withSourceHandlers(z),z.nativeSourceHandler={},z.nativeSourceHandler.canPlayType=function(a){return a in z.formats?"maybe":""},z.nativeSourceHandler.canHandleSource=function(a,b){function c(a){var b=p.getFileExtension(a);return b?"video/"+b:""}var d=void 0;return d=a.type?a.type.replace(/;.*/,"").toLowerCase():c(a.src),z.nativeSourceHandler.canPlayType(d)},z.nativeSourceHandler.handleSource=function(a,b,c){b.setSrc(a.src)},z.nativeSourceHandler.dispose=function(){},z.registerSourceHandler(z.nativeSourceHandler),z.formats={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"},z.onReady=function(a){var b=n.getEl(a),c=b&&b.tech;c&&c.el()&&z.checkReady(c)},z.checkReady=function(a){a.el()&&(a.el().vjs_getProperty?a.triggerReady():this.setTimeout(function(){z.checkReady(a)},50))},z.onEvent=function(a,b){var c=n.getEl(a).tech,d=Array.prototype.slice.call(arguments,2);c.setTimeout(function(){c.trigger(b,d)},1)},z.onError=function(a,b){var c=n.getEl(a).tech;if("srcnotfound"===b)return c.error(4);c.error("FLASH: "+b)},z.version=function(){var a="0,0,0";try{a=new w["default"].ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(b){try{y.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(y.plugins["Shockwave Flash 2.0"]||y.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(c){}}return a.split(",")},z.embed=function(a,b,c,d){var e=z.getEmbedCode(a,b,c,d);return n.createEl("div",{innerHTML:e}).childNodes[0]},z.getEmbedCode=function(a,b,c,d){var e="",f="",g="";return b&&Object.getOwnPropertyNames(b).forEach(function(a){e+=a+"="+b[a]+"&amp;"}),c=(0,x.assign)({movie:a,flashvars:e,allowScriptAccess:"always",allowNetworking:"all"},c),Object.getOwnPropertyNames(c).forEach(function(a){f+='<param name="'+a+'" value="'+c[a]+'" />'}),d=(0,x.assign)({data:a,width:"100%",height:"100%"},d),Object.getOwnPropertyNames(d).forEach(function(a){g+=a+'="'+d[a]+'" '}),'<object type="application/x-shockwave-flash" '+g+">"+f+"</object>"},(0,s["default"])(z),u["default"].registerComponent("Flash",z),l["default"].registerTech("Flash",z),c["default"]=z},{5:5,58:58,62:62,81:81,88:88,90:90,92:92,95:95}],60:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){return a.raw=b,a}function g(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function h(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function i(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var j=f(["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."],["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."]),k=a(62),l=e(k),m=a(5),n=e(m),o=a(81),p=d(o),q=a(92),r=d(q),s=a(83),t=d(s),u=a(86),v=e(u),w=a(98),x=e(w),y=a(78),z=d(y),A=a(94),B=e(A),C=a(95),D=e(C),E=a(88),F=a(87),G=e(F),H=a(91),I=e(H),J=function(a){function b(c,d){g(this,b);var e=h(this,a.call(this,c,d)),f=c.source,i=!1;if(f&&(e.el_.currentSrc!==f.src||c.tag&&3===c.tag.initNetworkState_)?e.setSource(f):e.handleLateInit_(e.el_),e.el_.hasChildNodes()){for(var k=e.el_.childNodes,l=k.length,m=[];l--;){var n=k[l];"track"===n.nodeName.toLowerCase()&&(e.featuresNativeTextTracks?(e.remoteTextTrackEls().addTrackElement_(n),e.remoteTextTracks().addTrack_(n.track),i||e.el_.hasAttribute("crossorigin")||!r.isCrossOrigin(n.src)||(i=!0)):m.push(n))}for(var o=0;o<m.length;o++)e.el_.removeChild(m[o])}return["audio","video"].forEach(function(a){var b=e.el()[a+"Tracks"],c=e[a+"Tracks"](),d=(0,I["default"])(a);e["featuresNative"+d+"Tracks"]&&b&&b.addEventListener&&(e["handle"+d+"TrackChange_"]=function(a){c.trigger({type:"change",target:c,currentTarget:c,srcElement:c})},e["handle"+d+"TrackAdd_"]=function(a){return c.addTrack(a.track)},e["handle"+d+"TrackRemove_"]=function(a){return c.removeTrack(a.track)},b.addEventListener("change",e["handle"+d+"TrackChange_"]),b.addEventListener("addtrack",e["handle"+d+"TrackAdd_"]),b.addEventListener("removetrack",e["handle"+d+"TrackRemove_"]),e["removeOld"+d+"Tracks_"]=function(a){return e.removeOldTracks_(c,b)},e.on("loadstart",e["removeOld"+d+"Tracks_"]))}),e.featuresNativeTextTracks&&(i&&v["default"].warn((0,x["default"])(j)),e.handleTextTrackChange_=t.bind(e,e.handleTextTrackChange),e.handleTextTrackAdd_=t.bind(e,e.handleTextTrackAdd),e.handleTextTrackRemove_=t.bind(e,e.handleTextTrackRemove),e.proxyNativeTextTracks_()),(z.TOUCH_ENABLED||z.IS_IPHONE||z.IS_NATIVE_ANDROID)&&c.nativeControlsForTouch===!0&&e.setControls(!0),e.proxyWebkitFullscreen_(),e.triggerReady(),e}return i(b,a),b.prototype.dispose=function(){var c=this;["audio","video","text"].forEach(function(a){var b=(0,I["default"])(a),d=c.el_[a+"Tracks"];d&&d.removeEventListener&&(d.removeEventListener("change",c["handle"+b+"TrackChange_"]),d.removeEventListener("addtrack",c["handle"+b+"TrackAdd_"]),d.removeEventListener("removetrack",c["handle"+b+"TrackRemove_"])),d&&c.off("loadstart",c["removeOld"+b+"Tracks_"])}),b.disposeMediaElement(this.el_),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var a=this.options_.tag;if(!a||!this.options_.playerElIngest&&!this.movingMediaElementInDOM){if(a){var c=a.cloneNode(!0);a.parentNode&&a.parentNode.insertBefore(c,a),b.disposeMediaElement(a),a=c}else{a=B["default"].createElement("video");var d=this.options_.tag&&p.getElAttributes(this.options_.tag),e=(0,G["default"])({},d);z.TOUCH_ENABLED&&this.options_.nativeControlsForTouch===!0||delete e.controls,p.setElAttributes(a,(0,E.assign)(e,{id:this.options_.techId,"class":"vjs-tech"}))}a.playerId=this.options_.playerId}for(var f=["autoplay","preload","loop","muted"],g=f.length-1;g>=0;g--){var h=f[g],i={};"undefined"!=typeof this.options_[h]&&(i[h]=this.options_[h]),p.setElAttributes(a,i)}return a},b.prototype.handleLateInit_=function(a){if(0!==a.networkState&&3!==a.networkState){if(0===a.readyState){var b=!1,c=function(){b=!0};this.on("loadstart",c);var d=function(){b||this.trigger("loadstart")};return this.on("loadedmetadata",d),void this.ready(function(){this.off("loadstart",c),this.off("loadedmetadata",d),b||this.trigger("loadstart")})}var e=["loadstart"];e.push("loadedmetadata"),a.readyState>=2&&e.push("loadeddata"),a.readyState>=3&&e.push("canplay"),a.readyState>=4&&e.push("canplaythrough"),this.ready(function(){e.forEach(function(a){this.trigger(a)},this)})}},b.prototype.proxyNativeTextTracks_=function(){var a=this.el().textTracks;if(a){for(var b=0;b<a.length;b++)this.textTracks().addTrack_(a[b]);a.addEventListener&&(a.addEventListener("change",this.handleTextTrackChange_),a.addEventListener("addtrack",this.handleTextTrackAdd_),a.addEventListener("removetrack",this.handleTextTrackRemove_)),this.on("loadstart",this.removeOldTextTracks_)}},b.prototype.handleTextTrackChange=function(a){var b=this.textTracks();this.textTracks().trigger({type:"change",target:b,currentTarget:b,srcElement:b})},b.prototype.handleTextTrackAdd=function(a){this.textTracks().addTrack_(a.track)},b.prototype.handleTextTrackRemove=function(a){this.textTracks().removeTrack_(a.track)},b.prototype.removeOldTracks_=function(a,b){var c=[];if(b){for(var d=0;d<a.length;d++){for(var e=a[d],f=!1,g=0;g<b.length;g++)if(b[g]===e){f=!0;break}f||c.push(e)}for(var h=0;h<c.length;h++){var i=c[h];a.removeTrack_(i)}}},b.prototype.removeOldTextTracks_=function(a){var b=this.textTracks(),c=this.el().textTracks;this.removeOldTracks_(b,c)},b.prototype.play=function(){var a=this.el_.play();void 0!==a&&"function"==typeof a.then&&a.then(null,function(a){})},b.prototype.setCurrentTime=function(a){try{this.el_.currentTime=a}catch(b){(0,v["default"])(b,"Video is not ready. (Video.js)")}},b.prototype.duration=function(){var a=this;if(this.el_.duration===1/0&&z.IS_ANDROID&&z.IS_CHROME&&0===this.el_.currentTime){var b=function c(){a.el_.currentTime>0&&(a.el_.duration===1/0&&a.trigger("durationchange"),a.off("timeupdate",c))};return this.on("timeupdate",b),NaN}return this.el_.duration||NaN},b.prototype.width=function(){return this.el_.offsetWidth},b.prototype.height=function(){return this.el_.offsetHeight},b.prototype.proxyWebkitFullscreen_=function(){var a=this;if("webkitDisplayingFullscreen"in this.el_){var b=function(){this.trigger("fullscreenchange",{isFullscreen:!1})},c=function(){this.one("webkitendfullscreen",b),this.trigger("fullscreenchange",{isFullscreen:!0})};this.on("webkitbeginfullscreen",c),this.on("dispose",function(){a.off("webkitbeginfullscreen",c),a.off("webkitendfullscreen",b)})}},b.prototype.supportsFullScreen=function(){if("function"==typeof this.el_.webkitEnterFullScreen){var a=D["default"].navigator&&D["default"].navigator.userAgent||"";if(/Android/.test(a)||!/Chrome|Mac OS X 10.5/.test(a))return!0}return!1},b.prototype.enterFullScreen=function(){var a=this.el_;a.paused&&a.networkState<=a.HAVE_METADATA?(this.el_.play(),this.setTimeout(function(){a.pause(),a.webkitEnterFullScreen()},0)):a.webkitEnterFullScreen()},b.prototype.exitFullScreen=function(){this.el_.webkitExitFullScreen()},b.prototype.src=function(a){if(void 0===a)return this.el_.src;this.setSrc(a)},b.prototype.reset=function(){b.resetMediaElement(this.el_)},b.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc},b.prototype.setControls=function(a){this.el_.controls=!!a},b.prototype.addTextTrack=function(b,c,d){return this.featuresNativeTextTracks?this.el_.addTextTrack(b,c,d):a.prototype.addTextTrack.call(this,b,c,d)},b.prototype.createRemoteTextTrack=function(b){if(!this.featuresNativeTextTracks)return a.prototype.createRemoteTextTrack.call(this,b);var c=B["default"].createElement("track");return b.kind&&(c.kind=b.kind),b.label&&(c.label=b.label),(b.language||b.srclang)&&(c.srclang=b.language||b.srclang),b["default"]&&(c["default"]=b["default"]),b.id&&(c.id=b.id),b.src&&(c.src=b.src),c},b.prototype.addRemoteTextTrack=function(b,c){var d=a.prototype.addRemoteTextTrack.call(this,b,c);return this.featuresNativeTextTracks&&this.el().appendChild(d),d},b.prototype.removeRemoteTextTrack=function(b){if(a.prototype.removeRemoteTextTrack.call(this,b),this.featuresNativeTextTracks)for(var c=this.$$("track"),d=c.length;d--;)b!==c[d]&&b!==c[d].track||this.el().removeChild(c[d])},b}(l["default"]);if(p.isReal()){J.TEST_VID=B["default"].createElement("video");var K=B["default"].createElement("track");K.kind="captions",K.srclang="en",K.label="English",J.TEST_VID.appendChild(K)}J.isSupported=function(){try{J.TEST_VID.volume=.5}catch(a){return!1}return!(!J.TEST_VID||!J.TEST_VID.canPlayType)},J.canControlVolume=function(){try{var a=J.TEST_VID.volume;return J.TEST_VID.volume=a/2+.1,a!==J.TEST_VID.volume}catch(b){return!1}},J.canControlPlaybackRate=function(){if(z.IS_ANDROID&&z.IS_CHROME)return!1;try{var a=J.TEST_VID.playbackRate;return J.TEST_VID.playbackRate=a/2+.1,a!==J.TEST_VID.playbackRate}catch(b){return!1}},J.supportsNativeTextTracks=function(){return z.IS_ANY_SAFARI},J.supportsNativeVideoTracks=function(){return!(!J.TEST_VID||!J.TEST_VID.videoTracks)},J.supportsNativeAudioTracks=function(){return!(!J.TEST_VID||!J.TEST_VID.audioTracks)},J.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","volumechange"],J.prototype.featuresVolumeControl=J.canControlVolume(),J.prototype.featuresPlaybackRate=J.canControlPlaybackRate(),J.prototype.movingMediaElementInDOM=!z.IS_IOS,J.prototype.featuresFullscreenResize=!0,J.prototype.featuresProgressEvents=!0,J.prototype.featuresTimeupdateEvents=!0,J.prototype.featuresNativeTextTracks=J.supportsNativeTextTracks(),J.prototype.featuresNativeVideoTracks=J.supportsNativeVideoTracks(),J.prototype.featuresNativeAudioTracks=J.supportsNativeAudioTracks();var L=J.TEST_VID&&J.TEST_VID.constructor.prototype.canPlayType,M=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,N=/^video\/mp4/i;J.patchCanPlayType=function(){z.ANDROID_VERSION>=4&&!z.IS_FIREFOX?J.TEST_VID.constructor.prototype.canPlayType=function(a){return a&&M.test(a)?"maybe":L.call(this,a)}:z.IS_OLD_ANDROID&&(J.TEST_VID.constructor.prototype.canPlayType=function(a){return a&&N.test(a)?"maybe":L.call(this,a)})},J.unpatchCanPlayType=function(){var a=J.TEST_VID.constructor.prototype.canPlayType;return J.TEST_VID.constructor.prototype.canPlayType=L,a},J.patchCanPlayType(),J.disposeMediaElement=function(a){if(a){for(a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);a.removeAttribute("src"),"function"==typeof a.load&&function(){try{a.load()}catch(b){}}()}},J.resetMediaElement=function(a){if(a){for(var b=a.querySelectorAll("source"),c=b.length;c--;)a.removeChild(b[c]);a.removeAttribute("src"),"function"==typeof a.load&&function(){try{a.load()}catch(b){}}()}},["paused","currentTime","buffered","volume","muted","poster","preload","autoplay","controls","loop","error","seeking","seekable","ended","defaultMuted","playbackRate","played","networkState","readyState","videoWidth","videoHeight"].forEach(function(a){J.prototype[a]=function(){return this.el_[a]}}),["volume","muted","src","poster","preload","autoplay","loop","playbackRate"].forEach(function(a){J.prototype["set"+(0,I["default"])(a)]=function(b){this.el_[a]=b}}),["pause","load"].forEach(function(a){J.prototype[a]=function(){return this.el_[a]()}}),l["default"].withSourceHandlers(J),J.nativeSourceHandler={},J.nativeSourceHandler.canPlayType=function(a){try{return J.TEST_VID.canPlayType(a)}catch(b){return""}},J.nativeSourceHandler.canHandleSource=function(a,b){if(a.type)return J.nativeSourceHandler.canPlayType(a.type);if(a.src){var c=r.getFileExtension(a.src);return J.nativeSourceHandler.canPlayType("video/"+c)}return""},J.nativeSourceHandler.handleSource=function(a,b,c){b.setSrc(a.src)},J.nativeSourceHandler.dispose=function(){},J.registerSourceHandler(J.nativeSourceHandler),n["default"].registerComponent("Html5",J),l["default"].registerTech("Html5",J),c["default"]=J},{5:5,62:62,78:78,81:81,83:83,86:86,87:87,88:88,91:91,92:92,94:94,95:95,98:98}],61:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=a(62),k=d(j),l=a(91),m=d(l),n=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));if(d.playerOptions.sources&&0!==d.playerOptions.sources.length)c.src(d.playerOptions.sources);else for(var j=0,l=d.playerOptions.techOrder;j<l.length;j++){var n=(0,m["default"])(l[j]),o=k["default"].getTech(n);if(n||(o=i["default"].getComponent(n)),o&&o.isSupported()){c.loadTech_(n);break}}return h}return g(b,a),b}(i["default"]);i["default"].registerComponent("MediaLoader",n),c["default"]=n},{5:5,62:62,91:91}],62:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a,b,c,d){var e=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},f=a.textTracks();e.kind=b,c&&(e.label=c),d&&(e.language=d),e.tech=a;var g=new s["default"](e);return f.addTrack_(g),g}c.__esModule=!0;var j=a(5),k=e(j),l=a(66),m=e(l),n=a(65),o=e(n),p=a(87),q=e(p),r=a(72),s=e(r),t=a(70),u=e(t),v=a(76),w=e(v),x=a(63),y=e(x),z=a(83),A=d(z),B=a(86),C=e(B),D=a(90),E=a(79),F=a(46),G=e(F),H=a(95),I=e(H),J=a(94),K=e(J),L=a(88),M=function(b){function c(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};f(this,c),a.reportTouchActivity=!1;var e=g(this,b.call(this,null,a,d));return e.hasStarted_=!1,e.on("playing",function(){this.hasStarted_=!0}),e.on("loadstart",function(){this.hasStarted_=!1}),e.textTracks_=a.textTracks,e.videoTracks_=a.videoTracks,e.audioTracks_=a.audioTracks,e.featuresProgressEvents||e.manualProgressOn(),e.featuresTimeupdateEvents||e.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(function(b){a["native"+b+"Tracks"]===!1&&(e["featuresNative"+b+"Tracks"]=!1)}),a.nativeCaptions===!1&&(e.featuresNativeTextTracks=!1),e.featuresNativeTextTracks||e.emulateTextTracks(),e.autoRemoteTextTracks_=new u["default"],e.initTextTrackListeners(),e.initTrackListeners(),a.nativeControlsForTouch||e.emitTapEvents(),e.constructor&&(e.name_=e.constructor.name||"Unknown Tech"),e}return h(c,b),c.prototype.manualProgressOn=function(){this.on("durationchange",this.onDurationChange),this.manualProgress=!0,this.one("ready",this.trackProgress)},c.prototype.manualProgressOff=function(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange)},c.prototype.trackProgress=function(a){this.stopTrackingProgress(),this.progressInterval=this.setInterval(A.bind(this,function(){var a=this.bufferedPercent();this.bufferedPercent_!==a&&this.trigger("progress"),this.bufferedPercent_=a,1===a&&this.stopTrackingProgress()}),500)},c.prototype.onDurationChange=function(a){this.duration_=this.duration()},c.prototype.buffered=function(){return(0,D.createTimeRange)(0,0)},c.prototype.bufferedPercent=function(){return(0,E.bufferedPercent)(this.buffered(),this.duration_)},c.prototype.stopTrackingProgress=function(){this.clearInterval(this.progressInterval)},c.prototype.manualTimeUpdatesOn=function(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime),this.on("pause",this.stopTrackingCurrentTime)},c.prototype.manualTimeUpdatesOff=function(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime),this.off("pause",this.stopTrackingCurrentTime)},c.prototype.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)},c.prototype.stopTrackingCurrentTime=function(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},c.prototype.dispose=function(){this.clearTracks(["audio","video","text"]),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),b.prototype.dispose.call(this)},c.prototype.clearTracks=function(a){var b=this;a=[].concat(a),a.forEach(function(a){for(var c=b[a+"Tracks"]()||[],d=c.length;d--;){var e=c[d];"text"===a&&b.removeRemoteTextTrack(e),c.removeTrack_(e)}})},c.prototype.cleanupAutoTextTracks=function(){for(var a=this.autoRemoteTextTracks_||[],b=a.length;b--;){var c=a[b];this.removeRemoteTextTrack(c)}},c.prototype.reset=function(){},c.prototype.error=function(a){return void 0!==a&&(this.error_=new G["default"](a),this.trigger("error")),this.error_},c.prototype.played=function(){return this.hasStarted_?(0,D.createTimeRange)(0,0):(0,D.createTimeRange)()},c.prototype.setCurrentTime=function(){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},c.prototype.initTextTrackListeners=function(){var a=A.bind(this,function(){this.trigger("texttrackchange")}),b=this.textTracks();b&&(b.addEventListener("removetrack",a),b.addEventListener("addtrack",a),this.on("dispose",A.bind(this,function(){b.removeEventListener("removetrack",a),b.removeEventListener("addtrack",a)})))},c.prototype.initTrackListeners=function(){var a=this;["video","audio"].forEach(function(b){var c=function(){a.trigger(b+"trackchange")},d=a[b+"Tracks"]();d.addEventListener("removetrack",c),d.addEventListener("addtrack",c),a.on("dispose",function(){d.removeEventListener("removetrack",c),
d.removeEventListener("addtrack",c)})})},c.prototype.addWebVttScript_=function(){var b=this;if(!I["default"].WebVTT)if(K["default"].body.contains(this.el())){var c=a(105);if(!this.options_["vtt.js"]&&(0,L.isPlain)(c)&&Object.keys(c).length>0)return void this.trigger("vttjsloaded");var d=K["default"].createElement("script");d.src=this.options_["vtt.js"]||"https://cdn.rawgit.com/gkatsev/vtt.js/vjs-v0.12.1/dist/vtt.min.js",d.onload=function(){b.trigger("vttjsloaded")},d.onerror=function(){b.trigger("vttjserror")},this.on("dispose",function(){d.onload=null,d.onerror=null}),I["default"].WebVTT=!0,this.el().parentNode.appendChild(d)}else this.ready(this.addWebVttScript_)},c.prototype.emulateTextTracks=function(){var a=this,b=this.textTracks();if(b){var c=this.remoteTextTracks(),d=function(a){return b.addTrack_(a.track)},e=function(a){return b.removeTrack_(a.track)};c.on("addtrack",d),c.on("removetrack",e),this.addWebVttScript_();var f=function(){return a.trigger("texttrackchange")},g=function(){f();for(var a=0;a<b.length;a++){var c=b[a];c.removeEventListener("cuechange",f),"showing"===c.mode&&c.addEventListener("cuechange",f)}};g(),b.addEventListener("change",g),this.on("dispose",function(){c.off("addtrack",d),c.off("removetrack",e),b.removeEventListener("change",g);for(var a=0;a<b.length;a++){b[a].removeEventListener("cuechange",f)}})}},c.prototype.videoTracks=function(){return this.videoTracks_=this.videoTracks_||new w["default"],this.videoTracks_},c.prototype.audioTracks=function(){return this.audioTracks_=this.audioTracks_||new y["default"],this.audioTracks_},c.prototype.textTracks=function(){return this.textTracks_=this.textTracks_||new u["default"],this.textTracks_},c.prototype.remoteTextTracks=function(){return this.remoteTextTracks_=this.remoteTextTracks_||new u["default"],this.remoteTextTracks_},c.prototype.remoteTextTrackEls=function(){return this.remoteTextTrackEls_=this.remoteTextTrackEls_||new o["default"],this.remoteTextTrackEls_},c.prototype.addTextTrack=function(a,b,c){if(!a)throw new Error("TextTrack kind is required but was not provided");return i(this,a,b,c)},c.prototype.createRemoteTextTrack=function(a){var b=(0,q["default"])(a,{tech:this});return new m["default"](b)},c.prototype.addRemoteTextTrack=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=arguments[1],c=this.createRemoteTextTrack(a);return b!==!0&&b!==!1&&(C["default"].warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'),b=!0),this.remoteTextTrackEls().addTrackElement_(c),this.remoteTextTracks().addTrack_(c.track),b!==!0&&this.autoRemoteTextTracks_.addTrack_(c.track),c},c.prototype.removeRemoteTextTrack=function(a){var b=this.remoteTextTrackEls().getTrackElementByTrack_(a);this.remoteTextTrackEls().removeTrackElement_(b),this.remoteTextTracks().removeTrack_(a),this.autoRemoteTextTracks_.removeTrack_(a)},c.prototype.setPoster=function(){},c.prototype.canPlayType=function(){return""},c.isTech=function(a){return a.prototype instanceof c||a instanceof c||a===c},c.registerTech=function(a,b){if(c.techs_||(c.techs_={}),!c.isTech(b))throw new Error("Tech "+a+" must be a Tech");return c.techs_[a]=b,b},c.getTech=function(a){return c.techs_&&c.techs_[a]?c.techs_[a]:I["default"]&&I["default"].videojs&&I["default"].videojs[a]?(C["default"].warn("The "+a+" tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"),I["default"].videojs[a]):void 0},c}(k["default"]);M.prototype.textTracks_,M.prototype.audioTracks_,M.prototype.videoTracks_,M.prototype.featuresVolumeControl=!0,M.prototype.featuresFullscreenResize=!1,M.prototype.featuresPlaybackRate=!1,M.prototype.featuresProgressEvents=!1,M.prototype.featuresTimeupdateEvents=!1,M.prototype.featuresNativeTextTracks=!1,M.withSourceHandlers=function(a){a.registerSourceHandler=function(b,c){var d=a.sourceHandlers;d||(d=a.sourceHandlers=[]),void 0===c&&(c=d.length),d.splice(c,0,b)},a.canPlayType=function(b){for(var c=a.sourceHandlers||[],d=void 0,e=0;e<c.length;e++)if(d=c[e].canPlayType(b))return d;return""},a.selectSourceHandler=function(b,c){for(var d=a.sourceHandlers||[],e=0;e<d.length;e++)if(d[e].canHandleSource(b,c))return d[e];return null},a.canPlaySource=function(b,c){var d=a.selectSourceHandler(b,c);return d?d.canHandleSource(b,c):""},["seekable","duration"].forEach(function(a){var b=this[a];"function"==typeof b&&(this[a]=function(){return this.sourceHandler_&&this.sourceHandler_[a]?this.sourceHandler_[a].apply(this.sourceHandler_,arguments):b.apply(this,arguments)})},a.prototype),a.prototype.setSource=function(b){var c=a.selectSourceHandler(b,this.options_);return c||(a.nativeSourceHandler?c=a.nativeSourceHandler:C["default"].error("No source hander found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler),c!==a.nativeSourceHandler&&(this.currentSource_=b,this.off(this.el_,"loadstart",a.prototype.firstLoadStartListener_),this.off(this.el_,"loadstart",a.prototype.successiveLoadStartListener_),this.one(this.el_,"loadstart",a.prototype.firstLoadStartListener_)),this.sourceHandler_=c.handleSource(b,this,this.options_),this.on("dispose",this.disposeSourceHandler),this},a.prototype.firstLoadStartListener_=function(){this.one(this.el_,"loadstart",a.prototype.successiveLoadStartListener_)},a.prototype.successiveLoadStartListener_=function(){this.disposeSourceHandler(),this.one(this.el_,"loadstart",a.prototype.successiveLoadStartListener_)},a.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.off(this.el_,"loadstart",a.prototype.firstLoadStartListener_),this.off(this.el_,"loadstart",a.prototype.successiveLoadStartListener_),this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},k["default"].registerComponent("Tech",M),k["default"].registerComponent("MediaTechController",M),M.registerTech("Tech",M),c["default"]=M},{105:105,46:46,5:5,63:63,65:65,66:66,70:70,72:72,76:76,79:79,83:83,86:86,87:87,88:88,90:90,94:94,95:95}],63:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(74),j=e(i),k=a(78),l=d(k),m=a(94),n=e(m),o=function(a,b){for(var c=0;c<a.length;c++)b.id!==a[c].id&&(a[c].enabled=!1)},p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,b);for(var h=void 0,i=e.length-1;i>=0;i--)if(e[i].enabled){o(e,e[i]);break}if(l.IS_IE8){h=n["default"].createElement("custom");for(var k in j["default"].prototype)"constructor"!==k&&(h[k]=j["default"].prototype[k]);for(var m in b.prototype)"constructor"!==m&&(h[m]=b.prototype[m])}return h=c=g(this,a.call(this,e,h)),h.changing_=!1,d=h,g(c,d)}return h(b,a),b.prototype.addTrack_=function(b){var c=this;b.enabled&&o(this,b),a.prototype.addTrack_.call(this,b),b.addEventListener&&b.addEventListener("enabledchange",function(){c.changing_||(c.changing_=!0,o(c,b),c.changing_=!1,c.trigger("change"))})},b.prototype.addTrack=function(a){this.addTrack_(a)},b.prototype.removeTrack=function(b){a.prototype.removeTrack_.call(this,b)},b}(j["default"]);c["default"]=p},{74:74,78:78,94:94}],64:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(73),j=a(75),k=e(j),l=a(87),m=e(l),n=a(78),o=d(n),p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var h=(0,m["default"])(e,{kind:i.AudioTrackKind[e.kind]||""}),j=c=g(this,a.call(this,h)),k=!1;if(o.IS_IE8)for(var l in b.prototype)"constructor"!==l&&(j[l]=b.prototype[l]);return Object.defineProperty(j,"enabled",{get:function(){return k},set:function(a){"boolean"==typeof a&&a!==k&&(k=a,this.trigger("enabledchange"))}}),h.enabled&&(j.enabled=h.enabled),j.loaded_=!0,d=j,g(c,d)}return h(b,a),b}(k["default"]);c["default"]=p},{73:73,75:75,78:78,87:87}],65:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a(78),h=e(g),i=a(94),j=d(i),k=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,a);var c=this;if(h.IS_IE8){c=j["default"].createElement("custom");for(var d in a.prototype)"constructor"!==d&&(c[d]=a.prototype[d])}c.trackElements_=[],Object.defineProperty(c,"length",{get:function(){return this.trackElements_.length}});for(var e=0,g=b.length;e<g;e++)c.addTrackElement_(b[e]);if(h.IS_IE8)return c}return a.prototype.addTrackElement_=function(a){var b=this.trackElements_.length;""+b in this||Object.defineProperty(this,b,{get:function(){return this.trackElements_[b]}}),this.trackElements_.indexOf(a)===-1&&this.trackElements_.push(a)},a.prototype.getTrackElementByTrack_=function(a){for(var b=void 0,c=0,d=this.trackElements_.length;c<d;c++)if(a===this.trackElements_[c].track){b=this.trackElements_[c];break}return b},a.prototype.removeTrackElement_=function(a){for(var b=0,c=this.trackElements_.length;b<c;b++)if(a===this.trackElements_[b]){this.trackElements_.splice(b,1);break}},a}();c["default"]=k},{78:78,94:94}],66:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(78),j=e(i),k=a(94),l=d(k),m=a(42),n=d(m),o=a(72),p=d(o),q=function(a){function b(){var c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var d=g(this,a.call(this)),e=void 0,h=d;if(j.IS_IE8){h=l["default"].createElement("custom");for(var i in b.prototype)"constructor"!==i&&(h[i]=b.prototype[i])}var k=new p["default"](c);if(h.kind=k.kind,h.src=k.src,h.srclang=k.language,h.label=k.label,h["default"]=k["default"],Object.defineProperty(h,"readyState",{get:function(){return e}}),Object.defineProperty(h,"track",{get:function(){return k}}),e=0,k.addEventListener("loadeddata",function(){e=2,h.trigger({type:"load",target:h})}),j.IS_IE8){var m;return m=h,g(d,m)}return d}return h(b,a),b}(n["default"]);q.prototype.allowedEvents_={load:"load"},q.NONE=0,q.LOADING=1,q.LOADED=2,q.ERROR=3,c["default"]=q},{42:42,72:72,78:78,94:94}],67:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a(78),h=e(g),i=a(94),j=d(i),k=function(){function a(b){f(this,a);var c=this;if(h.IS_IE8){c=j["default"].createElement("custom");for(var d in a.prototype)"constructor"!==d&&(c[d]=a.prototype[d])}if(a.prototype.setCues_.call(c,b),Object.defineProperty(c,"length",{get:function(){return this.length_}}),h.IS_IE8)return c}return a.prototype.setCues_=function(a){var b=this.length||0,c=0,d=a.length;this.cues_=a,this.length_=a.length;var e=function(a){""+a in this||Object.defineProperty(this,""+a,{get:function(){return this.cues_[a]}})};if(b<d)for(c=b;c<d;c++)e.call(this,c)},a.prototype.getCueById=function(a){for(var b=null,c=0,d=this.length;c<d;c++){var e=this[c];if(e.id===a){b=e;break}}return b},a}();c["default"]=k},{78:78,94:94}],68:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a,b){return"rgba("+parseInt(a[1]+a[1],16)+","+parseInt(a[2]+a[2],16)+","+parseInt(a[3]+a[3],16)+","+b+")"}function j(a,b,c){try{a.style[b]=c}catch(d){return}}c.__esModule=!0;var k=a(5),l=e(k),m=a(83),n=d(m),o=a(95),p=e(o),q={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'},r=function(a){function b(c,d,e){f(this,b);var h=g(this,a.call(this,c,d,e));return c.on("loadstart",n.bind(h,h.toggleDisplay)),c.on("texttrackchange",n.bind(h,h.updateDisplay)),c.ready(n.bind(h,function(){if(c.tech_&&c.tech_.featuresNativeTextTracks)return void this.hide();c.on("fullscreenchange",n.bind(this,this.updateDisplay));for(var a=this.options_.playerOptions.tracks||[],b=0;b<a.length;b++)this.player_.addRemoteTextTrack(a[b],!0);var d={captions:1,subtitles:1},e=this.player_.textTracks(),f=void 0,g=void 0;if(e){for(var h=0;h<e.length;h++){var i=e[h];i["default"]&&("descriptions"!==i.kind||f?i.kind in d&&!g&&(g=i):f=i)}g?g.mode="showing":f&&(f.mode="showing")}})),h}return h(b,a),b.prototype.toggleDisplay=function(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"},{"aria-live":"off","aria-atomic":"true"})},b.prototype.clearDisplay=function(){"function"==typeof p["default"].WebVTT&&p["default"].WebVTT.processCues(p["default"],[],this.el_)},b.prototype.updateDisplay=function(){var a=this.player_.textTracks();if(this.clearDisplay(),a){for(var b=null,c=null,d=a.length;d--;){var e=a[d];"showing"===e.mode&&("descriptions"===e.kind?b=e:c=e)}c?("off"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","off"),this.updateForTrack(c)):b&&("assertive"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","assertive"),this.updateForTrack(b))}},b.prototype.updateForTrack=function(a){if("function"==typeof p["default"].WebVTT&&a.activeCues){for(var b=this.player_.textTrackSettings.getValues(),c=[],d=0;d<a.activeCues.length;d++)c.push(a.activeCues[d]);p["default"].WebVTT.processCues(p["default"],c,this.el_);for(var e=c.length;e--;){var f=c[e];if(f){var g=f.displayState;if(b.color&&(g.firstChild.style.color=b.color),b.textOpacity&&j(g.firstChild,"color",i(b.color||"#fff",b.textOpacity)),b.backgroundColor&&(g.firstChild.style.backgroundColor=b.backgroundColor),b.backgroundOpacity&&j(g.firstChild,"backgroundColor",i(b.backgroundColor||"#000",b.backgroundOpacity)),b.windowColor&&(b.windowOpacity?j(g,"backgroundColor",i(b.windowColor,b.windowOpacity)):g.style.backgroundColor=b.windowColor),b.edgeStyle&&("dropshadow"===b.edgeStyle?g.firstChild.style.textShadow="2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222":"raised"===b.edgeStyle?g.firstChild.style.textShadow="1px 1px #222, 2px 2px #222, 3px 3px #222":"depressed"===b.edgeStyle?g.firstChild.style.textShadow="1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222":"uniform"===b.edgeStyle&&(g.firstChild.style.textShadow="0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222")),b.fontPercent&&1!==b.fontPercent){var h=p["default"].parseFloat(g.style.fontSize);g.style.fontSize=h*b.fontPercent+"px",g.style.height="auto",g.style.top="auto",g.style.bottom="2px"}b.fontFamily&&"default"!==b.fontFamily&&("small-caps"===b.fontFamily?g.firstChild.style.fontVariant="small-caps":g.firstChild.style.fontFamily=q[b.fontFamily])}}}},b}(l["default"]);l["default"].registerComponent("TextTrackDisplay",r),c["default"]=r},{5:5,83:83,95:95}],69:[function(a,b,c){"use strict";c.__esModule=!0;var d=function(a){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce(function(b,c,d){return a[c]&&(b[c]=a[c]),b},{cues:a.cues&&Array.prototype.map.call(a.cues,function(a){return{startTime:a.startTime,endTime:a.endTime,text:a.text,id:a.id}})})},e=function(a){var b=a.$$("track"),c=Array.prototype.map.call(b,function(a){return a.track});return Array.prototype.map.call(b,function(a){var b=d(a.track);return a.src&&(b.src=a.src),b}).concat(Array.prototype.filter.call(a.textTracks(),function(a){return c.indexOf(a)===-1}).map(d))},f=function(a,b){return a.forEach(function(a){var c=b.addRemoteTextTrack(a).track;!a.src&&a.cues&&a.cues.forEach(function(a){return c.addCue(a)})}),b.textTracks()};c["default"]={textTracksToJson:e,jsonToTextTracks:f,trackToJson_:d}},{}],70:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(74),j=e(i),k=a(83),l=d(k),m=a(78),n=d(m),o=a(94),p=e(o),q=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,b);var h=void 0;if(n.IS_IE8){h=p["default"].createElement("custom");for(var i in j["default"].prototype)"constructor"!==i&&(h[i]=j["default"].prototype[i]);for(var k in b.prototype)"constructor"!==k&&(h[k]=b.prototype[k])}return h=c=g(this,a.call(this,e,h)),d=h,g(c,d)}return h(b,a),b.prototype.addTrack_=function(b){a.prototype.addTrack_.call(this,b),b.addEventListener("modechange",l.bind(this,function(){this.trigger("change")}))},b}(j["default"]);c["default"]=q},{74:74,78:78,83:83,94:94}],71:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a,b){if(b&&(a=b(a)),a&&"none"!==a)return a}function j(a,b){return i(a.options[a.options.selectedIndex].value,b)}function k(a,b,c){if(b)for(var d=0;d<a.options.length;d++)if(i(a.options[d].value,c)===b){a.selectedIndex=d;break}}c.__esModule=!0;var l=a(95),m=e(l),n=a(5),o=e(n),p=a(81),q=a(83),r=d(q),s=a(88),t=d(s),u=a(86),v=e(u),w=["#000","Black"],x=["#00F","Blue"],y=["#0FF","Cyan"],z=["#0F0","Green"],A=["#F0F","Magenta"],B=["#F00","Red"],C=["#FFF","White"],D=["#FF0","Yellow"],E=["1","Opaque"],F=["0.5","Semi-Transparent"],G=["0","Transparent"],H={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[w,C,B,z,x,D,A,y]},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Transparency",options:[E,F,G]},color:{selector:".vjs-fg-color > select",id:"captions-foreground-color-%s",label:"Color",options:[C,w,B,z,x,D,A,y]},edgeStyle:{selector:".vjs-edge-style > select",id:"%s",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Dropshadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"captions-font-family-%s",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"captions-font-size-%s",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],"default":2,parser:function(a){return"1.00"===a?null:Number(a)}},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Transparency",options:[E,F]},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Transparency",options:[G,F,E]}};H.windowColor.options=H.backgroundColor.options;var I=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.setDefaults(),e.hide(),e.updateDisplay=r.bind(e,e.updateDisplay),void 0===d.persistTextTrackSettings&&(e.options_.persistTextTrackSettings=e.options_.playerOptions.persistTextTrackSettings),e.on(e.$(".vjs-done-button"),"click",function(){e.saveSettings(),e.hide()}),e.on(e.$(".vjs-default-button"),"click",function(){e.setDefaults(),e.updateDisplay()}),t.each(H,function(a){e.on(e.$(a.selector),"change",e.updateDisplay)}),e.options_.persistTextTrackSettings&&e.restoreSettings(),e}return h(b,a),b.prototype.createElSelect_=function(a){var b=this,c=H[a],d=c.id.replace("%s",this.id_);return[(0,p.createEl)("label",{className:"vjs-label",textContent:c.label},{"for":d}),(0,p.createEl)("select",{id:d},void 0,c.options.map(function(a){return(0,p.createEl)("option",{textContent:b.localize(a[1]),value:a[0]})}))]},b.prototype.createElFgColor_=function(){var a=(0,p.createEl)("legend",{textContent:this.localize("Text")}),b=this.createElSelect_("color"),c=(0,p.createEl)("span",{className:"vjs-text-opacity vjs-opacity"},void 0,this.createElSelect_("textOpacity"));return(0,p.createEl)("fieldset",{className:"vjs-fg-color vjs-tracksetting"},void 0,[a].concat(b,c))},b.prototype.createElBgColor_=function(){var a=(0,p.createEl)("legend",{textContent:this.localize("Background")}),b=this.createElSelect_("backgroundColor"),c=(0,p.createEl)("span",{className:"vjs-bg-opacity vjs-opacity"},void 0,this.createElSelect_("backgroundOpacity"));return(0,p.createEl)("fieldset",{className:"vjs-bg-color vjs-tracksetting"},void 0,[a].concat(b,c))},b.prototype.createElWinColor_=function(){var a=(0,p.createEl)("legend",{textContent:this.localize("Window")}),b=this.createElSelect_("windowColor"),c=(0,p.createEl)("span",{className:"vjs-window-opacity vjs-opacity"},void 0,this.createElSelect_("windowOpacity"));return(0,p.createEl)("fieldset",{className:"vjs-window-color vjs-tracksetting"},void 0,[a].concat(b,c))},b.prototype.createElColors_=function(){return(0,p.createEl)("div",{className:"vjs-tracksettings-colors"},void 0,[this.createElFgColor_(),this.createElBgColor_(),this.createElWinColor_()])},b.prototype.createElFont_=function(){var a=(0,p.createEl)("div",{className:"vjs-font-percent vjs-tracksetting"},void 0,this.createElSelect_("fontPercent")),b=(0,p.createEl)("div",{className:"vjs-edge-style vjs-tracksetting"},void 0,this.createElSelect_("edgeStyle")),c=(0,p.createEl)("div",{className:"vjs-font-family vjs-tracksetting"},void 0,this.createElSelect_("fontFamily"));return(0,p.createEl)("div",{className:"vjs-tracksettings-font"},void 0,[a,b,c])},b.prototype.createElControls_=function(){var a=(0,p.createEl)("button",{className:"vjs-default-button",textContent:this.localize("Defaults")}),b=(0,p.createEl)("button",{className:"vjs-done-button",textContent:"Done"});return(0,p.createEl)("div",{className:"vjs-tracksettings-controls"},void 0,[a,b])},b.prototype.createEl=function(){var a=(0,p.createEl)("div",{className:"vjs-tracksettings"},void 0,[this.createElColors_(),this.createElFont_(),this.createElControls_()]),b=(0,p.createEl)("div",{className:"vjs-control-text",id:"TTsettingsDialogLabel-"+this.id_,textContent:"Caption Settings Dialog"},{"aria-level":"1",role:"heading"}),c=(0,p.createEl)("div",{className:"vjs-control-text",id:"TTsettingsDialogDescription-"+this.id_,textContent:"Beginning of dialog window. Escape will cancel and close the window."}),d=(0,p.createEl)("div",void 0,{role:"document"},[b,c,a]);return(0,p.createEl)("div",{className:"vjs-caption-settings vjs-modal-overlay",tabIndex:-1},{role:"dialog","aria-labelledby":b.id,"aria-describedby":c.id},d)},b.prototype.getValues=function(){var a=this;return t.reduce(H,function(b,c,d){var e=j(a.$(c.selector),c.parser);return void 0!==e&&(b[d]=e),b},{})},b.prototype.setValues=function(a){var b=this;t.each(H,function(c,d){k(b.$(c.selector),a[d],c.parser)})},b.prototype.setDefaults=function(){var a=this;t.each(H,function(b){var c=b.hasOwnProperty("default")?b["default"]:0;a.$(b.selector).selectedIndex=c})},b.prototype.restoreSettings=function(){var a=void 0;try{a=JSON.parse(m["default"].localStorage.getItem("vjs-text-track-settings"))}catch(b){v["default"].warn(b)}a&&this.setValues(a)},b.prototype.saveSettings=function(){if(this.options_.persistTextTrackSettings){var a=this.getValues();try{Object.keys(a).length?m["default"].localStorage.setItem("vjs-text-track-settings",JSON.stringify(a)):m["default"].localStorage.removeItem("vjs-text-track-settings")}catch(b){v["default"].warn(b)}}},b.prototype.updateDisplay=function(){var a=this.player_.getChild("textTrackDisplay");a&&a.updateDisplay()},b}(o["default"]);o["default"].registerComponent("TextTrackSettings",I),c["default"]=I},{5:5,81:81,83:83,86:86,88:88,95:95}],72:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(67),j=e(i),k=a(83),l=d(k),m=a(73),n=a(86),o=e(n),p=a(95),q=e(p),r=a(75),s=e(r),t=a(92),u=a(99),v=e(u),w=a(87),x=e(w),y=a(78),z=d(y),A=function(a,b){var c=new q["default"].WebVTT.Parser(q["default"],q["default"].vttjs,q["default"].WebVTT.StringDecoder()),d=[];c.oncue=function(a){b.addCue(a)},c.onparsingerror=function(a){d.push(a)},c.onflush=function(){b.trigger({type:"loadeddata",target:b})},c.parse(a),d.length>0&&(q["default"].console&&q["default"].console.groupCollapsed&&q["default"].console.groupCollapsed("Text Track parsing errors for "+b.src),d.forEach(function(a){return o["default"].error(a)}),q["default"].console&&q["default"].console.groupEnd&&q["default"].console.groupEnd()),c.flush()},B=function(a,b){var c={uri:a},d=(0,t.isCrossOrigin)(a);d&&(c.cors=d),(0,v["default"])(c,l.bind(this,function(a,c,d){if(a)return o["default"].error(a,c);if(b.loaded_=!0,"function"!=typeof q["default"].WebVTT){if(b.tech_){var e=function(){return A(d,b)};b.tech_.on("vttjsloaded",e),b.tech_.on("vttjserror",function(){o["default"].error("vttjs failed to load, stopping trying to process "+b.src),b.tech_.off("vttjsloaded",e)})}}else A(d,b)}))},C=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(f(this,b),!e.tech)throw new Error("A tech was not provided.");var h=(0,x["default"])(e,{kind:m.TextTrackKind[e.kind]||"subtitles",language:e.language||e.srclang||""}),i=m.TextTrackMode[h.mode]||"disabled",k=h["default"];"metadata"!==h.kind&&"chapters"!==h.kind||(i="hidden");var n=c=g(this,a.call(this,h));if(n.tech_=h.tech,z.IS_IE8)for(var o in b.prototype)"constructor"!==o&&(n[o]=b.prototype[o]);n.cues_=[],n.activeCues_=[];var p=new j["default"](n.cues_),q=new j["default"](n.activeCues_),r=!1,s=l.bind(n,function(){this.activeCues,r&&(this.trigger("cuechange"),r=!1)});return"disabled"!==i&&n.tech_.ready(function(){n.tech_.on("timeupdate",s)},!0),Object.defineProperty(n,"default",{get:function(){return k},set:function(){}}),Object.defineProperty(n,"mode",{get:function(){return i},set:function(a){var b=this;m.TextTrackMode[a]&&(i=a,"showing"===i&&this.tech_.ready(function(){b.tech_.on("timeupdate",s)},!0),this.trigger("modechange"))}}),Object.defineProperty(n,"cues",{get:function(){return this.loaded_?p:null},set:function(){}}),Object.defineProperty(n,"activeCues",{get:function(){if(!this.loaded_)return null;if(0===this.cues.length)return q;for(var a=this.tech_.currentTime(),b=[],c=0,d=this.cues.length;c<d;c++){var e=this.cues[c];e.startTime<=a&&e.endTime>=a?b.push(e):e.startTime===e.endTime&&e.startTime<=a&&e.startTime+.5>=a&&b.push(e)}if(r=!1,
b.length!==this.activeCues_.length)r=!0;else for(var f=0;f<b.length;f++)this.activeCues_.indexOf(b[f])===-1&&(r=!0);return this.activeCues_=b,q.setCues_(this.activeCues_),q},set:function(){}}),h.src?(n.src=h.src,B(h.src,n)):n.loaded_=!0,d=n,g(c,d)}return h(b,a),b.prototype.addCue=function(a){var b=a;if(q["default"].vttjs&&!(a instanceof q["default"].vttjs.VTTCue)){b=new q["default"].vttjs.VTTCue(a.startTime,a.endTime,a.text);for(var c in a)c in b||(b[c]=a[c]);b.id=a.id}var d=this.tech_.textTracks();if(d)for(var e=0;e<d.length;e++)d[e]!==this&&d[e].removeCue(b);this.cues_.push(b),this.cues.setCues_(this.cues_)},b.prototype.removeCue=function(a){for(var b=!1,c=0,d=this.cues_.length;c<d;c++){this.cues_[c]===a&&(this.cues_.splice(c,1),b=!0)}b&&this.cues.setCues_(this.cues_)},b}(s["default"]);C.prototype.allowedEvents_={cuechange:"cuechange"},c["default"]=C},{67:67,73:73,75:75,78:78,83:83,86:86,87:87,92:92,95:95,99:99}],73:[function(a,b,c){"use strict";c.__esModule=!0;c.VideoTrackKind={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},c.AudioTrackKind={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},c.TextTrackKind={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},c.TextTrackMode={disabled:"disabled",hidden:"hidden",showing:"showing"}},{}],74:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(42),j=e(i),k=a(78),l=d(k),m=a(94),n=e(m),o=function(a){function b(){var c,d=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;f(this,b);var h=g(this,a.call(this));if(!e&&(e=h,l.IS_IE8)){e=n["default"].createElement("custom");for(var i in b.prototype)"constructor"!==i&&(e[i]=b.prototype[i])}e.tracks_=[],Object.defineProperty(e,"length",{get:function(){return this.tracks_.length}});for(var j=0;j<d.length;j++)e.addTrack_(d[j]);return c=e,g(h,c)}return h(b,a),b.prototype.addTrack_=function(a){var b=this.tracks_.length;""+b in this||Object.defineProperty(this,b,{get:function(){return this.tracks_[b]}}),this.tracks_.indexOf(a)===-1&&(this.tracks_.push(a),this.trigger({track:a,type:"addtrack"}))},b.prototype.removeTrack_=function(a){for(var b=void 0,c=0,d=this.length;c<d;c++)if(this[c]===a){b=this[c],b.off&&b.off(),this.tracks_.splice(c,1);break}b&&this.trigger({track:b,type:"removetrack"})},b.prototype.getTrackById=function(a){for(var b=null,c=0,d=this.length;c<d;c++){var e=this[c];if(e.id===a){b=e;break}}return b},b}(j["default"]);o.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack"};for(var p in o.prototype.allowedEvents_)o.prototype["on"+p]=null;c["default"]=o},{42:42,78:78,94:94}],75:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(78),j=e(i),k=a(94),l=d(k),m=a(85),n=e(m),o=a(42),p=d(o),q=function(a){function b(){var c,d=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var e=g(this,a.call(this)),h=e;if(j.IS_IE8){h=l["default"].createElement("custom");for(var i in b.prototype)"constructor"!==i&&(h[i]=b.prototype[i])}var k={id:d.id||"vjs_track_"+n.newGUID(),kind:d.kind||"",label:d.label||"",language:d.language||""},m=function(a){Object.defineProperty(h,a,{get:function(){return k[a]},set:function(){}})};for(var o in k)m(o);return c=h,g(e,c)}return h(b,a),b}(p["default"]);c["default"]=q},{42:42,78:78,85:85,94:94}],76:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(74),j=e(i),k=a(78),l=d(k),m=a(94),n=e(m),o=function(a,b){for(var c=0;c<a.length;c++)b.id!==a[c].id&&(a[c].selected=!1)},p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,b);for(var h=void 0,i=e.length-1;i>=0;i--)if(e[i].selected){o(e,e[i]);break}if(l.IS_IE8){h=n["default"].createElement("custom");for(var k in j["default"].prototype)"constructor"!==k&&(h[k]=j["default"].prototype[k]);for(var m in b.prototype)"constructor"!==m&&(h[m]=b.prototype[m])}return h=c=g(this,a.call(this,e,h)),h.changing_=!1,Object.defineProperty(h,"selectedIndex",{get:function(){for(var a=0;a<this.length;a++)if(this[a].selected)return a;return-1},set:function(){}}),d=h,g(c,d)}return h(b,a),b.prototype.addTrack_=function(b){var c=this;b.selected&&o(this,b),a.prototype.addTrack_.call(this,b),b.addEventListener&&b.addEventListener("selectedchange",function(){c.changing_||(c.changing_=!0,o(c,b),c.changing_=!1,c.trigger("change"))})},b.prototype.addTrack=function(a){this.addTrack_(a)},b.prototype.removeTrack=function(b){a.prototype.removeTrack_.call(this,b)},b}(j["default"]);c["default"]=p},{74:74,78:78,94:94}],77:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(73),j=a(75),k=e(j),l=a(87),m=e(l),n=a(78),o=d(n),p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var h=(0,m["default"])(e,{kind:i.VideoTrackKind[e.kind]||""}),j=c=g(this,a.call(this,h)),k=!1;if(o.IS_IE8)for(var l in b.prototype)"constructor"!==l&&(j[l]=b.prototype[l]);return Object.defineProperty(j,"selected",{get:function(){return k},set:function(a){"boolean"==typeof a&&a!==k&&(k=a,this.trigger("selectedchange"))}}),h.selected&&(j.selected=h.selected),d=j,g(c,d)}return h(b,a),b}(k["default"]);c["default"]=p},{73:73,75:75,78:78,87:87}],78:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}c.__esModule=!0,c.BACKGROUND_SIZE_SUPPORTED=c.TOUCH_ENABLED=c.IS_ANY_SAFARI=c.IS_SAFARI=c.IE_VERSION=c.IS_IE8=c.IS_CHROME=c.IS_EDGE=c.IS_FIREFOX=c.IS_NATIVE_ANDROID=c.IS_OLD_ANDROID=c.ANDROID_VERSION=c.IS_ANDROID=c.IOS_VERSION=c.IS_IOS=c.IS_IPOD=c.IS_IPHONE=c.IS_IPAD=void 0;var f=a(81),g=e(f),h=a(95),i=d(h),j=i["default"].navigator&&i["default"].navigator.userAgent||"",k=/AppleWebKit\/([\d.]+)/i.exec(j),l=k?parseFloat(k.pop()):null,m=c.IS_IPAD=/iPad/i.test(j),n=c.IS_IPHONE=/iPhone/i.test(j)&&!m,o=c.IS_IPOD=/iPod/i.test(j),p=c.IS_IOS=n||m||o,q=(c.IOS_VERSION=function(){var a=j.match(/OS (\d+)_/i);return a&&a[1]?a[1]:null}(),c.IS_ANDROID=/Android/i.test(j)),r=c.ANDROID_VERSION=function(){var a=j.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!a)return null;var b=a[1]&&parseFloat(a[1]),c=a[2]&&parseFloat(a[2]);return b&&c?parseFloat(a[1]+"."+a[2]):b?b:null}(),s=(c.IS_OLD_ANDROID=q&&/webkit/i.test(j)&&r<2.3,c.IS_NATIVE_ANDROID=q&&r<5&&l<537,c.IS_FIREFOX=/Firefox/i.test(j),c.IS_EDGE=/Edge/i.test(j)),t=c.IS_CHROME=!s&&/Chrome/i.test(j),u=(c.IS_IE8=/MSIE\s8\.0/.test(j),c.IE_VERSION=function(a){return a&&parseFloat(a[1])}(/MSIE\s(\d+)\.\d/.exec(j)),c.IS_SAFARI=/Safari/i.test(j)&&!t&&!q&&!s);c.IS_ANY_SAFARI=u||p,c.TOUCH_ENABLED=g.isReal()&&("ontouchstart"in i["default"]||i["default"].DocumentTouch&&i["default"].document instanceof i["default"].DocumentTouch),c.BACKGROUND_SIZE_SUPPORTED=g.isReal()&&"backgroundSize"in i["default"].document.createElement("video").style},{81:81,95:95}],79:[function(a,b,c){"use strict";function d(a,b){var c=0,d=void 0,f=void 0;if(!b)return 0;a&&a.length||(a=(0,e.createTimeRange)(0,0));for(var g=0;g<a.length;g++)d=a.start(g),f=a.end(g),f>b&&(f=b),c+=f-d;return c/b}c.__esModule=!0,c.bufferedPercent=d;var e=a(90)},{90:90}],80:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!a||!b)return"";if("function"==typeof g["default"].getComputedStyle){var c=g["default"].getComputedStyle(a);return c?c[b]:""}return a.currentStyle[b]||""}c.__esModule=!0,c["default"]=e;var f=a(95),g=d(f)},{95:95}],81:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){return a.raw=b,a}function g(a){return"string"==typeof a&&/\S/.test(a)}function h(a){if(/\s/.test(a))throw new Error("class has illegal whitespace characters")}function i(a){return new RegExp("(^|\\s)"+a+"($|\\s)")}function j(){return N["default"]===P["default"].document&&"undefined"!=typeof N["default"].createElement}function k(a){return(0,W.isObject)(a)&&1===a.nodeType}function l(a){return function(b,c){if(!g(b))return N["default"][a](null);g(c)&&(c=N["default"].querySelector(c));var d=k(c)?c:N["default"];return d[a]&&d[a](b)}}function m(a){return 0===a.indexOf("#")&&(a=a.slice(1)),N["default"].getElementById(a)}function n(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},d=arguments[3],e=N["default"].createElement(a);return Object.getOwnPropertyNames(b).forEach(function(a){var c=b[a];a.indexOf("aria-")!==-1||"role"===a||"type"===a?(T["default"].warn((0,V["default"])(L,a,c)),e.setAttribute(a,c)):"textContent"===a?o(e,c):e[a]=c}),Object.getOwnPropertyNames(c).forEach(function(a){e.setAttribute(a,c[a])}),d&&J(e,d),e}function o(a,b){return"undefined"==typeof a.textContent?a.innerText=b:a.textContent=b,a}function p(a,b){b.firstChild?b.insertBefore(a,b.firstChild):b.appendChild(a)}function q(a){var b=a[Y];return b||(b=a[Y]=R.newGUID()),X[b]||(X[b]={}),X[b]}function r(a){var b=a[Y];return!!b&&!!Object.getOwnPropertyNames(X[b]).length}function s(a){var b=a[Y];if(b){delete X[b];try{delete a[Y]}catch(c){a.removeAttribute?a.removeAttribute(Y):a[Y]=null}}}function t(a,b){return h(b),a.classList?a.classList.contains(b):i(b).test(a.className)}function u(a,b){return a.classList?a.classList.add(b):t(a,b)||(a.className=(a.className+" "+b).trim()),a}function v(a,b){return a.classList?a.classList.remove(b):(h(b),a.className=a.className.split(/\s+/).filter(function(a){return a!==b}).join(" ")),a}function w(a,b,c){var d=t(a,b);if("function"==typeof c&&(c=c(a,b)),"boolean"!=typeof c&&(c=!d),c!==d)return c?u(a,b):v(a,b),a}function x(a,b){Object.getOwnPropertyNames(b).forEach(function(c){var d=b[c];null===d||void 0===d||d===!1?a.removeAttribute(c):a.setAttribute(c,d===!0?"":d)})}function y(a){var b={};if(a&&a.attributes&&a.attributes.length>0)for(var c=a.attributes,d=c.length-1;d>=0;d--){var e=c[d].name,f=c[d].value;"boolean"!=typeof a[e]&&",autoplay,controls,loop,muted,default,".indexOf(","+e+",")===-1||(f=null!==f),b[e]=f}return b}function z(a,b){return a.getAttribute(b)}function A(a,b,c){a.setAttribute(b,c)}function B(a,b){a.removeAttribute(b)}function C(){N["default"].body.focus(),N["default"].onselectstart=function(){return!1}}function D(){N["default"].onselectstart=function(){return!0}}function E(a){var b=void 0;if(a.getBoundingClientRect&&a.parentNode&&(b=a.getBoundingClientRect()),!b)return{left:0,top:0};var c=N["default"].documentElement,d=N["default"].body,e=c.clientLeft||d.clientLeft||0,f=P["default"].pageXOffset||d.scrollLeft,g=b.left+f-e,h=c.clientTop||d.clientTop||0,i=P["default"].pageYOffset||d.scrollTop,j=b.top+i-h;return{left:Math.round(g),top:Math.round(j)}}function F(a,b){var c={},d=E(a),e=a.offsetWidth,f=a.offsetHeight,g=d.top,h=d.left,i=b.pageY,j=b.pageX;return b.changedTouches&&(j=b.changedTouches[0].pageX,i=b.changedTouches[0].pageY),c.y=Math.max(0,Math.min(1,(g-i+f)/f)),c.x=Math.max(0,Math.min(1,(j-h)/e)),c}function G(a){return(0,W.isObject)(a)&&3===a.nodeType}function H(a){for(;a.firstChild;)a.removeChild(a.firstChild);return a}function I(a){return"function"==typeof a&&(a=a()),(Array.isArray(a)?a:[a]).map(function(a){return"function"==typeof a&&(a=a()),k(a)||G(a)?a:"string"==typeof a&&/\S/.test(a)?N["default"].createTextNode(a):void 0}).filter(function(a){return a})}function J(a,b){return I(b).forEach(function(b){return a.appendChild(b)}),a}function K(a,b){return J(H(a),b)}c.__esModule=!0,c.$$=c.$=void 0;var L=f(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."],["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."]);c.isReal=j,c.isEl=k,c.getEl=m,c.createEl=n,c.textContent=o,c.insertElFirst=p,c.getElData=q,c.hasElData=r,c.removeElData=s,c.hasElClass=t,c.addElClass=u,c.removeElClass=v,c.toggleElClass=w,c.setElAttributes=x,c.getElAttributes=y,c.getAttribute=z,c.setAttribute=A,c.removeAttribute=B,c.blockTextSelection=C,c.unblockTextSelection=D,c.findElPosition=E,c.getPointerPosition=F,c.isTextNode=G,c.emptyEl=H,c.normalizeContent=I,c.appendContent=J,c.insertContent=K;var M=a(94),N=e(M),O=a(95),P=e(O),Q=a(85),R=d(Q),S=a(86),T=e(S),U=a(98),V=e(U),W=a(88),X={},Y="vdata"+(new Date).getTime();c.$=l("querySelector"),c.$$=l("querySelectorAll")},{85:85,86:86,88:88,94:94,95:95,98:98}],82:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){var c=n.getElData(a);0===c.handlers[b].length&&(delete c.handlers[b],a.removeEventListener?a.removeEventListener(b,c.dispatcher,!1):a.detachEvent&&a.detachEvent("on"+b,c.dispatcher)),Object.getOwnPropertyNames(c.handlers).length<=0&&(delete c.handlers,delete c.dispatcher,delete c.disabled),0===Object.getOwnPropertyNames(c).length&&n.removeElData(a)}function g(a,b,c,d){c.forEach(function(c){a(b,c,d)})}function h(a){function b(){return!0}function c(){return!1}if(!a||!a.isPropagationStopped){var d=a||t["default"].event;a={};for(var e in d)"layerX"!==e&&"layerY"!==e&&"keyLocation"!==e&&"webkitMovementX"!==e&&"webkitMovementY"!==e&&("returnValue"===e&&d.preventDefault||(a[e]=d[e]));if(a.target||(a.target=a.srcElement||v["default"]),a.relatedTarget||(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement),a.preventDefault=function(){d.preventDefault&&d.preventDefault(),a.returnValue=!1,d.returnValue=!1,a.defaultPrevented=!0},a.defaultPrevented=!1,a.stopPropagation=function(){d.stopPropagation&&d.stopPropagation(),a.cancelBubble=!0,d.cancelBubble=!0,a.isPropagationStopped=b},a.isPropagationStopped=c,a.stopImmediatePropagation=function(){d.stopImmediatePropagation&&d.stopImmediatePropagation(),a.isImmediatePropagationStopped=b,a.stopPropagation()},a.isImmediatePropagationStopped=c,null!==a.clientX&&void 0!==a.clientX){var f=v["default"].documentElement,g=v["default"].body;a.pageX=a.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=a.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)}a.which=a.charCode||a.keyCode,null!==a.button&&void 0!==a.button&&(a.button=1&a.button?0:4&a.button?1:2&a.button?2:0)}return a}function i(a,b,c){if(Array.isArray(b))return g(i,a,b,c);var d=n.getElData(a);d.handlers||(d.handlers={}),d.handlers[b]||(d.handlers[b]=[]),c.guid||(c.guid=p.newGUID()),d.handlers[b].push(c),d.dispatcher||(d.disabled=!1,d.dispatcher=function(b,c){if(!d.disabled){b=h(b);var e=d.handlers[b.type];if(e)for(var f=e.slice(0),g=0,i=f.length;g<i&&!b.isImmediatePropagationStopped();g++)try{f[g].call(a,b,c)}catch(j){r["default"].error(j)}}}),1===d.handlers[b].length&&(a.addEventListener?a.addEventListener(b,d.dispatcher,!1):a.attachEvent&&a.attachEvent("on"+b,d.dispatcher))}function j(a,b,c){if(n.hasElData(a)){var d=n.getElData(a);if(d.handlers){if(Array.isArray(b))return g(j,a,b,c);var e=function(b){d.handlers[b]=[],f(a,b)};if(b){var h=d.handlers[b];if(h){if(!c)return void e(b);if(c.guid)for(var i=0;i<h.length;i++)h[i].guid===c.guid&&h.splice(i--,1);f(a,b)}}else for(var k in d.handlers)e(k)}}}function k(a,b,c){var d=n.hasElData(a)?n.getElData(a):{},e=a.parentNode||a.ownerDocument;if("string"==typeof b&&(b={type:b,target:a}),b=h(b),d.dispatcher&&d.dispatcher.call(a,b,c),e&&!b.isPropagationStopped()&&b.bubbles===!0)k.call(null,e,b,c);else if(!e&&!b.defaultPrevented){var f=n.getElData(b.target);b.target[b.type]&&(f.disabled=!0,"function"==typeof b.target[b.type]&&b.target[b.type](),f.disabled=!1)}return!b.defaultPrevented}function l(a,b,c){if(Array.isArray(b))return g(l,a,b,c);var d=function e(){j(a,b,e),c.apply(this,arguments)};d.guid=c.guid=c.guid||p.newGUID(),i(a,b,d)}c.__esModule=!0,c.fixEvent=h,c.on=i,c.off=j,c.trigger=k,c.one=l;var m=a(81),n=e(m),o=a(85),p=e(o),q=a(86),r=d(q),s=a(95),t=d(s),u=a(94),v=d(u)},{81:81,85:85,86:86,94:94,95:95}],83:[function(a,b,c){"use strict";c.__esModule=!0,c.throttle=c.bind=void 0;var d=a(85);c.bind=function(a,b,c){b.guid||(b.guid=(0,d.newGUID)());var e=function(){return b.apply(a,arguments)};return e.guid=c?c+"_"+b.guid:b.guid,e},c.throttle=function(a,b){var c=Date.now();return function(){var d=Date.now();d-c>=b&&(a.apply(void 0,arguments),c=d)}}},{85:85}],84:[function(a,b,c){"use strict";function d(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;a=a<0?0:a;var c=Math.floor(a%60),d=Math.floor(a/60%60),e=Math.floor(a/3600),f=Math.floor(b/60%60),g=Math.floor(b/3600);return(isNaN(a)||a===1/0)&&(e=d=c="-"),e=e>0||g>0?e+":":"",d=((e||f>=10)&&d<10?"0"+d:d)+":",c=c<10?"0"+c:c,e+d+c}c.__esModule=!0,c["default"]=d},{}],85:[function(a,b,c){"use strict";function d(){return e++}c.__esModule=!0,c.newGUID=d;var e=1},{}],86:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0,c.logByType=void 0;var e=a(95),f=d(e),g=a(78),h=a(88),i=void 0,j=c.logByType=function(a,b){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:!!g.IE_VERSION&&g.IE_VERSION<11;"log"!==a&&b.unshift(a.toUpperCase()+":"),i.history.push(b),b.unshift("VIDEOJS:");var d=f["default"].console&&f["default"].console[a];d&&(c&&(b=b.map(function(a){if((0,h.isObject)(a)||Array.isArray(a))try{return JSON.stringify(a)}catch(b){return String(a)}return String(a)}).join(" ")),d.apply?d[Array.isArray(b)?"apply":"call"](f["default"].console,b):d(b))};i=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];j("log",b)},i.history=[],i.error=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return j("error",b)},i.warn=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return j("warn",b)},c["default"]=i},{78:78,88:88,95:95}],87:[function(a,b,c){"use strict";function d(){for(var a={},b=arguments.length,c=Array(b),f=0;f<b;f++)c[f]=arguments[f];return c.forEach(function(b){b&&(0,e.each)(b,function(b,c){if(!(0,e.isPlain)(b))return void(a[c]=b);(0,e.isPlain)(a[c])||(a[c]={}),a[c]=d(a[c],b)})}),a}c.__esModule=!0,c["default"]=d;var e=a(88)},{88:88}],88:[function(a,b,c){"use strict";function d(a,b){k(a).forEach(function(c){return b(a[c],c)})}function e(a,b){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return k(a).reduce(function(c,d){return b(c,a[d],d)},c)}function f(a){for(var b=arguments.length,c=Array(b>1?b-1:0),e=1;e<b;e++)c[e-1]=arguments[e];return Object.assign?Object.assign.apply(Object,[a].concat(c)):(c.forEach(function(b){b&&d(b,function(b,c){a[c]=b})}),a)}function g(a){return!!a&&"object"===(void 0===a?"undefined":i(a))}function h(a){return g(a)&&"[object Object]"===j.call(a)&&a.constructor===Object}c.__esModule=!0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};c.each=d,c.reduce=e,c.assign=f,c.isObject=g,c.isPlain=h;var j=Object.prototype.toString,k=function(a){return g(a)?Object.keys(a):[]}},{}],89:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0,c.setTextContent=c.createStyleElement=void 0;var e=a(94),f=d(e);c.createStyleElement=function(a){var b=f["default"].createElement("style");return b.className=a,b},c.setTextContent=function(a,b){a.styleSheet?a.styleSheet.cssText=b:a.textContent=b}},{94:94}],90:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b,c){if(b<0||b>c)throw new Error("Failed to execute '"+a+"' on 'TimeRanges': The index provided ("+b+") is greater than or equal to the maximum bound ("+c+").")}function f(a,b,c,d){return void 0===d&&(j["default"].warn("DEPRECATED: Function '"+a+"' on 'TimeRanges' called without an index argument."),d=0),e(a,d,c.length-1),c[d][b]}function g(a){return void 0===a||0===a.length?{length:0,start:function(){throw new Error("This TimeRanges object is empty")},end:function(){throw new Error("This TimeRanges object is empty")}}:{length:a.length,start:f.bind(null,"start",0,a),end:f.bind(null,"end",1,a)}}function h(a,b){return Array.isArray(a)?g(a):void 0===a||void 0===b?g():g([[a,b]])}c.__esModule=!0,c.createTimeRange=void 0,c.createTimeRanges=h;var i=a(86),j=d(i);c.createTimeRange=h},{86:86}],91:[function(a,b,c){"use strict";function d(a){return"string"!=typeof a?a:a.charAt(0).toUpperCase()+a.slice(1)}c.__esModule=!0,c["default"]=d},{}],92:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0,c.isCrossOrigin=c.getFileExtension=c.getAbsoluteURL=c.parseUrl=void 0;var e=a(94),f=d(e),g=a(95),h=d(g),i=c.parseUrl=function(a){var b=["protocol","hostname","port","pathname","search","hash","host"],c=f["default"].createElement("a");c.href=a;var d=""===c.host&&"file:"!==c.protocol,e=void 0;d&&(e=f["default"].createElement("div"),e.innerHTML='<a href="'+a+'"></a>',c=e.firstChild,e.setAttribute("style","display:none; position:absolute;"),f["default"].body.appendChild(e));for(var g={},h=0;h<b.length;h++)g[b[h]]=c[b[h]];return"http:"===g.protocol&&(g.host=g.host.replace(/:80$/,"")),"https:"===g.protocol&&(g.host=g.host.replace(/:443$/,"")),d&&f["default"].body.removeChild(e),g};c.getAbsoluteURL=function(a){if(!a.match(/^https?:\/\//)){var b=f["default"].createElement("div");b.innerHTML='<a href="'+a+'">x</a>',a=b.firstChild.href}return a},c.getFileExtension=function(a){if("string"==typeof a){var b=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,c=b.exec(a);if(c)return c.pop().toLowerCase()}return""},c.isCrossOrigin=function(a){var b=h["default"].location,c=i(a);return(":"===c.protocol?b.protocol:c.protocol)+c.host!==b.protocol+b.host}},{94:94,95:95}],93:[function(b,c,d){"use strict";function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a){return a&&a.__esModule?a:{"default":a}}function g(a,b,c){var d=void 0;if("string"==typeof a){if(0===a.indexOf("#")&&(a=a.slice(1)),g.getPlayers()[a])return b&&O["default"].warn('Player "'+a+'" is already initialised. Options will not be applied.'),c&&g.getPlayers()[a].ready(c),g.getPlayers()[a];d=Q.getEl(a)}else d=a;if(!d||!d.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");if(d.player||x["default"].players[d.playerId])return d.player||x["default"].players[d.playerId];b=b||{},g.hooks("beforesetup").forEach(function(a){var c=a(d,(0,B["default"])(b));if(!(0,V.isObject)(c)||Array.isArray(c))return void O["default"].error("please return an object in beforesetup hooks");b=(0,B["default"])(b,c)});var e=r["default"].getComponent("Player"),f=new e(d,b,c);return g.hooks("setup").forEach(function(a){return a(f)}),f}d.__esModule=!0;var h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},i=b(95),j=f(i),k=b(94),l=f(k),m=b(56),n=e(m),o=b(89),p=e(o),q=b(5),r=f(q),s=b(42),t=f(s),u=b(82),v=e(u),w=b(51),x=f(w),y=b(52),z=f(y),A=b(87),B=f(A),C=b(83),D=e(C),E=b(72),F=f(E),G=b(64),H=f(G),I=b(77),J=f(I),K=b(90),L=b(84),M=f(L),N=b(86),O=f(N),P=b(81),Q=e(P),R=b(78),S=e(R),T=b(92),U=e(T),V=b(88),W=b(80),X=f(W),Y=b(43),Z=f(Y),$=b(99),_=f($),aa=b(62),ba=f(aa);if("undefined"==typeof HTMLVideoElement&&Q.isReal()&&(l["default"].createElement("video"),l["default"].createElement("audio"),l["default"].createElement("track")),g.hooks_={},g.hooks=function(a,b){return g.hooks_[a]=g.hooks_[a]||[],b&&(g.hooks_[a]=g.hooks_[a].concat(b)),g.hooks_[a]},g.hook=function(a,b){g.hooks(a,b)},g.removeHook=function(a,b){var c=g.hooks(a).indexOf(b);return!(c<=-1)&&(g.hooks_[a]=g.hooks_[a].slice(),g.hooks_[a].splice(c,1),!0)},j["default"].VIDEOJS_NO_DYNAMIC_STYLE!==!0&&Q.isReal()){var ca=Q.$(".vjs-styles-defaults");if(!ca){ca=p.createStyleElement("vjs-styles-defaults");var da=Q.$("head");da&&da.insertBefore(ca,da.firstChild),p.setTextContent(ca,"\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")}}n.autoSetupTimeout(1,g),g.VERSION="5.18.4",g.options=x["default"].prototype.options_,g.getPlayers=function(){return x["default"].players},g.players=x["default"].players,g.getComponent=r["default"].getComponent,g.registerComponent=function(a,b){ba["default"].isTech(b)&&O["default"].warn("The "+a+" tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"),r["default"].registerComponent.call(r["default"],a,b)},g.getTech=ba["default"].getTech,g.registerTech=ba["default"].registerTech,g.browser=S,g.TOUCH_ENABLED=S.TOUCH_ENABLED,g.extend=Z["default"],g.mergeOptions=B["default"],g.bind=D.bind,g.plugin=z["default"],g.addLanguage=function(a,b){var c;return a=(""+a).toLowerCase(),g.options.languages=(0,B["default"])(g.options.languages,(c={},c[a]=b,c)),g.options.languages[a]},g.log=O["default"],g.createTimeRange=g.createTimeRanges=K.createTimeRanges,g.formatTime=M["default"],g.parseUrl=U.parseUrl,g.isCrossOrigin=U.isCrossOrigin,g.EventTarget=t["default"],g.on=v.on,g.one=v.one,g.off=v.off,g.trigger=v.trigger,g.xhr=_["default"],g.TextTrack=F["default"],g.AudioTrack=H["default"],g.VideoTrack=J["default"],g.isEl=Q.isEl,g.isTextNode=Q.isTextNode,g.createEl=Q.createEl,g.hasClass=Q.hasElClass,g.addClass=Q.addElClass,g.removeClass=Q.removeElClass,g.toggleClass=Q.toggleElClass,g.setAttributes=Q.setElAttributes,g.getAttributes=Q.getElAttributes,g.emptyEl=Q.emptyEl,g.appendContent=Q.appendContent,g.insertContent=Q.insertContent,g.computedStyle=X["default"],"function"==typeof a&&a.amd?a("videojs",[],function(){return g}):"object"===(void 0===d?"undefined":h(d))&&"object"===(void 0===c?"undefined":h(c))&&(c.exports=g),d["default"]=g},{42:42,43:43,5:5,51:51,52:52,56:56,62:62,64:64,72:72,77:77,78:78,80:80,81:81,82:82,83:83,84:84,86:86,87:87,88:88,89:89,90:90,92:92,94:94,95:95,99:99}],94:[function(a,b,c){(function(c){var d=void 0!==c?c:"undefined"!=typeof window?window:{},e=a(96);if("undefined"!=typeof document)b.exports=document;else{var f=d["__GLOBAL_DOCUMENT_CACHE@4"];f||(f=d["__GLOBAL_DOCUMENT_CACHE@4"]=e),b.exports=f}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{96:96}],95:[function(a,b,c){(function(a){"undefined"!=typeof window?b.exports=window:void 0!==a?b.exports=a:"undefined"!=typeof self?b.exports=self:b.exports={}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],96:[function(a,b,c){},{}],97:[function(a,b,c){function d(a,b){var c,d=null;try{c=JSON.parse(a,b)}catch(e){d=e}return[d,c]}b.exports=d},{}],98:[function(a,b,c){function d(a){return a.replace(/\n\r?\s*/g,"")}b.exports=function(a){for(var b="",c=0;c<arguments.length;c++)b+=d(a[c])+(arguments[c+1]||"");return b}},{}],99:[function(a,b,c){"use strict";function d(a,b){for(var c=0;c<a.length;c++)b(a[c])}function e(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function f(a,b,c){var d=a;return l(b)?(c=b,"string"==typeof a&&(d={uri:a})):d=n(b,{uri:a}),d.callback=c,d}function g(a,b,c){return b=f(a,b,c),h(b)}function h(a){function b(){4===k.readyState&&setTimeout(f,0)}function c(){var a=void 0;if(a=k.response?k.response:k.responseText||i(k),u)try{a=JSON.parse(a)}catch(b){}return a}function d(a){return clearTimeout(o),a instanceof Error||(a=new Error(""+(a||"Unknown XMLHttpRequest Error"))),a.statusCode=0,j(a,v)}function f(){if(!n){var b;clearTimeout(o),b=a.useXDR&&void 0===k.status?200:1223===k.status?204:k.status;var d=v,e=null;return 0!==b?(d={body:c(),statusCode:b,method:q,headers:{},url:p,rawRequest:k},k.getAllResponseHeaders&&(d.headers=m(k.getAllResponseHeaders()))):e=new Error("Internal XMLHttpRequest Error"),j(e,d,d.body)}}if("undefined"==typeof a.callback)throw new Error("callback argument missing");var h=!1,j=function(b,c,d){h||(h=!0,a.callback(b,c,d))},k=a.xhr||null;k||(k=a.cors||a.useXDR?new g.XDomainRequest:new g.XMLHttpRequest)
;var l,n,o,p=k.url=a.uri||a.url,q=k.method=a.method||"GET",r=a.body||a.data,s=k.headers=a.headers||{},t=!!a.sync,u=!1,v={body:void 0,headers:{},statusCode:0,method:q,url:p,rawRequest:k};if("json"in a&&a.json!==!1&&(u=!0,s.accept||s.Accept||(s.Accept="application/json"),"GET"!==q&&"HEAD"!==q&&(s["content-type"]||s["Content-Type"]||(s["Content-Type"]="application/json"),r=JSON.stringify(a.json===!0?r:a.json))),k.onreadystatechange=b,k.onload=f,k.onerror=d,k.onprogress=function(){},k.onabort=function(){n=!0},k.ontimeout=d,k.open(q,p,!t,a.username,a.password),t||(k.withCredentials=!!a.withCredentials),!t&&a.timeout>0&&(o=setTimeout(function(){if(!n){n=!0,k.abort("timeout");var a=new Error("XMLHttpRequest timeout");a.code="ETIMEDOUT",d(a)}},a.timeout)),k.setRequestHeader)for(l in s)s.hasOwnProperty(l)&&k.setRequestHeader(l,s[l]);else if(a.headers&&!e(a.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in a&&(k.responseType=a.responseType),"beforeSend"in a&&"function"==typeof a.beforeSend&&a.beforeSend(k),k.send(r||null),k}function i(a){if("document"===a.responseType)return a.responseXML;var b=a.responseXML&&"parsererror"===a.responseXML.documentElement.nodeName;return""!==a.responseType||b?null:a.responseXML}function j(){}var k=a(95),l=a(100),m=a(103),n=a(104);b.exports=g,g.XMLHttpRequest=k.XMLHttpRequest||j,g.XDomainRequest="withCredentials"in new g.XMLHttpRequest?g.XMLHttpRequest:k.XDomainRequest,d(["get","put","post","patch","head","delete"],function(a){g["delete"===a?"del":a]=function(b,c,d){return c=f(b,c,d),c.method=a.toUpperCase(),h(c)}})},{100:100,103:103,104:104,95:95}],100:[function(a,b,c){function d(a){var b=e.call(a);return"[object Function]"===b||"function"==typeof a&&"[object RegExp]"!==b||"undefined"!=typeof window&&(a===window.setTimeout||a===window.alert||a===window.confirm||a===window.prompt)}b.exports=d;var e=Object.prototype.toString},{}],101:[function(a,b,c){function d(a,b,c){if(!h(b))throw new TypeError("iterator must be a function");arguments.length<3&&(c=this),"[object Array]"===i.call(a)?e(a,b,c):"string"==typeof a?f(a,b,c):g(a,b,c)}function e(a,b,c){for(var d=0,e=a.length;d<e;d++)j.call(a,d)&&b.call(c,a[d],d,a)}function f(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c,a.charAt(d),d,a)}function g(a,b,c){for(var d in a)j.call(a,d)&&b.call(c,a[d],d,a)}var h=a(100);b.exports=d;var i=Object.prototype.toString,j=Object.prototype.hasOwnProperty},{100:100}],102:[function(a,b,c){function d(a){return a.replace(/^\s*|\s*$/g,"")}c=b.exports=d,c.left=function(a){return a.replace(/^\s*/,"")},c.right=function(a){return a.replace(/\s*$/,"")}},{}],103:[function(a,b,c){var d=a(102),e=a(101),f=function(a){return"[object Array]"===Object.prototype.toString.call(a)};b.exports=function(a){if(!a)return{};var b={};return e(d(a).split("\n"),function(a){var c=a.indexOf(":"),e=d(a.slice(0,c)).toLowerCase(),g=d(a.slice(c+1));"undefined"==typeof b[e]?b[e]=g:f(b[e])?b[e].push(g):b[e]=[b[e],g]}),b}},{101:101,102:102}],104:[function(a,b,c){function d(){for(var a={},b=0;b<arguments.length;b++){var c=arguments[b];for(var d in c)e.call(c,d)&&(a[d]=c[d])}return a}b.exports=d;var e=Object.prototype.hasOwnProperty},{}],105:[function(a,b,c){var d=b.exports={WebVTT:a(106).WebVTT,VTTCue:a(107).VTTCue,VTTRegion:a(109).VTTRegion};window.vttjs=d,window.WebVTT=d.WebVTT;var e=d.VTTCue,f=d.VTTRegion,g=window.VTTCue,h=window.VTTRegion;d.shim=function(){window.VTTCue=e,window.VTTRegion=f},d.restore=function(){window.VTTCue=g,window.VTTRegion=h},window.VTTCue||d.shim()},{106:106,107:107,109:109}],106:[function(a,b,c){!function(a){function b(a,b){this.name="ParsingError",this.code=a.code,this.message=b||a.message}function c(a){function b(a,b,c,d){return 3600*(0|a)+60*(0|b)+(0|c)+(0|d)/1e3}var c=a.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return c?c[3]?b(c[1],c[2],c[3].replace(":",""),c[4]):c[1]>59?b(c[1],c[2],0,c[4]):b(0,c[1],c[2],c[4]):null}function d(){this.values=p(null)}function e(a,b,c,d){var e=d?a.split(d):[a];for(var f in e)if("string"==typeof e[f]){var g=e[f].split(c);if(2===g.length){var h=g[0],i=g[1];b(h,i)}}}function f(a,f,g){function h(){var d=c(a);if(null===d)throw new b(b.Errors.BadTimeStamp,"Malformed timestamp: "+k);return a=a.replace(/^[^\sa-zA-Z-]+/,""),d}function i(a,b){var c=new d;e(a,function(a,b){switch(a){case"region":for(var d=g.length-1;d>=0;d--)if(g[d].id===b){c.set(a,g[d].region);break}break;case"vertical":c.alt(a,b,["rl","lr"]);break;case"line":var e=b.split(","),f=e[0];c.integer(a,f),c.percent(a,f)&&c.set("snapToLines",!1),c.alt(a,f,["auto"]),2===e.length&&c.alt("lineAlign",e[1],["start","middle","end"]);break;case"position":e=b.split(","),c.percent(a,e[0]),2===e.length&&c.alt("positionAlign",e[1],["start","middle","end"]);break;case"size":c.percent(a,b);break;case"align":c.alt(a,b,["start","middle","end","left","right"])}},/:/,/\s/),b.region=c.get("region",null),b.vertical=c.get("vertical",""),b.line=c.get("line","auto"),b.lineAlign=c.get("lineAlign","start"),b.snapToLines=c.get("snapToLines",!0),b.size=c.get("size",100),b.align=c.get("align","middle"),b.position=c.get("position",{start:0,left:0,middle:50,end:100,right:100},b.align),b.positionAlign=c.get("positionAlign",{start:"start",left:"start",middle:"middle",end:"end",right:"end"},b.align)}function j(){a=a.replace(/^\s+/,"")}var k=a;if(j(),f.startTime=h(),j(),"-->"!==a.substr(0,3))throw new b(b.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+k);a=a.substr(3),j(),f.endTime=h(),j(),i(a,f)}function g(a,b){function d(){function a(a){return b=b.substr(a.length),a}if(!b)return null;var c=b.match(/^([^<]*)(<[^>]+>?)?/);return a(c[1]?c[1]:c[2])}function e(a){return q[a]}function f(a){for(;o=a.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)a=a.replace(o[0],e);return a}function g(a,b){return!t[b.localName]||t[b.localName]===a.localName}function h(b,c){var d=r[b];if(!d)return null;var e=a.document.createElement(d);e.localName=d;var f=s[b];return f&&c&&(e[f]=c.trim()),e}for(var i,j=a.document.createElement("div"),k=j,l=[];null!==(i=d());)if("<"!==i[0])k.appendChild(a.document.createTextNode(f(i)));else{if("/"===i[1]){l.length&&l[l.length-1]===i.substr(2).replace(">","")&&(l.pop(),k=k.parentNode);continue}var m,n=c(i.substr(1,i.length-2));if(n){m=a.document.createProcessingInstruction("timestamp",n),k.appendChild(m);continue}var o=i.match(/^<([^.\s\/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!o)continue;if(m=h(o[1],o[3]),!m)continue;if(!g(k,m))continue;o[2]&&(m.className=o[2].substr(1).replace("."," ")),l.push(o[1]),k.appendChild(m),k=m}return j}function h(a){for(var b=0;b<u.length;b++){var c=u[b];if(a>=c[0]&&a<=c[1])return!0}return!1}function i(a){function b(a,b){for(var c=b.childNodes.length-1;c>=0;c--)a.push(b.childNodes[c])}function c(a){if(!a||!a.length)return null;var d=a.pop(),e=d.textContent||d.innerText;if(e){var f=e.match(/^.*(\n|\r)/);return f?(a.length=0,f[0]):e}return"ruby"===d.tagName?c(a):d.childNodes?(b(a,d),c(a)):void 0}var d,e=[],f="";if(!a||!a.childNodes)return"ltr";for(b(e,a);f=c(e);)for(var g=0;g<f.length;g++)if(d=f.charCodeAt(g),h(d))return"rtl";return"ltr"}function j(a){if("number"==typeof a.line&&(a.snapToLines||a.line>=0&&a.line<=100))return a.line;if(!a.track||!a.track.textTrackList||!a.track.textTrackList.mediaElement)return-1;for(var b=a.track,c=b.textTrackList,d=0,e=0;e<c.length&&c[e]!==b;e++)"showing"===c[e].mode&&d++;return++d*-1}function k(){}function l(a,b,c){var d=/MSIE\s8\.0/.test(navigator.userAgent),e="rgba(255, 255, 255, 1)",f="rgba(0, 0, 0, 0.8)";d&&(e="rgb(255, 255, 255)",f="rgb(0, 0, 0)"),k.call(this),this.cue=b,this.cueDiv=g(a,b.text);var h={color:e,backgroundColor:f,position:"relative",left:0,right:0,top:0,bottom:0,display:"inline"};d||(h.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl",h.unicodeBidi="plaintext"),this.applyStyles(h,this.cueDiv),this.div=a.document.createElement("div"),h={textAlign:"middle"===b.align?"center":b.align,font:c.font,whiteSpace:"pre-line",position:"absolute"},d||(h.direction=i(this.cueDiv),h.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl".stylesunicodeBidi="plaintext"),this.applyStyles(h),this.div.appendChild(this.cueDiv);var j=0;switch(b.positionAlign){case"start":j=b.position;break;case"middle":j=b.position-b.size/2;break;case"end":j=b.position-b.size}""===b.vertical?this.applyStyles({left:this.formatStyle(j,"%"),width:this.formatStyle(b.size,"%")}):this.applyStyles({top:this.formatStyle(j,"%"),height:this.formatStyle(b.size,"%")}),this.move=function(a){this.applyStyles({top:this.formatStyle(a.top,"px"),bottom:this.formatStyle(a.bottom,"px"),left:this.formatStyle(a.left,"px"),right:this.formatStyle(a.right,"px"),height:this.formatStyle(a.height,"px"),width:this.formatStyle(a.width,"px")})}}function m(a){var b,c,d,e,f=/MSIE\s8\.0/.test(navigator.userAgent);if(a.div){c=a.div.offsetHeight,d=a.div.offsetWidth,e=a.div.offsetTop;var g=(g=a.div.childNodes)&&(g=g[0])&&g.getClientRects&&g.getClientRects();a=a.div.getBoundingClientRect(),b=g?Math.max(g[0]&&g[0].height||0,a.height/g.length):0}this.left=a.left,this.right=a.right,this.top=a.top||e,this.height=a.height||c,this.bottom=a.bottom||e+(a.height||c),this.width=a.width||d,this.lineHeight=void 0!==b?b:a.lineHeight,f&&!this.lineHeight&&(this.lineHeight=13)}function n(a,b,c,d){function e(a,b){for(var e,f=new m(a),g=1,h=0;h<b.length;h++){for(;a.overlapsOppositeAxis(c,b[h])||a.within(c)&&a.overlapsAny(d);)a.move(b[h]);if(a.within(c))return a;var i=a.intersectPercentage(c);g>i&&(e=new m(a),g=i),a=new m(f)}return e||f}var f=new m(b),g=b.cue,h=j(g),i=[];if(g.snapToLines){var k;switch(g.vertical){case"":i=["+y","-y"],k="height";break;case"rl":i=["+x","-x"],k="width";break;case"lr":i=["-x","+x"],k="width"}var l=f.lineHeight,n=l*Math.round(h),o=c[k]+l,p=i[0];Math.abs(n)>o&&(n=n<0?-1:1,n*=Math.ceil(o/l)*l),h<0&&(n+=""===g.vertical?c.height:c.width,i=i.reverse()),f.move(p,n)}else{var q=f.lineHeight/c.height*100;switch(g.lineAlign){case"middle":h-=q/2;break;case"end":h-=q}switch(g.vertical){case"":b.applyStyles({top:b.formatStyle(h,"%")});break;case"rl":b.applyStyles({left:b.formatStyle(h,"%")});break;case"lr":b.applyStyles({right:b.formatStyle(h,"%")})}i=["+y","-x","+x","-y"],f=new m(b)}var r=e(f,i);b.move(r.toCSSCompatValues(c))}function o(){}var p=Object.create||function(){function a(){}return function(b){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return a.prototype=b,new a}}();b.prototype=p(Error.prototype),b.prototype.constructor=b,b.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},d.prototype={set:function(a,b){this.get(a)||""===b||(this.values[a]=b)},get:function(a,b,c){return c?this.has(a)?this.values[a]:b[c]:this.has(a)?this.values[a]:b},has:function(a){return a in this.values},alt:function(a,b,c){for(var d=0;d<c.length;++d)if(b===c[d]){this.set(a,b);break}},integer:function(a,b){/^-?\d+$/.test(b)&&this.set(a,parseInt(b,10))},percent:function(a,b){return!!(b.match(/^([\d]{1,3})(\.[\d]*)?%$/)&&(b=parseFloat(b),b>=0&&b<=100))&&(this.set(a,b),!0)}};var q={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},r={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},s={v:"title",lang:"lang"},t={rt:"ruby"},u=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];k.prototype.applyStyles=function(a,b){b=b||this.div;for(var c in a)a.hasOwnProperty(c)&&(b.style[c]=a[c])},k.prototype.formatStyle=function(a,b){return 0===a?0:a+b},l.prototype=p(k.prototype),l.prototype.constructor=l,m.prototype.move=function(a,b){switch(b=void 0!==b?b:this.lineHeight,a){case"+x":this.left+=b,this.right+=b;break;case"-x":this.left-=b,this.right-=b;break;case"+y":this.top+=b,this.bottom+=b;break;case"-y":this.top-=b,this.bottom-=b}},m.prototype.overlaps=function(a){return this.left<a.right&&this.right>a.left&&this.top<a.bottom&&this.bottom>a.top},m.prototype.overlapsAny=function(a){for(var b=0;b<a.length;b++)if(this.overlaps(a[b]))return!0;return!1},m.prototype.within=function(a){return this.top>=a.top&&this.bottom<=a.bottom&&this.left>=a.left&&this.right<=a.right},m.prototype.overlapsOppositeAxis=function(a,b){switch(b){case"+x":return this.left<a.left;case"-x":return this.right>a.right;case"+y":return this.top<a.top;case"-y":return this.bottom>a.bottom}},m.prototype.intersectPercentage=function(a){return Math.max(0,Math.min(this.right,a.right)-Math.max(this.left,a.left))*Math.max(0,Math.min(this.bottom,a.bottom)-Math.max(this.top,a.top))/(this.height*this.width)},m.prototype.toCSSCompatValues=function(a){return{top:this.top-a.top,bottom:a.bottom-this.bottom,left:this.left-a.left,right:a.right-this.right,height:this.height,width:this.width}},m.getSimpleBoxPosition=function(a){var b=a.div?a.div.offsetHeight:a.tagName?a.offsetHeight:0,c=a.div?a.div.offsetWidth:a.tagName?a.offsetWidth:0,d=a.div?a.div.offsetTop:a.tagName?a.offsetTop:0;return a=a.div?a.div.getBoundingClientRect():a.tagName?a.getBoundingClientRect():a,{left:a.left,right:a.right,top:a.top||d,height:a.height||b,bottom:a.bottom||d+(a.height||b),width:a.width||c}},o.StringDecoder=function(){return{decode:function(a){if(!a)return"";if("string"!=typeof a)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(a))}}},o.convertCueToDOMTree=function(a,b){return a&&b?g(a,b):null};o.processCues=function(a,b,c){function d(a){for(var b=0;b<a.length;b++)if(a[b].hasBeenReset||!a[b].displayState)return!0;return!1}if(!a||!b||!c)return null;for(;c.firstChild;)c.removeChild(c.firstChild);var e=a.document.createElement("div");if(e.style.position="absolute",e.style.left="0",e.style.right="0",e.style.top="0",e.style.bottom="0",e.style.margin="1.5%",c.appendChild(e),d(b)){var f=[],g=m.getSimpleBoxPosition(e),h=Math.round(.05*g.height*100)/100,i={font:h+"px sans-serif"};!function(){for(var c,d,h=0;h<b.length;h++)d=b[h],c=new l(a,d,i),e.appendChild(c.div),n(a,c,g,f),d.displayState=c.div,f.push(m.getSimpleBoxPosition(c))}()}else for(var j=0;j<b.length;j++)e.appendChild(b[j].displayState)},o.Parser=function(a,b,c){c||(c=b,b={}),b||(b={}),this.window=a,this.vttjs=b,this.state="INITIAL",this.buffer="",this.decoder=c||new TextDecoder("utf8"),this.regionList=[]},o.Parser.prototype={reportOrThrowError:function(a){if(!(a instanceof b))throw a;this.onparsingerror&&this.onparsingerror(a)},parse:function(a){function c(){for(var a=i.buffer,b=0;b<a.length&&"\r"!==a[b]&&"\n"!==a[b];)++b;var c=a.substr(0,b);return"\r"===a[b]&&++b,"\n"===a[b]&&++b,i.buffer=a.substr(b),c}function g(a){var b=new d;if(e(a,function(a,c){switch(a){case"id":b.set(a,c);break;case"width":b.percent(a,c);break;case"lines":b.integer(a,c);break;case"regionanchor":case"viewportanchor":var e=c.split(",");if(2!==e.length)break;var f=new d;if(f.percent("x",e[0]),f.percent("y",e[1]),!f.has("x")||!f.has("y"))break;b.set(a+"X",f.get("x")),b.set(a+"Y",f.get("y"));break;case"scroll":b.alt(a,c,["up"])}},/=/,/\s/),b.has("id")){var c=new(i.vttjs.VTTRegion||i.window.VTTRegion);c.width=b.get("width",100),c.lines=b.get("lines",3),c.regionAnchorX=b.get("regionanchorX",0),c.regionAnchorY=b.get("regionanchorY",100),c.viewportAnchorX=b.get("viewportanchorX",0),c.viewportAnchorY=b.get("viewportanchorY",100),c.scroll=b.get("scroll",""),i.onregion&&i.onregion(c),i.regionList.push({id:b.get("id"),region:c})}}function h(a){e(a,function(a,b){switch(a){case"Region":g(b)}},/:/)}var i=this;a&&(i.buffer+=i.decoder.decode(a,{stream:!0}));try{var j;if("INITIAL"===i.state){if(!/\r\n|\n/.test(i.buffer))return this;j=c();var k=j.match(/^WEBVTT([ \t].*)?$/);if(!k||!k[0])throw new b(b.Errors.BadSignature);i.state="HEADER"}for(var l=!1;i.buffer;){if(!/\r\n|\n/.test(i.buffer))return this;switch(l?l=!1:j=c(),i.state){case"HEADER":/:/.test(j)?h(j):j||(i.state="ID");continue;case"NOTE":j||(i.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(j)){i.state="NOTE";break}if(!j)continue;if(i.cue=new(i.vttjs.VTTCue||i.window.VTTCue)(0,0,""),i.state="CUE",j.indexOf("-->")===-1){i.cue.id=j;continue}case"CUE":try{f(j,i.cue,i.regionList)}catch(m){i.reportOrThrowError(m),i.cue=null,i.state="BADCUE";continue}i.state="CUETEXT";continue;case"CUETEXT":var n=j.indexOf("-->")!==-1;if(!j||n&&(l=!0)){i.oncue&&i.oncue(i.cue),i.cue=null,i.state="ID";continue}i.cue.text&&(i.cue.text+="\n"),i.cue.text+=j;continue;case"BADCUE":j||(i.state="ID");continue}}}catch(m){i.reportOrThrowError(m),"CUETEXT"===i.state&&i.cue&&i.oncue&&i.oncue(i.cue),i.cue=null,i.state="INITIAL"===i.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var a=this;try{if(a.buffer+=a.decoder.decode(),(a.cue||"HEADER"===a.state)&&(a.buffer+="\n\n",a.parse()),"INITIAL"===a.state)throw new b(b.Errors.BadSignature)}catch(c){a.reportOrThrowError(c)}return a.onflush&&a.onflush(),this}},a.WebVTT=o}(this,this.vttjs)},{}],107:[function(a,b,c){void 0!==b&&b.exports&&(this.VTTCue=this.VTTCue||a(108).VTTCue),function(a){a.VTTCue.prototype.toJSON=function(){var a={},b=this;return Object.keys(this).forEach(function(c){"getCueAsHTML"!==c&&"hasBeenReset"!==c&&"displayState"!==c&&(a[c]=b[c])}),a},a.VTTCue.create=function(b){if(!b.hasOwnProperty("startTime")||!b.hasOwnProperty("endTime")||!b.hasOwnProperty("text"))throw new Error("You must at least have start time, end time, and text.");var c=new a.VTTCue(b.startTime,b.endTime,b.text);for(var d in b)c.hasOwnProperty(d)&&(c[d]=b[d]);return c},a.VTTCue.fromJSON=function(a){return this.create(JSON.parse(a))}}(this)},{108:108}],108:[function(a,b,c){!function(a,b){function c(a){return"string"==typeof a&&(!!g[a.toLowerCase()]&&a.toLowerCase())}function d(a){return"string"==typeof a&&(!!h[a.toLowerCase()]&&a.toLowerCase())}function e(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)a[d]=c[d]}return a}function f(a,b,f){var g=this,h=/MSIE\s8\.0/.test(navigator.userAgent),i={};h?g=document.createElement("custom"):i.enumerable=!0,g.hasBeenReset=!1;var j="",k=!1,l=a,m=b,n=f,o=null,p="",q=!0,r="auto",s="start",t=50,u="middle",v=50,w="middle";if(Object.defineProperty(g,"id",e({},i,{get:function(){return j},set:function(a){j=""+a}})),Object.defineProperty(g,"pauseOnExit",e({},i,{get:function(){return k},set:function(a){k=!!a}})),Object.defineProperty(g,"startTime",e({},i,{get:function(){return l},set:function(a){if("number"!=typeof a)throw new TypeError("Start time must be set to a number.");l=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"endTime",e({},i,{get:function(){return m},set:function(a){if("number"!=typeof a)throw new TypeError("End time must be set to a number.");m=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"text",e({},i,{get:function(){return n},set:function(a){n=""+a,this.hasBeenReset=!0}})),Object.defineProperty(g,"region",e({},i,{get:function(){return o},set:function(a){o=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"vertical",e({},i,{get:function(){return p},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");p=b,this.hasBeenReset=!0}})),Object.defineProperty(g,"snapToLines",e({},i,{get:function(){return q},set:function(a){q=!!a,this.hasBeenReset=!0}})),Object.defineProperty(g,"line",e({},i,{get:function(){return r},set:function(a){if("number"!=typeof a&&"auto"!==a)throw new SyntaxError("An invalid number or illegal string was specified.");r=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"lineAlign",e({},i,{get:function(){return s},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");s=b,this.hasBeenReset=!0}})),Object.defineProperty(g,"position",e({},i,{get:function(){return t},set:function(a){if(a<0||a>100)throw new Error("Position must be between 0 and 100.");t=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"positionAlign",e({},i,{get:function(){return u},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");u=b,this.hasBeenReset=!0}})),Object.defineProperty(g,"size",e({},i,{get:function(){return v},set:function(a){if(a<0||a>100)throw new Error("Size must be between 0 and 100.");v=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"align",e({},i,{get:function(){return w},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");w=b,this.hasBeenReset=!0}})),g.displayState=void 0,h)return g}var g={"":!0,lr:!0,rl:!0},h={start:!0,middle:!0,end:!0,left:!0,right:!0};f.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},a.VTTCue=a.VTTCue||f,b.VTTCue=f}(this,this.vttjs||{})},{}],109:[function(a,b,c){void 0!==b&&b.exports&&(this.VTTRegion=a(110).VTTRegion),function(a){a.VTTRegion.create=function(b){var c=new a.VTTRegion;for(var d in b)c.hasOwnProperty(d)&&(c[d]=b[d]);return c},a.VTTRegion.fromJSON=function(a){return this.create(JSON.parse(a))}}(this)},{110:110}],110:[function(a,b,c){!function(a,b){function c(a){return"string"==typeof a&&(!!f[a.toLowerCase()]&&a.toLowerCase())}function d(a){return"number"==typeof a&&a>=0&&a<=100}function e(){var a=100,b=3,e=0,f=100,g=0,h=100,i="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return a},set:function(b){if(!d(b))throw new Error("Width must be between 0 and 100.");a=b}},lines:{enumerable:!0,get:function(){return b},set:function(a){if("number"!=typeof a)throw new TypeError("Lines must be set to a number.");b=a}},regionAnchorY:{enumerable:!0,get:function(){return f},set:function(a){if(!d(a))throw new Error("RegionAnchorX must be between 0 and 100.");f=a}},regionAnchorX:{enumerable:!0,get:function(){return e},set:function(a){if(!d(a))throw new Error("RegionAnchorY must be between 0 and 100.");e=a}},viewportAnchorY:{enumerable:!0,get:function(){return h},set:function(a){if(!d(a))throw new Error("ViewportAnchorY must be between 0 and 100.");h=a}},viewportAnchorX:{enumerable:!0,get:function(){return g},set:function(a){if(!d(a))throw new Error("ViewportAnchorX must be between 0 and 100.");g=a}},scroll:{enumerable:!0,get:function(){return i},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");i=b}}})}var f={"":!0,up:!0};a.VTTRegion=a.VTTRegion||e,b.VTTRegion=e}(this,this.vttjs||{})},{}]},{},[93])(93)});
!function(){!function(a){var b=a&&a.videojs;if(b){b.CDN_VERSION="5.18.4";var c="https:"===a.location.protocol?"https://":"http://";b.options.flash.swf=c+"vjs.zencdn.net/swf/5.3.0/video-js.swf"}}(window),function(a,b,c,d,e,f,g){b&&b.HELP_IMPROVE_VIDEOJS!==!1&&(e.random()>.01||(f=b.location,g=b.videojs||{},a.src="//www.google-analytics.com/__utm.gif?utmwv=5.4.2&utmac=UA-16505296-3&utmn=1&utmhn="+d(f.hostname)+"&utmsr="+b.screen.availWidth+"x"+b.screen.availHeight+"&utmul="+(c.language||c.userLanguage||"").toLowerCase()+"&utmr="+d(f.href)+"&utmp="+d(f.hostname+f.pathname)+"&utmcc=__utma%3D1."+e.floor(1e10*e.random())+".1.1.1.1%3B&utme=8(vjsv*cdnv)9("+g.VERSION+"*"+g.CDN_VERSION+")"))}(new Image,window,navigator,encodeURIComponent,Math)}();
!function(a,b){"undefined"==typeof a.HTMLVideoElement&&(b.createElement("video"),b.createElement("audio"),b.createElement("track")),function(a,b){"use strict";"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.returnExports=b()}(this,function(){var b,c=Array,d=c.prototype,e=Object,f=e.prototype,g=Function.prototype,h=String,i=h.prototype,j=Number,k=j.prototype,l=d.slice,m=d.splice,n=d.push,o=d.unshift,p=d.concat,q=g.call,r=g.apply,s=Math.max,t=Math.min,u=f.toString,v="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,w=Function.prototype.toString,x=function(a){try{return w.call(a),!0}catch(b){return!1}},y="[object Function]",z="[object GeneratorFunction]";b=function(a){if("function"!=typeof a)return!1;if(v)return x(a);var b=u.call(a);return b===y||b===z};var A,B=RegExp.prototype.exec,C=function(a){try{return B.call(a),!0}catch(b){return!1}},D="[object RegExp]";A=function(a){return"object"!=typeof a?!1:v?C(a):u.call(a)===D};var E,F=String.prototype.valueOf,G=function(a){try{return F.call(a),!0}catch(b){return!1}},H="[object String]";E=function(a){return"string"==typeof a?!0:"object"!=typeof a?!1:v?G(a):u.call(a)===H};var I=e.defineProperty&&function(){try{var a={};e.defineProperty(a,"x",{enumerable:!1,value:a});for(var b in a)return!1;return a.x===a}catch(c){return!1}}(),J=function(a){var b;return b=I?function(a,b,c,d){!d&&b in a||e.defineProperty(a,b,{configurable:!0,enumerable:!1,writable:!0,value:c})}:function(a,b,c,d){!d&&b in a||(a[b]=c)},function(c,d,e){for(var f in d)a.call(d,f)&&b(c,f,d[f],e)}}(f.hasOwnProperty),K=function(a){var b=typeof a;return null===a||"object"!==b&&"function"!==b},L=j.isNaN||function(a){return a!==a},M={ToInteger:function(a){var b=+a;return L(b)?b=0:0!==b&&b!==1/0&&b!==-(1/0)&&(b=(b>0||-1)*Math.floor(Math.abs(b))),b},ToPrimitive:function(a){var c,d,e;if(K(a))return a;if(d=a.valueOf,b(d)&&(c=d.call(a),K(c)))return c;if(e=a.toString,b(e)&&(c=e.call(a),K(c)))return c;throw new TypeError},ToObject:function(a){if(null==a)throw new TypeError("can't convert "+a+" to object");return e(a)},ToUint32:function(a){return a>>>0}},N=function(){};J(g,{bind:function(a){var c=this;if(!b(c))throw new TypeError("Function.prototype.bind called on incompatible "+c);for(var d,f=l.call(arguments,1),g=function(){if(this instanceof d){var b=c.apply(this,p.call(f,l.call(arguments)));return e(b)===b?b:this}return c.apply(a,p.call(f,l.call(arguments)))},h=s(0,c.length-f.length),i=[],j=0;h>j;j++)n.call(i,"$"+j);return d=Function("binder","return function ("+i.join(",")+"){ return binder.apply(this, arguments); }")(g),c.prototype&&(N.prototype=c.prototype,d.prototype=new N,N.prototype=null),d}});var O=q.bind(f.hasOwnProperty),P=q.bind(f.toString),Q=q.bind(l),R=r.bind(l),S=q.bind(i.slice),T=q.bind(i.split),U=q.bind(i.indexOf),V=q.bind(n),W=q.bind(f.propertyIsEnumerable),X=q.bind(d.sort),Y=c.isArray||function(a){return"[object Array]"===P(a)},Z=1!==[].unshift(0);J(d,{unshift:function(){return o.apply(this,arguments),this.length}},Z),J(c,{isArray:Y});var $=e("a"),_="a"!==$[0]||!(0 in $),aa=function(a){var b=!0,c=!0,d=!1;if(a)try{a.call("foo",function(a,c,d){"object"!=typeof d&&(b=!1)}),a.call([1],function(){"use strict";c="string"==typeof this},"x")}catch(e){d=!0}return!!a&&!d&&b&&c};J(d,{forEach:function(a){var c,d=M.ToObject(this),e=_&&E(this)?T(this,""):d,f=-1,g=M.ToUint32(e.length);if(arguments.length>1&&(c=arguments[1]),!b(a))throw new TypeError("Array.prototype.forEach callback must be a function");for(;++f<g;)f in e&&("undefined"==typeof c?a(e[f],f,d):a.call(c,e[f],f,d))}},!aa(d.forEach)),J(d,{map:function(a){var d,e=M.ToObject(this),f=_&&E(this)?T(this,""):e,g=M.ToUint32(f.length),h=c(g);if(arguments.length>1&&(d=arguments[1]),!b(a))throw new TypeError("Array.prototype.map callback must be a function");for(var i=0;g>i;i++)i in f&&("undefined"==typeof d?h[i]=a(f[i],i,e):h[i]=a.call(d,f[i],i,e));return h}},!aa(d.map)),J(d,{filter:function(a){var c,d,e=M.ToObject(this),f=_&&E(this)?T(this,""):e,g=M.ToUint32(f.length),h=[];if(arguments.length>1&&(d=arguments[1]),!b(a))throw new TypeError("Array.prototype.filter callback must be a function");for(var i=0;g>i;i++)i in f&&(c=f[i],("undefined"==typeof d?a(c,i,e):a.call(d,c,i,e))&&V(h,c));return h}},!aa(d.filter)),J(d,{every:function(a){var c,d=M.ToObject(this),e=_&&E(this)?T(this,""):d,f=M.ToUint32(e.length);if(arguments.length>1&&(c=arguments[1]),!b(a))throw new TypeError("Array.prototype.every callback must be a function");for(var g=0;f>g;g++)if(g in e&&!("undefined"==typeof c?a(e[g],g,d):a.call(c,e[g],g,d)))return!1;return!0}},!aa(d.every)),J(d,{some:function(a){var c,d=M.ToObject(this),e=_&&E(this)?T(this,""):d,f=M.ToUint32(e.length);if(arguments.length>1&&(c=arguments[1]),!b(a))throw new TypeError("Array.prototype.some callback must be a function");for(var g=0;f>g;g++)if(g in e&&("undefined"==typeof c?a(e[g],g,d):a.call(c,e[g],g,d)))return!0;return!1}},!aa(d.some));var ba=!1;d.reduce&&(ba="object"==typeof d.reduce.call("es5",function(a,b,c,d){return d})),J(d,{reduce:function(a){var c=M.ToObject(this),d=_&&E(this)?T(this,""):c,e=M.ToUint32(d.length);if(!b(a))throw new TypeError("Array.prototype.reduce callback must be a function");if(0===e&&1===arguments.length)throw new TypeError("reduce of empty array with no initial value");var f,g=0;if(arguments.length>=2)f=arguments[1];else for(;;){if(g in d){f=d[g++];break}if(++g>=e)throw new TypeError("reduce of empty array with no initial value")}for(;e>g;g++)g in d&&(f=a(f,d[g],g,c));return f}},!ba);var ca=!1;d.reduceRight&&(ca="object"==typeof d.reduceRight.call("es5",function(a,b,c,d){return d})),J(d,{reduceRight:function(a){var c=M.ToObject(this),d=_&&E(this)?T(this,""):c,e=M.ToUint32(d.length);if(!b(a))throw new TypeError("Array.prototype.reduceRight callback must be a function");if(0===e&&1===arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var f,g=e-1;if(arguments.length>=2)f=arguments[1];else for(;;){if(g in d){f=d[g--];break}if(--g<0)throw new TypeError("reduceRight of empty array with no initial value")}if(0>g)return f;do g in d&&(f=a(f,d[g],g,c));while(g--);return f}},!ca);var da=d.indexOf&&-1!==[0,1].indexOf(1,2);J(d,{indexOf:function(a){var b=_&&E(this)?T(this,""):M.ToObject(this),c=M.ToUint32(b.length);if(0===c)return-1;var d=0;for(arguments.length>1&&(d=M.ToInteger(arguments[1])),d=d>=0?d:s(0,c+d);c>d;d++)if(d in b&&b[d]===a)return d;return-1}},da);var ea=d.lastIndexOf&&-1!==[0,1].lastIndexOf(0,-3);J(d,{lastIndexOf:function(a){var b=_&&E(this)?T(this,""):M.ToObject(this),c=M.ToUint32(b.length);if(0===c)return-1;var d=c-1;for(arguments.length>1&&(d=t(d,M.ToInteger(arguments[1]))),d=d>=0?d:c-Math.abs(d);d>=0;d--)if(d in b&&a===b[d])return d;return-1}},ea);var fa=function(){var a=[1,2],b=a.splice();return 2===a.length&&Y(b)&&0===b.length}();J(d,{splice:function(a,b){return 0===arguments.length?[]:m.apply(this,arguments)}},!fa);var ga=function(){var a={};return d.splice.call(a,0,0,1),1===a.length}();J(d,{splice:function(a,b){if(0===arguments.length)return[];var c=arguments;return this.length=s(M.ToInteger(this.length),0),arguments.length>0&&"number"!=typeof b&&(c=Q(arguments),c.length<2?V(c,this.length-a):c[1]=M.ToInteger(b)),m.apply(this,c)}},!ga);var ha=function(){var a=new c(1e5);return a[8]="x",a.splice(1,1),7===a.indexOf("x")}(),ia=function(){var a=256,b=[];return b[a]="a",b.splice(a+1,0,"b"),"a"===b[a]}();J(d,{splice:function(a,b){for(var c,d=M.ToObject(this),e=[],f=M.ToUint32(d.length),g=M.ToInteger(a),i=0>g?s(f+g,0):t(g,f),j=t(s(M.ToInteger(b),0),f-i),k=0;j>k;)c=h(i+k),O(d,c)&&(e[k]=d[c]),k+=1;var l,m=Q(arguments,2),n=m.length;if(j>n){for(k=i;f-j>k;)c=h(k+j),l=h(k+n),O(d,c)?d[l]=d[c]:delete d[l],k+=1;for(k=f;k>f-j+n;)delete d[k-1],k-=1}else if(n>j)for(k=f-j;k>i;)c=h(k+j-1),l=h(k+n-1),O(d,c)?d[l]=d[c]:delete d[l],k-=1;k=i;for(var o=0;o<m.length;++o)d[k]=m[o],k+=1;return d.length=f-j+n,e}},!ha||!ia);var ja,ka=d.join;try{ja="1,2,3"!==Array.prototype.join.call("123",",")}catch(la){ja=!0}ja&&J(d,{join:function(a){var b="undefined"==typeof a?",":a;return ka.call(E(this)?T(this,""):this,b)}},ja);var ma="1,2"!==[1,2].join(void 0);ma&&J(d,{join:function(a){var b="undefined"==typeof a?",":a;return ka.call(this,b)}},ma);var na=function(a){for(var b=M.ToObject(this),c=M.ToUint32(b.length),d=0;d<arguments.length;)b[c+d]=arguments[d],d+=1;return b.length=c+d,c+d},oa=function(){var a={},b=Array.prototype.push.call(a,void 0);return 1!==b||1!==a.length||"undefined"!=typeof a[0]||!O(a,0)}();J(d,{push:function(a){return Y(this)?n.apply(this,arguments):na.apply(this,arguments)}},oa);var pa=function(){var a=[],b=a.push(void 0);return 1!==b||1!==a.length||"undefined"!=typeof a[0]||!O(a,0)}();J(d,{push:na},pa),J(d,{slice:function(a,b){var c=E(this)?T(this,""):this;return R(c,arguments)}},_);var qa=function(){try{return[1,2].sort(null),[1,2].sort({}),!0}catch(a){}return!1}(),ra=function(){try{return[1,2].sort(/a/),!1}catch(a){}return!0}(),sa=function(){try{return[1,2].sort(void 0),!0}catch(a){}return!1}();J(d,{sort:function(a){if("undefined"==typeof a)return X(this);if(!b(a))throw new TypeError("Array.prototype.sort callback must be a function");return X(this,a)}},qa||!sa||!ra);var ta=!{toString:null}.propertyIsEnumerable("toString"),ua=function(){}.propertyIsEnumerable("prototype"),va=!O("x","0"),wa=function(a){var b=a.constructor;return b&&b.prototype===a},xa={$window:!0,$console:!0,$parent:!0,$self:!0,$frame:!0,$frames:!0,$frameElement:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$external:!0},ya=function(){if("undefined"==typeof a)return!1;for(var b in a)try{!xa["$"+b]&&O(a,b)&&null!==a[b]&&"object"==typeof a[b]&&wa(a[b])}catch(c){return!0}return!1}(),za=function(b){if("undefined"==typeof a||!ya)return wa(b);try{return wa(b)}catch(c){return!1}},Aa=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],Ba=Aa.length,Ca=function(a){return"[object Arguments]"===P(a)},Da=function(a){return null!==a&&"object"==typeof a&&"number"==typeof a.length&&a.length>=0&&!Y(a)&&b(a.callee)},Ea=Ca(arguments)?Ca:Da;J(e,{keys:function(a){var c=b(a),d=Ea(a),e=null!==a&&"object"==typeof a,f=e&&E(a);if(!e&&!c&&!d)throw new TypeError("Object.keys called on a non-object");var g=[],i=ua&&c;if(f&&va||d)for(var j=0;j<a.length;++j)V(g,h(j));if(!d)for(var k in a)i&&"prototype"===k||!O(a,k)||V(g,h(k));if(ta)for(var l=za(a),m=0;Ba>m;m++){var n=Aa[m];l&&"constructor"===n||!O(a,n)||V(g,n)}return g}});var Fa=e.keys&&function(){return 2===e.keys(arguments).length}(1,2),Ga=e.keys&&function(){var a=e.keys(arguments);return 1!==arguments.length||1!==a.length||1!==a[0]}(1),Ha=e.keys;J(e,{keys:function(a){return Ha(Ea(a)?Q(a):a)}},!Fa||Ga);var Ia,Ja,Ka=0!==new Date(-0xc782b5b342b24).getUTCMonth(),La=new Date(-0x55d318d56a724),Ma=new Date(14496624e5),Na="Mon, 01 Jan -45875 11:59:59 GMT"!==La.toUTCString(),Oa=La.getTimezoneOffset();-720>Oa?(Ia="Tue Jan 02 -45875"!==La.toDateString(),Ja=!/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(Ma.toString())):(Ia="Mon Jan 01 -45875"!==La.toDateString(),Ja=!/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(Ma.toString()));var Pa=q.bind(Date.prototype.getFullYear),Qa=q.bind(Date.prototype.getMonth),Ra=q.bind(Date.prototype.getDate),Sa=q.bind(Date.prototype.getUTCFullYear),Ta=q.bind(Date.prototype.getUTCMonth),Ua=q.bind(Date.prototype.getUTCDate),Va=q.bind(Date.prototype.getUTCDay),Wa=q.bind(Date.prototype.getUTCHours),Xa=q.bind(Date.prototype.getUTCMinutes),Ya=q.bind(Date.prototype.getUTCSeconds),Za=q.bind(Date.prototype.getUTCMilliseconds),$a=["Sun","Mon","Tue","Wed","Thu","Fri"],_a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ab=function(a,b){return Ra(new Date(b,a,0))};J(Date.prototype,{getFullYear:function(){if(!(this&&this instanceof Date))throw new TypeError("this is not a Date object.");var a=Pa(this);return 0>a&&Qa(this)>11?a+1:a},getMonth:function(){if(!(this&&this instanceof Date))throw new TypeError("this is not a Date object.");var a=Pa(this),b=Qa(this);return 0>a&&b>11?0:b},getDate:function(){if(!(this&&this instanceof Date))throw new TypeError("this is not a Date object.");var a=Pa(this),b=Qa(this),c=Ra(this);if(0>a&&b>11){if(12===b)return c;var d=ab(0,a+1);return d-c+1}return c},getUTCFullYear:function(){if(!(this&&this instanceof Date))throw new TypeError("this is not a Date object.");var a=Sa(this);return 0>a&&Ta(this)>11?a+1:a},getUTCMonth:function(){if(!(this&&this instanceof Date))throw new TypeError("this is not a Date object.");var a=Sa(this),b=Ta(this);return 0>a&&b>11?0:b},getUTCDate:function(){if(!(this&&this instanceof Date))throw new TypeError("this is not a Date object.");var a=Sa(this),b=Ta(this),c=Ua(this);if(0>a&&b>11){if(12===b)return c;var d=ab(0,a+1);return d-c+1}return c}},Ka),J(Date.prototype,{toUTCString:function(){if(!(this&&this instanceof Date))throw new TypeError("this is not a Date object.");var a=Va(this),b=Ua(this),c=Ta(this),d=Sa(this),e=Wa(this),f=Xa(this),g=Ya(this);return $a[a]+", "+(10>b?"0"+b:b)+" "+_a[c]+" "+d+" "+(10>e?"0"+e:e)+":"+(10>f?"0"+f:f)+":"+(10>g?"0"+g:g)+" GMT"}},Ka||Na),J(Date.prototype,{toDateString:function(){if(!(this&&this instanceof Date))throw new TypeError("this is not a Date object.");var a=this.getDay(),b=this.getDate(),c=this.getMonth(),d=this.getFullYear();return $a[a]+" "+_a[c]+" "+(10>b?"0"+b:b)+" "+d}},Ka||Ia),(Ka||Ja)&&(Date.prototype.toString=function(){if(!(this&&this instanceof Date))throw new TypeError("this is not a Date object.");var a=this.getDay(),b=this.getDate(),c=this.getMonth(),d=this.getFullYear(),e=this.getHours(),f=this.getMinutes(),g=this.getSeconds(),h=this.getTimezoneOffset(),i=Math.floor(Math.abs(h)/60),j=Math.floor(Math.abs(h)%60);return $a[a]+" "+_a[c]+" "+(10>b?"0"+b:b)+" "+d+" "+(10>e?"0"+e:e)+":"+(10>f?"0"+f:f)+":"+(10>g?"0"+g:g)+" GMT"+(h>0?"-":"+")+(10>i?"0"+i:i)+(10>j?"0"+j:j)},I&&e.defineProperty(Date.prototype,"toString",{configurable:!0,enumerable:!1,writable:!0}));var bb=-621987552e5,cb="-000001",db=Date.prototype.toISOString&&-1===new Date(bb).toISOString().indexOf(cb),eb=Date.prototype.toISOString&&"1969-12-31T23:59:59.999Z"!==new Date(-1).toISOString();J(Date.prototype,{toISOString:function(){if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");var a=Sa(this),b=Ta(this);a+=Math.floor(b/12),b=(b%12+12)%12;var c=[b+1,Ua(this),Wa(this),Xa(this),Ya(this)];a=(0>a?"-":a>9999?"+":"")+S("00000"+Math.abs(a),a>=0&&9999>=a?-4:-6);for(var d=0;d<c.length;++d)c[d]=S("00"+c[d],-2);return a+"-"+Q(c,0,2).join("-")+"T"+Q(c,2).join(":")+"."+S("000"+Za(this),-3)+"Z"}},db||eb);var fb=function(){try{return Date.prototype.toJSON&&null===new Date(NaN).toJSON()&&-1!==new Date(bb).toJSON().indexOf(cb)&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(a){return!1}}();fb||(Date.prototype.toJSON=function(a){var c=e(this),d=M.ToPrimitive(c);if("number"==typeof d&&!isFinite(d))return null;var f=c.toISOString;if(!b(f))throw new TypeError("toISOString property is not callable");return f.call(c)});var gb=1e15===Date.parse("+033658-09-27T01:46:40.000Z"),hb=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z"))||!isNaN(Date.parse("2012-12-31T23:59:60.000Z")),ib=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));if(ib||hb||!gb){var jb=Math.pow(2,31)-1,kb=L(new Date(1970,0,1,0,0,0,jb+1).getTime());Date=function(a){var b=function(c,d,e,f,g,i,j){var k,l=arguments.length;if(this instanceof a){var m=i,n=j;if(kb&&l>=7&&j>jb){var o=Math.floor(j/jb)*jb,p=Math.floor(o/1e3);m+=p,n-=1e3*p}k=1===l&&h(c)===c?new a(b.parse(c)):l>=7?new a(c,d,e,f,g,m,n):l>=6?new a(c,d,e,f,g,m):l>=5?new a(c,d,e,f,g):l>=4?new a(c,d,e,f):l>=3?new a(c,d,e):l>=2?new a(c,d):l>=1?new a(c):new a}else k=a.apply(this,arguments);return K(k)||J(k,{constructor:b},!0),k},c=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),d=[0,31,59,90,120,151,181,212,243,273,304,334,365],e=function(a,b){var c=b>1?1:0;return d[b]+Math.floor((a-1969+c)/4)-Math.floor((a-1901+c)/100)+Math.floor((a-1601+c)/400)+365*(a-1970)},f=function(b){var c=0,d=b;if(kb&&d>jb){var e=Math.floor(d/jb)*jb,f=Math.floor(e/1e3);c+=f,d-=1e3*f}return j(new a(1970,0,1,0,0,c,d))};for(var g in a)O(a,g)&&(b[g]=a[g]);J(b,{now:a.now,UTC:a.UTC},!0),b.prototype=a.prototype,J(b.prototype,{constructor:b},!0);var i=function(b){var d=c.exec(b);if(d){var g,h=j(d[1]),i=j(d[2]||1)-1,k=j(d[3]||1)-1,l=j(d[4]||0),m=j(d[5]||0),n=j(d[6]||0),o=Math.floor(1e3*j(d[7]||0)),p=Boolean(d[4]&&!d[8]),q="-"===d[9]?1:-1,r=j(d[10]||0),s=j(d[11]||0),t=m>0||n>0||o>0;return(t?24:25)>l&&60>m&&60>n&&1e3>o&&i>-1&&12>i&&24>r&&60>s&&k>-1&&k<e(h,i+1)-e(h,i)&&(g=60*(24*(e(h,i)+k)+l+r*q),g=1e3*(60*(g+m+s*q)+n)+o,p&&(g=f(g)),g>=-864e13&&864e13>=g)?g:NaN}return a.parse.apply(this,arguments)};return J(b,{parse:i}),b}(Date)}Date.now||(Date.now=function(){return(new Date).getTime()});var lb=k.toFixed&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==0xde0b6b3a7640080.toFixed(0)),mb={base:1e7,size:6,data:[0,0,0,0,0,0],multiply:function(a,b){for(var c=-1,d=b;++c<mb.size;)d+=a*mb.data[c],mb.data[c]=d%mb.base,d=Math.floor(d/mb.base)},divide:function(a){for(var b=mb.size,c=0;--b>=0;)c+=mb.data[b],mb.data[b]=Math.floor(c/a),c=c%a*mb.base},numToString:function(){for(var a=mb.size,b="";--a>=0;)if(""!==b||0===a||0!==mb.data[a]){var c=h(mb.data[a]);""===b?b=c:b+=S("0000000",0,7-c.length)+c}return b},pow:function Gb(a,b,c){return 0===b?c:b%2===1?Gb(a,b-1,c*a):Gb(a*a,b/2,c)},log:function(a){for(var b=0,c=a;c>=4096;)b+=12,c/=4096;for(;c>=2;)b+=1,c/=2;return b}},nb=function(a){var b,c,d,e,f,g,i,k;if(b=j(a),b=L(b)?0:Math.floor(b),0>b||b>20)throw new RangeError("Number.toFixed called with invalid number of decimals");if(c=j(this),L(c))return"NaN";if(-1e21>=c||c>=1e21)return h(c);if(d="",0>c&&(d="-",c=-c),e="0",c>1e-21)if(f=mb.log(c*mb.pow(2,69,1))-69,g=0>f?c*mb.pow(2,-f,1):c/mb.pow(2,f,1),g*=4503599627370496,f=52-f,f>0){for(mb.multiply(0,g),i=b;i>=7;)mb.multiply(1e7,0),i-=7;for(mb.multiply(mb.pow(10,i,1),0),i=f-1;i>=23;)mb.divide(1<<23),i-=23;mb.divide(1<<i),mb.multiply(1,1),mb.divide(2),e=mb.numToString()}else mb.multiply(0,g),mb.multiply(1<<-f,0),e=mb.numToString()+S("0.00000000000000000000",2,2+b);return b>0?(k=e.length,e=b>=k?d+S("0.0000000000000000000",0,b-k+2)+e:d+S(e,0,k-b)+"."+S(e,k-b)):e=d+e,e};J(k,{toFixed:nb},lb);var ob=function(){try{return"1"===1..toPrecision(void 0)}catch(a){return!0}}(),pb=k.toPrecision;J(k,{toPrecision:function(a){return"undefined"==typeof a?pb.call(this):pb.call(this,a)}},ob),2!=="ab".split(/(?:ab)*/).length||4!==".".split(/(.?)(.?)/).length||"t"==="tesst".split(/(s)*/)[1]||4!=="test".split(/(?:)/,-1).length||"".split(/.?/).length||".".split(/()()/).length>1?!function(){var a="undefined"==typeof/()??/.exec("")[1],b=Math.pow(2,32)-1;i.split=function(c,d){var e=String(this);if("undefined"==typeof c&&0===d)return[];if(!A(c))return T(this,c,d);var f,g,h,i,j=[],k=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(c.sticky?"y":""),l=0,m=new RegExp(c.source,k+"g");a||(f=new RegExp("^"+m.source+"$(?!\\s)",k));var o="undefined"==typeof d?b:M.ToUint32(d);for(g=m.exec(e);g&&(h=g.index+g[0].length,!(h>l&&(V(j,S(e,l,g.index)),!a&&g.length>1&&g[0].replace(f,function(){for(var a=1;a<arguments.length-2;a++)"undefined"==typeof arguments[a]&&(g[a]=void 0)}),g.length>1&&g.index<e.length&&n.apply(j,Q(g,1)),i=g[0].length,l=h,j.length>=o)));)m.lastIndex===g.index&&m.lastIndex++,g=m.exec(e);return l===e.length?(i||!m.test(""))&&V(j,""):V(j,S(e,l)),j.length>o?S(j,0,o):j}}():"0".split(void 0,0).length&&(i.split=function(a,b){return"undefined"==typeof a&&0===b?[]:T(this,a,b)});var qb=i.replace,rb=function(){var a=[];return"x".replace(/x(.)?/g,function(b,c){V(a,c)}),1===a.length&&"undefined"==typeof a[0]}();rb||(i.replace=function(a,c){var d=b(c),e=A(a)&&/\)[*?]/.test(a.source);if(d&&e){var f=function(b){var d=arguments.length,e=a.lastIndex;a.lastIndex=0;var f=a.exec(b)||[];return a.lastIndex=e,V(f,arguments[d-2],arguments[d-1]),c.apply(this,f)};return qb.call(this,a,f)}return qb.call(this,a,c)});var sb=i.substr,tb="".substr&&"b"!=="0b".substr(-1);J(i,{substr:function(a,b){var c=a;return 0>a&&(c=s(this.length+a,0)),sb.call(this,c,b)}},tb);var ub="	\n\f\r   ᠎             　\u2028\u2029\ufeff",vb="​",wb="["+ub+"]",xb=new RegExp("^"+wb+wb+"*"),yb=new RegExp(wb+wb+"*$"),zb=i.trim&&(ub.trim()||!vb.trim());J(i,{trim:function(){if("undefined"==typeof this||null===this)throw new TypeError("can't convert "+this+" to object");return h(this).replace(xb,"").replace(yb,"")}},zb);var Ab=q.bind(String.prototype.trim),Bb=i.lastIndexOf&&-1!=="abcあい".lastIndexOf("あい",2);J(i,{lastIndexOf:function(a){if("undefined"==typeof this||null===this)throw new TypeError("can't convert "+this+" to object");for(var b=h(this),c=h(a),d=arguments.length>1?j(arguments[1]):NaN,e=L(d)?1/0:M.ToInteger(d),f=t(s(e,0),b.length),g=c.length,i=f+g;i>0;){i=s(0,i-g);var k=U(S(b,i,f+g),c);if(-1!==k)return i+k}return-1}},Bb);var Cb=i.lastIndexOf;if(J(i,{lastIndexOf:function(a){return Cb.apply(this,arguments)}},1!==i.lastIndexOf.length),(8!==parseInt(ub+"08")||22!==parseInt(ub+"0x16"))&&(parseInt=function(a){var b=/^[\-+]?0[xX]/;return function(c,d){var e=Ab(c),f=j(d)||(b.test(e)?16:10);return a(e,f)}}(parseInt)),1/parseFloat("-0")!==-(1/0)&&(parseFloat=function(a){return function(b){var c=Ab(b),d=a(c);return 0===d&&"-"===S(c,0,1)?-0:d}}(parseFloat)),"RangeError: test"!==String(new RangeError("test"))){var Db=function(){if("undefined"==typeof this||null===this)throw new TypeError("can't convert "+this+" to object");var a=this.name;"undefined"==typeof a?a="Error":"string"!=typeof a&&(a=h(a));var b=this.message;return"undefined"==typeof b?b="":"string"!=typeof b&&(b=h(b)),a?b?a+": "+b:a:b};Error.prototype.toString=Db}if(I){var Eb=function(a,b){if(W(a,b)){var c=Object.getOwnPropertyDescriptor(a,b);c.enumerable=!1,Object.defineProperty(a,b,c)}};Eb(Error.prototype,"message"),""!==Error.prototype.message&&(Error.prototype.message=""),Eb(Error.prototype,"name")}if("/a/gim"!==String(/a/gim)){var Fb=function(){var a="/"+this.source+"/";return this.global&&(a+="g"),this.ignoreCase&&(a+="i"),this.multiline&&(a+="m"),a};RegExp.prototype.toString=Fb}}),function(a,b){"use strict";"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.returnExports=b()}(this,function(){var a,c,d,e,f=Function.call,g=Object.prototype,h=f.bind(g.hasOwnProperty),i=f.bind(g.propertyIsEnumerable),j=f.bind(g.toString),k=h(g,"__defineGetter__");k&&(a=f.bind(g.__defineGetter__),c=f.bind(g.__defineSetter__),d=f.bind(g.__lookupGetter__),e=f.bind(g.__lookupSetter__)),Object.getPrototypeOf||(Object.getPrototypeOf=function(a){var b=a.__proto__;return b||null===b?b:"[object Function]"===j(a.constructor)?a.constructor.prototype:a instanceof Object?g:null});var l=function(a){try{return a.sentinel=0,0===Object.getOwnPropertyDescriptor(a,"sentinel").value}catch(b){return!1}};if(Object.defineProperty){var m=l({}),n="undefined"==typeof b||l(b.createElement("div"));if(!n||!m)var o=Object.getOwnPropertyDescriptor}if(!Object.getOwnPropertyDescriptor||o){var p="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(a,b){if("object"!=typeof a&&"function"!=typeof a||null===a)throw new TypeError(p+a);if(o)try{return o.call(Object,a,b)}catch(c){}var f;if(!h(a,b))return f;if(f={enumerable:i(a,b),configurable:!0},k){var j=a.__proto__,l=a!==g;l&&(a.__proto__=g);var m=d(a,b),n=e(a,b);if(l&&(a.__proto__=j),m||n)return m&&(f.get=m),n&&(f.set=n),f}return f.value=a[b],f.writable=!0,f}}if(Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(a){return Object.keys(a)}),!Object.create){var q,r=!({__proto__:null}instanceof Object),s=function(){if(!b.domain)return!1;try{return!!new ActiveXObject("htmlfile")}catch(a){return!1}},t=function(){var a,b;return b=new ActiveXObject("htmlfile"),b.write("<script></script>"),b.close(),a=b.parentWindow.Object.prototype,b=null,a},u=function(){var a,c=b.createElement("iframe"),d=b.body||b.documentElement;return c.style.display="none",d.appendChild(c),c.src="javascript:",a=c.contentWindow.Object.prototype,d.removeChild(c),c=null,a};q=r||"undefined"==typeof b?function(){return{__proto__:null}}:function(){var a=s()?t():u();delete a.constructor,delete a.hasOwnProperty,delete a.propertyIsEnumerable,delete a.isPrototypeOf,delete a.toLocaleString,delete a.toString,delete a.valueOf;var b=function(){};return b.prototype=a,q=function(){return new b},new b},Object.create=function(a,b){var c,d=function(){};if(null===a)c=q();else{if("object"!=typeof a&&"function"!=typeof a)throw new TypeError("Object prototype may only be an Object or null");d.prototype=a,c=new d,c.__proto__=a}return void 0!==b&&Object.defineProperties(c,b),c}}var v=function(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(b){return!1}};if(Object.defineProperty){var w=v({}),x="undefined"==typeof b||v(b.createElement("div"));if(!w||!x)var y=Object.defineProperty,z=Object.defineProperties}if(!Object.defineProperty||y){var A="Property description must be an object: ",B="Object.defineProperty called on non-object: ",C="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(b,f,h){if("object"!=typeof b&&"function"!=typeof b||null===b)throw new TypeError(B+b);if("object"!=typeof h&&"function"!=typeof h||null===h)throw new TypeError(A+h);if(y)try{return y.call(Object,b,f,h)}catch(i){}if("value"in h)if(k&&(d(b,f)||e(b,f))){var j=b.__proto__;b.__proto__=g,delete b[f],b[f]=h.value,b.__proto__=j}else b[f]=h.value;else{if(!k&&("get"in h||"set"in h))throw new TypeError(C);"get"in h&&a(b,f,h.get),"set"in h&&c(b,f,h.set)}return b}}(!Object.defineProperties||z)&&(Object.defineProperties=function(a,b){if(z)try{return z.call(Object,a,b)}catch(c){}return Object.keys(b).forEach(function(c){"__proto__"!==c&&Object.defineProperty(a,c,b[c])}),a}),Object.seal||(Object.seal=function(a){if(Object(a)!==a)throw new TypeError("Object.seal can only be called on Objects.");return a}),Object.freeze||(Object.freeze=function(a){if(Object(a)!==a)throw new TypeError("Object.freeze can only be called on Objects.");return a});try{Object.freeze(function(){})}catch(D){Object.freeze=function(a){return function(b){return"function"==typeof b?b:a(b)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(a){if(Object(a)!==a)throw new TypeError("Object.preventExtensions can only be called on Objects.");return a}),Object.isSealed||(Object.isSealed=function(a){if(Object(a)!==a)throw new TypeError("Object.isSealed can only be called on Objects.");return!1}),Object.isFrozen||(Object.isFrozen=function(a){if(Object(a)!==a)throw new TypeError("Object.isFrozen can only be called on Objects.");return!1}),Object.isExtensible||(Object.isExtensible=function(a){if(Object(a)!==a)throw new TypeError("Object.isExtensible can only be called on Objects.");for(var b="";h(a,b);)b+="?";a[b]=!0;var c=h(a,b);return delete a[b],c})})}(window,document);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;
