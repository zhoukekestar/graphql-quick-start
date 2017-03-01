

module.exports = function getUnaliasedName(alias, aliases) {
  for (const key in aliases) {
    if (aliases[key] === alias) {
      return key;
    }
  }
};
