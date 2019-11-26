'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PostSchema = new Schema({
    title: { type: String, default: '', trim: true, maxlength: 1000, unique: true }, // 标题
    intro: { type: String, default: '', trim: true, maxlength: 1000 }, // 描述
    tags: [{ type: String }], // 标签
    love: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 爱心
    loveNum: { type: Number, default: 0 },
    turn: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 转采
    turnNum: [{ type: Number, default: 0 }],
    turnBy: { type: Schema.Types.ObjectId, ref: 'User' }, // 采自人
    source: { type: Schema.Types.ObjectId, ref: 'Source' }, // 源代码
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, // 个人目录
    readTime: { type: Number, default: 0 }, // 点击量
    imgUrl: { type: String }, // 图标，从源代码的img拷贝
    show: { type: Boolean },
    img: { type: Schema.Types.ObjectId, ref: 'Oss' },
    creater: { type: Schema.Types.ObjectId, ref: 'User' }, // 创建人
  }, {
    timestamps: true,
  });

  return mongoose.model('Post', PostSchema, 'ziju_post');
};

