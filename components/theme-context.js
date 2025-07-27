import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './theme';

const THEME_KEY = 'app_theme_mode';

export const ThemeContext = createContext({
  theme: lightTheme,
  mode: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') {
        setMode(stored);
        setTheme(stored === 'dark' ? darkTheme : lightTheme);
      } else {
        const sys = Appearance.getColorScheme();
        setMode(sys === 'dark' ? 'dark' : 'light');
        setTheme(sys === 'dark' ? darkTheme : lightTheme);
      }
    })();
  }, []);

  const toggleTheme = useCallback(async () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setTheme(newMode === 'dark' ? darkTheme : lightTheme);
    await AsyncStorage.setItem(THEME_KEY, newMode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 