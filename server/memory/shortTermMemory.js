// memory/shortTermMemory.js
const memoryMap = new Map();
const MAX_STM_LENGTH = 5;

function addMessageToMemory(userId, message) {
  let messages = memoryMap.get(userId) || [];
  messages.push(message);
  if (messages.length > MAX_STM_LENGTH) messages.shift();
  memoryMap.set(userId, messages);
}

function getFormattedShortTermMemory(userId) {
  const stm = memoryMap.get(userId) || [];
  return stm.map((msg, i) => `User (STM ${i + 1}): ${msg}`).join("\n");
}

module.exports = {
  addMessageToMemory,
  getFormattedShortTermMemory,
};
