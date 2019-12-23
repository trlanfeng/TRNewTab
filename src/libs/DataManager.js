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
          if (Object.keys(result).length == 0) {
            console.log('读取 chrome.storage.sync 失败');
            chrome.storage.local.get(resultLocal => {
              if (Object.keys(resultLocal).length == 0) {
                console.log('读取 chrome.storage.local 失败');
                console.log('尝试读取 window.localStorage');
                const config = localStorage.getItem('data');
                console.log('TR: GetData -> config', config);
                resolve(config || _this.defaultConfig);
              } else {
                console.log('读取 chrome.storage.local 成功');
                resolve(resultLocal);
              }
            });
          } else {
            console.log('读取 chrome.storage.sync 成功');
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
        });
        chrome.storage.local.set(data, () => {
          console.log('本地备份成功');
        });
        localStorage.setItem('data', data);
        console.log('localStorage备份成功');
      } catch (e) {
        console.log("TCL: SetData -> e", e);
        reject(e);
      }
    })
  },
  AddSpeedDial(speedDial) {
    const _this = this;
    return new Promise(function (resolve, reject) {
      try {
        let list = [];
        _this.GetData().then(res => {
          list = res.list;
          list.push(speedDial);
        }).then(() => {
          return _this.SetData({ list })
        }).then(() => {
          resolve();
        });
      } catch (e) {
        console.log("TCL: AddSpeedDial -> e", e)
        reject();
      }
    });
  }
}

export default DataManager;
