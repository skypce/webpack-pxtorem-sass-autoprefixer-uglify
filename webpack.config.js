/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const autoprefixer = require('autoprefixer');
//const precss = require('precss');
//const svgFragments = require('postcss-svg-fragments');
//const cssnano = require('cssnano');
var path = require("path");
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: ['./main.js', './node_modules/materialize-css/sass/materialize.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    })
  ],
  module: {
    rules: [
      /* {
         test: /\.jsx$/,
         loader: 'webpack-px-to-rem',
         // the query is optional
         query: {
           // 1rem=npx default 10
           basePx: 10,
           // only convert px greater than the given value default 0
           // For the reason that tiny rem may be smaller than 1px and disappeare in tiny device
           min: 1,
           // the rem value only has specific decimal places default 3
           floatWidth: 3
         }
 
       },*/
      /*{
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["es2015"], babelrc:false }
        }
      },*/
      /*
         {
           test: /\.(scss|css)$/,
           loader: extractTextPlugin.extract({
             fallback: 'style-loader',
             use: [
               {loader: 'css-loader', options: {sourceMap: true}},
               {
                 loader: 'postcss-loader',
                 options: {
                   ident: 'postcss',
                   plugins: (loader) => [
                     require('postcss-import')({ root: loader.resourcePath }),
                     require('postcss-preset-env')(),
                     require('cssnano')(),
                     require('postcss-pxtorem')()
                   ]
                 }
               },
               {loader: 'sass-loader', options: {sourceMap: true}}
             ]
           })
         },
       ]
     },*/

      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: {
                safe: false
              },
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
               // require('postcss-cssnext')(),
                require('autoprefixer')({
                  browsers: 'last 2 version'
                }),
                require('postcss-pxtorem')({
                  replace: false,
                  rootValue: 15,
                  propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing', 'padding', 'margin', 'padding-left', 'padding-right', 'padding-bottom', 'padding-top', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'width', 'left', 'top', 'bottom', 'right', 'max-width', 'min-width', 'height','max-height','min-height', 'border-left', 'border-top','border-bottom','border-right', 'border-radius', 'text-shadow', 'box-shadow'],
                  mediaQuery: false
                }), 
                require('postcss-clean')({
                  removeDuplicates:true,
                  mergeMediaQueries:true,
                  processImport: false
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      },
    ]
  },


};
