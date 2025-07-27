import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './theme-context';

const MessageBubble = ({ message, isUser }) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.bubble,
        {
          backgroundColor: isUser ? theme.userBubble : theme.botBubble,
          alignSelf: isUser ? 'flex-end' : 'flex-start',
          borderTopRightRadius: isUser ? 4 : 12,
          borderTopLeftRadius: isUser ? 12 : 4,
        },
      ]}
    >
      <Text style={[styles.text, { color: theme.text }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 14,
    marginVertical: 7,
    marginHorizontal: 14,
    borderRadius: 14,
    maxWidth: '80%',
    minWidth: 60,
  },
  text: {
    fontSize: 16,
  },
});

export default MessageBubble;
