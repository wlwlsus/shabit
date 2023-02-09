import { toast } from 'react-toastify';

export const FireAlert = (message) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

export default FireAlert;
