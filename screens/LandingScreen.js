import React from 'react';
import { View, Text, Button, StyleSheet, Switch, Platform } from 'react-native';
import { useTheme } from '../components/theme-context';

const GlassCard = ({ children, theme }) => (
  <View style={[
    styles.card,
    {
      backgroundColor: theme.mode === 'dark' ? 'rgba(35,35,42,0.7)' : 'rgba(255,255,255,0.6)',
      borderColor: theme.theme.border,
      shadowColor: theme.theme.accent,
    },
  ]}>
    {children}
  </View>
);

const LandingScreen = ({ navigation }) => {
  const { theme, mode, toggleTheme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }] }>
      <GlassCard theme={{ theme, mode }}>
        <Text style={[styles.title, { color: theme.text }]}>Welcome to Gemini Chatbot</Text>
        <View style={styles.spacer} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} color={theme.accent} />
        <View style={styles.spacer} />
        <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} color={theme.accent} />
        <View style={styles.spacer} />
        <View style={styles.row}>
          <Text style={{ color: theme.text, fontSize: 16, marginRight: 8 }}>
            {mode === 'dark' ? 'Dark' : 'Light'} Mode
          </Text>
          <Switch
            value={mode === 'dark'}
            onValueChange={toggleTheme}
            thumbColor={mode === 'dark' ? theme.accent : theme.card}
            trackColor={{ false: theme.border, true: theme.accent }}
          />
        </View>
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  spacer: { height: 18 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  card: {
    width: 320,
    padding: 32,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: 'center',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    marginBottom: 24,
    ...Platform.select({ android: { elevation: 6 } }),
    backdropFilter: 'blur(12px)', // for web
  },
});

export default LandingScreen; 