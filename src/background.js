import { addItem } from './services/data';

async function addToSpeedDial(info, tab) {
  await addItem({
    item: {
      name: tab.title,
      url: tab.url,
      icon: tab.favIconUrl,
    },
  });
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'test',
    title: '添加到新标签页',
    contexts: ['page'],
  });
  chrome.contextMenus.onClicked.addListener(addToSpeedDial);
  chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      if (message === 'getCurrentTab') {
        const tab = await getCurrentTab();
        let speedDial = {
          name: tab.title,
          url: tab.url,
          icon: tab.favIconUrl,
        };
        sendResponse(speedDial);
      }
    }
  );
});
