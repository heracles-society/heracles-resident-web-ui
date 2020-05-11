import {useMediaQuery, ThemeProvider, CssBaseline} from '@material-ui/core';
import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './routes';
import theme from './theme';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const appTheme = React.useMemo(
    () => theme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <CssBaseline />
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
