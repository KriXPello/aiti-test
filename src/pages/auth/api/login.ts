type FetchLoginOptions = {
  login: string;
  password: string;
};

type FetchLoginResult = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export async function fetchLogin(options: FetchLoginOptions) {
  const { login, password } = options;

  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: login,
      password,
      expiresInMins: 24 * 60,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result: FetchLoginResult = await response.json();
  return result;
}
