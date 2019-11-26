'use strict';

const path = require('path');
const sendToWormhole = require('stream-wormhole');
const qiniuUpload = require('../../lib/qiniuUpload');
const sizeOf = require('image-size');
const Controller = require('egg').Controller;

module.exports = class extends Controller {
  async uploadNotRequiredFile() {
    const { ctx } = this;
    const { Oss } = ctx.model;
    const stream = await ctx.getFileStream({ requireFile: false });
    const getBuffer = streamToBuffer(stream);
    let result,
      oss;
    if (stream.filename) {
      oss = new Oss();
      oss.name = stream.filename;
      const name = oss.id + path.extname(stream.filename);
      oss.saveName = name;
      result = await qiniuUpload(name, this.config.qiniu, stream);
      oss.url = this.config.qiniu.domainName + result.key;
      oss.hash = result.hash;
      oss.path = result.key;
      const buffer = await getBuffer;
      const temp = sizeOf(buffer);
      oss.height = temp.height;
      oss.width = temp.width;
      oss.type = temp.type;
      oss.size = buffer.length;
      await oss.save();
    } else {
      await sendToWormhole(stream);
    }
    ctx.body = oss;
  }
};


function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('error', reject);
    stream.on('data', data =>
      buffers.push(data)
    );
    stream.on('end', () =>
      resolve(Buffer.concat(buffers))
    );
  });
}
