import axios from 'axios';
import {useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import {appID, baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setloading] = useState(false);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, [update]);

  const loadMedia = async () => {
    try {
      const mediaIlmanThumbnailia = await useTag().getFilesByTag(appID);
      const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log('loadMedia', e.message);
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadSingleMedia', e.message);
      return {};
    }
  };

  const uploadMedia = async (formData, token) => {
    try {
      setloading(true);
      const options = {
        method: 'POST',
        headers: {'x-access-token': token},
        data: formData,
      };
      const result = await axios(baseUrl + 'media/', options);
      console.log('axios', result.data);
      if (result.data) {
        setUpdate(update + 1);
        return result.data;
      }
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setloading(false);
    }
  };

  return {
    mediaArray,
    loading,
    loadMedia,
    loadSingleMedia,
    uploadMedia,
  };
};

const useLogin = () => {
  const login = async (userCredentials) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try {
      const loginResponse = await doFetch(baseUrl + 'login', requestOptions);
      return loginResponse;
    } catch (error) {
      console.log('login error', error.message);
    }
  };
  return {login};
};

const useUser = () => {
  const checkToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const userInfo = await doFetch(baseUrl + 'users/user', options);
      return userInfo;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  const checkUsernameAvailable = async (username) => {
    try {
      const usernameInfo = await doFetch(
        baseUrl + 'users/username/' + username
      );
      return usernameInfo.available;
    } catch (error) {
      console.log('checkUsername error', error);
    }
  };

  const register = async (userCredentials) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try {
      const registerResponse = await doFetch(baseUrl + 'users', requestOptions);
      return registerResponse;
    } catch (error) {
      console.log('register error', error.message);
    }
  };

  return {checkToken, register, checkUsernameAvailable};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'tags/' + tag);
      return tiedosto;
    } catch (e) {
      console.log('getFilesByTag', e.message);
      return {};
    }
  };

  return {getFilesByTag};
};

// eslint-disable-next-line camelcase
const addTag = async (file_id, tag, token) => {
  const options = {
    method: 'POST',
    headers: {'x-access-token': token, 'Content-Type': 'application/json'},
    body: JSON.stringify({file_id, tag}),
  };
  try {
    const tagInfo = await doFetch(baseUrl + 'tag', options);
    return tagInfo;
  } catch (e) {
    throw new Error(e.message);
  }
};

export {useMedia, useLogin, useUser, useTag, addTag};
