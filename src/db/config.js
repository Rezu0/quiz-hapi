const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = 'quiz';

const client = new MongoClient(uri);

const connect = async () => {
  try {
    await client.connect();
    console.log('Berhasil terhubung ke db');
  } catch (err) {
    console.error(`Ada kesalahan saat terhubung: ${err}`);
  }
};

module.exports = { connect, client, dbName };
