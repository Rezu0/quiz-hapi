const cheerio = require('cheerio');
const http = require('http');
require('dotenv').config();

const devIgoDesu = async (request, h) => {
  try {
    const options = {
      rejectUnauthorized: false,
    };
    const agent = new http.Agent(options);
    const res = await fetch(`${process.env.link_igodesu}`, { agent });
    if (!res.ok) {
      throw new Error('Gagal');
    }
    const data = await res.text();
    const $ = cheerio.load(data);
    // igodesu
    const title = $('.entry-title').children().map((index, element) => $(element).text()).get();
    const link = $('.entry-title').children().map((index, element) => $(element).attr('href')).get();
    const image = $('.featured-content-image a').children().map((index, element) => $(element).attr('src')).get();
    const response = h.response({
      status: 'success',
      message: 'API Feed Igodesu',
      data: {
        _title: title.reverse(),
        _link: link.reverse(),
        _image: image.reverse(),
      },
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { devIgoDesu };
