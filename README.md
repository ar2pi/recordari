# alpha-panters

Recordari App, a DatosDC project  

```minify-geojson -c 5 -b "ISO3166-2, clcfile, ref, source, wikidata, boundary, is_in:country, admin_level" -k map-fix.geojson```  

```cat map-fix.min.geojson | simplify-geojson -t 0.01 > map-fix.squished.geojson```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
