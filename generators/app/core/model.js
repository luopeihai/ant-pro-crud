const getModelContext = function (
  name,
  createApiString,
  updateApiString,
  deleteApiString
) {
  let modelArray = [];
  if (createApiString) {
    modelArray.push("create");
  }

  if (updateApiString) {
    modelArray.push("update");
  }

  if (deleteApiString) {
    modelArray.push("deleteItem");
  }

  return {
    name,
    modelArray,
  };
};

module.exports.getModelContext = getModelContext;
