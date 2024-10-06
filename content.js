// content.js

// Function to handle the post comment button click
function handlePostCommentClick(event) {
    console.log("Post Comment button clicked!");
    // You can add more functionality here, such as notifying the user
    alert("Your comment has been submitted!");
}

// Wait for the DOM to load
window.addEventListener('load', () => {
    // Use a MutationObserver to detect when the button is added to the DOM
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
