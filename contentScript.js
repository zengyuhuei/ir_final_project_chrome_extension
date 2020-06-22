let user = document.querySelector('body > div.position-relative.js-header-wrapper > header > div.Header-item.position-relative.mr-0.d-none.d-lg-flex > details > details-menu > div.header-nav-current-user.css-truncate > a > strong')
let username = user.innerHTML
//alert(user.innerHTML)

chrome.storage.sync.set({username: username}, function() {
    console.log(`saved username : ${username} to storage`);
  });

  fetch(`http://127.0.0.1:5000/${username}/star`, {})
  .then((response) => {
    console.log(response);
    return response.json()
  }).then((data) => {
    console.log(data)
    chrome.storage.sync.set({repos: data}, function() {
      console.log(`saved user ${username} repos to storage`);
    });
  }).catch((err) => {
    console.log("[ERROR] calling star API error")
});
