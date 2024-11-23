import React, {createContext, useContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState({
    isDarkMode: colorScheme === 'dark',
    backgroundStyle: {
      backgroundColor: colorScheme === 'dark' ? Colors.darker : Colors.lighter,
    },
    textStyle: {
      color: colorScheme === 'dark' ? Colors.lighter : Colors.darker,
    },
  });

  useEffect(() => {
    setTheme({
      isDarkMode: colorScheme === 'dark',
      backgroundStyle: {
        backgroundColor:
          colorScheme === 'dark' ? Colors.darker : Colors.lighter,
      },
      textStyle: {
        color: colorScheme === 'dark' ? Colors.lighter : Colors.darker,
      },
    });
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
