import { addItem } from './services/data';

async function addToSpeedDial(info, tab) {
  await addItem({
    item: {
      name: tab.title,
      url: tab.url,
    },
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'test',
    title: '添加到新标签页',
    contexts: ['page'],
  });
  chrome.contextMenus.onClicked.addListener(addToSpeedDial);
});
