import React, { createContext, useContext } from 'react';
import { lightTheme } from './theme';

export const ThemeContext = createContext(lightTheme);
export const useTheme = () => useContext(ThemeContext); 