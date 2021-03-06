module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        path: './dist',
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel?presets[]=es2015&presets[]=react&presets[]=stage-0"}
        ]
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8000/'
            },
            '/static/tiles/*': {
                target: 'http://127.0.0.1:8000/'
            }
        }
    }
};
