const { ObjectId } = require("mongodb");
const { client, dbName } = require("./db/config");

const saveAnswer = async (newAnswer) => {
  const db = client.db(dbName);
  const collection = db.collection('answers');

  try {
    const result = await collection.insertMany(newAnswer);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const findDuplicate = async (IdDuplicate) => {
  const db = client.db(dbName);
  const collection = db.collection('answers');

  try {
    const result = await collection.find({ objectQuestionId: new ObjectId(IdDuplicate) }).toArray();
    return result;
  } catch (err) {
    return err;
  }
};

const saveAnswerUser = async (newAnswerUser) => {
  const db = client.db(dbName);
  const collection = db.collection('answersUser');

  try {
    const result = await collection.insertOne(newAnswerUser);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

// ini untuk melihat all data jawaban yang admin masukan
const aggregateAnswer = async () => {
  const db = client.db(dbName);
  const collection = db.collection('answers');

  try {
    const pipeLine = [
      {
        $lookup: {
          from: 'questions',
          localField: 'objectQuestionId',
          foreignField: '_id',
          as: 'questionData',
        },
      },
      {
        $unwind: '$questionData',
      },
      {
        $lookup: {
          from: 'studys',
          localField: 'questionData.objectStudyId',
          foreignField: '_id',
          as: 'studyData',
        },
      },
    ];
    const getAnswer = await collection.aggregate(pipeLine).toArray();
    return getAnswer;
  } catch (err) {
    return err;
  }
};

// ini untuk pengecekan jawaban user
const aggregateUserAnswer = async (usernameParam) => {
  const db = client.db(dbName);
  const collectionAnswerUser = db.collection('answersUser');
  const collectionUsers = db.collection('users');

  try {
    const usersId = await collectionUsers.find({ username: usernameParam }).toArray();
    const pipeLine = [
      {
        $match: {
          userId: usersId[0]._id,
        },
      },
      {
        $lookup: {
          from: 'answers',
          localField: 'answerId',
          foreignField: '_id',
          as: 'answerData',
        },
      },
      {
        $lookup: {
          from: 'questions',
          localField: 'questionId',
          foreignField: '_id',
          as: 'questionsData',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userData',
        },
      },
    ];
    const result = await collectionAnswerUser.aggregate(pipeLine).toArray();
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  saveAnswer,
  findDuplicate,
  saveAnswerUser,
  aggregateAnswer,
  aggregateUserAnswer,
};
