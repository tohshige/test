module.exports = {
  entry: './src/main.ts',  // メインとなるJavaScriptファイル（エントリーポイント）
  output: {  // ファイルの出力設定
    path: `${__dirname}/build`,    //  出力ファイルのディレクトリ名
    filename: 'bundle.js'    // 出力ファイル名
  },
  module: {
    rules: [
      {
        test: /\.ts$/,        // 拡張子 .ts の場合
        use: 'awesome-typescript-loader'        // TypeScript をコンパイルする
      },
      {      // ソースマップファイルの処理
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  resolve: {  // import 文で .ts ファイルを解決するため
    extensions: [
      '.ts'
    ],
    alias: {    // Webpackで利用するときの設定
      vue: 'vue/dist/vue.js'
    }
  },
  devtool: 'source-map'  // ソースマップを有効に
};
