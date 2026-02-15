import { Box, Button, Center, Flex, Heading, HStack, Link, Separator, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LogoIcon from '~/assets/svg/logo.svg?react';
import UserIcon from '~/assets/svg/user.svg?react';
import LockIcon from '~/assets/svg/lock.svg?react';
import { CheckboxField, PasswordField, TextField } from '~/shared/ui/form';

function FormHeader() {
  return (
    <Box>
      <Flex justify="center">
        <Center
          w="52px"
          h="52px"
          rounded="full"
          bgImage="linear-gradient(to bottom, rgba(35, 35, 35, 0.03), rgba(35, 35, 35, 0) 70%)"
          shadow="0 0 0 2px #FFF, 0 12px 8px rgba(0, 0, 0, 3%)"
        >
          <LogoIcon width="35px" />
        </Center>
      </Flex>

      <Box mt="32px">
        <Heading textAlign="center" fontSize="40px" fontWeight="semibold" lineHeight="1.1">
          Добро пожаловать!
        </Heading>

        <Text mt="12px" lineHeight="1.5" fontSize="18px" fontWeight="medium" color="#BABABA" textAlign="center" textShadow="0 1px 0 rgba(0, 0, 0, 0.06), 0 -1px 0 rgba(255, 255, 255, 0.4)">
          Пожалуйста, авторизируйтесь
        </Text>
      </Box>
    </Box>
  );
}

const authSchema = z.object({
  login: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
  rememberMe: z.boolean(),
});

type AuthFormData = z.infer<typeof authSchema>;

function LoginForm() {
  const {
    control, handleSubmit,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      login: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    console.log(data);
    // TODO: авторизация и редирект на страницу товаров
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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

export function AuthPage() {
  const onCreateAccount = () => {
    alert('В реальном приложении было бы переключение на форму регистрации');
  };

  return (
    <Center w="full" h="full">
      <Box w="full" maxW="512px" p="6px" fill="white" shadow="0px 24px 32px rgba(0, 0, 0, 4%)" rounded="34px">
        <Box
          w="full"
          maxW="512px"
          padding="48px"
          rounded="inherit"
          bgImage="linear-gradient(to bottom, rgba(35, 35, 35, 0.03), rgba(35, 35, 35, 0) 50%)"
        >
          <FormHeader />
          <LoginForm />
          <HStack mt="16px">
            <Separator flex="1" />
            <Text flexShrink="0" color="#BABABA" lineHeight="1.5">или</Text>
            <Separator flex="1" />
          </HStack>
          <Text mt="32px" fontSize="18px" color="#6C6C6C" textAlign="center">
            Нет аккаунта?
            {' '}
            <Link fontWeight="semibold" color="#242EDB" variant="underline" onClick={onCreateAccount}>Создать</Link>
          </Text>
        </Box>
      </Box>
    </Center>
  );
}
