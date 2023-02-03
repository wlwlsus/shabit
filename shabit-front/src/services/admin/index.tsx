import { deletePhrase, deleteVod } from './delete';
import {
  fetchAlarmTime,
  fetchVods,
  retreivePhrases,
  retrieveVods,
} from './get';
import { putAlarmTime } from './put';
import { postVod, postQuote } from './post';

const Admin = {
  fetchAlarmTime,
  putAlarmTime,
  postVod,
  fetchVods,
  deleteVod,
  retrieveVods,
  postQuote,
  deletePhrase,
  retreivePhrases,
};

export default Admin;
