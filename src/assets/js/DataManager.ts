export class DataManager {
  constructor() {
  }
  defaultSettings = {
    "list": [
    ],
    "isSearchOpen": true,
    "bgType": 0,
    "bingApiUrl": "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
    "bgThirdPartyUrl": "https://www.ryongyon.com/bing/",
    "bgUrl": "",
    "searchUrl": "https://www.baidu.com/s?wd=",
    "searchIcon": "https://www.baidu.com/favicon.ico",
    "searchTitle": "百度",
    "bgLastCheckDate": 0
  };
  loadData() {

  }
  saveData(): boolean {
    return false;
  }
}