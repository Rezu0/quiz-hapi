const Bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');
require('dotenv').config();
const { findUser } = require('../users');
const { client, dbName } = require('../db/config');

const createToken = (user) => {
  const data = {
    id: user.id,
    username: user.username,
    name: user.displayName,
  };
  return JWT.sign(data, process.env.secret_key, { expiresIn: '1d' });
};

const updateLogin = async (user, _isLogin) => {
  const db = client.db(dbName);
  const collection = db.collection('users');
  const query = { username: user.username };
  const dataUpdate = {
    $set: {
      isLogin: _isLogin,
      timeLogin: new Date().toISOString(),
    },
  };

  const updateUser = await collection.updateOne(query, dataUpdate);
  return updateUser;
};

const login = async (request, h) => {
  const { username, password } = request.payload;

  const user = await findUser(username);
  await updateLogin(user, true);

  if (user.username === username && await Bcrypt.compare(password, user.hashPass)) {
    const response = h.response({
      status: 'success',
      message: 'Login berhasil',
      data: {
        token: createToken(user),
        _user: {
          id: user.id,
          username: user.username,
          name: user.displayName,
          timeLogin: user.timeLogin,
        },
      },
    });
    response.code(200);
    return response;
  }

  return Boom.unauthorized('Username atau Password salah');
};

module.exports = { login, updateLogin };

// const login = async (request, h) => {
//   try {
//     const { username, password } = request.payload;
//     const user = await findUser(username);

//     if (user.username === username && await Bcrypt.compare(password, user.hashPass)) {
//       const userCredentials = { user: username };
//       request.cookieAuth.set(userCredentials);
//       return { status: true, user: userCredentials.user };
//     }
//     return { status: false, message: 'Login gagal, Username atau Password salah!' };
//   } catch (err) {
//     console.log(err);
//     return { status: false, message: 'Terjadi kesalahan' };
//   }
//   try {
//     if (username !== user.username) {
//       return { status: false, message: 'Username salah' };
//     }
//     if (!compare) {
//       return { status: false, message: 'Password salah' };
//     }
//     const userCredentials = { user: username };
//     request.cookieAuth.set(userCredentials);
//     return { status: true, user: userCredentials.user };
//   } catch (err) {
//     console.log(err);
//     return { status: false, message: err };
//   }
// };
