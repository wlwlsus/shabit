import Auth from './auth';
import Info from './info';
import Stat from './stat';

export const header = () => {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const header = { Authorization: `Bearer ${accessToken ? accessToken : ''}` };
  return header;
};

const Services = {
  Auth,
  Info,
  Stat,
};
export default Services;
