chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('dailyPopup', {
    when: getNextAlarmTime(),
    periodInMinutes: 24 * 60 // 매일
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "show_popup_now") {
    showPopup();
  }
});

function showPopup() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || tab.url.startsWith("chrome://")) {
      console.warn("현재 탭은 chrome:// 페이지이므로 스크립트를 삽입할 수 없습니다.");
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["popup.js"]
    });
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["popup.css"]
    });
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyPopup') {
    showPopup();
  }
});

function getNextAlarmTime() {
  const now = new Date();
  const next = new Date();
  next.setHours(1, 29, 0, 0);
  if (now >= next) next.setDate(next.getDate() + 1);
  return next.getTime();
}
