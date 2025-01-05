const HTMLWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    devServer: {
        port: 6060,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            remotes: {
                list: 'list@http://localhost:6061/remoteEntry.js',
                cart: 'cart@http://localhost:6062/remoteEntry.js'
            }
        }),
        new HTMLWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
