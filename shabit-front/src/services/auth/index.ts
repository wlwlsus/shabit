const AUTH_ENVS = [
  'Register',
  'FetchProfile',
  'ChangeImage',
  'DeleteImage',
  'Login',
  'RefreshLogin',
  'Logout',
  'ConfirmEmail',
  'CheckEmail',
  'ResetPassword',
  'ChangeTheme',
  'ChangeNickname',
] as const;
type AUTH_PROP_TYPES = typeof AUTH_ENVS[number]; // "Home" , "About"useInterval

const auth = (type: AUTH_PROP_TYPES) => {
  return;
};

export default auth;
