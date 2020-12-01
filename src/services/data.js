import localForage from 'localforage';
import { format } from 'date-fns';

export const defaultSettings = {
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

export async function getLocalData() {
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

export function compare(local, remote) {
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
  await localForage.setItem(
    format(new Date(), 'yyyyMMddHHmm'),
    await getLocalData()
  );
  await localForage.setItem('now', data);
  upload(data);
}

export async function addItem(item) {
  const current = await getLocalData();
  current.list.push(item);
  await setData(current);
}

export async function changeSetting(key, value) {
  const current = await getLocalData();
  if (current[key] === value) return;
  current[key] = value;
  await setData(current);
}
