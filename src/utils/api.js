import axios from 'axios';
import merge from 'lodash/merge';
import {stringify} from 'qs';

import {BASE_API, AUTH_KEY} from './constants';
import {loadData} from './localStorage';
import {logError} from './logger';

class APIException extends Error {}

const getAPIDefaults = () => {
  return {
    baseURL: BASE_API,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
    },
    params: {},
    paramsSerializer: function (params) {
      return stringify(params, {arrayFormat: 'brackets'});
    },
    data: {},
    timeout: 180000, // 3 minutes
    withCredentials: false,
    /*
     * For HTTP Basic Authorization Header,
     * For Bearer Token, use Authorization in headers
     */
    auth: {
      // username: "admin",
      // password: "admin",
    },
    responseType: 'json',
    responseEncoding: 'utf8',
    /*
     * By default, as our API's do
     * we return 200 for all requests.
     */
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
  };
};

export const callAPI = async (url, method, options = {}) => {
  const {
    headers: defaultHeaders,
    params: defaultParams,
    ...defaults
  } = getAPIDefaults();
  const {headers, params} = options;
  const _headers = merge(defaultHeaders, headers);
  const _params = merge(defaultParams, params);
  const authorizationKey = loadData(AUTH_KEY);
  if (authorizationKey && !_headers.Authorization) {
    _headers['Authorization'] = `Bearer ${authorizationKey}`;
  }

  const config = merge(defaults, options);
  const res = axios({
    ...config,
    headers: _headers,
    params: _params,
    url: url,
    method: method,
  });

  res.catch(error => {
    if (!(error instanceof APIException)) {
      throw new APIException(error.toJSON().message);
    }
    console.groupCollapsed('Request failed');
    logError('Operation failed at ');
    console.error(error);
    console.log(error.toJSON());
    console.groupEnd();
    throw new APIException('Operation Failed!');
  });

  return res;
};

export const getAPI = (url, options) => {
  return callAPI(url, 'GET', options);
};

export const deleteAPI = (url, options) => {
  return callAPI(url, 'DELETE', {
    ...options,
  });
};

export const postAPI = (url, body, options = {}) => {
  return callAPI(url, 'POST', {
    ...options,
    data: body,
  });
};

export const patchAPI = (url, body, options = {}) => {
  return callAPI(url, 'PATCH', {
    ...options,
    data: body,
  });
};

export const putAPI = (url, body, options = {}) => {
  return callAPI(url, 'PUT', {
    ...options,
    data: body,
  });
};
