const menuItemId = "copy-text-fragment-link";

browser.runtime.onInstalled.addListener(() => {
    browser.menus.create({
        id: menuItemId,
        title: "Copy Text Fragment Link",
        contexts: ["selection"]
    });
});

browser.menus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === menuItemId) {
        const url = new URL(info.pageUrl);
        const encodedText = encodeURIComponent(info.selectionText).replace(/-/g, "%2D");
        url.hash = `:~:text=${encodedText}`;
        try {
            await navigator.clipboard.writeText(url.toString());
            console.log("Text fragment link copied to clipboard.");
        } catch (error) {
            console.error("Failed to copy text fragment link:", error);
        }
    }
});