import { container } from 'webpack';
import {WatchlistComponent} from "./src/app/watchlist/watchlist.component";
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const deps = require('./package.json').dependencies;
const sharedMappings = new mf.SharedMappings();

sharedMappings.register(path.join(__dirname, 'tsconfig.json'), [
  /* mapped paths to share */
]);
module.exports = {
  output: {
    publicPath: 'http://localhost:4201/',
    uniqueName: 'angularApp',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  devServer: {
    port: 4201,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
  },
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'angularApp',
      filename: 'remoteEntry.js',
      exposes: {
        './WatchlistComponent': './src/app/watchlist/watchlist.component.web.ts',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        ...sharedMappings.getDescriptors(),
      },
    }),
  ],
};
