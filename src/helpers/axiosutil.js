import axios from 'axios';
let without_auth_urls = ['login', 'ForgotPassword'];
const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'https://nfsips.in/rest/api/v1/' : "https://nfsips.in/rest/api/v1/";
axios.interceptors.request.use(config => {
  config.headers.common.crossDomain = true;
  if (!without_auth_urls.includes(config.url)) {
    var token = localStorage.getItem(btoa(btoa('token')));
    config.headers.common['Authorization'] = "Bearer " + atob(atob(token));
  }
  config.url = API_BASE_URL + config.url;
  return config;
});
export default {
  API_BASE_URL: API_BASE_URL,
  post(uri, requestData, cancelToken = null) {
    return new Promise((resolve, reject) => {
      showLoader(1)
      axios.post(uri, requestData, cancelToken)
        .then(function (response) {
          showLoader(0)
          if (checkToken(response.data))
            resolve(response.data);
        })
        .catch(function (error) {
          showLoader(0)
          reject(error);
        });
    });
  },
  put(uri, requestData, cancelToken = null) {
    return new Promise((resolve, reject) => {
      showLoader(1)
      axios.put(uri, requestData, cancelToken)
        .then(function (response) {
          showLoader(0)
          if (checkToken(response.data))
            resolve(response.data);
        })
        .catch(function (error) {
          showLoader(0)
          reject(error);
        });
    });
  },
  get(uri, cancelToken = null) {
    return new Promise((resolve, reject) => {
      showLoader(1)
      axios.get(uri, cancelToken)
        .then(function (response) {
          showLoader(0)
          if (checkToken(response.data))
            resolve(response.data);
        })
        .catch(function (error) {
          showLoader(0)
          reject(error);
        });
    });
  },
  delete(uri, cancelToken = null) {
    return new Promise((resolve, reject) => {
      showLoader(1)
      axios.delete(uri, cancelToken)
        .then(function (response) {
          showLoader(0)
          if (checkToken(response.data))
            resolve(response.data);
        })
        .catch(function (error) {
          showLoader(0)
          reject(error);
        });
    });
  },
  showLoader : showLoader
};

function getKeys(name, url) {
  name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(url)
  if (name)
    return decodeURIComponent(name[1]);
}


function showLoader(is_show) {
  if (document.getElementById('app-loader')) {
    if (is_show) {
      return document.getElementById('app-loader').style.display = "block";
    } else {
      return document.getElementById('app-loader').style.display = "none";
    }
  }
}

//logout if access token is expired 
function checkToken(response) {
  if (response && response.res === 0 && response.StatusCode === 400) {
    axios.get('Logout').then((response) => {
      localStorage.clear();
      window.location.href = `${window.location.origin}`;
    });
  } else {
    return true;
  }
}