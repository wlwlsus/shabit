chrome.runtime.sendMessage({action: "FINISH"}, function(response) {
    alert(response);
});