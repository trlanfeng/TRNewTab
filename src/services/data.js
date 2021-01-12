import localForage from 'localforage';
import { format } from 'date-fns';

export const defaultSettings_v1 = {
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
};

export const defaultSettings = {
  links: {
    game: {
      title: '游戏',
      list: [
        {
          name: 'IT之家（博客版） - 数码，科技，生活 - 软媒旗下',
          url: 'https://www.ithome.com/blog/',
        },
        {
          name:
            '篝火营地-单机游戏主机游戏媒体，独家主机游戏单机游戏攻略，游戏评测，新闻资讯，全球游戏展会-gouhuo.qq.com',
          url: 'https://gouhuo.qq.com/',
        },
        { name: '游戏时光 - vgtime.com', url: 'http://www.vgtime.com/' },
        {
          name: '游民星空 - 大型单机游戏媒体 提供特色单机游戏资讯、下载',
          url: 'https://www.gamersky.com/',
        },
      ],
    },
    default: {
      title: '默认',
      list: [{ name: '网易新闻', url: 'https://news.163.com/' }],
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
};

export async function getHistory() {
  const history = [];
  try {
    await localForage.iterate((value, key, index) => {
      history.push({ key, value });
    });
  } catch (e) {
    console.log('TR: getLocalHistory -> e', e);
  }
  return history;
}

export async function deleteHistory(key) {
  localForage.removeItem(key);
}

export async function recoveryHistory(key) {
  const history = await localForage.getItem(key);
  setData(history);
}

export async function initData() {
  const cur = await getData();
  const remote = await getRemoteData();
  const res = getRecent(cur, remote);
  return res;
}

export async function getData() {
  const data = await localForage.getItem('now');
  return data || defaultSettings;
}

export function upload(data) {
  if (!chrome.storage || !data) return;
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(data, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      console.log('保存到远程成功');
      resolve();
    });
  });
}

export function getRecent(local, remote) {
  if (local.updateAt < remote.updateAt) {
    download(remote);
    return remote;
  } else if (local.updateAt > remote.updateAt) {
    upload(local);
    return local;
  }
  return local;
}

export async function getRemoteData() {
  if (!chrome.storage) return;
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get((remote) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      if (Object.keys(remote).length < 1) {
        // 远程没有数据
        return;
      }
      resolve(remote);
    });
  });
}

export async function setData(data) {
  await localForage.setItem(format(new Date(), 'yyyyMMdd'), await getData());
  data.updateAt = +new Date();
  await localForage.setItem('now', data);
  upload(data);
}

export async function addItem(data, isSave = true) {
  const { category = 'default', item } = data;
  const current = await getData();
  current.links[category].list.push(item);
  if (isSave) await setData(current);
}

export async function addItemToDefault(item, isSave = true) {
  const current = await getData();
  current.links.default.list.push(item);
  if (isSave) await setData(current);
}

export async function addCategory(category, isSave = true) {
  const { title, key } = category;
  const current = await getData();
  current.links[key] = {
    title,
    list: [],
  };
  if (isSave) await setData(current);
}
