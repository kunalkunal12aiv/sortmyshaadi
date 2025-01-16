export const setRedirectUrl = (url) => {
  sessionStorage.setItem('redirectUrl', url);
};

export const getRedirectUrl = () => {
  const url = sessionStorage.getItem('redirectUrl');
  sessionStorage.removeItem('redirectUrl');
  return url;
};
