import apiRequest from '../../utils/apiRequest';

export const fetchVods = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/info/vods/${email}`)
    .then((res) => {
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};
{
}
export const fetchCategories = async (): Promise<object> => {
  return await apiRequest
    .get(`/info/catefory`)
    .then((res) => {
      return res.data.result;
    })
    .catch((err) => {
      return err;
    });
};
