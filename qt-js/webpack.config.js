const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        index: "index.html",
        historyApiFallback: true
    },
    entry: ['babel-polyfill', "./app/src/index.js"],
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development",
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader' },
                { loader: 'sass-loader'}
            ],
        }, {
            test: /\.html$/,
            use: [{
                loader: "html-loader"
            }]
        }, {
            test: /\.jsx?$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    exclude: /(node_modules)/,
                    plugins: [
                        "@babel/plugin-proposal-function-bind",
                        "@babel/plugin-proposal-export-default-from",
                        "@babel/plugin-proposal-logical-assignment-operators",
                        ["@babel/plugin-proposal-optional-chaining", { loose: false }],
                        ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
                        ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
                        "@babel/plugin-proposal-do-expressions",
                        ["@babel/plugin-proposal-decorators", { legacy: true }],
                        "@babel/plugin-proposal-function-sent",
                        "@babel/plugin-proposal-export-namespace-from",
                        "@babel/plugin-proposal-numeric-separator",
                        "@babel/plugin-proposal-throw-expressions",
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-syntax-import-meta",
                        ["@babel/plugin-proposal-class-properties", { loose: false }],
                        "@babel/plugin-proposal-json-strings"
                    ]
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/src/index.html"
        }),
		new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ]
}