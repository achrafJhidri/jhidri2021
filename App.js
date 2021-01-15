import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation/navigation.component'
import { ThemeContext } from './theme-context';
import { default as Colortheme } from './theme.json'; 
import { Provider } from 'react-redux';
import Store from './src/store/config';

export default () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <Provider store={ Store }>
        <IconRegistry icons={EvaIconsPack}/>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ApplicationProvider {...eva} theme={{...eva[theme], ...Colortheme}}>
            <AppNavigator/>
          </ApplicationProvider>
        </ThemeContext.Provider>
        </Provider>
    </>
  );
};