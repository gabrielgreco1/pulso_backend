const path = require('path');

module.exports = function (options, webpack) {
    return {
        ...options,
        resolve: {
            ...options.resolve,
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@modules': path.resolve(__dirname, 'src/modules'),
                '@common': path.resolve(__dirname, 'src/common'),
                '@config': path.resolve(__dirname, 'src/config'),
            },
        },
    };
};
