import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light';
export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void; isDark: boolean }>({
  theme: 'dark', toggleTheme: () => {}, isDark: true,
});
export const useTheme = () => useContext(ThemeContext);
