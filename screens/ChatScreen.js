import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MessageBubble from '../components/MessageBubble';
import { fetchGeminiResponse } from '../utils/geminiApi';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const botReply = await fetchGeminiResponse(input);
    const botMessage = { text: botReply, isUser: false };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageBubble message={item.text} isUser={item.isUser} />
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
      />

      {loading && <ActivityIndicator size="small" color="#0000ff" style={{ marginBottom: 10 }} />}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginRight: 10,
  },
});

export default ChatScreen;
