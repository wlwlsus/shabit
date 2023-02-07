
//우리가 하고 싶은 동작들 -> 알람을 띄워주세요,


// chrome.alarms.onAlarm.addListener(
//     () => {
//         chrome.notifications.create(
//             // "drink_water",
//             {
//                 type: "pose",
//                 iconUrl: "asstes/logo-pink.png",
//                 title: "자세를 바르게 하세요",
//                 message: "거북목입니다.",
//                 silent: false
//             },
//             () => { }
//         )
//     },
// )
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(request);
//         if (request.msg)
//             createAlarm();

//         sendResponse(() => {
//             return false
//         });
//     }
// );

// // chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
// //    console.log(message);
// // });
// // // chrome.action.

// function createAlarm() {
//     chrome.alarms.create(
//         "pose",{
//             delayInMinutes :1,
//         }
//     );
// }
// // var opt = {
// //     type: 'basic',
// //     title: 'SHabit',
// //     message: '바르게 앉으세요',
// //     priority: 1,
// //     iconUrl:'assets/logo-pink.png'
// //   };
// // chrome.notifications.create('1', opt, function(id) { console.log("Last error:", chrome.runtime.lastError); });
// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");

    if (request.action === "FINISH")
        sendResponse({farewell: "goodbye"});
});