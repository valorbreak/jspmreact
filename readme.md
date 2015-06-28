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
- (/) Login Authentication and Session Management
- (/) CSRF Protection

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
- src (SPA app - could be anything)
  -
- env.json
```

# Troubleshooting
- `Cannot read property '_currentElement' of null` - Means you're running two versions of REACT.
Make sure react-router is using the same react library.

# Code Convention
- Check for existing object prototypes when creating a new object with new prototypes (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
- Always return after res.json() or equivalent - Prevent responding more than once

# Command Line
- Commander and Promptly are two different libraries
