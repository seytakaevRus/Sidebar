export const redirectToSSO = (): void => {
  const redirectURL = `${import.meta.env.VITE_SSO_FRONT}?redirectURI=${
    window.location.href
  }`;
  window.open(redirectURL, '_self');
};
