const newtab = {
  export() {

  },
  import() {

  },
  loadData(callback) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get(result => {
				console.log('TCL: loadData -> result', result);
        
      });
    });
  }
}