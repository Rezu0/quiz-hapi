const { nanoid } = require("nanoid");
const { saveStudy } = require("../study");
const { client, dbName } = require("../db/config");

const studyHandler = async (request, h) => {
  const { study } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!study) {
    const response = h.response({
      status: 'fail',
      message: 'Tolong isi mata pelajaran terlebih dulu',
    });
    response.code(400);
    return response;
  }

  const newStudy = {
    id,
    study,
    insertedAt,
    updatedAt,
  };

  await saveStudy(newStudy);

  const response = h.response({
    status: 'success',
    message: 'Mata pelajaran berhasil ditambahkan',
  });
  response.code(200);
  return response;
};

const studyAll = async (request, h) => {
  const db = client.db(dbName);
  const collection = db.collection('studys');

  try {
    const allStudy = await collection.find().toArray();

    if (allStudy.length === 0) {
      const response = h.response({
        status: 'success',
        message: 'Data mata pelajaran kosong',
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: 'success',
      message: 'Data mata pelajaran berhasil didapatkan',
      data: {
        study: allStudy,
      },
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { studyHandler, studyAll };
