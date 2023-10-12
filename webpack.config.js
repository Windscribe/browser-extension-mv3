const webpack = require('webpack')
const path = require('path')
const fileSystem = require('fs-extra')
const env = require('./scripts/env')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

console.log('env.NODE_ENV: ', env.NODE_ENV)
console.log('process.env.API_URL: ', process.env.API_URL)

const alias = {
  'react-dom': '@hot-loader/react-dom',
}
// load the secrets
const secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js')

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'ttf', 'woff', 'woff2']

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath
}

const maybeProgressPlugin = env.NODE_ENV === 'development' ? [new webpack.ProgressPlugin()] : []

const options = {
  mode: env.NODE_ENV || 'development',
  stats: {
    children: true,
    errorDetails: true,
  },
  entry: {
    popup: path.join(__dirname, 'src', 'pages', 'popup', 'index.tsx'),
    background: path.join(__dirname, 'src', 'pages', 'background', 'main.ts'),
    debugLog: path.join(__dirname, 'src', 'pages', 'debugLog', 'index.tsx'),
  },
  chromeExtensionBoilerplate: {
    notHotReload: ['background', 'popup'], // TODO check
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: env.ASSET_PATH,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        type: 'asset/resource',
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: [/node_modules/, path.resolve(__dirname, 'src/services/checkIp/offscreen')],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: alias,
    extensions: fileExtensions
      .map(extension => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
    // TODO maybe delete or pass .env as argument
    new Dotenv(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    // TODO Review plugins. Probably they could be optimized
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, 'build'),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                ...JSON.parse(content.toString()),
              }),
            )
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/services/checkIp/offscreen/checkIp.html',
          to: path.join(__dirname, 'build/checkIp.html'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/services/checkIp/offscreen/checkIp.js',
          to: path.join(__dirname, 'build/checkIp.js'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/services/checkIp/offscreen/checkIpWorker.js',
          to: path.join(__dirname, 'build/checkIpWorker.js'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/spinningLogo.gif',
          to: path.join(__dirname, 'build/spinningLogo.gif'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          //TODO Consider not to fetch everything from ublock
          from: 'ublock',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/backgroundScripts.js',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/pages/content'),
          to: path.join(__dirname, 'build/content'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/*.png',
          to: '[name].[ext]',
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/fonts',
          to: path.join(__dirname, 'build/fonts'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'debugLog', 'index.html'),
      filename: 'debugLog.html',
      chunks: ['debugLog'],
      cache: false,
    }),
    ...maybeProgressPlugin,
  ],
  infrastructureLogging: {
    level: 'info',
  },
  experiments: {
    topLevelAwait: true,
  },
}

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map'
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  }
}

module.exports = options
