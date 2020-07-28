const Generator = require("yeoman-generator");
const http = require("http");

const { readConfigFile } = require("./core/utils/tool");
const { getServicesContext } = require("./core/service");
const { getModelContext } = require("./core/model");
const { getIndexContext, getFormContext } = require("./core/view");
let config = ""; //配置

let that = null;

//排除转换的item
const onFormatArray = ["pageNum", "pageSize", "token"];
const API_BATH = "/uhu/admin/api";

module.exports = class extends Generator {
  //获取当前项目状态，获取基本配置参数等
  initianlizing() {}

  //保存配置相关信息且生成配置文件（名称多为'.'开头的配置文件,例如.editorconfig）
  configuring() {}

  //未匹配任何生命周期方法的非私有方法均在此环节*自动*执行
  default() {}

  //向用户展示交互式问题收集关键参数
  async prompting() {
    //prompt array
    let promptArray = [];
    //读取配置文件
    config = await readConfigFile();
    if (config) {
      //存在配置
      config = JSON.parse(config);
    } else {
      promptArray = [
        {
          type: "input",
          name: "api",
          message: "文档api地址",
          default: "http://192.168.10.175:8093/v2/api-docs",
        },
        {
          type: "input",
          name: "name",
          message: "模块名(Your project name)",
          default: "question",
          //default: "question",
        },
        {
          type: "input",
          name: "path",
          message: "路径(Your project path)",
          default: "src/pages/banner",
        },
        {
          type: "input",
          name: "indexApi",
          message: "列表 api : <格式:api|method(默认get)>",
          default: "/config/banner/listBannerQuestion",
          //default: "/config/banner/listBanner|get",
        },
        {
          type: "input",
          name: "createApi",
          message: "创建 api(格式:api|method(默认post))",
          // default: "/config/banner|post",
          default: "/config/banner/addQuestionToBanner",
        },
        {
          type: "input",
          name: "updateApi",
          message: "更新 api(格式:api|method(默认put))",
          // default: "/config/banner|put",
          //default: null,
        },
        {
          type: "input",
          name: "deleteApi",
          message: "删除 api(格式:api|method(默认delete))",
          //default: "/config/banner/{moduleId}/{bannerId}|delete",
          default:
            "/config/banner/removeQuestionFromBanner/{bannerId}/{mainId}",
        },
      ];
    }

    return this.prompt(promptArray).then((answers) => {
      this.answers = answers;
    });
  }

  writing() {
    if (!Reflect.ownKeys(this.answers).length) {
      const {
        namespace,
        path,
        name,
        key,
        apiBasePath,
        query = null,
        row = null,
        createRow = null,
        updateRow = null,
        deleteRow = null,
        api: {
          index = null,
          create = null,
          update = null,
          detail = null,
          delete: deleteObj = null,
        },
      } = config;
      //api 处理
      const [indexApi = null, method = "get"] =
        index === null ? [] : index.split("|");
      const [createApi = null, createMethod = "post"] =
        create === null ? [] : create.split("|");
      const [updateApi = null, updateMethod = "put"] =
        update === null ? [] : update.split("|");
      const [detailApi = null, detailMethod = "get"] =
        detail === null ? [] : detail.split("|");
      const [deleteApi = null, deleteMethod = "delete"] =
        deleteObj === null ? [] : deleteObj.split("|");
      this.renderData(path, name, query, row, createRow, updateRow, deleteRow);
    }
  }

  /**
   * 生成 data.d.ts
   * @param {*} path 路劲
   * @param {*} name 模块名称
   * @param {*} query 请求参数
   * @param {*} row 每行显示
   * @param {*} createRow 创建 参数
   * @param {*} updateRow 更新 参数
   * @param {*} deleteRow 删除 参数
   */
  renderData(path, name, query, row, createRow, updateRow, deleteRow) {
    if (path) {
      this.fs.copyTpl(
        this.templatePath("data.d.ts"),
        this.destinationPath(`${path}/${name}/data.d.ts`),
        { query, row, createRow, updateRow, deleteRow }
      );
    }
  }

  renderServices(
    indexApi,
    method,
    createApi,
    createMethod,
    updateApi,
    updateMethod,
    detailApi,
    detailMethod,
    deleteApi,
    deleteMethod
  ) {}

  //依据模板进行新项目结构的写操作
  // writing() {
  //   that = this;

  //   const [indexApiString = null, method = "get"] =
  //     this.answers.indexApi === null ? [] : this.answers.indexApi.split("|");
  //   const [createApiString = null, createMethod = "post"] =
  //     this.answers.createApi === null ? [] : this.answers.createApi.split("|");

  //   const [updateApiString = null, updateMethod = "post"] =
  //     this.answers.updateApi === null ? [] : this.answers.updateApi.split("|");

  //   const [deleteApiString = null, deleteMethod = "delete"] =
  //     this.answers.deleteApi === null ? [] : this.answers.deleteApi.split("|");

  //   http.get(this.answers.api, function (res) {
  //     var str = "";
  //     //绑定方法，获取网页数据
  //     res.on("data", function (chunk) {
  //       str += chunk;
  //       //分页统一实体«AnswerOutput对象»
  //     });

  //     res.on("end", () => {
  //       //调用下方的函数，得到返回值，即是我们想要的img的src
  //       const data = JSON.parse(str);
  //       const dataContext = getModelData(
  //         data,
  //         indexApiString,
  //         method,
  //         createApiString,
  //         createMethod,
  //         updateApiString,
  //         updateMethod,
  //         deleteApiString,
  //         deleteMethod
  //       );

  //       const modelContext = getModelContext(
  //         that.answers.name,
  //         createApiString,
  //         updateApiString,
  //         deleteApiString
  //       );

  //       const servicesContext = getServicesContext(
  //         indexApiString,
  //         method,
  //         createApiString,
  //         createMethod,
  //         updateApiString,
  //         updateMethod,
  //         deleteApiString,
  //         deleteMethod
  //       );

  //       const indexContext = getIndexContext(
  //         that.answers.name,
  //         dataContext.index,
  //         dataContext.row
  //       );

  //       const formContext = getFormContext(
  //         that.answers.name,
  //         dataContext.create,
  //         dataContext.update
  //       );

  //       //data.d 输出
  //       that.fs.copyTpl(
  //         that.templatePath("data.d.ts"),
  //         that.destinationPath(
  //           `${that.answers.path}/${that.answers.name}/data.d.ts`
  //         ),
  //         dataContext
  //       );

  //       //services 输出
  //       that.fs.copyTpl(
  //         that.templatePath("services.ts"),
  //         that.destinationPath(
  //           `${that.answers.path}/${that.answers.name}/services.ts`
  //         ),
  //         servicesContext
  //       );

  //       //model 输出
  //       that.fs.copyTpl(
  //         that.templatePath("model.ts"),
  //         that.destinationPath(
  //           `${that.answers.path}/${that.answers.name}/model.ts`
  //         ),
  //         modelContext
  //       );

  //       //index 输出
  //       that.fs.copyTpl(
  //         that.templatePath("index.tsx"),
  //         that.destinationPath(
  //           `${that.answers.path}/${that.answers.name}/index.tsx`
  //         ),
  //         indexContext
  //       );

  //       //form 输出
  //       that.fs.copyTpl(
  //         that.templatePath("_form.tsx"),
  //         that.destinationPath(
  //           `${that.answers.path}/${that.answers.name}/_form.tsx`
  //         ),
  //         formContext
  //       );
  //     });
  //   });

  //   const getFullPath = (path) => API_BATH + path;

  //   const getModelData = (
  //     data,
  //     indexApiString,
  //     method,
  //     createApiString,
  //     createMethod,
  //     updateApiString,
  //     updateMethod,
  //     deleteApiString,
  //     deleteMethod
  //   ) => {
  //     // 模板数据上下文
  //     //answers 通过回答获取  格式:{ name: '为输入内容' }

  //     let index = { queryListParams: [], description: "", indexApiString },
  //       row = { params: [], description: "" },
  //       create = { params: [], description: "", createApiString },
  //       update = { params: [], description: "", updateApiString },
  //       deleteObj = { params: [], description: "", deleteApiString };

  //     const indexData = data.paths[getFullPath(indexApiString)][method];
  //     index.description = indexData.summary;

  //     index.queryListParams = formatParameters(indexData.parameters);

  //     //row
  //     const originalRef = /.+«(.*)»/.exec(
  //       indexData.responses["200"].schema.originalRef
  //     )[1];
  //     const rowData = data.definitions[originalRef];
  //     row.description = rowData.description;
  //     let rowParameters = [];
  //     Object.keys(rowData.properties).forEach(function (key) {
  //       rowParameters.push({
  //         name: key,
  //         type: rowData.properties[key].type,
  //         description: rowData.properties[key].description,
  //       });
  //     });

  //     row.params = formatParameters(rowParameters);

  //     //create
  //     if (createApiString) {
  //       create = Object.assign(
  //         create,
  //         getParams(
  //           data.paths[getFullPath(createApiString)][createMethod],
  //           rowParameters
  //         )
  //       );
  //     }

  //     //update
  //     if (updateApiString) {
  //       update = Object.assign(
  //         update,
  //         getParams(
  //           data.paths[getFullPath(updateApiString)][updateMethod],
  //           rowParameters
  //         )
  //       );
  //     }

  //     //delete
  //     if (deleteApiString) {
  //       deleteObj = Object.assign(
  //         deleteObj,
  //         getParams(
  //           data.paths[getFullPath(deleteApiString)][deleteMethod],
  //           rowParameters
  //         )
  //       );
  //     }

  //     return {
  //       index,
  //       row,
  //       create,
  //       update,
  //       deleteObj,
  //     };
  //   };

  //   const formatParameters = (data = []) => {
  //     const objArray = [];
  //     data.forEach(function (item) {
  //       if (!onFormatArray.includes(item.name)) {
  //         const obj = {
  //           value: item.name + (item.required === false ? "?" : ""),
  //           description: item.description,
  //         };

  //         if (item.hasOwnProperty("type")) {
  //           obj["key"] = formatType(item.type);
  //         } else if (item.hasOwnProperty("schema")) {
  //           obj["key"] = formatType(item.schema.type);
  //         }

  //         objArray.push(obj);
  //       }
  //     });
  //     return objArray;
  //   };

  //   const formatType = (valueType) => {
  //     let typeString = "string";
  //     switch (valueType) {
  //       case "integer":
  //         typeString = "number";
  //         break;
  //       case "boolean":
  //         typeString = "boolean";
  //         break;
  //     }

  //     return typeString;
  //   };

  //   const getParams = (data, rowParameters) => {
  //     const isIgnoreParameters = data.hasOwnProperty("x-ignoreParameters");
  //     const paramObj = {
  //       description: data.summary,
  //       params: [],
  //     };

  //     //存在忽略项,需要从row取
  //     if (isIgnoreParameters) {
  //       paramObj.params = formatParameters(
  //         rowParameters.filter(
  //           (item) => !data["x-ignoreParameters"][0].hasOwnProperty(item.name)
  //         )
  //       );
  //     } else {
  //       paramObj.params = formatParameters(data.parameters);
  //     }

  //     return paramObj;
  //   };
  // }

  //处理冲突(内部调用，一般不用处理）
  conflicts() {}
  //使用指定的包管理工具进行依赖安装(支持npm,bower,yarn)
  install() {}
  //结束动作，例如清屏，输出结束信息，say GoodBye等等
  end() {}
};
