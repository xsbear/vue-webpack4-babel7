// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-cssnext'),
    // add your "plugins" here
    // ...
    // and if you want to compress
    // require('cssnano'),
    require('postcss-browser-reporter')
  ]
}
