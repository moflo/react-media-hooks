'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-media-hooks.min.js');
} else {
  module.exports = require('./cjs/react-media-hooks.js');
}
