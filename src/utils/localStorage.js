import {logSuccess, logError} from './logger';

export const LOAD_DATA = '[localstorage] load_data';
export const SAVE_DATA = '[localstorage] save_data';

export const saveData = (name = 'store', data, log = false) => {
  try {
    const existingData = loadData(name) || {};
    const serializedData = JSON.stringify({...existingData, ...data});
    localStorage.setItem(name, serializedData);
    log &&
      logSuccess(`Data saved to local storage for ${name}`, {label: SAVE_DATA});
  } catch (e) {
    log &&
      logError(
        `Data could not be saved to local storage for ${name}: ${e.message} `,
        {
          label: SAVE_DATA,
        },
      );
  }
};

export const loadData = (name = 'store', log = false) => {
  try {
    const serializedData = localStorage.getItem(name);
    const data = JSON.parse(serializedData);
    log &&
      logSuccess(`Data loaded from local storage for ${name}`, {
        label: LOAD_DATA,
      });
    return data;
  } catch (e) {
    log &&
      logError(
        `Data could not be loaded from local storage for ${name}: ${e.message} `,
        {
          label: LOAD_DATA,
        },
      );
  }
};
