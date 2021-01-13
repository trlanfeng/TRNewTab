import localForage from 'localforage';
import { format } from 'date-fns';
import { defaultSettings, curVersion, upgrade } from './upgrade';

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
  saveData(history);
}

export async function initData() {
  const cur = await getData();
  const remote = await getRemoteData();
  const res = getRecent(cur, remote);
  return res;
}

export async function getData() {
  const data = await localForage.getItem('now');
  return data || defaultSettings[curVersion];
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
  const remoteUpdateAt = (remote && remote.updateAt) || 0;
  const localUpdateAt = (local && local.updateAt) || 0;
  if (localUpdateAt < remoteUpdateAt) {
    download(remote);
    return remote;
  }
  upload(local);
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

export async function saveData(data) {
  await localForage.setItem(format(new Date(), 'yyyyMMdd'), await getData());
  data.updateAt = +new Date();
  const nowData = upgrade(data.version || 1, data);
  await localForage.setItem('now', nowData);
  upload(nowData);
}

export async function addItem(data) {
  const { category = 'default', item } = data;
  const current = await getData();
  current.links[category].list.push(item);
  await saveData(current);
  return current;
}

export async function addItemToDefault(item) {
  const current = await getData();
  current.links.default.list.push(item);
  await saveData(current);
  return current;
}

export async function addCategory(category) {
  const { title, key } = category;
  const current = await getData();
  current.links[key] = {
    title,
    list: [],
  };
  current.categories.push(key);
  await saveData(current);
  return current;
}

export async function sortCategories(categories) {
  const current = await getData();
  current.categories = categories;
  await saveData(current);
  return current;
}
