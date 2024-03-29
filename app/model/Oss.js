'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String, trim: true }, // 文件名称
    saveName: { type: String, trim: true }, // 保持文件名称
    url: { type: String, trim: true }, // 全路径
    path: { type: String, trim: true }, // 短路
    hash: { type: String, trim: true }, // hash
    remark: { type: String, default: '', trim: true, maxlength: 1000 }, // 备注
    size: { type: Number },
    width: { type: Number },
    height: { type: Number },
    type: { type: String },
    creater: { type: Schema.Types.ObjectId, ref: 'User' }, // 创建人
  }, {
    timestamps: true,
  });

  return mongoose.model('Oss', UserSchema, 'ziju_oss');
};
