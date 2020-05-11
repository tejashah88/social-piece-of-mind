chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo, tab) {
        // Only look for tabs with messenger.com and are fully loaded
        if (tab.url.startsWith('https://www.messenger.com') && changeInfo.status && changeInfo.status == 'complete') {
            chrome.tabs.sendMessage(tabId, {
                message: 'activate-piece-of-mind',
            });
        }
    }
);