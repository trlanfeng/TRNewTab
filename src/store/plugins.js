import { setData, getData } from '../services/data';
import _ from 'lodash';

const storage = (store) => {
  store.subscribe((mutation, state) => {
    setData(state);
  });
};

export default storage;
