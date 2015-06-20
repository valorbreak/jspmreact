# jspmreact

# Features
- jspm - es6 module loading
- babel - es6 transpiler
- expressjs - http-server
- fetch - a window.fetch Javascript polyfill

# Bundle
- `jspm bundle app/main main-bundle.js --inject` - Semi Bundle
- `jspm bundle-sfx app/main app.min.js --minify` - Production Bundle

- unbundle `jspm unbundle`

# Troubleshooting
- `Cannot read property '_currentElement' of null` - Means you're running two versions of REACT.
Make sure react-router is using the same react library.

# Unit Testing
- `mocha test/*.spec.js`

# Daemon using PM2
- `pm2 start bin/www`