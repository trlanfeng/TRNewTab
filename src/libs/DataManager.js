const DataManager = {
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
  },
  GetData() {
    const _this = this;
    return new Promise(function (resolve, reject) {
      try {
        chrome.storage.sync.get(result => {
          console.log('读取成功');
          if (Object.keys(result).length == 0) {
            resolve(_this.defaultConfig);
          } else {
            resolve(result);
          }
        });
      } catch (e) {
        console.log('TCL: loadData -> e', e);
        reject(e);
      }
    });
  },
  SetData(data) {
    return new Promise(function (resolve, reject) {
      try {
        chrome.storage.sync.set(data, () => {
          console.log('保存成功');
          resolve();
        })
      } catch (e) {
        console.log("TCL: SetData -> e", e);
        reject(e);
      }
    })
  }
}

export default DataManager;