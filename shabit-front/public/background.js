
//우리가 하고 싶은 동작들

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log(sender.tab ?
//         "from a content script:" + sender.tab.url :
//         "from the extension");

//     if (request.action === "FINISH")
//         sendResponse({farewell: "goodbye"});
// });