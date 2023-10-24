const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
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
