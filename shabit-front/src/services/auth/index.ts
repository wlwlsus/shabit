import { checkEmail, confirmEmail, fetchProfile } from './get/index';
import { register, login, refreshLogin, logout } from './post/index';
import { changeImage, resetPassword, changeTheme, changeNickname } from './put';
import { deleteImage } from './delete';

const Auth = {
  register,
  fetchProfile,
  changeImage,
  deleteImage,
  login,
  refreshLogin,
  logout,
  confirmEmail,
  checkEmail,
  resetPassword,
  changeTheme,
  changeNickname,
};

export default Auth;
