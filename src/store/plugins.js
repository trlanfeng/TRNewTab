import { setData, getData } from "../libs/DataManager";
import _ from "lodash";

const storage = (store) => {
  store.subscribe((mutation, state) => {
    setData(state.settings);
  });
};

export default storage;
