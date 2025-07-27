import axios from 'axios';
import { GEMINI_API_KEY } from '@env';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

export const fetchGeminiResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{ parts: [{ text: userMessage }] }],
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
