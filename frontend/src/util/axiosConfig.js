export const axiosConfig = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return headers;
};
