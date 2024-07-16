import axios from 'axios';

export const extractErrorMessage = (
  error: unknown,
  callee: string,
  defaultMessage = 'Что-то пошло не так, попробуйте позже',
): void => {
  if (axios.isAxiosError(error)) {
    console.error(callee, error?.response?.data?.message ?? error.message);
  } else if (error instanceof Error) {
    console.error(callee, error.message);
  } else {
    console.error(callee, defaultMessage);
  }
};
