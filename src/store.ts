import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex)

import testdata from './assets/testdata'

const store = new Vuex.Store({
  state: {
    count: 0,
    testdata,
    isEditMode: false,
    draggableOptions: {
      animation: 250,
      handle: '.icon',
      // sort: true,
      disabled: true
    },
  },
  mutations: {
    increment(state) {
      state.count++
    },
    toggleEditMode(state) {
      state.isEditMode = !state.isEditMode;
      state.draggableOptions.disabled = !state.isEditMode;
    },
    moveItem(state, data: { arr: number[], from: number, to: number }) {
      console.log(data);
      let _ta = state.testdata.list;
      // let _ta = data.arr;

      let _t = _ta.splice(data.from, 1)[0];
      _ta.splice(data.to, 0, _t);

      console.log(_ta);
    }
  }
})

export default store;