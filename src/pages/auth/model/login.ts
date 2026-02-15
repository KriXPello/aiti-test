import { useState } from 'react';
import { useNavigate } from 'react-router';
import z from 'zod';
import { showToast } from '~/shared/lib/toast';
import { fetchLogin } from '../api/login';
import { setAuthToken } from '~/shared/auth';

export const loginSchema = z.object({
  login: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
  rememberMe: z.boolean(),
});

export type LoginData = z.infer<typeof loginSchema>;

export function useLogin() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const onLogin = async (data: LoginData) => {
    if (isLoggingIn) return;
    try {
      setIsLoggingIn(true);

      const result = await fetchLogin({
        login: data.login,
        password: data.password,
      });

      setAuthToken(result.accessToken, data.rememberMe);
      navigate('/products');
    } catch {
      showToast({
        type: 'error',
        title: 'Не удалось войти',
        durationMs: 6000,
        description: 'Возьмите username и password отсюда: https://dummyjson.com/users',
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return {
    isLoggingIn,
    onLogin,
  };
}
