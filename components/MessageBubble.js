import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ message, isUser }) => {
  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.bot]}>
      <Text style={styles.text}>{message}</Text>
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
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#d0ebff',
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  text: {
    fontSize: 16,
  },
});

export default MessageBubble;
