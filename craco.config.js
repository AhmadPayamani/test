const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
    webpack: {
        configure: (webpackConfig, { env }) => {
            if (env === 'production') {
                webpackConfig.plugins.push(
                    new WorkboxWebpackPlugin.GenerateSW({
                        clientsClaim: true,
                        skipWaiting: true,
                        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
                    })
                );
            }
            return webpackConfig;
        },
    },
};
