const newtab = {
  export() {

  },
  import() {

  },
  loadData() {
    return new Promise(function (resolve, reject) {
      try {
        chrome.storage.local.get(result => {
          resolve(result);
        });
      } catch (e) {
        console.log('TCL: loadData -> e', e);
        reject(e);
      }
    });
  }
}

export default newtab;
