const { client, dbName } = require("./db/config");

const saveStudy = async (newData) => {
  const db = client.db(dbName);
  const collection = db.collection('studys');

  try {
    const result = await collection.insertOne(newData);
    console.log(result);
  } catch (err) {
    console.error('Error bro: ', err);
  }
};

module.exports = { saveStudy };
