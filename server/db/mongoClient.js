// db/mongoClient.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getDB() {
  if (!client.isConnected) await client.connect();
  return client.db("chatbotDB");
}

module.exports = { getDB };
