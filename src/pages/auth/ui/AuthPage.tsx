import { Box, Center, Flex, Heading, HStack, Link, Separator, Spinner, Text } from '@chakra-ui/react';
import LogoIcon from '~/assets/svg/logo.svg?react';
import { useLogin } from '../model/login';
import { LoginForm } from './LoginForm';

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

export function AuthPage() {
  const onCreateAccount = () => {
    alert('В реальном приложении было бы переключение на форму регистрации');
  };

  const { isLoggingIn, onLogin } = useLogin();

  return (
    <Center w="full" h="full">
      <Box position="relative" w="full" maxW="512px" p="6px" fill="white" shadow="0px 24px 32px rgba(0, 0, 0, 4%)" rounded="34px">
        <Box
          w="full"
          maxW="512px"
          padding="48px"
          rounded="inherit"
          bgImage="linear-gradient(to bottom, rgba(35, 35, 35, 0.03), rgba(35, 35, 35, 0) 50%)"
        >
          <FormHeader />
          <LoginForm onSubmit={onLogin} />
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

        {isLoggingIn && (
          <Center
            position="absolute"
            inset="0"
            bg="bg/70"
            backdropFilter="blur(2px)"
            aria-label="Вход"
          >
            <Spinner />
          </Center>
        )}
      </Box>
    </Center>
  );
}
