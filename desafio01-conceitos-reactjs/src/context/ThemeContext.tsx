import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContext {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storagedTheme = localStorage.getItem('@Challenge01:theme');

    if (!storagedTheme) {
      localStorage.setItem('@Challenge01:theme', 'light');
      return 'light';
    }

    return storagedTheme;
  });

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    localStorage.setItem('@Challenge01:theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used whitin ThemeProvider');
  }

  return context;
}
