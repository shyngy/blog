import axios from 'axios';
import config, { getCookie } from './config';
import { UserState } from '../store/types';
import { SignInUser, SignUpUser } from './types';

export function signUp(user: SignUpUser) {
  return axios
    .post(`${config.url}/users`, {
      user,
    })
    .then((response) => response.data)
    .catch((data) => {
      throw data.response.data;
    });
}

export function signIn(user: SignInUser) {
  return axios
    .post(`${config.url}/users/login`, {
      user,
    })
    .then((response) => response.data)
    .catch((data) => {
      throw data.response.data;
    });
}

export function editProfile(user: SignUpUser) {
  return axios
    .put(
      `${config.url}/user`,
      {
        user,
      },
      {
        headers: { authorization: `Bearer ${getCookie('token')}` },
      },
    )
    .then((response) => response.data)
    .catch((data) => {
      throw data.response.data;
    });
}

export function getMe() {
  return axios
    .get(`${config.url}/user`, {
      headers: { authorization: `Bearer ${getCookie('token')}` },
    })
    .then<{ user: UserState }>((response) => response.data)
    .catch((data) => {
      throw data.response.data;
    });
}
