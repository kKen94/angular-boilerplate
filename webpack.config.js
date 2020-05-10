module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          syntax: 'postcss-scss',
          plugins: () => [
            require('postcss-import'),
            require('tailwindcss'),
            require('postcss-nested'),
            require('postcss-custom-properties'),
            require('autoprefixer'),
          ]
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  }
};
