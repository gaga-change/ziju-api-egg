'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String, trim: true, minlength: 1, maxlength: 1000, unique: true }, // 名称
    logos: [{ type: Schema.Types.ObjectId, ref: 'Oss' }], // 默认logo
    alias: { type: String, default: '', trim: true, maxlength: 1000 }, // 别名【全字母、小写，用户url】
    remark: { type: String, default: '', trim: true, maxlength: 1000 }, // 备注
    creater: { type: Schema.Types.ObjectId, ref: 'User' }, // 创建人
  }, {
    timestamps: true,
  });

  return mongoose.model('Tag', UserSchema, 'ziju_tag');
};
