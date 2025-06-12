require('dotenv').config();
const path = require('path');
// process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const { VertexAI } = require('@google-cloud/vertexai');

const vertexAi = new VertexAI({
  project: process.env.GOOGLE_PROJECT_ID,
  location: 'us-central1',
});
console.log('project:', process.env.GOOGLE_PROJECT_ID);

async function getAIResponse(prompt) {
  try {
    const model = vertexAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 256,
      },
    });

    return result.response.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
  } catch (error) {
    console.error('VertexAI Error:', error);
    throw error;
  }
}

module.exports = { getAIResponse };
