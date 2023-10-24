const { nanoid } = require('nanoid');
const Bcrypt = require('bcrypt');
const { saveUser, findUser } = require('../users');

const generateHash = async (password) => {
  try {
    const saltRounds = 10;
    const hash = await Bcrypt.hash(password, saltRounds);

    return hash;
  } catch (err) {
    console.error('Hash ada yang error', err);
    return err;
  }
};

const register = async (request, h) => {
  const { username, displayName, password } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const hashPass = await generateHash(password);
  const isLogin = false;
  const timeLogin = insertedAt;

  const checkingUser = await findUser(username);

  if (checkingUser.count !== 0) {
    const response = h.response({
      status: 'fail',
      message: 'Username sudah ada',
    });
    response.code(400);
    return response;
  }

  if (!username) {
    const response = h.response({
      status: 'fail',
      message: `Tolong isi username terlebih dulu`,
    });
    response.code(400);
    return response;
  }

  if (!displayName) {
    const response = h.response({
      status: 'fail',
      message: `Tolong isi display name terlebih dulu`,
    });
    response.code(400);
    return response;
  }

  if (!password) {
    const response = h.response({
      status: 'fail',
      message: 'Tolong isi password terlebih dulu',
    });
    response.code(400);
    return response;
  }

  const newUser = {
    id,
    username,
    displayName,
    hashPass,
    isLogin,
    timeLogin,
    insertedAt,
    updatedAt,
  };

  saveUser(newUser);

  const response = h.response({
    status: 'success',
    message: 'user sudah dimasukan',
  });
  response.code(200);
  return response;
};

module.exports = { register };
