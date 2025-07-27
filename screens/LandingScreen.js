import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LandingScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to Gemini Chatbot</Text>
    <Button title="Login" onPress={() => navigation.navigate('Login')} />
    <View style={{ height: 16 }} />
    <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40 },
});

export default LandingScreen; 