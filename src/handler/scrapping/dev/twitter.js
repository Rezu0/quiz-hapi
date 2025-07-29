const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const https = require('https'); // Gunakan 'https' bukan 'http' karena URL menggunakan HTTPS
require('dotenv').config();

const scrapeTwitter = async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: true }); // Set headless: false untuk melihat browser berjalan
  const page = await browser.newPage();

  const url = 'https://x.com/youkosozitsu/status/1815945003719614882';
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('article');

  const tweetData = await page.evaluate(() => {
    const tweetElement = document.querySelector('article');
    const tweetText = tweetElement.innerText;
    const tweetImages = Array.from(tweetElement.querySelectorAll('img')).map((img) => img.src);
    return {
      text: tweetText,
      images: tweetImages,
    };
  });

  // Close the browser
  await browser.close();

  return tweetData;
};

const twitterScrapping = async (request, h) => {
  try {
    const options = {
      rejectUnauthorized: false,
    };
    const agent = new https.Agent(options); // Ubah dari 'http' ke 'https'
    const res = await fetch(`https://x.com/kamujelekhehe`, { agent });
    if (!res.ok) {
      throw new Error('Gagal mendapatkan data dari server');
    }
    const dataTwitter = await res.text();
    const $ = cheerio.load(dataTwitter);

    // Contoh untuk mengambil beberapa elemen dari halaman
    const title = $('body').text(); // Mengambil teks dari elemen <title>
    const metas = $('meta').map((index, element) => $(element).attr('content')).get(); // Mengambil konten dari semua elemen <meta>

    await scrapeTwitter().then((data) => {
      console.log(data);
    }).catch((err) => {
      console.error(err);
    });

    const response = h.response({
      status: 'success',
      message: 'API Feed Igodesu',
      data: {
        html: dataTwitter,
        data: title,
      },
    });
    response.code(200);
    return response;
  } catch (err) {
    const response = h.response({
      status: 'error',
      message: err.message,
    });
    response.code(500);
    return response;
  }
};

module.exports = { twitterScrapping };
