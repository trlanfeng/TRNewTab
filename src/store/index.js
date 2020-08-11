import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import { defaultSettings, getData, syncData } from "../services/data";
import storage from "./plugins";
import { CHANGE_SETTING, ADD_ITEM, REPLACE_SETTINGS, INIT_DATA } from "./types";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [storage],
  state: {
    settings: defaultSettings,
  },
  mutations: {
    [CHANGE_SETTING](state, { key, value }) {
      state.settings[key] = value;
    },
    [ADD_ITEM](state, payload) {
      state.settings.list.push(payload);
    },
    [REPLACE_SETTINGS](state, payload) {
      state.settings = payload;
    },
  },
  actions: {
    async [INIT_DATA]({ commit }) {
      const data = await syncData();
      commit(REPLACE_SETTINGS, data);
    },
  },
});

export default store;
