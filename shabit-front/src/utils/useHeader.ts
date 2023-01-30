const useHeader = () => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  const headers = {
    Authorization: `Bearer ${accessToken ? accessToken : ''}`,
  };
  return headers;
};

export default useHeader;
