# Mental Health Chatbot (React Native + Gemini API)

This is a React Native app built with Expo that provides a supportive mental health chatbot experience using Google's Gemini API.

## Features
- Empathetic, supportive mental health chatbot
- User authentication (login/signup)
- Persistent chat history per user
- Light/Dark theme toggle
- Disclaimer and crisis support message

## How It Works
- The chatbot uses a system prompt to ensure all responses are supportive and mental health-focused.
- User messages are sent to the Gemini API, and responses are displayed in a chat interface.
- Chat history is saved locally for each user.

## Setup
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd gemini-chatbot-expo
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file with your Gemini API key:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```
4. **Start the app:**
   ```sh
   npx expo start
   ```

## Customization
- To change the system prompt or chatbot behavior, edit `utils/geminiApi.js`.
- To update the disclaimer or UI, edit `screens/ChatScreen.js` and `screens/LandingScreen.js`.

## Disclaimer
This chatbot provides supportive conversation but is not a substitute for professional mental health care. If you are in crisis, please contact a mental health professional or helpline.

