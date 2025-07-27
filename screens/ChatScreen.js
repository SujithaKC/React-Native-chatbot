import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MessageBubble from '../components/MessageBubble';
import { fetchGeminiResponse } from '../utils/geminiApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../utils/firebase';
import { useTheme } from '../components/theme-context';

const getChatKey = (uid) => `chat_history_${uid}`;

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const { theme } = useTheme();

  // Load chat history for current user
  useEffect(() => {
    const loadMessages = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigation.replace('Login');
        return;
      }
      try {
        const saved = await AsyncStorage.getItem(getChatKey(user.uid));
        if (saved) setMessages(JSON.parse(saved));
      } catch (e) {
        Alert.alert('Error', 'Failed to load chat history.');
      } finally {
        setInitializing(false);
      }
    };
    loadMessages();
  }, []);

  // Save chat history on messages change
  useEffect(() => {
    const saveMessages = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        await AsyncStorage.setItem(getChatKey(user.uid), JSON.stringify(messages));
      } catch (e) {
        // Optionally handle save error
      }
    };
    if (!initializing) saveMessages();
  }, [messages, initializing]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const botReply = await fetchGeminiResponse(input);
      const botMessage = { text: botReply, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      Alert.alert('Error', 'Failed to get response from Gemini.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(getChatKey(auth.currentUser.uid));
      await auth.signOut();
      navigation.replace('Login');
    } catch (e) {
      Alert.alert('Logout Error', e.message);
    }
  };

  if (initializing) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.accent} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ✅ Disclaimer for mental health support */}
      <Text
        style={{
          color: 'gray',
          fontSize: 12,
          margin: 10,
          textAlign: 'center',
        }}
      >
        This chatbot provides supportive conversation but is not a substitute
        for professional mental health care. If you are in crisis, please
        contact a mental health professional or helpline.
      </Text>

      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageBubble message={item.text} isUser={item.isUser} />
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
      />

      {loading && (
        <ActivityIndicator
          size="small"
          color={theme.accent}
          style={{ marginBottom: 10 }}
        />
      )}

      <View
        style={[
          styles.inputContainer,
          { borderColor: theme.border, backgroundColor: theme.card },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor={theme.border}
        />
        <Button title="Send" onPress={handleSend} color={theme.accent} />
        <Button title="Logout" onPress={handleLogout} color={theme.error} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default ChatScreen;
