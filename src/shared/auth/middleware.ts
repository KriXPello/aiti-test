import { redirect, type MiddlewareFunction } from 'react-router';
import { getAuthToken } from './store';

export const authMiddleware: MiddlewareFunction = () => {
  const token = getAuthToken();

  if (!token) {
    throw redirect('/auth');
  }
};
