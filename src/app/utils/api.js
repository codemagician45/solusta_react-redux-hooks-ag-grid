/**
 * Description: Api creater
 * Date: 12/12/2019
 */

import axios from 'axios';

// import env server link
const environment = require('../main/apps/registration/RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

let baseURL = '/api';

export const xapi = () => {

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`,
    'Content-Type': 'application/json',
  }

  const xapi = axios.create({
    baseURL: SERVER_LINK + baseURL,
    headers: headers
  });

  return xapi;
};