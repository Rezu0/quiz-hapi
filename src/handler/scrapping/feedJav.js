const cheerio = require('cheerio');
const http = require('http');
require('dotenv').config();

const javDesuUncensoredLeaked = async (request, h) => {
  try {
    const options = {
      rejectUnauthorized: false,
    };
    const agent = new http.Agent(options);
    const res = await fetch(`${process.env.link_javdesu_uncensored_leaked}`, { agent });
    if (!res.ok) {
      throw new Error('Gagal');
    }
    const data = await res.text();
    const $ = cheerio.load(data);
    // javdesu uncensored leaked
    const title = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('title')).get();
    const link = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('href')).get();
    const image = $('.featured-thumb.grid-img.col-md-12 a').children().map((index, element) => $(element).attr('src')).get();
    const response = h.response({
      status: 'success',
      message: 'API Feed Javdesu Uncensored Leaked',
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

const javDesuUncensored = async (request, h) => {
  try {
    const options = {
      rejectUnauthorized: false,
    };
    const agent = new http.Agent(options);
    const res = await fetch(`${process.env.link_javdesu_uncensored}`, { agent });
    if (!res.ok) {
      throw new Error('Gagal');
    }
    const data = await res.text();
    const $ = cheerio.load(data);
    // javdesu uncensored
    const title = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('title')).get();
    const link = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('href')).get();
    const image = $('.featured-thumb.grid-img.col-md-12 a').children().map((index, element) => $(element).attr('src')).get();
    const response = h.response({
      status: 'success',
      message: 'API Feed Javdesu Uncensored',
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

const javDesuCensored = async (request, h) => {
  try {
    const options = {
      rejectUnauthorized: false,
    };
    const agent = new http.Agent(options);
    const res = await fetch(`${process.env.link_javdesu_censored}`, { agent });
    if (!res.ok) {
      throw new Error('Gagal');
    }
    const data = await res.text();
    const $ = cheerio.load(data);
    // javdesu cencored
    const title = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('title')).get();
    const link = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('href')).get();
    const image = $('.featured-thumb.grid-img.col-md-12 a').children().map((index, element) => $(element).attr('src')).get();
    const response = h.response({
      status: 'success',
      message: 'API Feed Javdesu Cencored',
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

const javDesuMosaic = async (request, h) => {
  try {
    const options = {
      rejectUnauthorized: false,
    };
    const agent = new http.Agent(options);
    const res = await fetch(`${process.env.link_javadesu_mosaic}`, { agent });
    if (!res.ok) {
      throw new Error('Gagal');
    }
    const data = await res.text();
    const $ = cheerio.load(data);
    // javdesu-mosaic
    const title = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('title')).get();
    const link = $('.featured-thumb.grid-img.col-md-12').children().map((index, element) => $(element).attr('href')).get();
    const image = $('.featured-thumb.grid-img.col-md-12 a').children().map((index, element) => $(element).attr('src')).get();
    const response = h.response({
      status: 'success',
      message: 'API Feed Javdesu Mosaic',
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

module.exports = {
  javDesuMosaic,
  javDesuCensored,
  javDesuUncensored,
  javDesuUncensoredLeaked,
};
