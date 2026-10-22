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

// get git info from command line
const commitHash = require('child_process').execSync('git rev-parse --short HEAD').toString().trim()

// get submodule commit hash
const uboLiteSubmoduleCommitHash = require('child_process')
  .execSync('git rev-parse --short HEAD:ubo-lite-mirror')
  .toString()
  .trim()

// get ubo lite version maniest.json in ubo-lite-mirror/chromium
const uboLiteVersion = require('./ubo-lite-mirror/chromium/manifest.json').version
const uboLiteName = require('./ubo-lite-mirror/chromium/_locales/et/messages.json').extName.message

// Link Sanitizer owns URL cleaning while it is on. Index uBlock removeParams
// rule IDs so those static rules can be disabled/restored at runtime.
const isRemoveParamRule = rule => {
  const removeParams = rule?.action?.redirect?.transform?.queryTransform?.removeParams
  return Array.isArray(removeParams) && removeParams.length > 0
}

const collectUblockRemoveParamRuleIds = () => {
  const rulesetsDir = path.join(__dirname, 'ubo-lite-mirror/chromium/rulesets/main')
  const ruleIdsByRuleset = {}

  for (const file of fileSystem.readdirSync(rulesetsDir)) {
    if (!file.endsWith('.json')) {
      continue
    }

    const rules = JSON.parse(fileSystem.readFileSync(path.join(rulesetsDir, file), 'utf8'))

    if (!Array.isArray(rules)) {
      continue
    }

    const ruleIds = rules.filter(isRemoveParamRule).map(rule => rule.id)

    if (ruleIds.length > 0) {
      const rulesetId = file.replace(/\.json$/, '')
      ruleIdsByRuleset[rulesetId] = ruleIds
      console.log(`[link-sanitizer] indexed ${ruleIds.length} removeParams rule(s) in ${rulesetId}`)
    }
  }

  return ruleIdsByRuleset
}

const ublockRemoveParamRuleIds = collectUblockRemoveParamRuleIds()

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
    children: true,
    errorDetails: true,
    logging: 'verbose',
    loggingDebug: true,
    colors: true,
    modules: true,
    reasons: true,
    moduleTrace: true,
    errorStack: true,
  },
  entry: {
    popup: path.join(__dirname, 'src', 'pages', 'popup', 'index.tsx'),
    background: path.join(__dirname, 'src', 'pages', 'background', 'main.ts'),
    debugLog: path.join(__dirname, 'src', 'pages', 'debugLog', 'index.tsx'),

    workerBlockContentScript: path.join(
      __dirname,
      'src',
      'pages',
      'contentScripts',
      'workerBlock.ts',
    ),

    webshareNoOpContentScript: path.join(
      __dirname,
      'src',
      'pages',
      'contentScripts',
      'webshareNoOp.ts',
    ),

    fontAntiFingerprinting: path.join(
      __dirname,
      'src',
      'pages',
      'contentScripts',
      'antiFingerprinting',
      'font.ts',
    ),

    canvasAntiFingerprinting: path.join(
      __dirname,
      'src',
      'pages',
      'contentScripts',
      'antiFingerprinting',
      'canvas.ts',
    ),

    screenResAntiFingerprinting: path.join(
      __dirname,
      'src',
      'pages',
      'contentScripts',
      'antiFingerprinting',
      'screen.ts',
    ),

    audioAntiFingerprinting: path.join(
      __dirname,
      'src',
      'pages',
      'contentScripts',
      'antiFingerprinting',
      'audio.ts',
    ),

    fingerprintjsAntiFingerprinting: path.join(
      __dirname,
      'src',
      'pages',
      'contentScripts',
      'antiFingerprinting',
      'fingerprintjs.ts',
    ),

    fingerprintMessageListener: path.join(
      __dirname,
      'src',
      'pages',
      'contentScripts',
      'antiFingerprinting',
      'fingerprintMessageListener.ts',
    ),

    offscreenHub: path.join(__dirname, 'src', 'services', 'offscreenActions', 'offscreenHub.ts'),
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
    new webpack.DefinePlugin({
      COMMIT_HASH: JSON.stringify(commitHash),
      UBO_LITE_SUBMODULE_COMMIT_HASH: JSON.stringify(uboLiteSubmoduleCommitHash),
      UBO_LITE_VERSION: JSON.stringify(uboLiteVersion),
      UBO_LITE_NAME: JSON.stringify(uboLiteName),
      UBLOCK_REMOVE_PARAM_RULE_IDS: JSON.stringify(ublockRemoveParamRuleIds),
    }),

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
          from: 'src/services/offscreenActions/checkIp.worker.js',
          to: path.join(__dirname, 'build/checkIp.worker.js'),
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
          from: 'src/_locales',
          to: path.join(__dirname, 'build/_locales'),
          force: true,
        },
      ],
    }),

    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'ublock',
    //       to: path.join(__dirname, 'build'),
    //       force: true,
    //     },
    //   ],
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // TODO: Also make this work for firefox
          from: 'ubo-lite-mirror/chromium',
          to: path.join(__dirname, 'build'),
          force: true,
          globOptions: {
            ignore: ['**/manifest.json', '**/log.txt'], // dont copy manifest.json
          },
          transform(content, absoluteFrom) {
            if (absoluteFrom.endsWith('dashboard.js')) {
              return content
                .toString()
                .replace(/UBO_LITE_VERSION/g, JSON.stringify(uboLiteVersion))
                .replace(/UBO_LITE_NAME/g, JSON.stringify(uboLiteName))
            }

            const relativePath = path.relative(
              path.join(__dirname, 'ubo-lite-mirror/chromium'),
              absoluteFrom,
            )

            if (relativePath.includes('_locales') && relativePath.endsWith('messages.json')) {
              const targetPath = path.join(__dirname, 'src', relativePath)

              if (fileSystem.existsSync(targetPath)) {
                const uboMessages = JSON.parse(content.toString())
                const sourceMessages = JSON.parse(fileSystem.readFileSync(targetPath, 'utf8'))
                return JSON.stringify({ ...uboMessages, ...sourceMessages }, null, 2)
              }
            }

            return content
          },
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

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'services', 'offscreenActions', 'offscreenHub.html'),
      filename: 'offscreenHub.html',
      chunks: ['offscreenHub'],
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
        terserOptions: {
          parse: {
            module: true,
          },
          compress: {
            toplevel: false,
          },
          mangle: {
            toplevel: false,
          },
        },
      }),
    ],
  }
}

module.exports = options
