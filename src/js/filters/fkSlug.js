const fkSlug = function (fkUtils) {
  return fkUtils.slugify;
};

fkSlug.$inject = ['fkUtils'];

export default fkSlug;
