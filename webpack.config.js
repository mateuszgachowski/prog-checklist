const webpack = require('webpack');

const debug = (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') ? true : false;

module.exports = {
    entry: './src/main.js',
    output: {
        path: './static',
        publicPath: '/static/',
        filename: 'build.js'
    },
    module: {
        // avoid webpack trying to shim process
        noParse: /es6-promise\.js$/,
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        alias: {
            vue: debug ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
            vuex:  debug ? 'vuex/dist/vuex.js' : 'vuex/dist/vuex.min.js',
            vueRouter: debug ? 'vue-router/dist/vue-router.js' : 'vue-router/dist/vue-router.min.js'
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ];
} else {
    module.exports.devtool = '#source-map';
}
