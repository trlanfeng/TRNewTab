// 数据结构版本号，与应用版本无关，单独计数
export const curVersion = 2;

export const defaultSettings = {
  1: {
    list: [],
    isSearchOpen: true,
    bgType: 1,
    bingApiUrl:
      'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',
    bgUrl: '',
    searchUrl: 'https://www.baidu.com/s?wd=',
    searchIcon: 'https://www.baidu.com/favicon.ico',
    searchTitle: '百度',
    bgLastCheckDate: 0,
    bgBlur: 20,
  },
  2: {
    categories: ['default'],
    links: {
      default: {
        title: '默认',
        list: [],
      },
    },
    settings: {},
    search: {
      show: true,
      url: 'https://www.baidu.com/s?wd=',
      icon: 'https://www.baidu.com/favicon.ico',
      title: '百度',
    },
    background: {
      blur: 20,
      lastCheckDays: 0,
      url: '',
      bingApi:
        'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',
      type: 1,
    },
    version: 2,
  },
};

export function upgrade(version, data) {
  if (version >= curVersion) return data;
  if (version < 2) {
    const newData = _.cloneDeep(defaultSettings['2']);
    newData.links.default.list = data.list;
    newData.search.show = data.isSearchOpen;
    newData.search.icon = data.searchIcon;
    newData.search.title = data.searchTitle;
    newData.search.url = data.searchUrl;
    newData.background.blur = data.bgBlur;
    newData.background.lastCheckDays = data.bgLastCheckDate;
    newData.background.url = data.bgUrl;
    newData.background.bingApi = data.bingApiUrl;
    newData.background.type = data.bgType;
    console.log(`从版本 ${version} 升级到 2 成功`);
    return upgrade(2, newData);
  }
}

function from1to2(data) {
  const newData = _.cloneDeep(defaultSettings['2']);
  newData.links.default.list = data.list;
  newData.search.show = data.isSearchOpen;
  newData.search.icon = data.searchIcon;
  newData.search.title = data.searchTitle;
  newData.search.url = data.searchUrl;
  newData.background.blur = data.bgBlur;
  newData.background.lastCheckDays = data.bgLastCheckDate;
  newData.background.url = data.bgUrl;
  newData.background.bingApi = data.bingApiUrl;
  newData.background.type = data.bgType;
  console.log(`从版本 1 升级到 2 成功`);
  return newData;
}

const upgradePrograms = {
  from1to2,
};

export function checkNeedUpgrade(data) {
  const v = data.version || 1;
  if (v === curVersion) {
    console.log('数据不需要升级');
    return false;
  }
  return true;
}

export function upgradeData(data) {
  let v = data.version || 1;
  let finalData = {};
  while (v < curVersion) {
    const funcName = `from${v}to${v + 1}`;
    finalData = upgradePrograms[funcName]();
    v++;
  }
  return finalData;
}
