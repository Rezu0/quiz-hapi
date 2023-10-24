const Hapi = require('@hapi/hapi');
const JWT = require('jsonwebtoken');
const HapiJWT2 = require('hapi-auth-jwt2');
require('dotenv').config();
const routes = require('./src/routes');
const { connect } = require('./src/db/config');
const { findUser } = require('./src/users');

const secretKey = process.env.secret_key;

const validateToken = async (decoded, request, h) => {
  const { id, username } = decoded;

  const user = findUser(username);

  if (!user) {
    return { isValid: false };
  }

  return { isValid: true, credentials: decoded };
};

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
      },
    },
  });

  await server.register(HapiJWT2);

  server.auth.strategy('jwt', 'jwt', {
    key: secretKey,
    validate: validateToken,
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.auth.default('jwt');

  await connect();

  server.route(routes);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

init();
