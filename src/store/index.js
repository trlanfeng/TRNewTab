import { defineStore } from 'pinia';
import _ from 'lodash';
import * as services from '../services/data';
import { curVersion, defaultSettings } from '../services/upgrade';

export const useStore = defineStore('main', {
  state: () => _.cloneDeep(defaultSettings[curVersion]),
  actions: {
    moveItem({ from, to, index, item }) {
      this.links[to].list.push(item);
      this.links[from].list.splice(index, 1);
    },
    removeItem({ category, index }) {
      this.$state.links[category].list.splice(index, 1);
    },
    changeSetting({ key, value }) {
      this.$state.settings[key] = value;
    },
    changeSearch({ key, value }) {
      this.$state.search[key] = value;
    },
    changeBackground({ key, value }) {
      this.$state.background[key] = value;
    },
    replaceAllSettings(payload) {
      Object.keys(payload).forEach((key) => {
        this.$state[key] = payload[key];
      });
    },
    async addItem(payload) {
      const data = await services.addItem(payload);
      this.replaceAllSettings(data);
    },
    async addCategory(payload) {
      const data = await services.addCategory(payload);
      this.replaceAllSettings(data);
    },
    async init() {
      const data = await services.initData();
      this.replaceAllSettings(data);
    },
  },
});
