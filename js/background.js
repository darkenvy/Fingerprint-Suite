// -------------------------------------------------------------------------- //
//                         Replace User Agent                                 //
// -------------------------------------------------------------------------- //

var userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36';

chrome.webRequest.onBeforeSendHeaders.addListener(replaceAgent, {
    "urls": ["<all_urls>"] // , "types": requestTypes
  }, ['requestHeaders', 'blocking']
);

function replaceAgent(req) {
  for (var i=0; i<req.requestHeaders.length; i++) {
    if (req.requestHeaders[i].name == 'User-Agent') {
      req.requestHeaders[i].value = userAgent;
    } 
    // Disabled because this causes cross-origin issues for some reason
    // eg: drive.google.com
    // else if (req.requestHeaders[i].name == 'Referer') {
    //   req.requestHeaders[i].value = '';
    // } 
    else if (req.requestHeaders[i].name == 'Accept-Language') {
      req.requestHeaders[i].value = 'en-US,en;q=0.8';
    }
  }
  return { requestHeaders: req.requestHeaders}
}

// -------------------------------------------------------------------------- //
//                          Blacklist Check                                   //
// -------------------------------------------------------------------------- //
var extDisabled = false;
var blacklist = ['startpage.com']; // move to db later
var urlRegX = /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/;



// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log('message!');
  // if (request.cmd && request.cmd === 'getMeta') {
  //   sendResponse({
  //     url: sender.url.match(urlRegX)[1],
  //     isBlacklisted: true,
  //     extDisabled: extDisabled
  //     // extDisabled: extDisabled
  //   });
  // }
  // else if (request.cmd && request.cmd === "setState") {
  //   request.opt === 'globalEnabled' ? extDisabled = false : extDisabled = true;
  //   sendResponse({})
  // }
  
// });




// if (request.cmd && request.cmd === "getPopupInfo") {
  //   var contentGetUrl = function(tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, {cmd: 'getUrl'}, function(response) {});
  //   }
  //   chrome.tabs.query({active: true, currentWindow: true}, contentGetUrl);
  // }




// chrome.runtime.onConnect.addListener(function(port){
//   console.log('port name ', port.name);
//   var urlRegX = /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/;
//   var site = port.sender.url.match(urlRegX)[1]
//   if (extDisabled) {
//     port.postMessage({isBlacklisted: false}); 
//   } else if (blacklist.indexOf(site) !== -1) {
//     port.postMessage({isBlacklisted: true}); 
//   } else {
//     port.postMessage({isBlacklisted: false}); 
//   }
// });

// Long lived connection to ContentJS
// chrome.runtime.onConnect.addListener(function(port){
//   console.log(port);
//   port.postMessage({})
// });

// One-Off Messages from PopupJS


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.cmd == 'informContentJs') {
    sendResponse({extDisabled: extDisabled});
  } else if (request.cmd == 'informPopupJs') {
    sendResponse({extDisabled: extDisabled});
  } else if (request.cmd == 'setState') {
    console.log('SETSTATE');
  }
});