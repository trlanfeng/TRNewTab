import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import { addCategory, addItem, initData, saveData } from '../services/data';
import { curVersion, defaultSettings } from '../services/upgrade';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: defaultSettings[curVersion],
  mutations: {
    CHANGE_SETTING(state, { key, value }) {
      state.settings[key] = value;
      saveData(state);
    },
    CHANGE_SEARCH(state, { key, value }) {
      state.search[key] = value;
      saveData(state);
    },
    CHANGE_BACKGROUND(state, { key, value }) {
      state.background[key] = value;
      saveData(state);
    },
    REPLACE_ALL_SETTINGS(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    async ADD_ITEM({ commit }, payload) {
      const data = await addItem(payload);
      commit('REPLACE_ALL_SETTINGS', data);
    },
    async ADD_CATEGORY({ commit }, payload) {
      const data = await addCategory(payload);
      commit('REPLACE_ALL_SETTINGS', data);
    },
    async INIT_DATA({ commit }) {
      const data = await initData();
      console.log('TR: INIT_DATA -> data', data);
      commit('REPLACE_ALL_SETTINGS', data);
    },
  },
});

export default store;
