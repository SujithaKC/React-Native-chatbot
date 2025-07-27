import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import ChatScreen from './screens/ChatScreen';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { lightTheme, darkTheme } from './components/theme';
import { ThemeContext } from './components/theme-context';

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? darkTheme : lightTheme), [colorScheme]);

  return (
    <ThemeContext.Provider value={theme}>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              title: 'Gemini Chat',
              headerLeft: () => null,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
