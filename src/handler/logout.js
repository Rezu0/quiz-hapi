const JWT = require('jsonwebtoken');
const { updateLogin } = require('./login');
require('dotenv').config();

const refreshToken = (user) => {
  const data = {
    id: user.id,
    username: user.username,
    name: user.name,
  };
  return JWT.sign(data, process.env.secret_key, { expiresIn: '5s' });
};

const logout = async (request, h) => {
  const token = request.headers.authorization;
  const secretKey = process.env.secret_key;
  const splitToken = token.split(' ');

  try {
    const decoded = JWT.verify(splitToken[1], secretKey);
    await updateLogin(decoded, false).then((res) => console.log(res))
      .catch((err) => console.error(err));

    const response = h.response({
      status: 'success',
      message: 'Berhasil logout',
      refreshToken: refreshToken(decoded),
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error('Kesalahan saat mendekode token:', error);
    return { error: 'Token tidak valid' };
  }
};

module.exports = { logout };
