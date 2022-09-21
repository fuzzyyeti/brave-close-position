/* config-overrides.js */
const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        crypto: false,
        stream: false,
    };
    return config;
}