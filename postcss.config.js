/**
 * Site variant
 */
var SITE = process.env.FD_SITE || 'FK';

module.exports = {
  plugins: {
    'postcss-import': {
      path: [
        'src/css/',
        'src/css/'+SITE.toUpperCase()
      ]
    },
    'postcss-mixins': {},
    'postcss-nested': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions']
    }
  }
};
