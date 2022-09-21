/* config-overrides.js */
const webpack = require('webpack');
module.exports = function override(config, env) {

    config.resolve.fallback = {
        crypto: false,
        stream: false,
    };
    config.resolve.alias = {
            process: 'process/browser',
            stream: "stream-browserify",
            zlib: "browserify-zlib"
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    return config;
}