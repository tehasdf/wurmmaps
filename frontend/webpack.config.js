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
        proxy: {
            '/maps/*': {
                target: 'http://127.0.0.1:8000/'
            },
            '/features/*': {
                target: 'http://127.0.0.1:8000/'
            }
        }
    }
};
