import {useEffect, useState} from 'react';
import {dofetch} from '../utils/http';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, []);

  const loadMedia = async () => {
    try {
      /* const response = await fetch(baseUrl + 'media'); */
      const mediaIlmanThumbnailia = await dofetch(baseUrl + 'media');
      const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log(e.message());
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const tiedosto = await dofetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadSingleMedia', e.message);
      return {};
    }
  };

  return {mediaArray, loadSingleMedia, loadMedia};
};

const useLogin = () => {
  const login = async (userCredentials) => {
    const requistOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: userCredentials,
    };
    try {
      const loginResponse = await dofetch(baseUrl + 'login', requistOptions);
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
      const userInfo = dofetch(baseUrl + 'users/user', options);
      return userInfo;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };
  return {checkToken};
};

export {useMedia, useLogin, useUser};
