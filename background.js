browser.tabs.onUpdated.addListener(() => {
	browser.tabs.query({
    currentWindow: true,
    active: true
	}).then(sendMessageToTabs);
});

function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {greeting: "Hi from background script"}
    );
  }
}