import Admin from './admin';
import Auth from './auth';
import Info from './info';
import Stat from './stat';
import { toast, Zoom } from 'react-toastify';

export const header = () => {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const header = { Authorization: `Bearer ${accessToken ? accessToken : ''}` };
  return header;
};

export const FireAlert = (message) => {
  toast.dismiss();
  setTimeout(
    () =>
      toast.error(message, {
        position: 'top-center',
        transition: Zoom,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      }),
    300,
  );
};

export const FireConfirm = (message) => {
  toast.dismiss();
  setTimeout(
    () =>
      toast.success(message, {
        position: 'top-center',
        transition: Zoom,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      }),
    300,
  );
};

const Services = {
  Auth,
  Info,
  Stat,
  Admin,
};
export default Services;
