// memory/longTermMemory.js
const { getDB } = require("../db/mongoClient");

const MAX_LTM_LENGTH = 20;

async function saveToLongTermMemory(userId, message) {
  const db = await getDB();
  const collection = db.collection("longTermMemory");

  await collection.insertOne({
    userId,
    message,
    timestamp: new Date(),
  });

  // Sliding window: keep only latest MAX_LTM_LENGTH
  const userMessages = await collection
    .find({ userId })
    .sort({ timestamp: -1 })
    .skip(MAX_LTM_LENGTH)
    .toArray();

  const idsToDelete = userMessages.map((doc) => doc._id);
  if (idsToDelete.length > 0) {
    await collection.deleteMany({ _id: { $in: idsToDelete } });
  }
}

async function getFormattedLongTermMemory(userId) {
  const db = await getDB();
  const messages = await db
    .collection("longTermMemory")
    .find({ userId })
    .sort({ timestamp: 1 })
    .toArray();

  return messages
    .map((msg, i) => `User (LTM ${i + 1}): ${msg.message}`)
    .join("\n");
}

module.exports = {
  saveToLongTermMemory,
  getFormattedLongTermMemory,
};
