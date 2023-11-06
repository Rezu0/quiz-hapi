const cheerio = require('cheerio');
const http = require('http');
require('dotenv').config();

const javDesu = async (request, h) => {
  try {
    const options = {
      rejectUnauthorized: false,
    };
    const agent = new http.Agent(options);
    const res = await fetch(`${process.env.link_javadesu}`, { agent });
    if (!res.ok) {
      throw new Error('Gagal');
    }
    const data = await res.text();
    const $ = cheerio.load(data);
    // javdesu
    const title = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('title')).get();
    const link = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('href')).get();
    const image = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('src')).get();
    const response = h.response({
      status: 'success',
      message: 'API Feed Javdesu',
      data: {
        _title: title,
        _link: link,
        _image: image,
      },
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { javDesu };
