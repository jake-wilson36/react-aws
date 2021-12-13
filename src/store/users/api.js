import axios from '../../../helpers/axiosutil';
export function getUsersApi() {
  // `axios` function returns promise, you can use any ajax lib, which can
  // return promise, or wrap in promise ajax call
  return axios.get('get-user-list');
};

export function addUsersApi(payload) {
  // `axios` function returns promise, you can use any ajax lib, which can
  // return promise, or wrap in promise ajax call
  return axios.post('add-update-user', payload);
};