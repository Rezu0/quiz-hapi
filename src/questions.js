const { client, dbName } = require("./db/config");

const saveQuestions = async (newQuestion) => {
  const db = client.db(dbName);
  const collection = db.collection('questions');

  try {
    const result = await collection.insertOne(newQuestion);
    console.log(result);
  } catch (err) {
    console.error('Error bro: ', err);
  }
};

module.exports = { saveQuestions };
