const DataManager = {
  GetRemote() {
    return new Promise(function (resolve, reject) {
      try {
        chrome.storage.sync.get(result => {
          resolve(result);
        });
      } catch (e) {
        console.log('TCL: loadData -> e', e);
        reject(e);
      }
    });
  },
  SetRemote(data) {
    return new Promise(function (resolve, reject) {
      try {
        chrome.storage.sync.set(data, () => {
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
