/* eslint-disable no-console */
import {APP_NAME} from './constants';

const LOG_ENABLED = process.env.NODE_ENV === 'development';

export const logError = (message, {label = APP_NAME} = {}) => {
  if (LOG_ENABLED) {
    console.groupCollapsed(
      `%c ERROR %c ${label} %c (╯°□°）╯︵ ┻━┻ `,
      'background-color: #f00; color: #fff; padding: 2px; font-weight: bold;',
      'background-color: #fcc; padding: 2px;',
      'background-color: #f00; color: #fff; padding: 2px; font-weight: bold;',
    );
    console.log(message);
    console.groupEnd();
  }
};

export const logWarn = (message, {label = APP_NAME} = {}) => {
  if (LOG_ENABLED) {
    console.groupCollapsed(
      `%c WARNING %c ${label} %c -_- `,
      'background-color: #f90; color: #fff; padding: 2px; font-weight: bold;',
      'background-color: #ffe0b2; padding: 2px;',
      'background-color: #f90; color: #fff; padding: 2px; font-weight: bold;',
    );
    console.log(message);
    console.groupEnd();
  }
};

export const logSuccess = (message, {label = APP_NAME} = {}) => {
  if (LOG_ENABLED) {
    console.groupCollapsed(
      `%c SUCCESS %c ${label} %c ^‿^ `,
      'background-color: #388e3c; color: #fff; padding: 2px; font-weight: bold;',
      'background-color: #a5d6a7; padding: 2px;',
      'background-color: #388e3c; color: #fff; padding: 2px; font-weight: bold;',
    );
    console.log(message);
    console.groupEnd();
  }
};
