import Admin from './admin';
import Auth from './auth';
import Info from './info';
import Stat from './stat';
import { toast } from 'react-toastify';

export const header = () => {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const header = { Authorization: `Bearer ${accessToken ? accessToken : ''}` };
  // const header = {
  //   Authorization:
  //     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeWV6cHpAZ21haWwuY29tIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE2NzU0OTQ4MTV9.Gx7bXjNx2WnO9yJ1pBXXXZibii-W_qIFD7r7iV2kEow',
  // };
  // console.log(header);
  return header;
};

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

export const FireConfirm = (message) =>
  toast.success(message, {
    position: 'top-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

const Services = {
  Auth,
  Info,
  Stat,
  Admin,
};
export default Services;
