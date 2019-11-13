'use strict';

const Controller = require('egg').Controller;

/**
 * @param {Egg.Application} app - egg application
 */
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'ziju api';
  }
}

module.exports = HomeController;
