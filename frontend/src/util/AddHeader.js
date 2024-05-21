export const addToHeader = (accessToken) => {
  const headers = {};
  headers["Authorization"] = `Bearer ${accessToken}`;

  return headers;
};
