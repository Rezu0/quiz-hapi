const JWT = require('jsonwebtoken');
const { client, dbName } = require('./db/config');
require('dotenv').config();

const findUser = async (user) => {
  const db = client.db(dbName);
  const collection = db.collection('users');

  try {
    const specificUser = await collection.findOne({ username: user });

    if (specificUser === null) {
      return {
        status: 404,
        message: 'Username tidak ditemukan',
        count: 0,
      };
    }

    return specificUser;
  } catch (err) {
    console.error('error find user', err);
    return err;
  }
};

const saveUser = async (newUser) => {
  const db = client.db(dbName);
  const collection = db.collection('users');

  try {
    const result = await collection.insertOne(newUser);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const userFromAuth = async (token) => {
  const secretKey = process.env.secret_key;
  const splitToken = token.split(' ');

  try {
    const decoded = JWT.verify(splitToken[1], secretKey);
    return decoded;
  } catch (err) {
    return err;
  }
};

module.exports = { saveUser, findUser, userFromAuth };
