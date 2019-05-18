import Vue from 'vue';
import Vuex from 'vuex';
import DataManager from './DataManager';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    data: DataManager.defaultConfig
  },
  mutations: {
    SetData(state, payload) {
      state.data = payload;
      DataManager.SetData(state.data);
    },
    SetByKey(state, payload) {
      // Vue.set(state.data, payload.key, payload.value);
      state.data[payload.key] = payload.value;
      DataManager.SetData(state.data);
    },
    AddSpeedDial(state, payload) {
      state.data.list.push(payload);
      DataManager.SetData(state.data);
    }
  }
})

export default store;