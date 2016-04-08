---
title: jquery add script tag twice problem
categories: topics jquery
excerpt: a jquery bug
tags: [jquery]
author: zhengjiachao
---


when I try to add script tags into head tag using jquery, found that jquery add script tags twice like this:
{%raw%}
``` HTML
<head>
	<meta charset="UTF-8">
	<link href="/engine/thr/bootstrap3.3.6/bootstrap.css" rel="stylesheet">
	<link rel="stylesheet" href="/demopage/test/global.css">
	<script src="/engine/thr/jquery2.2.0/jquery.js"></script>
	<script src="/engine/thr/async/async.js"></script>
	<script src="/engine/thr/react0.14.7/react.js"></script>
	<script src="/engine/thr/react0.14.7/react-dom.js"></script>
	<script src="/engine/thr/bootstrap3.3.6/bootstrap.js"></script>
	<script src="/engine/engine.js"></script>
	<link href="/democomp/main.css" rel="stylesheet">
	<script src="/engine/thr/jquery2.2.0/jquery.js?_=1459997605352"></script>
	<script src="/engine/thr/async/async.js?_=1459997605353"></script>
	<script src="/engine/thr/react0.14.7/react.js?_=1459997605354"></script>
	<script src="/engine/thr/react0.14.7/react-dom.js?_=1459997605355"></script>
	<script src="/engine/thr/bootstrap3.3.6/bootstrap.js?_=1459997605356"></script>
	<script src="/engine/engine.js?_=1459997605357"></script>
</head>

```
{%endraw%}
it add every script tag twice!

Then I found it was this code is the reason : 

``` javascript

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
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
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

```
this code on the bottom caused this, don't know why jquery did this,but i think this can be considered as a bug.

```
if ( jQuery._evalUrl ) {
	jQuery._evalUrl( node.src );
}

```

finally I got a clue to fix this problem: before inserting script tags, make that _evalUrl function undefined like this `jQuery._evalUrl = undefined;`
