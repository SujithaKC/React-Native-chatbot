import React from 'react';
import { View, Text, Button, StyleSheet, Switch, Platform } from 'react-native';
import { useTheme } from '../components/theme-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GlassCard = ({ children, theme }) => (
  <View style={[
    styles.card,
    {
      backgroundColor: theme.mode === 'dark' ? 'rgba(35,35,42,0.7)' : 'rgba(255,255,255,0.7)',
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
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="chat-processing" size={64} color={theme.accent} />
        </View>
        <Text style={[styles.title, { color: theme.text }]}>Gemini Chatbot</Text>
        <Text style={[styles.subtitle, { color: theme.text, opacity: 0.7 }]}>Connect, chat, and explore AI conversations</Text>
        <View style={styles.spacer} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} color={theme.accent} />
        <View style={styles.spacerSmall} />
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
  iconWrap: { alignItems: 'center', marginBottom: 18 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8, textAlign: 'center', letterSpacing: 1 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 18 },
  spacer: { height: 22 },
  spacerSmall: { height: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  card: {
    width: 340,
    paddingVertical: 36,
    paddingHorizontal: 28,
    borderRadius: 32,
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
