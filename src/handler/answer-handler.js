const { ObjectId } = require("mongodb");
const { nanoid } = require("nanoid");
const {
  saveAnswer,
  findDuplicate,
  saveAnswerUser,
  aggregateAnswer,
  aggregateUserAnswer,
} = require("../answer");
const { userFromAuth } = require("../users");

const answerHandler = async (request, h) => {
  const dataRaw = request.payload;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const arrayEmpty = [];
  const checkingAnswerDuplicate = await findDuplicate(dataRaw[0].objectQuestionId);

  if (dataRaw.length !== 4) {
    const response = h.response({
      status: 'fail',
      message: 'Total data jawaban harus 4',
    });
    response.code(400);
    return response;
  }

  if ((checkingAnswerDuplicate.length === 4)) {
    return {
      status: 'fail',
      message: 'Jawaban dipertanyaan ini sudah ada',
    };
  }

  try {
    const finalArray = dataRaw.map((data) => {
      if (!data.optionsText) {
        return {
          status: 'fail',
          message: 'Options Text wajib diisi',
        };
      }
      if (!data.isCorrect) {
        return {
          status: 'fail',
          message: 'Apa Options Text ini benar? Jika benar isi true',
        };
      }
      if (!data.objectQuestionId) {
        return {
          status: 'fail',
          message: 'Pilih pertanyaan yang sesuai',
        };
      }

      const id = nanoid(16);
      const objectQuestionId = new ObjectId(data.objectQuestionId);
      data.objectQuestionId = objectQuestionId;
      const newAnswer = {
        id,
        optionsText: data.optionsText,
        isCorrect: data.isCorrect,
        objectQuestionId: data.objectQuestionId,
        insertedAt,
        updatedAt,
      };
      return newAnswer;
    });

    arrayEmpty.push(finalArray);
    const hasFailStatus = finalArray.filter((data) => data.status === 'fail');
    if (hasFailStatus.length !== 0) {
      return hasFailStatus;
    }
    saveAnswer(arrayEmpty[0]);
    return {
      status: 'success',
      message: 'Jawaban berhasil ditambahkan',
    };
  } catch (err) {
    return err;
  }
};

const userAnwerHandler = async (request, h) => {
  const token = request.headers.authorization;
  const {
    optionsText,
    answerId,
    questionId,
    userId,
  } = request.payload;
  const { username } = request.params;
  const decoded = await userFromAuth(token);
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const convertAnswerId = new ObjectId(answerId);
  const convertQuestionId = new ObjectId(questionId);
  const convertUserId = new ObjectId(userId);

  // validasi user, apakah token dan di params sesuai
  if (username !== decoded.username) {
    const response = h.response({
      status: 'fail',
      message: 'Maaf anda tidak cocok dengan pengguna ini',
    });
    response.code(400);
    return response;
  }

  // validasi inputan user
  if (!optionsText && !answerId && !questionId && !userId) {
    const response = h.response({
      status: 'fail',
      message: 'Tolong dilengkapi semuanya',
    });
    response.code(400);
    return response;
  }

  const userAnswer = {
    id,
    optionsText,
    answerId: convertAnswerId,
    questionId: convertQuestionId,
    userId: convertUserId,
    insertedAt,
    updatedAt,
  };

  await saveAnswerUser(userAnswer);

  const response = h.response({
    status: 'success',
    message: 'Jawaban berhasil ditambahkan',
  });
  response.code(200);
  return response;
};

const adminAllGetAnswer = async (request, h) => {
  const response = h.response({
    status: 'success',
    message: 'Data Answer didapatkan',
    data: {
      answer: await aggregateAnswer(),
    },
  });
  response.code(200);
  return response;
};

const userAllGetAnswer = async (request, h) => {
  const { username } = request.params;
  const token = request.headers.authorization;
  const decoded = await userFromAuth(token);

  if (username !== decoded.username) {
    const response = h.response({
      status: 'fail',
      message: 'Maaf anda tidak cocok dengan pengguna ini',
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'Data jawaban User berhasil didapatkan',
    data: {
      answerUser: await aggregateUserAnswer(username),
    },
  });
  response.code(200);
  return response;
};

module.exports = {
  answerHandler,
  userAnwerHandler,
  adminAllGetAnswer,
  userAllGetAnswer,
};
