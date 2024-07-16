import axios from 'axios';

export const adapter = axios.create({
  baseURL: import.meta.env.VITE_SSO_BACK,
  timeout: import.meta.env.VITE_APP_ADAPTER_TIMEOUT,
  withCredentials: true,
});
