import { addItem } from './services/data';

async function addToSpeedDial(info, tab) {
  await addItem({
    name: tab.title,
    url: tab.url,
  });
}

function main() {
  var contexts = ['page'];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = '添加到新标签页';
    var id = chrome.contextMenus.create({
      title: title,
      contexts: [context],
      onclick: addToSpeedDial,
    });
  }
}

main();
