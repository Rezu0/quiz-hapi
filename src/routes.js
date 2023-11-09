const { ObjectId } = require('mongodb');
const { client, dbName } = require('./db/config');
const {
  answerHandler,
  userAnwerHandler,
  adminAllGetAnswer,
  userAllGetAnswer,
} = require('./handler/answer-handler');
const { login } = require('./handler/login');
const { logout } = require('./handler/logout');
const { questionHandler, questionAll } = require('./handler/question-handler');
const { register } = require('./handler/register');
const { studyHandler, studyAll } = require('./handler/study-handler');
const { aggregateUserAnswer } = require('./answer');
const { javDesuMosaic, javDesuCencored } = require('./handler/scrapping/feedJav');
const { igoDesu } = require('./handler/scrapping/feedIgo');

const routes = [
  {
    method: 'GET',
    path: '/db',
    handler: async (request, h) => {
      const db = client.db(dbName);
      const collection = db.collection('studys');

      try {
        const data = await collection.find({}).toArray();
        const response = h.response({
          status: 'success',
          message: 'Data test',
          data: {
            test: data,
          },
        });
        response.code(201);
        return response;
      } catch (err) {
        console.error('Ada kesalahan saat mengambil data', err);
        return err;
      }
    },
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/register',
    handler: register,
    options: {
      auth: false,
    },
  },
  {
    method: '*',
    path: '/register',
    handler: async (request, h) => {
      const response = h.response({
        status: 'fail',
        message: '405 Method Not Allowed.',
      });
      response.code(405);
      return response;
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return `Selamat datang, ${request.auth.credentials.user}`;
      }
      return { status: false, message: 'Anda tidak memiliki akses.' };
    },
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: login,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/logout',
    handler: logout,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'POST',
    path: '/study',
    handler: studyHandler,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/study',
    handler: studyAll,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'POST',
    path: '/question',
    handler: questionHandler,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/question',
    handler: questionAll,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'POST',
    path: '/answer',
    handler: answerHandler,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/answer',
    handler: adminAllGetAnswer,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'POST',
    path: '/user/{username}/answer',
    handler: userAnwerHandler,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/user/{username}/answer',
    handler: userAllGetAnswer,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/api/feed/javdesu/mosaic',
    handler: javDesuMosaic,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/api/feed/javdesu/cencored',
    handler: javDesuCencored,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/api/feed/igodesu',
    handler: igoDesu,
    options: {
      auth: false,
    },
  },
];

module.exports = routes;
