# Maps SDK for Web - Maps library

---
**NOTE**: New version available: V6 - Check the [release notes](https://developer.tomtom.com/maps-sdk-web-js/release-notes) to see what's new

---

## Documentation

Please, refer to pages for [Maps SDK for Web](https://developer.tomtom.com/maps-sdk-web-js) in the TomTom Developer Portal for detailed documentation with examples.

In this section you will also find the latest version of this SDK.

## Package content

The package contains the following files:

- `maps-web.min.js` - Library prepared to be included direcly in your HTML file.
- `maps-web.min.js.map` - Source map for the SDK build file.
- `maps.min.js` - Library in [UMD format](https://github.com/umdjs/umd). The code is minified and does not need any external dependencies.
- `maps.min.js.map` - Source map for the SDK build file.
- `maps.css` - Cascading Style Sheet needed by the library. It must be included in your webpage in order to render the expected map.
- `LICENSE.txt` - License file.
- `README.md` -  All foundation information about the SDK.

## Getting started

### Using module bundlers

If you use Webpack or other module bundler which supports ES6 import/export syntax, importing the library is simple:

```javascript
    import tt from '@tomtom-international/web-sdk-maps';

    const map = tt.map({
        key: '<your maps api key>',
        container: 'map'
    });
```

**Note that you also need to attach the `maps.css`** file in order to display the map correctly.
This can be done in multiple ways:
- if you use Webpack with postcss-loader and css-loader (or similar), add `@import "@tomtom-international/web-sdk-maps";`
in one of your stylesheets.
- copy `node_modules/@tomtom-international/web-sdk-maps/dist/maps.css` and include it into your project manually.

### Using a script tag

You can include the library directly in the HTML using a script tag.

```html
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="maps.css"/>
        <script src="maps-web.min.js"></script>
    </head>
    <body style="width: 100%; height: 100%; margin: 0; padding: 0;">
        <div id="map" style="width: 100%; height: 100%;"></div>
        <script>
            const map = tt.map({
                key: "<your maps api key>",
                container: "map"
            });
        </script>
    </body>
</html>
```

Please note that you need to have a valid **API Key** which can be obtained at the [TomTom Developer Portal](https://developer.tomtom.com/how-to-get-tomtom-api-key).
