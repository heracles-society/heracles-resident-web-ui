import {useMediaQuery, ThemeProvider, CssBaseline} from '@material-ui/core';
import React from 'react';

import './App.css';

import theme from './theme';
import SelectSociety from './views/SelectSociety';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const appTheme = React.useMemo(
    () => theme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <SelectSociety />
    </ThemeProvider>
  );
}

export default App;
