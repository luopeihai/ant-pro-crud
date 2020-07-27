var fs = require("fs");
const readFile = require("util").promisify(fs.readFile);

const readConfigFile = function (fileName = ".antprocrud") {
  return new Promise((resolve, reject) => {
    try {
      resolve(fs.readFileSync(fileName, "utf8"));
    } catch (err) {
      console.log("文件配置读取错误");
      resolve(false);
    }
  });
};

module.exports = {
  readConfigFile,
};
