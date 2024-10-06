// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkShadowBan") {

        // Open incognito window and load Reddit post
        chrome.windows.create({
            url: message.url,
            incognito: true,
            state: "minimized"
        }, (window) => {
            // Get the newly opened tab ID in the incognito window
            const tabId = window.tabs[0].id;

            // Wait for the page to load, then execute script to check post visibility
            chrome.tabs.onUpdated.addListener(function checkTabUpdate(tabId, info) {
                if (info.status === 'complete') {
                    // Remove listener after the tab is fully loaded
                    chrome.tabs.onUpdated.removeListener(checkTabUpdate);

                    // Inject script to check post visibility
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        function: checkRedditPostVisibility // Function to be injected
                    }, (results) => {
                        if (results && results[0] && results[0].result) {
                            sendResponse({ visible: results[0].result });
                        } else {
                            sendResponse({ visible: false });
                        }
                    });
                }
            });
        });
        return true; // Keep the message channel open for async response
    }
});

// Function to check Reddit post visibility in the injected context
function checkRedditPostVisibility() {
    // Example logic: check if post content exists on the page
    const postContent = document.querySelector(".Post") || document.querySelector(".PostContent");
    return postContent !== null; // Return true if the post is visible
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'storeLink') {
        chrome.storage.local.set({ sharedLink: message.link }, () => {
            console.log('Link stored:', message.link);
        });
    }
});
