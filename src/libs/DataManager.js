import localForage from "localforage";
import { format } from "date-fns";

const defaultSettings = {
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
  bgBlur: 20,
};

async function getHistory() {
  const history = [];
  try {
    await localForage.iterate((value, key, index) => {
      history.push({ key, value });
    });
  } catch (e) {
    console.log("TR: getLocalHistory -> e", e);
  }
  return history;
}

async function getLocalData() {
  const data = await localForage.getItem("now");
  return data || defaultSettings;
}

function upload(data) {
  if (!chrome.storage) return
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(data, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      console.log("保存到远程成功");
      resolve();
    });
  });
}

async function download(data) {
  await localForage.setItem("now", data);
}

function compare(local, remote) {
  if (local.updateAt < remote.updateAt) {
    download(remote);
    return remote;
  } else if (local.updateAt > remote.updateAt) {
    upload(local);
    return local;
  }
  return local;
}

async function syncData() {
  const local = await getLocalData();
  if (!chrome.storage) return local
  console.log('TR: syncData -> chrome', chrome);
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get((remote) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      if (Object.keys(remote).length < 1) {
        // 远程没有数据
        upload(local);
        resolve(local);
      } else if (!local) {
        // 本地没有数据
        download(remote);
        resolve(remote);
      } else {
        resolve(compare(local, remote));
      }
    });
  });
}
async function getData() {
  return await getLocalData();
}
async function setData(data) {
  await localForage.setItem(
    format(new Date(), "yyyyMMddHHmm"),
    await getLocalData()
  );
  await localForage.setItem("now", data);
  upload(data);
}
async function addItem(item) {
  const current = await getLocalData();
  current.list.push(item);
  await setData(current);
}

async function changeSetting(key, value) {
  const current = await getLocalData();
  if (current[key] === value) return
  current[key] = value;
  await setData(current);
}

export { getData, setData, syncData, getHistory, addItem, changeSetting, defaultSettings };
