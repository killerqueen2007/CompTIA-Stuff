chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (/\/productviewer\/.*\/.*\/outline/.test(tab.url)) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"]
      });
    }
  }
});
