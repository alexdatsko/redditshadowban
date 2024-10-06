// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkShadowBan") {
        // Example of a fetch request to Reddit's API (update based on your needs)
        fetch(message.url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add Reddit API headers if needed
            }
        }).then(response => response.json())
          .then(data => {
              // Handle Reddit API response and check post visibility
              console.log(data);
              sendResponse({ visible: true }); // or false based on the result
          }).catch(error => {
              console.error("Error checking Reddit post:", error);
              sendResponse({ visible: false });
          });
        return true; // Keep the message channel open for async response
    }
});
