chrome.runtime.onInstalled.addListener(function() {
  
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });


chrome.runtime.onStartup.addListener(function () {
  console.log("ext startup")
})

  chrome.contextMenus.create({
    id: "aid",
    title: "Test Download %s", 
    contexts:["selection"], 
  });

function saveSelection(info, tab)
{
  var imgurl = info.selectionText;
  console.log("downloading " + info.selectionText)
  chrome.downloads.download({url:imgurl},function(downloadId){
      console.log("download begin, the downId is:" + downloadId);
  });
}

chrome.contextMenus.onClicked.addListener(saveSelection);
chrome.extension.onMessage.addListener(dllinks)

function dllinks(links) {
  for (var link in links) {
    if (links[link]) {
      chrome.downloads.download(
        {
          url: links[link],
        }
      )
    }
  }
}