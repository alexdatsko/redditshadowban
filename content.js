// content.js

// Function to handle the post comment button click
function handlePostCommentClick(event) {
    console.log("Post Comment button clicked!");

    // Get the post URL, assuming it's on the page somewhere, or you can dynamically construct it
    const postUrl = window.location.href; // You can customize this to get the exact post URL

    // Send a message to background.js to check the shadowban status
    chrome.runtime.sendMessage({ action: "checkShadowBan", url: postUrl }, (response) => {
        if (response.visible) {
            alert("Reddit Shadowban Extension: Your post is visible!");
        } else {
            alert("Reddit Shadowban Extension: Your post might be shadowbanned!");
        }
    });
}

// Wait for the DOM to load
window.addEventListener('load', () => {
    // Use a MutationObserver to detect when the submit button is added to the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const buttons = document.querySelectorAll('button[type="submit"][slot="submit-button"]');
                buttons.forEach(button => {
                    if (!button.dataset.listenerAdded) {
                        button.dataset.listenerAdded = 'true'; // Mark as having a listener
                        button.addEventListener('click', handlePostCommentClick);
                    }
                });
            }
        });
    });

    // Start observing the body for added child elements
    observer.observe(document.body, { childList: true, subtree: true });
});
