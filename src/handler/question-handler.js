const { nanoid } = require("nanoid");
const { ObjectId } = require("mongodb");
const { saveQuestions } = require("../questions");
const { client, dbName } = require("../db/config");

const questionHandler = async (request, h) => {
  const { question, point, studyId } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const objectStudyId = new ObjectId(studyId);

  if (!question) {
    const response = h.response({
      status: 'fail',
      message: 'Tolong isi pertanyaan terlebih dulu',
    });
    response.code(400);
    return response;
  }

  if (!point) {
    const response = h.response({
      status: 'fail',
      message: 'Tolong isi point terlebih dulu',
    });
    response.code(400);
    return response;
  }

  if (!studyId) {
    const response = h.response({
      status: 'fail',
      message: 'Tolong pilih salah satu mata pelajaran',
    });
    response.code(400);
    return response;
  }

  const newQuestion = {
    id,
    question,
    point,
    objectStudyId,
    insertedAt,
    updatedAt,
  };

  await saveQuestions(newQuestion);

  const response = h.response({
    status: 'success',
    message: 'Question berhasil ditambahkan',
  });
  response.code(201);
  return response;
};

const questionAll = async (request, h) => {
  const db = client.db(dbName);
  const collection = db.collection('questions');

  try {
    const allQuestion = await collection.find().toArray();

    if (allQuestion.length === 0) {
      const response = h.response({
        status: 'success',
        message: 'Data quetion kosong',
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: 'success',
      message: 'Data question berhasil didapatkan',
      data: {
        question: allQuestion,
      },
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { questionHandler, questionAll };
