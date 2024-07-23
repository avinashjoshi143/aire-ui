// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new DotenvWebpack({
            path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(mp4|webm|ogg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'videos/'
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'images/'
                  }
                }
              },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        fallback : {
            path: require.resolve("path-browserify"),
            os: require.resolve("os-browserify/browser"),
            crypto: require.resolve("crypto-browserify"),
        }
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
