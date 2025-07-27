import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../components/theme-context';

const LandingScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }] }>
      <Text style={[styles.title, { color: theme.text }]}>Welcome to Gemini Chatbot</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} color={theme.accent} />
      <View style={{ height: 16 }} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} color={theme.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40 },
});

export default LandingScreen; 