import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    defaultConfig: {
      list: [],
      isSearchOpen: true,
      bgType: 1,
      bingApiUrl:
        "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
      bgUrl: "",
      searchUrl: "https://www.baidu.com/s?wd=",
      searchIcon: "https://www.baidu.com/favicon.ico",
      searchTitle: "百度",
      bgLastCheckDate: 0,
      bgBlur: 20
    }
  },
  mutations: {

  }
})

export default store;