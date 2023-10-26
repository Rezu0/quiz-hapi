const { nanoid } = require("nanoid");
const { ObjectId } = require("mongodb");
const Joi = require('@hapi/joi');
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
  const { studyId } = request.query;
  const objectIdSchema = Joi.string().length(24).hex();
  const { error } = objectIdSchema.validate(studyId);

  if (error) {
    return h.response({ error: 'Maaf tidak ada yang cocok apa yang anda maksud' }).code(400);
  }

  try {
    if (studyId) {
      const pipeline = [
        {
          $match: {
            objectStudyId: new ObjectId(studyId),
          },
        },
        {
          $lookup: {
            from: 'studys',
            localField: 'objectStudyId',
            foreignField: '_id',
            as: 'studyData',
          },
        },
      ];
      const aggregateQuestion = await collection.aggregate(pipeline).toArray();
      // untuk cek apakah kosong atau tidak
      if (aggregateQuestion.length === 0) {
        const response = h.response({
          status: 'success',
          message: 'Data quetion kosong',
        });
        response.code(200);
        return response;
      }
      // ini response ketika berhasil mendapatkan data dan tidak kosong
      const response = h.response({
        status: 'success',
        message: 'Data berhasil didapatkan',
        data: aggregateQuestion,
      });
      response.code(200);
      return response;
    }
    // pipeline ketika tidak memakai query studyId di path url
    const pipeline = [
      {
        $lookup: {
          from: 'studys',
          localField: 'objectStudyId',
          foreignField: '_id',
          as: 'studyData',
        },
      },
    ];
    const aggregateQuestion = await collection.aggregate(pipeline).toArray();
    if (aggregateQuestion.length === 0) {
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
        question: aggregateQuestion,
      },
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { questionHandler, questionAll };
