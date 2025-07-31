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

    const gridSelector = '.grid.gap-x-4.gap-y-8.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3.xl\\:grid-cols-4';

    const scrapingTitle = $(gridSelector).children().map((index, element) => {
      const title = $(element).find('h3').text().trim();

      return title;
    }).get();

    const scrapingLink = $(gridSelector).children().map((index, element) => {
      const link = `https://javdesu.tv${$(element).find('a').attr('href')}`;

      return link;
    }).get();

    const scrapingImage = $(gridSelector).children().map((i, el) => {
      const imageSet = $(el).find('img').attr('srcset');

      let image = null;
      if (imageSet) {
        // eslint-disable-next-line no-shadow
        const imageTrim = imageSet.split(',').map((i) => i.trim());
        image = `https://javdesu.tv${imageTrim.reverse()[0]?.split(' ')[0]}`; // ambil URL-nya aja
      }

      return image;
    }).get();

    const response = h.response({
      status: 'success',
      message: 'API Feed Javdesu Uncensored',
      data: {
        _title: scrapingTitle.reverse(),
        _link: scrapingLink,
        _image: scrapingImage,
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

    const gridSelector = '.grid.gap-x-4.gap-y-8.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3.xl\\:grid-cols-4';

    const scrapingTitle = $(gridSelector).children().map((index, element) => {
      const title = $(element).find('h3').text().trim();

      return title;
    }).get();

    const scrapingLink = $(gridSelector).children().map((index, element) => {
      const link = `https://javdesu.tv${$(element).find('a').attr('href')}`;

      return link;
    }).get();

    const scrapingImage = $(gridSelector).children().map((i, el) => {
      const imageSet = $(el).find('img').attr('srcset');

      let image = null;
      if (imageSet) {
        // eslint-disable-next-line no-shadow
        const imageTrim = imageSet.split(',').map((i) => i.trim());
        image = `https://javdesu.tv${imageTrim.reverse()[0]?.split(' ')[0]}`; // ambil URL-nya aja
      }

      return image;
    }).get();

    const response = h.response({
      status: 'success',
      message: 'API Feed Javdesu Cencored',
      data: {
        _title: scrapingTitle.reverse(),
        _link: scrapingLink.reverse(),
        _image: scrapingImage.reverse(),
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

    const gridSelector = '.grid.gap-x-4.gap-y-8.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3.xl\\:grid-cols-4';

    const scrapingTitle = $(gridSelector).children().map((index, element) => {
      const title = $(element).find('h3').text().trim();

      return title;
    }).get();

    const scrapingLink = $(gridSelector).children().map((index, element) => {
      const link = `https://javdesu.tv${$(element).find('a').attr('href')}`;

      return link;
    }).get();

    const scrapingImage = $(gridSelector).children().map((index, element) => {
      const imageSet = $(element).find('img').attr('srcset');

      let image = null;
      if (imageSet) {
        const imageTrim = imageSet.split(',').map((i) => i.trim());
        image = `https://javdesu.tv${imageTrim.reverse()[0]?.split(' ')[0]}`;
      }

      return image;
    }).get();

    const response = h.response({
      status: 'success',
      message: 'API Feed Javdesu Mosaic',
      data: {
        _title: scrapingTitle.reverse(),
        _link: scrapingLink,
        _image: scrapingImage,
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
