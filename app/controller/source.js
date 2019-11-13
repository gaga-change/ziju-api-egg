'use strict';

const BaseController = require('../core/base-controller');

class SourceController extends BaseController {
  constructor(...args) {
    super(
      {
        modelName: 'Source',
        populates: [
          { path: 'creater' },
          { path: 'img' }],
      }, ...args);
  }
}

module.exports = SourceController;
