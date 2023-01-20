import apiRequest from '../../utils/apiRequest';

export const fetchVods = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/info/vods/${email}`)
    .then((res) => {
      localStorage.setItem('vods', res.data.result);
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};

export const fetchCategories = async (): Promise<object> => {
  return await apiRequest
    .get(`/info/catefory`)
    .then((res) => {
      localStorage.setItem('cetegory', res.data.result);
      return res.data.result;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchPhrases = async (): Promise<object> => {
  return await apiRequest
    .get(`/info/phrases`)
    .then((res) => {
      localStorage.setItem('phrases', res.data.result.content);
      return res.data.result.content;
    })
    .catch((err) => err.data);
};
