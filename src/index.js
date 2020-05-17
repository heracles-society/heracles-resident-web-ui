import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

const rootElement = document.querySelector('.root');

const render = Component => {
  ReactDOM.render(
    <React.StrictMode>
      <Root>
        <App />
      </Root>
    </React.StrictMode>,
    rootElement,
  );
};

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./App', () => {
    const UpdatedApp = require('./App').default;
    render(UpdatedApp);
  });

  module.hot.accept('./Root', () => {
    const UpdatedRoot = require('./Root').default;
    ReactDOM.render(
      <React.StrictMode>
        <UpdatedRoot>
          <App />
        </UpdatedRoot>
      </React.StrictMode>,
      rootElement,
    );
  });
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
