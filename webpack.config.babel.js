import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default env => ({
  devtool: env === 'dev' ? '#eval-source-map' : '#source-map',
  entry: {
    app: './src/main.js',
    styles: './src/styles/styles.scss',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[hash].[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'public/app/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 65,
              },
              pngquant: {
                quality: '10-20',
                speed: 4,
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                  {
                    removeEmptyAttrs: false,
                  },
                ],
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'index.html'),
      chunks: ['app'],
    }),
    new ExtractTextPlugin({
      filename: 'dist/styles.css',
      publicPath: '/',
      allChunks: true,
    }),
  ],
});
