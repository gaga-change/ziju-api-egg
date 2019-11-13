'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SourceSchema = new Schema({
    html: { type: String, default: '' }, // 源文件内容
    css: { type: String, default: '' }, // 源文件内容
    sourceCss: { type: String, default: '' }, // 样式源文件
    sourceType: { type: String, default: 'css' }, // 源文件类型（less、scss、css）
    origin: { type: String }, // 出处url
    show: { type: Boolean, default: false }, // 是否显示（发布/私密）
    img: { type: Schema.Types.ObjectId, ref: 'Oss' }, // logo
    creater: { type: Schema.Types.ObjectId, ref: 'User' }, // 创建人
  }, {
    timestamps: true,
  });

  return mongoose.model('Source', SourceSchema, 'ziju_source');
};

