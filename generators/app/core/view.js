const getIndexContext = function (name, data, row) {
  return { name, row };
};

const getFormContext = function (name, create, update) {
  return { name, create, update };
};

module.exports = {
  getIndexContext,
  getFormContext,
};
