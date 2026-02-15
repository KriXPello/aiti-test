import { Box, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import LockIcon from '~/assets/svg/lock.svg?react';
import UserIcon from '~/assets/svg/user.svg?react';
import { CheckboxField, PasswordField, TextField } from '~/shared/ui/form';
import { loginSchema, type LoginData } from '../model/login';

export function LoginForm(props: {
  onSubmit: (data: LoginData) => void;
}) {
  const {
    control, handleSubmit,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
      rememberMe: false,
    },
  });

  return (
    <Box as="form" onSubmit={handleSubmit(props.onSubmit)}>
      <TextField
        mt="32px"
        control={control}
        name="login"
        label="Логин"
        placeholder="username"
        autoComplete="username"
        clearable
        icon={<UserIcon height="18px" />}
      />

      <PasswordField
        mt="16px"
        control={control}
        name="password"
        label="Пароль"
        placeholder="****"
        autoComplete="current-password"
        icon={<LockIcon height="18px" />}
      />

      <CheckboxField
        mt="20px"
        control={control}
        name="rememberMe"
        label="Запомнить данные"
      />

      <Button
        w="full"
        mt="20px"
        colorPalette="blue"
        type="submit"
      >
        Войти
      </Button>
    </Box>
  );
}
