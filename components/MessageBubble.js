import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './theme-context';

const MessageBubble = ({ message, isUser }) => {
  const theme = useTheme();
  return (
    <View style={[styles.bubble, isUser ? { backgroundColor: theme.userBubble, alignSelf: 'flex-end' } : { backgroundColor: theme.botBubble, alignSelf: 'flex-start' }] }>
      <Text style={[styles.text, { color: theme.text }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  text: {
    fontSize: 16,
  },
});

export default MessageBubble;
