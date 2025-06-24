if (typeof chrome === "undefined") {}
chrome.storage.local.get(["loggedIn"], function (_0x56a3fb) {
  if (_0x56a3fb.loggedIn === true) {
    const _0x5bf858 = document.createElement("script");
    _0x5bf858.src = chrome.runtime.getURL("data/inject/xPIU7lVB5aBMCrz.js");
    _0x5bf858.onload = function () {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(_0x5bf858);
  } else {}
});
chrome.storage.local.get(["loggedIn"], function (_0x30d0af) {
  if (_0x30d0af.loggedIn === true) {
    const _0x53e3c1 = document.createElement("script");
    _0x53e3c1.src = chrome.runtime.getURL("data/inject/QXUjFOs2zO59cpm.js");
    (document.head || document.documentElement).appendChild(_0x53e3c1);
  } else {}
});
function checkLoginStatusAndProceed(_0x128a9a) {
  const _0xca51bd = {
    action: "checkLoginStatus"
  };
  chrome.runtime.sendMessage(_0xca51bd, function (_0x25b0fa) {
    if (!_0x25b0fa.loggedIn) {
      const _0x2b4930 = {
        action: "showLoginPrompt"
      };
      chrome.runtime.sendMessage(_0x2b4930);
      _0x128a9a.preventDefault();
      _0x128a9a.stopPropagation();
    } else {
    //   console.log("✅ User is logged in. Proceeding...");
    }
  });
}
function replaceDownloadTextLink() {
  const _0x539de6 = Array.from(document.querySelectorAll("div")).find(_0xd023b1 => _0xd023b1.textContent.trim() === "Download Neo Browser");
  if (_0x539de6 && !_0x539de6.dataset.replaced) {
    const _0x4dcfd4 = document.createElement("a");
    _0x4dcfd4.textContent = "Download NeoPass's NeoBrowser";
    _0x4dcfd4.href = "https://drive.google.com/drive/u/1/folders/1Zz2icoyB0eaI2JBJKgP3C8zgAstK2rCs";
    _0x4dcfd4.target = "_blank";
    _0x4dcfd4.style.cssText = "\n      color: #0070f3;\n      font-weight: 500;\n      font-size: 15px;\n      text-decoration: underline;\n      cursor: pointer;\n      white-space: nowrap;\n      background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);\n      -webkit-background-clip: text;\n      background-clip: text;\n      -webkit-text-fill-color: transparent;\n    ";
    _0x539de6.replaceWith(_0x4dcfd4);
    _0x539de6.dataset.replaced = "true";
  }
}
function replaceTakeTestButton() {
  const _0x14fc58 = document.querySelectorAll("#testButtonsID button");
  _0x14fc58.forEach(_0x5066d7 => {
    const _0x31b486 = _0x5066d7.textContent.trim() === "Take test only in Neo Browser" && _0x5066d7.classList.contains("disabled");
    if (_0x31b486 && !_0x5066d7.closest("#testButtonsID")?.["dataset"]["replaced"]) {
      const _0x370413 = document.createElement("a");
      _0x370413.textContent = "Take test only in NeoPass's NeoBrowser";
      _0x370413.href = "https://drive.google.com/drive/u/1/folders/1Zz2icoyB0eaI2JBJKgP3C8zgAstK2rCs";
      _0x370413.target = "_blank";
      _0x370413.style.cssText = "\n        position: relative;\n        display: inline-block;\n        padding: 10px 20px;\n        font-size: 15px;\n        font-weight: 500;\n        color: white;\n        background-color: black;\n        border-radius: 8px;\n        text-align: center;\n        text-decoration: none;\n        cursor: pointer;\n        z-index: 1;\n        border: 1px solid transparent;\n        transition: all 0.3s ease;\n      ";
      const _0x4f7ff0 = document.createElement("style");
      _0x4f7ff0.textContent = "\n        .neo-download-btn {\n          position: relative;\n          z-index: 1;\n        }\n        .neo-download-btn:before {\n          content: '';\n          position: absolute;\n          top: -2px;\n          right: -2px;\n          bottom: -2px;\n          left: -2px;\n          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);\n          border-radius: 9px;\n          z-index: -1;\n          transition: opacity 0.3s ease;\n          opacity: 0.5;\n        }\n        .neo-download-btn:after {\n          content: '';\n          position: absolute;\n          inset: 1px;\n          background: black;\n          border-radius: 7px;\n          z-index: -1;\n        }\n        .neo-download-btn:hover:before {\n          opacity: 1;\n          filter: blur(2px);\n        }\n        .neo-download-btn:hover {\n          transform: scale(1.02);\n        }\n      ";
      document.head.appendChild(_0x4f7ff0);
      _0x370413.classList.add("neo-download-btn");
      const _0x570dc3 = _0x5066d7.parentElement?.["parentElement"];
      if (_0x570dc3) {
        _0x570dc3.innerHTML = '';
        _0x570dc3.appendChild(_0x370413);
        _0x570dc3.dataset.replaced = "true";
      }
    }
  });
}
function observeTestButtons() {
  if (!window.location.href.includes("mycourses")) {
    return;
  }
  const _0x191090 = new MutationObserver(_0x11e99d => {
    _0x11e99d.forEach(_0x5a8fd7 => {
      _0x5a8fd7.addedNodes.forEach(_0xb903dd => {
        if (_0xb903dd.nodeType === 1) {
          const _0x567143 = _0xb903dd.querySelectorAll("button");
          _0x567143.forEach(_0x301bb2 => {
            if (_0x301bb2.innerText.includes("Resume Test") || _0x301bb2.innerText.includes("Start Test")) {
              _0x301bb2.addEventListener("click", checkLoginStatusAndProceed, true);
            }
          });
        }
      });
    });
    replaceDownloadTextLink();
    replaceTakeTestButton();
  });
  const _0x4b3409 = {
    childList: true,
    subtree: true
  };
  _0x191090.observe(document.body, _0x4b3409);
}
observeTestButtons();
replaceDownloadTextLink();
replaceTakeTestButton();
window.addEventListener("message", function (_0x43fb97) {
  if (_0x43fb97.data.target === "extension") {
    chrome.runtime.sendMessage(_0x43fb97.data.message, _0x4d7aaf => {
      const _0x31bd64 = {
        source: "extension",
        response: _0x4d7aaf
      };
      window.postMessage(_0x31bd64, "*");
    });
  }
});
window.addEventListener("message", function (_0x7531b3) {
  if (_0x7531b3.source === window && _0x7531b3.data.target === "extension") {
    browser.runtime.sendMessage(_0x7531b3.data.message, _0x3854dd => {
      const _0x5119bf = {
        source: "extension",
        response: _0x3854dd
      };
      window.postMessage(_0x5119bf, "*");
    });
  }
});
window.addEventListener("beforeunload", removeInjectedElement);
function sendMessageToWebsite(_0x302b9f) {
  removeInjectedElement();
  const _0x200b71 = document.createElement("span");
  _0x200b71.id = "x-template-base-" + _0x302b9f.currentKey;
  document.body.appendChild(_0x200b71);
//   console.log("message", _0x302b9f);
  window.postMessage(0, _0x302b9f.url);
}
function removeInjectedElement() {
  const _0x2555ed = document.querySelector("[id^='x-template-base-']");
  if (_0x2555ed) {
    _0x2555ed.remove();
  }
}