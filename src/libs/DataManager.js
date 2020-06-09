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

async function getLocalData() {
  return (await localForage.getItem("now")) || defaultSettings;
}

function upload(data) {
  try {
    chrome.storage.sync.set(data, () => {
      console.log("保存到远程成功");
    });
  } catch (e) {
    console.log("TR: upload -> e", e);
  }
}
async function download(data) {
  await localForage.setItem("now", data);
}
function compare(local, remote) {
  if (local.updateAt < remote.updateAt) {
    download(remote);
  } else if (local.updateAt > remote.updateAt) {
    upload(local);
  }
}

async function syncDate() {
  const localData = await getLocalData();
  try {
    chrome.storage.sync.get((result) => {
      if (Object.keys(result).length < 1) {
        // 远程没有数据
        upload(localData);
      } else if (!localData) {
        // 本地没有数据
        download(result);
      } else {
        compare(localData, result);
      }
    });
  } catch (e) {
    console.log("TR: syncDate -> e", e);
  }
}
async function getData() {
  await syncDate();
  return await getLocalData();
}
async function setData(data) {
  await localForage.setItem(
    format(new Date(), "yyyyMMdd"),
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
  current[key] = value;
  await setData(current);
}

export { getData, setData, addItem, changeSetting, defaultSettings };
