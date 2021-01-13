export const curVersion = 3;

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
  3: {
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
    version: 3,
  },
};

export function upgrade(version, data) {
  if (version >= curVersion) return data;
  if (version < 3) {
    const newData = defaultSettings['3'];
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
    return upgrade(3, newData);
  }
}
