const getServicesContext = function (
  indexApiString,
  method,
  createApiString,
  createMethod,
  updateApiString,
  updateMethod,
  deleteApiString,
  deleteMethod
) {
  return {
    indexApiString,
    indexData: _getData(method),
    createApiString,
    createData: _getData(createMethod),
    updateApiString,
    updateData: _getData(updateMethod),
    deleteApiString,
    deleteData: _getData(deleteMethod),
  };
};

const _getData = function (method) {
  return method === "get"
    ? {
        data: "params",
      }
    : {
        method,
        data: "params",
      };
};

module.exports.getServicesContext = getServicesContext;
