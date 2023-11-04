const cheerio = require('cheerio');
const http = require('http');
require('dotenv').config();

const javDesu = async (request, h) => {
  try {
    const options = {
      rejectUnauthorized: false,
    };
    const agent = new http.Agent(options);
    const res = await fetch(process.env.link_igodesu, { agent });
    if (!res.ok) {
      throw new Error('Gagal');
    }
    const data = await res.text();
    const $ = cheerio.load(data);
    // javdesu
    // eslint-disable-next-line max-len
    // const title = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('title')).get();
    // eslint-disable-next-line max-len
    // const link = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('href')).get();
    // igodesu
    const title = $('.entry-title').children().map((index, element) => $(element).text()).get();
    const link = $('.entry-title').children().map((index, element) => $(element).attr('href')).get();
    const response = h.response({
      status: 'success',
      message: 'API FEED Javdesu',
      data: {
        _title: title,
        _link: link,
      },
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { javDesu };
