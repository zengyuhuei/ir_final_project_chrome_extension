// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let username_a = document.getElementById('username');
chrome.storage.sync.get('username', function(data) {
  username_a.innerHTML = data.username;
});

let repo_message = document.getElementById('repo_message');
chrome.storage.sync.get('repos', function(data) {
  let repos = data.repos;
  let message = "";
  if(repos.length >= 20) {
    message = `Wooooow! Your current starred repos count is ${repos.length}. <br>
    Let's see what repository you are interested in OUO`
  } else {
    message = `Oops! Your current starred repos count is ${repos.length}.<br>
      You have to star more than 20 repos to get recommandation.<br>
      :(`
  }
  repo_message.innerHTML = message;
});



changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.tabs.executeScript(details.tabId, {
      code: `console.log('!!!!!!!!!!!!!!!!!!')`
  });
}, {
  url: [{
      // Runs on example.com, example.net, but also example.foo.com
      hostContains: 'github.com'
  }],
});