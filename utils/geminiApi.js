// System prompt for mental health chatbot
const SYSTEM_PROMPT = `
You are a supportive mental health chatbot. Respond with empathy, encouragement, and helpful advice for mental well-being. 
Do not give medical diagnoses or replace professional help. If a user is in crisis, encourage them to reach out to a mental health professional or helpline.
`;
import axios from 'axios';
import { GEMINI_API_KEY } from '@env';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

export const fetchGeminiResponse = async (userMessage) => {
  // Prepend the system prompt to the user message
  const prompt = `${SYSTEM_PROMPT}\nUser: ${userMessage}`;
  try {

    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error?.response?.data || error.message);
    return 'Sorry, I could not get a response from Gemini.';
  }
};
