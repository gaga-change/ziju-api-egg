/* eslint valid-jsdoc: "off" */

'use strict';
const { mongodbConnectLink } = require('../lib/mongo');
const qiniuConfig = require('../lib/qiniu.config');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573542447266_5593';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    onerror: {
      accepts() {
        return 'json';
      },
    },
    statusCode: {
      /** 成功 */
      SUCCESS: 200,

      /** 创建成功，要返回数据  */
      CREATE: 201,

      /** 操作成功，但不返回数据 */
      NO_CONENT: 204,

      /** 参数异常，或者不明确的错误 */
      BAD_REQUEST: 400,

      /** 没有提供认证信息：未登陆 */
      UNAUTHORIZED: 401,

      /** 禁止访问：无权限 */
      FORBIDDEN: 403,

      /** 找不到数据 */
      NO_FOUND: 404,
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    session: {
      key: 'EGG_SESS',
      maxAge: 3650 * 24 * 3600 * 1000, // 3650 天
      httpOnly: true,
      encrypt: true,
    },
    mongoose: {
      url: mongodbConnectLink,
      options: {
        useUnifiedTopology: true,
      },
      plugins: [],
    },
    multipart: {
      fileSize: '3mb',
    },
    qiniu: qiniuConfig,
    baiduSearchPushUrl: process.env.BAIDU_SEARCH_PUSH_URL,
  };
};
