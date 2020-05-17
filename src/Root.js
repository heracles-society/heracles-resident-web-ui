import {ThemeProvider, useMediaQuery, CssBaseline} from '@material-ui/core';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

import history from './history';
import Store from './store';
import theme from './theme';

const Root = props => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const appTheme = React.useMemo(
    () => theme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  );

  return (
    <Provider store={Store.defaultStore}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Router history={history}>{props.children}</Router>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
