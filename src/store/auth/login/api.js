import axios from '../../../helpers/axiosutil';
export function login(payload) {
  // `axios` function returns promise, you can use any ajax lib, which can
  // return promise, or wrap in promise ajax call
  try {
    return axios.post('login', payload);
  } catch (error) {
    console.log(error)
  }

};