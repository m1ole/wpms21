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
      const response = await fetch(baseUrl + 'media');
      const mediaIlmanThumbnailia = await response.json();
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

export {useMedia};
