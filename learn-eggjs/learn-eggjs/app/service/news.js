// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;
    console.log(serverUrl, pageSize);
    return [];
  }
}

module.exports = NewsService;
