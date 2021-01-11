import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import { addItem, defaultSettings, getData } from '../services/data';
import storage from './plugins';

Vue.use(Vuex);

const ADD_ITEM = 'ADD_ITEM';
const CHANGE_SETTING = 'CHANGE_SETTING';
const CHANGE_SEARCH = 'CHANGE_SEARCH';
const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND';
const REPLACE_ALL_SETTINGS = 'REPLACE_SETTINGS';
const INIT_DATA = 'INIT_DATA';

const store = new Vuex.Store({
  plugins: [storage],
  state: defaultSettings,
  mutations: {
    [CHANGE_SETTING](state, { key, value }) {
      state.settings[key] = value;
    },
    [CHANGE_SEARCH](state, { key, value }) {
      state.search[key] = value;
    },
    [CHANGE_BACKGROUND](state, { key, value }) {
      state.background[key] = value;
    },
    [ADD_ITEM](state, payload) {
      addItem(payload, false);
    },
    [REPLACE_ALL_SETTINGS](state, payload) {
      state = payload;
    },
  },
  actions: {
    async [INIT_DATA]({ commit }) {
      const data = await getData();
      commit(REPLACE_ALL_SETTINGS, data);
    },
  },
});

export default store;
