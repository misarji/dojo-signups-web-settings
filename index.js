/**
 * CommonJS via esm - babel-less, bundle-less ECMAScript module loader (https://www.npmjs.com/package/esm)
 * Set to be "main" in package.json and in "exports" as "require" export
 **/

require = require('esm')(module)
module.exports = require('./main.js')
