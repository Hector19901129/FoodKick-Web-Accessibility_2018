export default function () {
  var files = require.context('../../assets/img/svg', false, /\.svg$/);
  files.keys().forEach(files);
}
