# jspmreact

# Features
- jspm - es6 module loading
- babel - es6 transpiler
- expressjs - http-server
- fetch - a window.fetch Javascript polyfill

# Bundle (on /src)
- `jspm bundle app/main main-bundle.js --inject` - Semi Bundle
- `jspm bundle-sfx app/main app.min.js --minify` - Production Bundle
- unbundle `jspm unbundle`

# Unit Testing
- `mocha /**/*.spec.js`

# Daemon using PM2
- `pm2 start bin/www`

# Goals
- User Management
- Role Management
- Session Authentication
- Basic Page Creation
- Product Listing
- Product Catalog
- Paypal Integration
- Admin Pages

# Technical Goals
- Reduce Circular Dependencies
- Use of Promises for Async events

# Todo:
- Run install script to setup database configuration
- Validate database schema
-

# Sub-goals
- Pricing Table

# Folder Structure
```
- app
  - controllers
  - lib
  - models
  - public
  - routes
  - views
  - app.js
  - env.json
- src (SPA app - could be anything)
  -

```
# Troubleshooting
- `Cannot read property '_currentElement' of null` - Means you're running two versions of REACT.
Make sure react-router is using the same react library.