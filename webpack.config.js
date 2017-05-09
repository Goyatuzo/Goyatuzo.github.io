var path = require('path');

module.exports = {
    entry: './app/tic-tac-toe/index.tsx',
    output: {
        filename: "tic-tac-toe.js",
        path: path.resolve(__dirname, "dist")
    },

    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.tsx?$/,
                use: "source-map-loader",
                exclude: /node_modules/
            }
        ]
    }
};