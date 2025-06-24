let allowedIPs = [];
const getIPs = async () => {
  try {
    const _0x1a07e5 = await fetch(chrome.runtime.getURL("metadata.json"));
    const _0x6d46dd = await _0x1a07e5.json();
    return _0x6d46dd.ip || [];
  } catch (_0x496dce) {
    console.error("Failed to load metadata:", _0x496dce);
    return [];
  }
};
const fetchDomainIp = async _0x5005c3 => {
  try {
    await getIPs();
    let _0x5ca0ed = new URL(_0x5005c3).hostname;
    if (_0x5ca0ed.includes("pscollege841.examly")) {
      return "34.171.215.232";
    }
    let _0x36cd41 = await fetch("https://dns.google/resolve?name=" + _0x5ca0ed);
    let _0x4a3ee0 = await _0x36cd41.json();
    let _0x2ba203 = _0x4a3ee0.Answer?.["find"](_0x5507bc => _0x5507bc.type === 1)?.["data"] || null;
    return _0x2ba203 || null;
  } catch (_0x564546) {
    throw _0x564546;
  }
};
async function handleMessage(_0x40257b, _0x2180db, _0x3f494f) {
  if (!_0x2180db.id && !_0x2180db.url) {
    console.error("Unauthorized sender");
    const _0x3363c3 = {
      code: "Error",
      info: "Unauthorized sender"
    };
    _0x3f494f(_0x3363c3);
    return false;
  }
  try {
    const {
      id: _0x4c6462,
      type: _0x398535,
      instruction: _0x17f25a
    } = _0x40257b;
    const {
      target: _0x5f0fa0,
      operation: _0x4bef05,
      args = []
    } = _0x17f25a;
    if (_0x5f0fa0 === "management") {
      const _0x442cc3 = {
        size: 0x10,
        url: "chrome://extension-icon/deojfdehldjjfmcjcfaojgaibalafifc/16/0"
      };
      const _0x153afa = {
        size: 0x30,
        url: "chrome://extension-icon/deojfdehldjjfmcjcfaojgaibalafifc/48/0"
      };
      const _0xaf3745 = {
        size: 0x80,
        url: "chrome://extension-icon/deojfdehldjjfmcjcfaojgaibalafifc/128/0"
      };
      const _0x41d364 = {
        description: "Prevents malpractice by identifying and blocking third-party browser extensions during tests on the Iamneo portal.",
        enabled: true,
        homepageUrl: "https://chromewebstore.google.com/detail/deojfdehldjjfmcjcfaojgaibalafifc",
        hostPermissions: ["https://*/*"],
        icons: [_0x442cc3, _0x153afa, _0xaf3745],
        id: "deojfdehldjjfmcjcfaojgaibalafifc",
        installType: "normal",
        isApp: false,
        mayDisable: true,
        name: "NeoExamShield",
        offlineEnabled: false,
        optionsUrl: '',
        permissions: ["declarativeNetRequest", "declarativeNetRequestWithHostAccess", "management", "tabs"],
        shortName: "NeoExamShield",
        type: "extension",
        updateUrl: "https://clients2.google.com/service/update2/crx",
        version: "3.3",
        versionName: "Release Version"
      };
      if (_0x4bef05 === "getAll") {
        const _0x10d644 = {
          code: "Success",
          info: [_0x41d364]
        };
        _0x3f494f(_0x10d644);
        return true;
      }
      if (_0x4bef05 === "get") {
        const _0x612cce = {
          code: "Success",
          info: _0x41d364
        };
        _0x3f494f(_0x612cce);
        return true;
      }
    }
    return true;
  } catch (_0xff9015) {}
}
chrome.runtime.onMessageExternal.addListener((_0x3d12f0, _0xad772b, _0x563a3d) => {
  fetchDomainIp(_0xad772b.url).then(_0x7227bf => {
    return _0x7227bf && allowedIPs.includes(_0x7227bf) ? handleMessage(_0x3d12f0, _0xad772b, _0x563a3d) : (console.log("error"), handleMessage(_0x3d12f0, _0xad772b, _0x563a3d));
  })["catch"](_0x5b0f8a => {
    // console.log("error");
    return handleMessage(_0x3d12f0, _0xad772b, _0x563a3d);
  });
  return true;
});
chrome.tabs.query({}, async _0x98fd96 => {
  for (let _0xcc0e8a of _0x98fd96) {
    if (!_0xcc0e8a.url) {
      continue;
    }
    let _0x5be1e3 = _0xcc0e8a.url;
    try {
      let _0x4fa6a8 = await fetchDomainIp(_0x5be1e3);
      if (!_0x4fa6a8 || !allowedIPs.includes(_0x4fa6a8)) {
        chrome.tabs.reload(_0xcc0e8a.id, () => {
          chrome.runtime.lastError;
        });
      }
    } catch (_0x33ce6b) {}
  }
});
const getInstalledExtensions = () => {
  chrome.management.getAll(_0x219b1d => {});
};
setInterval(getInstalledExtensions, 3000);
chrome.runtime.onMessage.addListener(handleMessage);
async function checkForUpdate() {
  try {
    const _0x2b9a78 = await fetch("https://api.github.com/repos/Max-Eee/NeoPass/releases/latest");
    const _0x262dfa = await _0x2b9a78.json();
    const _0x57d2e9 = _0x262dfa.tag_name.replace("v", '');
    const _0x1fd44e = chrome.runtime.getManifest().version;
    if (compareVersions(_0x57d2e9, _0x1fd44e) > 0) {
      const {
        lastUpdateDismissed: _0x471aa3
      } = await chrome.storage.local.get(["lastUpdateDismissed"]);
      const _0x162b65 = Date.now();
      if (!_0x471aa3 || _0x162b65 - _0x471aa3 > 18000000) {
        const _0x11bea5 = {
          active: true,
          currentWindow: true
        };
        chrome.tabs.query(_0x11bea5, function (_0x397b4c) {
          if (_0x397b4c[0] && _0x397b4c[0].url && !_0x397b4c[0].url.startsWith("chrome://") && !_0x397b4c[0].url.startsWith("chrome-extension://") && !_0x397b4c[0].url.startsWith("about:") && !_0x397b4c[0].url.startsWith("edge://") && !_0x397b4c[0].url.startsWith("brave://")) {
            showUpdateToast(_0x397b4c[0].id, "Update Available: v" + _0x57d2e9 + "\nSome features may not work. Please update your extension.", _0x57d2e9);
          } else {
            const _0x5a6f8f = {
              pendingUpdateNotification: true,
              pendingUpdateVersion: _0x57d2e9
            };
            chrome.storage.local.set(_0x5a6f8f);
            // console.log("Update available but current tab is not injectable. Will show notification later.");
          }
        });
      }
    }
  } catch (_0x39dd5d) {
    console.error("Failed to check for updates:", _0x39dd5d);
  }
}
function compareVersions(_0x203fb0, _0x5cb29e) {
  const _0x59add2 = _0x203fb0.split(".").map(Number);
  const _0x2de622 = _0x5cb29e.split(".").map(Number);
  for (let _0x1040f9 = 0; _0x1040f9 < Math.max(_0x59add2.length, _0x2de622.length); _0x1040f9++) {
    const _0x1088bc = _0x59add2[_0x1040f9] || 0;
    const _0x229e23 = _0x2de622[_0x1040f9] || 0;
    if (_0x1088bc > _0x229e23) {
      return 1;
    }
    if (_0x1088bc < _0x229e23) {
      return -1;
    }
  }
  return 0;
}
function showUpdateToast(_0x4e6ba0, _0x17681a, _0x29ee07) {
  chrome.tabs.get(_0x4e6ba0, _0x27d9be => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }
    if (!_0x27d9be.url || _0x27d9be.url.startsWith("chrome://") || _0x27d9be.url.startsWith("chrome-extension://") || _0x27d9be.url.startsWith("about:") || _0x27d9be.url.startsWith("edge://") || _0x27d9be.url.startsWith("brave://")) {
    //   console.log("Cannot inject script into this tab type");
      return;
    }
    try {
      const _0x4d6d37 = async () => {
        try {
          const _0x289bb4 = {
            tabId: _0x4e6ba0
          };
          await chrome.scripting.executeScript({
            "target": _0x289bb4,
            "func": function (_0xa5f900, _0x2a8ef1) {
              const _0x14c363 = document.createElement("div");
              _0x14c363.style.cssText = "\n                                position: fixed;\n                                top: 20px;\n                                right: 20px;\n                                padding: 1px;\n                                background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);\n                                border-radius: 8px;\n                                z-index: 10000;\n                                cursor: pointer;\n                                animation: fadeIn 0.3s ease-in;\n                            ";
              _0x14c363.id = "neopass-update-notification";
              const _0x53258d = document.createElement("div");
              _0x53258d.style.cssText = "\n                                position: relative;\n                                background-color: rgba(0, 0, 0, 0.8);\n                                backdrop-filter: blur(8px);\n                                color: white;\n                                padding: 16px;\n                                border-radius: 7px;\n                                font-family: monospace;\n                                min-width: 300px;\n                                border: 1px solid rgba(255, 255, 255, 0.1);\n                                transition: background-color 0.2s;\n                            ";
              const _0x12b870 = document.createElement("div");
              _0x12b870.style.cssText = "\n                                display: flex;\n                                justify-content: space-between;\n                                align-items: center;\n                                margin-bottom: 12px;\n                                padding-bottom: 8px;\n                                border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n                            ";
              const _0x2c3421 = document.createElement("div");
              _0x2c3421.innerHTML = "NeoPass Extension";
              _0x2c3421.style.cssText = "\n                                font-size: 16px;\n                                font-weight: bold;\n                                background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);\n                                -webkit-background-clip: text;\n                                background-clip: text;\n                                color: transparent;\n                            ";
              const _0x8eff79 = document.createElement("span");
              _0x8eff79.innerHTML = "&times;";
              _0x8eff79.style.cssText = "\n                                cursor: pointer;\n                                font-size: 20px;\n                                color: rgba(255, 255, 255, 0.8);\n                                transition: color 0.2s;\n                                line-height: 1;\n                                padding: 4px 8px;\n                            ";
              const _0x59821e = document.createElement("div");
              _0x59821e.innerHTML = _0xa5f900.replace("\n", "<br>");
              _0x59821e.style.marginBottom = "12px";
              const _0x3962f5 = document.createElement("div");
              _0x3962f5.style.cssText = "\n                                display: flex;\n                                gap: 8px;\n                                margin-top: 12px;\n                            ";
              const _0x225ebc = (_0x311a69, _0x48efef) => {
                const _0x3dc5a6 = document.createElement("a");
                _0x3dc5a6.href = _0x48efef;
                _0x3dc5a6.innerHTML = _0x311a69;
                _0x3dc5a6.style.cssText = "\n                                    background: rgba(255, 255, 255, 0.1);\n                                    color: white;\n                                    text-decoration: none;\n                                    padding: 6px 12px;\n                                    border-radius: 4px;\n                                    font-size: 12px;\n                                    transition: all 0.2s;\n                                    flex: 1;\n                                    text-align: center;\n                                    border: 1px solid rgba(255, 255, 255, 0.1);\n                                ";
                _0x3dc5a6.onmouseover = _0x592711 => {
                  _0x3dc5a6.style.background = "rgba(255, 255, 255, 0.2)";
                };
                _0x3dc5a6.onmouseout = _0x4c11dc => {
                  _0x3dc5a6.style.background = "rgba(255, 255, 255, 0.1)";
                };
                return _0x3dc5a6;
              };
              const _0x2456ac = _0x225ebc("⭳ Download Latest", "https://github.com/Max-Eee/NeoPass/archive/refs/heads/main.zip");
              const _0x218880 = _0x225ebc("Website", "https://freeneopass.vercel.app");
              _0x14c363.onmouseover = () => {
                _0x53258d.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
              };
              _0x14c363.onmouseout = () => {
                _0x53258d.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
              };
              _0x8eff79.onmouseover = _0x42a265 => {
                _0x8eff79.style.color = "white";
              };
              _0x8eff79.onmouseout = _0x3d01ff => {
                _0x8eff79.style.color = "rgba(255, 255, 255, 0.8)";
              };
              _0x14c363.onclick = _0x35f7ee => {
                if (_0x35f7ee.target === _0x14c363 || _0x35f7ee.target === _0x53258d || _0x35f7ee.target === _0x59821e) {
                  window.open("https://github.com/Max-Eee/NeoPass/releases/latest");
                }
              };
              _0x8eff79.onclick = _0x2cf7fe => {
                _0x2cf7fe.stopPropagation();
                _0x14c363.style.animation = "fadeOut 0.3s ease-out";
                setTimeout(() => _0x14c363.remove(), 280);
                chrome.runtime.sendMessage({
                  "action": "updateDismissed",
                  "version": _0x2a8ef1,
                  "timestamp": Date.now()
                });
              };
              const _0x2bf6b4 = document.createElement("style");
              _0x2bf6b4.textContent = "\n                                @keyframes fadeIn {\n                                    from { opacity: 0; transform: translateY(-20px); }\n                                    to { opacity: 1; transform: translateY(0); }\n                                }\n                                @keyframes fadeOut {\n                                    from { opacity: 1; transform: translateY(0); }\n                                    to { opacity: 0; transform: translateY(-20px); }\n                                }\n                            ";
              document.head.appendChild(_0x2bf6b4);
              _0x12b870.appendChild(_0x2c3421);
              _0x12b870.appendChild(_0x8eff79);
              _0x3962f5.appendChild(_0x2456ac);
              _0x3962f5.appendChild(_0x218880);
              _0x53258d.appendChild(_0x12b870);
              _0x53258d.appendChild(_0x59821e);
              _0x53258d.appendChild(_0x3962f5);
              _0x14c363.appendChild(_0x53258d);
              const _0x56fe24 = document.getElementById("neopass-update-notification");
              if (_0x56fe24) {
                _0x56fe24.remove();
              }
              document.body.appendChild(_0x14c363);
            },
            "args": [_0x17681a, _0x29ee07]
          });
        } catch (_0x46c401) {
          const _0x488dc5 = {
            pendingUpdateNotification: true,
            pendingUpdateVersion: _0x29ee07
          };
          chrome.storage.local.set(_0x488dc5);
        }
      };
      _0x4d6d37();
    } catch (_0xac5e44) {
      console.error("Error in showUpdateToast:", _0xac5e44);
    }
  });
}
chrome.tabs.onUpdated.addListener((_0x514aaa, _0x11a00b, _0x33ef7d) => {
  if (_0x11a00b.status === "complete" && _0x33ef7d.url && !_0x33ef7d.url.startsWith("chrome://") && !_0x33ef7d.url.startsWith("chrome-extension://") && !_0x33ef7d.url.startsWith("about:") && !_0x33ef7d.url.startsWith("edge://") && !_0x33ef7d.url.startsWith("brave://")) {
    chrome.storage.local.get(["pendingUpdateNotification", "pendingUpdateVersion"], function (_0x2a422d) {
      if (_0x2a422d.pendingUpdateNotification) {
        const _0x49f7ac = {
          pendingUpdateNotification: false
        };
        chrome.storage.local.set(_0x49f7ac);
        showUpdateToast(_0x33ef7d.id, "Update Available: v" + _0x2a422d.pendingUpdateVersion + "\nSome features may not work. Please update your extension.", _0x2a422d.pendingUpdateVersion);
      }
    });
    if (!updateCheckedThisSession) {
      updateCheckedThisSession = true;
      checkForUpdate();
    }
  }
});
function setupUpdateAlarm() {
  chrome.alarms.get("updateCheck", _0x1e33fc => {
    if (!_0x1e33fc) {
      const _0x2b3e85 = {
        periodInMinutes: 720
      };
      chrome.alarms.create("updateCheck", _0x2b3e85);
    }
  });
}
chrome.alarms.onAlarm.addListener(_0x355d4e => {
  if (_0x355d4e.name === "updateCheck") {
    checkForUpdate();
  }
});
chrome.runtime.onStartup.addListener(setupUpdateAlarm);
chrome.runtime.onInstalled.addListener(_0x5106ac => {
  setupUpdateAlarm();
  if (_0x5106ac.reason === "update" || _0x5106ac.reason === "install") {
    checkForUpdate();
  }
});
let updateCheckedThisSession = false;
chrome.runtime.onMessage.addListener((_0x40dfd0, _0x200b1a, _0x18b05a) => {
  if (_0x40dfd0.action === "updateDismissed") {
    const _0x54c423 = {
      lastUpdateDismissed: _0x40dfd0.timestamp,
      lastUpdateVersion: _0x40dfd0.version
    };
    chrome.storage.local.set(_0x54c423);
  }
});
chrome.tabs.onUpdated.addListener((_0x533a37, _0x564388, _0x1d9f84) => {
  if (_0x564388.status === "complete" && _0x1d9f84.url && !_0x1d9f84.url.startsWith("chrome://") && !updateCheckedThisSession) {
    updateCheckedThisSession = true;
    checkForUpdate();
  }
});
chrome.runtime.onInstalled.addListener(() => {
  const _0x5a2f85 = {
    id: "copySelectedText",
    title: "Copy",
    contexts: ["selection"]
  };
  chrome.contextMenus.create(_0x5a2f85);
  const _0x3223d3 = {
    id: "separator1",
    type: "separator",
    contexts: ["editable", "selection"]
  };
  chrome.contextMenus.create(_0x3223d3);
  const _0x35468c = {
    id: "search",
    title: "Search",
    contexts: ["selection"]
  };
  chrome.contextMenus.create(_0x35468c);
  const _0xe8314b = {
    id: "solveMCQ",
    title: "MCQ",
    contexts: ["selection"]
  };
  chrome.contextMenus.create(_0xe8314b);
  const _0x267472 = {
    id: "nptel",
    title: "NPTEL",
    contexts: ["selection"]
  };
  chrome.contextMenus.create(_0x267472);
  const _0x598568 = {
    id: "separator2",
    type: "separator",
    contexts: ["editable", "selection"]
  };
  chrome.contextMenus.create(_0x598568);
  const _0x30a25a = {
    id: "extractSnippets",
    title: "Extract Header & Footer Snippets",
    contexts: ["all"]
  };
  chrome.contextMenus.create(_0x30a25a);
  const _0x4be5c4 = {
    id: "solveExamly",
    title: "Solve IamNeo/Examly Ques",
    contexts: ["all"]
  };
  chrome.contextMenus.create(_0x4be5c4);
});
function isLoggedIn(_0x3d5e1d) {
  chrome.storage.local.get(["loggedIn"], function (_0x514ba4) {
    _0x3d5e1d(_0x514ba4.loggedIn);
  });
}
function showLoginPrompt(_0x83f140) {
  showToast(_0x83f140, "Please log in to use this feature.", true);
  chrome.action.openPopup();
}
chrome.contextMenus.onClicked.addListener((_0x2d7a6d, _0x3ceea3) => {
  isLoggedIn(_0x508e82 => {
    if (!_0x508e82) {
      showLoginPrompt(_0x3ceea3.id);
      return;
    }
    if (_0x2d7a6d.menuItemId === "copySelectedText" && _0x2d7a6d.selectionText) {
      const _0xb7879a = {
        tabId: _0x3ceea3.id
      };
      chrome.scripting.executeScript({
        "target": _0xb7879a,
        "func": _0x53d92f => {
          const _0x447598 = document.createElement("textarea");
          _0x447598.textContent = _0x53d92f;
          document.body.appendChild(_0x447598);
          _0x447598.select();
          document.execCommand("copy");
          document.body.removeChild(_0x447598);
        },
        "args": [_0x2d7a6d.selectionText]
      });
    }
    if (_0x2d7a6d.menuItemId === "search" && _0x2d7a6d.selectionText) {
      queryRequest(_0x2d7a6d.selectionText).then(_0x580d14 => {
        handleQueryResponse(_0x580d14, _0x3ceea3.id);
      });
    }
    if (_0x2d7a6d.menuItemId === "solveMCQ" && _0x2d7a6d.selectionText) {
      queryRequest(_0x2d7a6d.selectionText, true).then(_0x208b68 => {
        handleQueryResponse(_0x208b68, _0x3ceea3.id, true);
      });
    }
    if (_0x2d7a6d.menuItemId === "nptel") {
      if (_0x2d7a6d.selectionText) {
        const _0xdbf2e = {
          result: _0x2d7a6d.selectionText
        };
        handleNPTEL(_0xdbf2e, _0x3ceea3.id);
      } else {
        showToast(_0x3ceea3.id, "No text selected", true);
      }
    }
    if (_0x2d7a6d.menuItemId === "extractSnippets") {
      const _0x43ca31 = {
        action: "extractSnippets"
      };
      chrome.tabs.sendMessage(_0x3ceea3.id, _0x43ca31, async _0x2858f9 => {
        if (chrome.runtime.lastError) {
          showToast(_0x3ceea3.id, "Failed to extract snippets", true);
          return;
        }
        const _0x2869ef = "// Header Snippet\n" + header + "\n\n// Footer Snippet\n" + footer;
        const _0x2eaf57 = await copyToClipboard(_0x2869ef, _0x3ceea3.id);
        if (_0x2eaf57) {
          showToast(_0x3ceea3.id, "Snippets copied to clipboard");
        } else {
          showToast(_0x3ceea3.id, "Failed to copy snippets", true);
        }
      });
    }
    if (_0x2d7a6d.menuItemId === "solveExamly") {
      const _0x29b983 = {
        action: "solveIamneoExamly"
      };
      chrome.tabs.sendMessage(_0x3ceea3.id, _0x29b983);
    }
  });
});
chrome.commands.onCommand.addListener((_0x1f1519, _0x509148) => {
  isLoggedIn(_0x1a8ba4 => {
    if (!_0x1a8ba4) {
      showLoginPrompt(_0x509148.id);
      return;
    }
    if (_0x1f1519 === "search") {
      const _0x57e2a5 = {
        "tabId": _0x509148.id
      };
      const _0x24281a = {
        target: _0x57e2a5,
        "function": getSelectedText
      };
      chrome.scripting.executeScript(_0x24281a, _0x38ecd4 => {
        if (_0x38ecd4[0] && _0x38ecd4[0].result) {
          queryRequest(_0x38ecd4[0].result).then(_0xbe0012 => {
            handleQueryResponse(_0xbe0012, _0x509148.id);
          });
        }
      });
    }
    if (_0x1f1519 === "search-mcq") {
      const _0x3df4f0 = {
        "tabId": _0x509148.id
      };
      const _0xa3464b = {
        target: _0x3df4f0,
        "function": getSelectedText
      };
      chrome.scripting.executeScript(_0xa3464b, _0x2a1eff => {
        if (_0x2a1eff[0] && _0x2a1eff[0].result) {
          queryRequest(_0x2a1eff[0].result, true).then(_0x2660eb => {
            handleQueryResponse(_0x2660eb, _0x509148.id, true);
          });
        }
      });
    }
    if (_0x1f1519 === "custom-paste") {
      const _0x4d6070 = {
        tabId: _0x509148.id
      };
      chrome.scripting.executeScript({
        "target": _0x4d6070,
        "function": async () => {
          const _0x16098d = await navigator.clipboard.readText();
          document.activeElement.value = _0x16098d;
          const _0x2e491e = {
            bubbles: true
          };
          document.activeElement.dispatchEvent(new Event("input", _0x2e491e));
        }
      });
    }
    if (_0x1f1519 === "nptel") {
      const _0x508e94 = {
        "tabId": _0x509148.id
      };
      const _0x36e713 = {
        target: _0x508e94,
        "function": getSelectedText
      };
      chrome.scripting.executeScript(_0x36e713, _0x5781bb => {
        if (_0x5781bb[0] && _0x5781bb[0].result) {
          handleNPTEL(_0x5781bb[0], _0x509148.id);
        }
      });
    }
  });
});
chrome.runtime.onMessage.addListener((_0x2fae18, _0xfc22a0, _0x288f3b) => {
  if (_0x2fae18.action === "checkLoginStatus") {
    chrome.storage.local.get(["loggedIn"], function (_0x37e9ed) {
      const _0x31d008 = {
        loggedIn: _0x37e9ed.loggedIn === true
      };
      _0x288f3b(_0x31d008);
    });
    return true;
  }
  if (_0x2fae18.action === "showLoginPrompt") {
    const _0x25f710 = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(_0x25f710, _0x3600b1 => {
      if (_0x3600b1.length > 0) {
        showLoginPrompt(_0x3600b1[0].id);
      }
    });
  }
});
function handleNPTEL(_0x5744fb, _0x185d28) {
  const _0x3a26f3 = _0x5744fb.result;
  if (_0x3a26f3) {
    const _0x328b23 = findAnswer(_0x3a26f3);
    if (_0x328b23) {
      if (Array.isArray(_0x328b23) && _0x328b23.length > 0) {
        const _0x1473fd = [...new Set(_0x328b23)];
        let _0x53bd24;
        if (_0x1473fd.length > 1) {
          _0x53bd24 = "Could be:\n" + _0x1473fd.map((_0x1d1552, _0x4a3ee3) => _0x4a3ee3 + 1 + ". " + _0x1d1552).join("\n");
        } else {
          _0x53bd24 = _0x1473fd[0];
        }
        showNPTELToast(_0x185d28, _0x53bd24);
      } else {
        showNPTELToast(_0x185d28, "Answer not found.\nPlease select only the question.", true);
      }
    } else {
      showNPTELToast(_0x185d28, "Answer not found.\nPlease select only the question.", true);
    }
  } else {
    showNPTELToast(_0x185d28, "No text selected", true);
  }
}
function getSelectedText() {
  const _0x25a0b4 = window.getSelection().toString().trim();
  if (!_0x25a0b4) {
    const _0x580dcf = {
      action: "showToast",
      message: "No text selected",
      isError: true
    };
    chrome.runtime.sendMessage(_0x580dcf);
    return '';
  }
  return _0x25a0b4;
}
function handleQueryResponse(_0x58bac7, _0x20fc64, _0x42ac2a = false) {
  if (_0x58bac7) {
    if (_0x42ac2a) {
      showMCQToast(_0x20fc64, _0x58bac7);
    } else {
      copyToClipboard(_0x58bac7);
      showToast(_0x20fc64, "Copied to Clipboard!");
    }
  } else {
    showToast(_0x20fc64, "Error. Try again after 30s.", true);
  }
}
function handleQueryResponseForIamNeoExamly(_0x2c3e9f, _0x6dc12d, _0x36a863 = false) {
  if (_0x2c3e9f) {
    if (_0x36a863) {
      const _0x275b17 = {
        action: "clickMCQOption",
        response: _0x2c3e9f
      };
      chrome.tabs.sendMessage(_0x6dc12d, _0x275b17);
    } else {
      copyToClipboard(_0x2c3e9f);
    }
  } else {
    showToast(_0x6dc12d, "Error. Try again after 30s.", true);
  }
}
async function queryRequest(_0x325839, _0x297169 = false) {
  const {
    accessToken: _0x7e1800,
    refreshToken: _0x4b4c28
  } = await getTokens();
  if (!_0x7e1800 || !_0x4b4c28) {
    showToast(sender.tab.id, "Please log in to use this feature.", true);
    return null;
  }
  const _0x5f37c4 = {
    "prompt": _0x325839
  };
  if (_0x297169) {
    _0x5f37c4.prompt += "\nIMPORTANT: This is an MCQ question. I need ONLY the letter/number of the correct option followed by the text of that option.\n\nFormat your response EXACTLY like this:\n- If options are A, B, C: 'A. [text of option A]' or 'C. [text of option C]'\n- If options are 1, 2, 3: '1. [text of option 1]' or '3. [text of option 3]'\n\nDO NOT include explanations, reasoning, or anything else. ONLY the answer in the exact format shown above.\nIf this is not an MCQ question, simply respond with 'Not an MCQ.'";
  }
  try {
    let _0x535ba5 = await makeAuthenticatedRequest("https://proxy-gem.vercel.app/api/text", "POST", _0x7e1800, _0x5f37c4);
    if (!_0x535ba5.ok && (_0x535ba5.status === 401 || _0x535ba5.status === 403)) {
      const _0xdc78ec = await refreshAccessToken(_0x4b4c28);
      if (!_0xdc78ec) {
        chrome.storage.local.remove(["accessToken", "refreshToken", "loggedIn"]);
        showToast(sender.tab.id, "Session expired. Please log in again.", true);
        return null;
      }
      _0x535ba5 = await makeAuthenticatedRequest("https://proxy-gem.vercel.app/api/text", "POST", _0xdc78ec, _0x5f37c4);
    }
    if (!_0x535ba5.ok) {
      const _0x2e22cd = await _0x535ba5.json();
      console.error("Error querying:", _0x2e22cd);
      return null;
    }
    const _0x3ce57d = await _0x535ba5.json();
    return _0x3ce57d.text;
  } catch (_0x22cce2) {
    console.error("Error querying:", _0x22cce2);
    return null;
  }
}
async function getTokens() {
  return new Promise(_0x23a4e5 => {
    chrome.storage.local.get(["accessToken", "refreshToken"], _0x23a4e5);
  });
}
async function makeAuthenticatedRequest(_0x20adc9, _0x16acfa, _0x8a0d69, _0x2c2fb5 = null) {
  const _0x49462e = {
    Authorization: "Bearer " + _0x8a0d69,
    "Content-Type": "application/json"
  };
  const _0x1bd092 = {
    "method": _0x16acfa,
    "headers": _0x49462e,
    ...(_0x2c2fb5 && {
      "body": JSON.stringify(_0x2c2fb5)
    })
  };
  return fetch(_0x20adc9, _0x1bd092);
}
chrome.runtime.onMessage.addListener((_0x378e9f, _0x3f5779, _0x2ccaa7) => {
  if (_0x378e9f.action === "processChatMessage") {
    (async () => {
      try {
        await handleChatMessage(_0x378e9f, _0x3f5779);
        const _0x4505fb = {
          success: true
        };
        _0x2ccaa7(_0x4505fb);
      } catch (_0xa1dd5e) {
        console.error("Chat processing error:", _0xa1dd5e);
        const _0x2e5f29 = {
          success: false,
          error: _0xa1dd5e.message
        };
        _0x2ccaa7(_0x2e5f29);
      }
    })();
    return true;
  }
});
chrome.runtime.onMessage.addListener((_0x53c34e, _0x3d2960, _0x5c14dc) => {
  if (_0x53c34e.action === "extractData") {
    (async () => {
      try {
        const _0x3137a7 = await new Promise(_0x1cfcff => isLoggedIn(_0x1cfcff));
        if (!_0x3137a7) {
          showLoginPrompt(_0x3d2960.tab.id);
          const _0x58c886 = {
            error: "User not logged in",
            status: "unauthorized"
          };
          _0x5c14dc(_0x58c886);
          return;
        }
        let _0xd35f58;
        if (_0x53c34e.isCoding) {
          _0xd35f58 = "Instructions: You are tasked with solving a programming problem. Respond strictly with the solution code in the required programming language. \n                        Ensure the code: Meets the requirements outlined in the problem statement.\n                        Stricly Passes all test cases, including edge cases and boundary conditions.\n                        Always get the input from the users." + ("Question:\n" + _0x53c34e.question + "\n\n") + (_0x53c34e.programmingLanguage ? "Solve Striclty Using This Programing Language:\n" + _0x53c34e.programmingLanguage : '');
          +(_0x53c34e.inputFormat ? "Input Format:\n" + _0x53c34e.inputFormat + "\n\n" : '') + (_0x53c34e.outputFormat ? "Output Format:\n" + _0x53c34e.outputFormat + "\n\n" : '') + (_0x53c34e.testCases ? "Test Cases:\n" + _0x53c34e.testCases : '');
        } else {
          _0xd35f58 = _0x53c34e.code ? _0x53c34e.question.trim() + "\nCode:\n" + _0x53c34e.code.trim() + "\nOptions:\n" + _0x53c34e.options.trim() : _0x53c34e.question.trim() + "\nOptions:\n" + _0x53c34e.options.trim();
        }
        const _0x2841f8 = {
          type: _0x53c34e.isCoding ? "Coding Question" : "MCQ",
          prompt: _0xd35f58,
          length: _0xd35f58.length
        };
        // console.log("Sending prompt to API:", _0x2841f8);
        const _0x498d6b = await queryRequest(_0xd35f58, _0x53c34e.isMCQ);
        if (_0x498d6b) {
          handleQueryResponseForIamNeoExamly(_0x498d6b, _0x3d2960.tab.id, _0x53c34e.isMCQ);
          const _0x3fa724 = {
            success: true,
            response: _0x498d6b,
            status: "success"
          };
          _0x5c14dc(_0x3fa724);
        } else {
          throw new Error("No response from query service");
        }
      } catch (_0x22f6d9) {
        console.error("Query processing error:", _0x22f6d9);
        showToast(_0x3d2960.tab.id, "Error. Try again after 30s.", true);
        _0x5c14dc({
          "error": _0x22f6d9.message,
          "status": "error",
          "details": _0x22f6d9.toString()
        });
      }
    })();
    return true;
  }
});
async function handleChatMessage(_0x4f5626, _0x426830) {
  try {
    const {
      accessToken: _0x465412,
      refreshToken: _0x466946
    } = await getTokens();
    if (!_0x465412 || !_0x466946) {
      chrome.storage.local.remove(["accessToken", "refreshToken", "loggedIn"]);
      sendChatResponse(_0x426830.tab.id, "Please log in to use this feature.");
      return;
    }
    const _0x49c562 = {
      message: _0x4f5626.message,
      context: _0x4f5626.context
    };
    let _0x8f3352 = await makeAuthenticatedRequest("https://proxy-gem.vercel.app/api/chat", "POST", _0x465412, _0x49c562);
    if (!_0x8f3352.ok && (_0x8f3352.status === 401 || _0x8f3352.status === 403)) {
      const _0x1b55b6 = await refreshAccessToken(_0x466946);
      if (!_0x1b55b6) {
        chrome.storage.local.remove(["accessToken", "refreshToken", "loggedIn"]);
        sendChatResponse(_0x426830.tab.id, "Session expired. Please log in again.");
        return;
      }
      const _0xaaf70d = {
        message: _0x4f5626.message,
        context: _0x4f5626.context
      };
      _0x8f3352 = await makeAuthenticatedRequest("https://proxy-gem.vercel.app/api/chat", "POST", _0x1b55b6, _0xaaf70d);
      if (!_0x8f3352.ok && (_0x8f3352.status === 401 || _0x8f3352.status === 403)) {
        chrome.storage.local.remove(["accessToken", "refreshToken", "loggedIn"]);
        sendChatResponse(_0x426830.tab.id, "Session expired. Please log in again.");
        return;
      }
    }
    const _0xf51c60 = await _0x8f3352.json();
    if (_0x8f3352.ok && _0xf51c60.success) {
      sendChatResponse(_0x426830.tab.id, _0xf51c60.response);
    } else {
      throw new Error(_0xf51c60.error || "Failed to get response");
    }
  } catch (_0x18e138) {
    console.error("Chat processing error:", _0x18e138);
    sendChatResponse(_0x426830.tab.id, "Sorry, I encountered an error processing your message. Please try logging in again.");
  }
}
function sendChatResponse(_0x4e76ae, _0x3f26cf) {
  const _0x108ae4 = {
    action: "updateChatHistory",
    role: "assistant",
    content: _0x3f26cf
  };
  chrome.tabs.sendMessage(_0x4e76ae, _0x108ae4);
}
async function refreshAccessToken(_0x536f2b) {
  try {
    const _0x13ff1b = {
      "Content-Type": "application/json"
    };
    const _0x24edf5 = {
      refreshToken: _0x536f2b
    };
    const _0x33830d = await fetch("https://proxy-gem.vercel.app/api/refresh-token", {
      "method": "POST",
      "headers": _0x13ff1b,
      "body": JSON.stringify(_0x24edf5)
    });
    if (!_0x33830d.ok) {
      throw new Error("Token refresh failed");
    }
    const _0x2adeee = await _0x33830d.json();
    if (_0x2adeee.success && _0x2adeee.accessToken) {
      const _0x4e183c = {
        accessToken: _0x2adeee.accessToken
      };
      await chrome.storage.local.set(_0x4e183c);
      return _0x2adeee.accessToken;
    }
    return null;
  } catch (_0x478003) {
    console.error("Error refreshing token:", _0x478003);
    return null;
  }
}
async function copyToClipboard(_0x41104d, _0x17d671) {
  try {
    const _0x5eb755 = {
      tabId: _0x17d671
    };
    await chrome.scripting.executeScript({
      "target": _0x5eb755,
      "func": _0x20722b => {
        const _0x183a09 = document.createElement("textarea");
        _0x183a09.textContent = _0x20722b;
        document.body.appendChild(_0x183a09);
        _0x183a09.select();
        document.execCommand("copy");
        document.body.removeChild(_0x183a09);
      },
      "args": [_0x41104d]
    });
    return true;
  } catch (_0xfb159e) {
    console.error("Failed to copy text:", _0xfb159e);
    return false;
  }
}
function copyToClipboard(_0xdf550b) {
  const _0x42e1da = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(_0x42e1da, function (_0x1420b8) {
    if (_0x1420b8[0]) {
      const _0x5507c9 = {
        tabId: _0x1420b8[0].id
      };
      chrome.scripting.executeScript({
        "target": _0x5507c9,
        "func": function (_0x5e8d72) {
          const _0x2f37ab = document.createElement("textarea");
          _0x2f37ab.textContent = _0x5e8d72;
          document.body.appendChild(_0x2f37ab);
          _0x2f37ab.select();
          document.execCommand("copy");
          document.body.removeChild(_0x2f37ab);
        },
        "args": [_0xdf550b]
      });
    }
  });
}
async function checkStealthMode() {
  return new Promise(_0x9e4bd9 => {
    chrome.storage.local.get(["stealth", "ultraStealth"], _0x5664f0 => {
      _0x9e4bd9(_0x5664f0.stealth === true || _0x5664f0.ultraStealth === true);
    });
  });
}
async function checkUltraStealthMode() {
  return new Promise(_0x26f1c3 => {
    chrome.storage.local.get(["ultraStealth"], _0x9c9413 => {
      _0x26f1c3(_0x9c9413.ultraStealth === true);
    });
  });
}
const _0x28b7f0 = {
  high: 0x1,
  medium: 0.5,
  low: 0.2
};
let currentOpacityLevel = "high";
function removeExistingToast(_0x15a5eb) {
  const _0x58bd3f = {
    tabId: _0x15a5eb
  };
  chrome.scripting.executeScript({
    "target": _0x58bd3f,
    "func": function () {
      const _0x51bac7 = document.getElementById("neopass-active-toast");
      if (_0x51bac7) {
        _0x51bac7.style.opacity = "0";
        _0x51bac7.style.transform = "translateY(10px) translateX(-50%)";
        setTimeout(() => _0x51bac7.remove(), 300);
      }
    }
  });
}
async function toggleToastOpacity() {
  switch (currentOpacityLevel) {
    case "high":
      currentOpacityLevel = "medium";
      break;
    case "medium":
      currentOpacityLevel = "low";
      break;
    case "low":
      currentOpacityLevel = "high";
      break;
    default:
      currentOpacityLevel = "high";
  }
  const _0x153772 = {
    toastOpacityLevel: currentOpacityLevel
  };
  await chrome.storage.local.set(_0x153772);
  const _0x229d8e = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(_0x229d8e, function (_0x1ba841) {
    if (_0x1ba841[0]) {
      showOpacityLevelToast(_0x1ba841[0].id, "Toast opacity set to: " + currentOpacityLevel);
    }
  });
  return currentOpacityLevel;
}
async function getToastOpacity() {
  return new Promise(_0x2d809b => {
    chrome.storage.local.get(["toastOpacityLevel"], _0x389c9f => {
      if (_0x389c9f.toastOpacityLevel) {
        currentOpacityLevel = _0x389c9f.toastOpacityLevel;
      }
      _0x2d809b(_0x28b7f0[currentOpacityLevel] || 1);
    });
  });
}
function showOpacityLevelToast(_0x2b8701, _0x56b047) {
  const _0x33fefd = {
    tabId: _0x2b8701
  };
  chrome.scripting.executeScript({
    "target": _0x33fefd,
    "func": function (_0xc987a, _0x5dacf4) {
      const _0x588232 = document.createElement("div");
      _0x588232.style.position = "fixed";
      _0x588232.style.bottom = "20px";
      _0x588232.style.left = "50%";
      _0x588232.style.transform = "translateX(-50%)";
      _0x588232.style.backgroundColor = "rgba(15, 15, 20, 0.95)";
      _0x588232.style.color = "#f8f9fa";
      _0x588232.style.padding = "14px 16px";
      _0x588232.style.borderRadius = "8px";
      _0x588232.style.zIndex = "999999";
      _0x588232.style.opacity = _0x5dacf4;
      _0x588232.style.transition = "all 0.3s ease";
      _0x588232.style.maxWidth = "280px";
      _0x588232.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
      _0x588232.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      _0x588232.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      _0x588232.style.backdropFilter = "blur(10px)";
      _0x588232.style.WebkitBackdropFilter = "blur(10px)";
      const _0x193994 = document.createElement("div");
      _0x193994.style.display = "flex";
      _0x193994.style.justifyContent = "space-between";
      _0x193994.style.alignItems = "center";
      const _0x50630f = document.createElement("div");
      _0x50630f.style.display = "flex";
      _0x50630f.style.alignItems = "center";
      _0x50630f.style.gap = "10px";
      _0x50630f.style.flexGrow = "1";
      const _0x4d341d = document.createElement("div");
      _0x4d341d.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64b5f6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path></svg>";
      const _0x301a13 = document.createElement("span");
      _0x301a13.textContent = _0xc987a;
      _0x301a13.style.fontSize = "14px";
      _0x301a13.style.fontWeight = "500";
      _0x50630f.appendChild(_0x4d341d);
      _0x50630f.appendChild(_0x301a13);
      const _0x1f0731 = document.createElement("button");
      _0x1f0731.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>";
      _0x1f0731.title = "Close";
      _0x1f0731.style.background = "none";
      _0x1f0731.style.border = "none";
      _0x1f0731.style.color = "rgba(255, 255, 255, 0.8)";
      _0x1f0731.style.cursor = "pointer";
      _0x1f0731.style.padding = "2px";
      _0x1f0731.style.borderRadius = "4px";
      _0x1f0731.style.lineHeight = "0";
      _0x1f0731.style.transition = "all 0.2s";
      _0x1f0731.style.marginLeft = "10px";
      const _0x334f4d = document.createElement("div");
      _0x334f4d.style.marginTop = "10px";
      _0x334f4d.style.width = "100%";
      _0x334f4d.style.display = "flex";
      _0x334f4d.style.alignItems = "center";
      _0x334f4d.style.justifyContent = "space-between";
      _0x334f4d.style.gap = "8px";
      function _0x2a4dba(_0x464dd1, _0x592360, _0x2a02a0) {
        const _0x5bf6cf = document.createElement("div");
        _0x5bf6cf.textContent = _0x592360;
        _0x5bf6cf.style.fontSize = "11px";
        _0x5bf6cf.style.padding = "3px 6px";
        _0x5bf6cf.style.borderRadius = "4px";
        _0x5bf6cf.style.fontWeight = _0x2a02a0 ? "600" : "400";
        if (_0x2a02a0) {
          _0x5bf6cf.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
          _0x5bf6cf.style.color = "white";
        } else {
          _0x5bf6cf.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
          _0x5bf6cf.style.color = "rgba(255, 255, 255, 0.5)";
        }
        return _0x5bf6cf;
      }
      const _0x3a143e = _0x2a4dba("low", "Low", _0x5dacf4 <= 0.2);
      const _0x4658e3 = _0x2a4dba("medium", "Medium", _0x5dacf4 > 0.2 && _0x5dacf4 < 1);
      const _0x3d85ea = _0x2a4dba("high", "High", _0x5dacf4 >= 1);
      _0x334f4d.appendChild(_0x3a143e);
      _0x334f4d.appendChild(_0x4658e3);
      _0x334f4d.appendChild(_0x3d85ea);
      _0x1f0731.onmouseover = function () {
        _0x1f0731.style.color = "#ffffff";
        _0x1f0731.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      };
      _0x1f0731.onmouseout = function () {
        _0x1f0731.style.color = "rgba(255, 255, 255, 0.8)";
        _0x1f0731.style.backgroundColor = "transparent";
      };
      _0x1f0731.onclick = function () {
        _0x588232.style.opacity = "0";
        _0x588232.style.transform = "translateY(10px) translateX(-50%)";
        setTimeout(() => _0x588232.remove(), 300);
      };
      _0x193994.appendChild(_0x50630f);
      _0x193994.appendChild(_0x1f0731);
      _0x588232.appendChild(_0x193994);
      _0x588232.appendChild(_0x334f4d);
      document.body.appendChild(_0x588232);
      _0x588232.style.transform = "translateY(10px) translateX(-50%)";
      setTimeout(() => {
        _0x588232.style.transform = "translateY(0) translateX(-50%)";
      }, 10);
    },
    "args": [_0x56b047, _0x28b7f0[currentOpacityLevel]]
  });
}
async function showToast(_0x39e4df, _0x103225, _0x3c08ea = false, _0x4fb245 = '') {
  const _0x17d1d4 = await checkStealthMode();
  if (_0x17d1d4) {
    return;
  }
  const _0x908566 = await getToastOpacity();
  if (!_0x4fb245) {
    if (_0x3c08ea) {
      _0x4fb245 = "Possible causes:\n• Network connection issues\n• Server timeout\n• Authorization issues\n• Extension needs to be updated";
    } else {
      _0x4fb245 = "Operation completed successfully.";
    }
  }
  await removeExistingToast(_0x39e4df);
  const _0x200948 = {
    tabId: _0x39e4df
  };
  chrome.scripting.executeScript({
    "target": _0x200948,
    "func": function (_0x58f3df, _0x184b19, _0x5505e6, _0x1dc476) {
      const _0x1d9db7 = document.createElement("div");
      _0x1d9db7.id = "neopass-active-toast";
      _0x1d9db7.style.position = "fixed";
      _0x1d9db7.style.bottom = "20px";
      _0x1d9db7.style.left = "50%";
      _0x1d9db7.style.transform = "translateX(-50%)";
      _0x1d9db7.style.backgroundColor = _0x184b19 ? "rgba(40, 10, 10, 0.95)" : "rgba(15, 15, 20, 0.95)";
      _0x1d9db7.style.color = _0x184b19 ? "#ff6b6b" : "#f8f9fa";
      _0x1d9db7.style.padding = "14px 16px";
      _0x1d9db7.style.borderRadius = "8px";
      _0x1d9db7.style.zIndex = "999999";
      _0x1d9db7.style.opacity = _0x5505e6;
      _0x1d9db7.style.transition = "all 0.3s ease";
      _0x1d9db7.style.maxWidth = "320px";
      _0x1d9db7.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
      _0x1d9db7.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      _0x1d9db7.style.border = _0x184b19 ? "1px solid rgba(255, 107, 107, 0.2)" : "1px solid rgba(255, 255, 255, 0.1)";
      _0x1d9db7.style.backdropFilter = "blur(10px)";
      _0x1d9db7.style.WebkitBackdropFilter = "blur(10px)";
      const _0x3114cf = document.createElement("div");
      _0x3114cf.style.display = "flex";
      _0x3114cf.style.justifyContent = "space-between";
      _0x3114cf.style.alignItems = "flex-start";
      const _0x2bf14f = document.createElement("div");
      _0x2bf14f.style.flexGrow = "1";
      _0x2bf14f.style.marginRight = "12px";
      const _0x3ccc9a = document.createElement("span");
      _0x3ccc9a.style.display = "inline-block";
      _0x3ccc9a.style.width = "8px";
      _0x3ccc9a.style.height = "8px";
      _0x3ccc9a.style.backgroundColor = _0x184b19 ? "#ff6b6b" : "#4ade80";
      _0x3ccc9a.style.borderRadius = "50%";
      _0x3ccc9a.style.marginRight = "8px";
      _0x3ccc9a.style.boxShadow = _0x184b19 ? "0 0 4px rgba(255, 107, 107, 0.6)" : "0 0 4px rgba(74, 222, 128, 0.6)";
      const _0x3d68d4 = document.createElement("span");
      _0x3d68d4.textContent = _0x58f3df;
      _0x3d68d4.style.fontSize = "14px";
      _0x3d68d4.style.fontWeight = "500";
      _0x3d68d4.style.lineHeight = "1.4";
      _0x3d68d4.style.wordBreak = "break-word";
      const _0x15702a = document.createElement("div");
      _0x15702a.style.display = "flex";
      _0x15702a.style.alignItems = "center";
      _0x15702a.appendChild(_0x3ccc9a);
      _0x15702a.appendChild(_0x3d68d4);
      _0x2bf14f.appendChild(_0x15702a);
      const _0x298ef0 = document.createElement("div");
      _0x298ef0.style.display = "flex";
      _0x298ef0.style.alignItems = "center";
      _0x298ef0.style.marginLeft = "8px";
      const _0x464582 = document.createElement("button");
      _0x464582.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line></svg>";
      _0x464582.title = "Show more information";
      _0x464582.style.background = "none";
      _0x464582.style.border = "none";
      _0x464582.style.color = _0x184b19 ? "rgba(255, 107, 107, 0.8)" : "rgba(255, 255, 255, 0.8)";
      _0x464582.style.cursor = "pointer";
      _0x464582.style.padding = "2px";
      _0x464582.style.marginRight = "6px";
      _0x464582.style.borderRadius = "4px";
      _0x464582.style.lineHeight = "0";
      _0x464582.style.transition = "all 0.2s";
      const _0x1b8c2a = document.createElement("button");
      _0x1b8c2a.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>";
      _0x1b8c2a.title = "Close";
      _0x1b8c2a.style.background = "none";
      _0x1b8c2a.style.border = "none";
      _0x1b8c2a.style.color = _0x184b19 ? "rgba(255, 107, 107, 0.8)" : "rgba(255, 255, 255, 0.8)";
      _0x1b8c2a.style.cursor = "pointer";
      _0x1b8c2a.style.padding = "2px";
      _0x1b8c2a.style.borderRadius = "4px";
      _0x1b8c2a.style.lineHeight = "0";
      _0x1b8c2a.style.transition = "all 0.2s";
      const _0x1e247d = document.createElement("div");
      _0x1e247d.style.marginTop = "12px";
      _0x1e247d.style.padding = "10px 12px";
      _0x1e247d.style.backgroundColor = _0x184b19 ? "rgba(255, 107, 107, 0.1)" : "rgba(255, 255, 255, 0.1)";
      _0x1e247d.style.borderRadius = "6px";
      _0x1e247d.style.fontSize = "13px";
      _0x1e247d.style.display = "none";
      _0x1e247d.style.maxHeight = "120px";
      _0x1e247d.style.overflow = "auto";
      _0x1e247d.style.lineHeight = "1.4";
      _0x1e247d.style.color = _0x184b19 ? "rgba(255, 107, 107, 0.9)" : "rgba(255, 255, 255, 0.9)";
      _0x1e247d.textContent = _0x1dc476;
      let _0x2f1516 = false;
      let _0x2de578 = null;
      _0x464582.onmouseover = function () {
        _0x464582.style.color = _0x184b19 ? "#ff6b6b" : "#ffffff";
        _0x464582.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      };
      _0x464582.onmouseout = function () {
        _0x464582.style.color = _0x184b19 ? "rgba(255, 107, 107, 0.8)" : "rgba(255, 255, 255, 0.8)";
        _0x464582.style.backgroundColor = "transparent";
      };
      _0x1b8c2a.onmouseover = function () {
        _0x1b8c2a.style.color = _0x184b19 ? "#ff6b6b" : "#ffffff";
        _0x1b8c2a.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      };
      _0x1b8c2a.onmouseout = function () {
        _0x1b8c2a.style.color = _0x184b19 ? "rgba(255, 107, 107, 0.8)" : "rgba(255, 255, 255, 0.8)";
        _0x1b8c2a.style.backgroundColor = "transparent";
      };
      _0x464582.onclick = function () {
        _0x2f1516 = !_0x2f1516;
        _0x1e247d.style.display = _0x2f1516 ? "block" : "none";
        _0x464582.innerHTML = _0x2f1516 ? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"18 15 12 9 6 15\"></polyline></svg>" : "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line></svg>";
        if (_0x2f1516) {
          if (_0x2de578) {
            clearTimeout(_0x2de578);
            _0x2de578 = null;
          }
        } else {
          _0x2de578 = setTimeout(() => {
            _0x1d9db7.style.opacity = "0";
            _0x1d9db7.style.transform = "translateY(10px) translateX(-50%)";
            setTimeout(() => _0x1d9db7.remove(), 300);
          }, 5000);
        }
      };
      _0x1b8c2a.onclick = function () {
        if (_0x2de578) {
          clearTimeout(_0x2de578);
          _0x2de578 = null;
        }
        _0x1d9db7.style.opacity = "0";
        _0x1d9db7.style.transform = "translateY(10px) translateX(-50%)";
        setTimeout(() => _0x1d9db7.remove(), 300);
      };
      _0x298ef0.appendChild(_0x464582);
      _0x298ef0.appendChild(_0x1b8c2a);
      _0x3114cf.appendChild(_0x2bf14f);
      _0x3114cf.appendChild(_0x298ef0);
      _0x1d9db7.appendChild(_0x3114cf);
      _0x1d9db7.appendChild(_0x1e247d);
      document.body.appendChild(_0x1d9db7);
      _0x1d9db7.style.transform = "translateY(10px) translateX(-50%)";
      setTimeout(() => {
        _0x1d9db7.style.transform = "translateY(0) translateX(-50%)";
      }, 10);
      _0x2de578 = setTimeout(() => {
        _0x1d9db7.style.opacity = "0";
        _0x1d9db7.style.transform = "translateY(10px) translateX(-50%)";
        setTimeout(() => _0x1d9db7.remove(), 300);
      }, 5000);
    },
    "args": [_0x103225, _0x3c08ea, _0x908566, _0x4fb245]
  });
}
chrome.runtime.onMessage.addListener((_0x5538c0, _0x586956, _0x233884) => {
  if (_0x5538c0.action === "toggleToastOpacity") {
    toggleToastOpacity().then(_0x53e88e => {
      const _0x1fd98c = {
        success: true,
        level: _0x53e88e
      };
      _0x233884(_0x1fd98c);
    })["catch"](_0x20b3eb => {
      console.error("Error toggling opacity:", _0x20b3eb);
      _0x233884({
        "success": false,
        "error": _0x20b3eb.toString()
      });
    });
    return true;
  }
});
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(["toastOpacityLevel"], _0x3ef15a => {
    if (_0x3ef15a.toastOpacityLevel) {
      currentOpacityLevel = _0x3ef15a.toastOpacityLevel;
    }
  });
});
chrome.tabs.onActivated.addListener(_0x25e6c6 => {
  chrome.tabs.get(_0x25e6c6.tabId, _0x1ec505 => {
    tabDetails = _0x1ec505;
  });
});
chrome.tabs.onUpdated.addListener((_0x431d89, _0x41177c, _0x2fb06a) => {
  if (_0x41177c.status === "complete") {
    tabDetails = _0x2fb06a;
  }
});
chrome.windows.onFocusChanged.addListener(_0x2650f0 => {
  if (_0x2650f0 === chrome.windows.WINDOW_ID_NONE) {
    return;
  }
  const _0x14e5f1 = {
    active: true,
    windowId: _0x2650f0
  };
  chrome.tabs.query(_0x14e5f1, _0x15fab2 => {
    if (_0x15fab2.length > 0) {
      tabDetails = _0x15fab2[0];
    }
  });
});
chrome.runtime.onMessage.addListener((_0x10f386, _0x2cf89f, _0x41165e) => {
  currentKey = _0x10f386.key;
  if (_0x10f386.action === "pageReloaded" || _0x10f386.action === "windowFocus") {} else if (_0x10f386.action === "openNewTab") {
    openNewMinimizedWindowWithUrl(_0x10f386.url);
  }
  if (_0x10f386.action === "showToast") {
    showToast(_0x2cf89f.tab.id, _0x10f386.message, _0x10f386.isError);
  }
  if (_0x10f386.action === "showMCQToast") {
    showMCQToast(_0x2cf89f.tab.id, _0x10f386.message);
  }
});
chrome.storage.onChanged.addListener((_0x283acc, _0xf484c9) => {
  if (_0xf484c9 === "local") {
    if (_0x283acc.refreshToken && _0x283acc.refreshToken.newValue === undefined) {
      chrome.storage.local.remove(["accessToken", "refreshToken", "loggedIn", "username"]);
      chrome.tabs.query({}, function (_0x3a3555) {
        _0x3a3555.forEach(_0x17d949 => {
          const _0x3d12cc = {
            action: "remoteLogout"
          };
          chrome.tabs.sendMessage(_0x17d949.id, _0x3d12cc)["catch"](() => {});
        });
      });
    }
  }
});
const _0x39a402 = {
  "log": false
};
const log = (..._0x18e795) => chrome.storage.local.get(_0x39a402, _0xc17b86 => _0xc17b86.log && console.log(..._0x18e795));
const activate = () => {
  if (activate.busy) {
    return;
  }
  activate.busy = true;
  const _0x30039f = {
    enabled: true
  };
  chrome.storage.local.get(_0x30039f, async _0x4a6595 => {
    try {
      await chrome.scripting.unregisterContentScripts();
      if (_0x4a6595.enabled) {
        const _0x5c3d8d = {
          matches: ["*://*/*"],
          allFrames: true,
          matchOriginAsFallback: true,
          runAt: "document_start"
        };
        const _0x529c15 = {
          ..._0x5c3d8d
        };
        _0x529c15.id = "main";
        _0x529c15.js = ["data/inject/hqlKuji2AztfIo1.js"];
        _0x529c15.world = "MAIN";
        const _0x107a33 = {
          ..._0x5c3d8d
        };
        _0x107a33.id = "isolated";
        _0x107a33.js = ["data/inject/CJd9TLHVA1sCsit.js"];
        _0x107a33.world = "ISOLATED";
        await chrome.scripting.registerContentScripts([_0x529c15, _0x107a33]);
      }
    } catch (_0x57f87e) {
      const _0x3dd5b9 = {
        color: "#b16464"
      };
      chrome.action.setBadgeBackgroundColor(_0x3dd5b9);
      const _0x1933fe = {
        text: "E"
      };
      chrome.action.setBadgeText(_0x1933fe);
      const _0x196f9a = {
        title: "Blocker Registration Failed: " + _0x57f87e.message
      };
      chrome.action.setTitle(_0x196f9a);
      console.error("Blocker Registration Failed", _0x57f87e);
    }
    activate.busy = false;
  });
};
chrome.runtime.onStartup.addListener(activate);
chrome.runtime.onInstalled.addListener(activate);
chrome.storage.onChanged.addListener(_0x28e573 => {
  if (_0x28e573.enabled) {
    activate();
  }
});
chrome.runtime.onMessage.addListener((_0x2c9f69, _0x5d71d1, _0x37ddf9) => {
  if (_0x2c9f69.action === "processSnippets") {
    const {
      snippets: _0x2390a1
    } = _0x2c9f69;
    if (!_0x2390a1.header && !_0x2390a1.footer) {
      showToast(_0x5d71d1.tab.id, "No snippets found", true);
      return;
    }
    const _0x2a38b4 = "// Header Snippet\n" + _0x2390a1.header + "\n\n// Footer Snippet\n" + _0x2390a1.footer;
    copyToClipboard(_0x2a38b4);
    showToast(_0x5d71d1.tab.id, "Snippets copied to clipboard");
  }
});
chrome.runtime.onMessage.addListener((_0x3cc83b, _0x18b3d5, _0x4b920b) => {
  if (_0x3cc83b.action === "extractCodingQuestion") {
    const {
      data: _0x1fe16a
    } = _0x3cc83b;
    const _0xa28d93 = "Programming Language:\n" + _0x1fe16a.programmingLanguage + "\n\nQuestion:\n" + _0x1fe16a.question + "\n\nInput Format:\n" + _0x1fe16a.inputFormat + "\n\nOutput Format:\n" + _0x1fe16a.outputFormat + "\n\nSample Test Cases:\n" + _0x1fe16a.testCases;
    copyToClipboard(_0xa28d93);
    showToast(_0x18b3d5.tab.id, "Coding question details copied to clipboard");
  }
});
async function checkAndHandleSessionExpiration() {
  try {
    const _0x124291 = await chrome.storage.local.get(["loggedIn", "loginTimestamp"]);
    if (_0x124291.loggedIn && _0x124291.loginTimestamp) {
      const _0x298451 = Date.now();
      if (_0x298451 - _0x124291.loginTimestamp > 43200000) {
        // console.log("24-hour session timeout reached, logging out user");/
        await chrome.storage.local.remove(["accessToken", "refreshToken", "loggedIn", "username", "loginTimestamp", "stealth"]);
        chrome.tabs.query({}, function (_0x3c8a51) {
          _0x3c8a51.forEach(_0x429242 => {
            try {
              const _0x40913b = {
                action: "sessionExpired"
              };
              chrome.tabs.sendMessage(_0x429242.id, _0x40913b)["catch"](() => {});
            } catch (_0xf174be) {}
            try {
              chrome.tabs.reload(_0x429242.id);
            } catch (_0x37c217) {}
          });
        });
      }
    }
  } catch (_0x556274) {
    console.error("Error checking session expiration:", _0x556274);
  }
}
const _0x1203af = {
  periodInMinutes: 0x5
};
chrome.alarms.create("sessionExpirationCheck", _0x1203af);
chrome.alarms.onAlarm.addListener(_0x3bf124 => {
  if (_0x3bf124.name === "sessionExpirationCheck") {
    checkAndHandleSessionExpiration();
  }
});
chrome.runtime.onStartup.addListener(() => {
  checkAndHandleSessionExpiration();
});
chrome.runtime.onInstalled.addListener(() => {
  checkAndHandleSessionExpiration();
});
chrome.runtime.onMessage.addListener((_0x3c1a49, _0x20c1a3, _0x472c7d) => {
  if (_0x3c1a49.action) {
    checkAndHandleSessionExpiration();
  }
  return true;
});
chrome.runtime.onMessage.addListener((_0x4f758f, _0x5c6e08, _0x2bdd98) => {
  if (_0x4f758f.action === "sessionExpired") {
    showToast(_0x5c6e08.tab.id, "Your session has expired after 24 hours. Please log in again.", true);
    const _0x5f4f13 = {
      success: true
    };
    _0x2bdd98(_0x5f4f13);
  }
  return true;
});
function findAnswer(_0x5613a5) {
  const _0x211ac0 = _0x5613a5.toLowerCase().replace(/[-]/g, " ").replace(/[^\w\s]/g, '').trim();
  const _0x135d16 = [];
  let _0x381f04 = Infinity;
  for (const _0x4a1da9 of dataset) {
    const _0xb64f96 = _0x4a1da9.question.toLowerCase().replace(/[-]/g, " ").replace(/[^\w\s]/g, '').trim();
    const _0x5b550a = levenshteinDistance(_0x211ac0, _0xb64f96);
    if (_0x5b550a <= 15) {
      if (_0x5b550a < _0x381f04) {
        _0x381f04 = _0x5b550a;
        _0x135d16.length = 0;
        _0x135d16.push(_0x4a1da9.answer);
      } else if (_0x5b550a === _0x381f04) {
        _0x135d16.push(_0x4a1da9.answer);
      }
    }
  }
  return _0x135d16.length > 0 ? _0x135d16 : null;
}
function levenshteinDistance(_0xc702e, _0xdbbfe1) {
  const _0x49b1e7 = Array(_0xc702e.length + 1).fill(null).map(() => Array(_0xdbbfe1.length + 1).fill(0));
  for (let _0x44aed3 = 0; _0x44aed3 <= _0xc702e.length; _0x44aed3++) {
    for (let _0x42c648 = 0; _0x42c648 <= _0xdbbfe1.length; _0x42c648++) {
      if (_0x44aed3 === 0) {
        _0x49b1e7[_0x44aed3][_0x42c648] = _0x42c648;
      } else if (_0x42c648 === 0) {
        _0x49b1e7[_0x44aed3][_0x42c648] = _0x44aed3;
      } else {
        _0x49b1e7[_0x44aed3][_0x42c648] = Math.min(_0x49b1e7[_0x44aed3 - 1][_0x42c648] + 1, _0x49b1e7[_0x44aed3][_0x42c648 - 1] + 1, _0x49b1e7[_0x44aed3 - 1][_0x42c648 - 1] + (_0xc702e[_0x44aed3 - 1] === _0xdbbfe1[_0x42c648 - 1] ? 0 : 1));
      }
    }
  }
  return _0x49b1e7[_0xc702e.length][_0xdbbfe1.length];
}
function normalizeText(_0x4599e6) {
  return _0x4599e6.toLowerCase().replace(/[-]/g, " ").replace(/[^\w\s]/g, '').trim();
}
let dataset = [];
async function loadNptelDataset() {
  try {
    const _0xe2d500 = await fetch(chrome.runtime.getURL("data/nptel.json"));
    dataset = await _0xe2d500.json();
    // console.log("NPTEL dataset loaded: " + dataset.length + " questions");
  } catch (_0x48328e) {
    console.error("Failed to load NPTEL dataset:", _0x48328e);
  }
}
loadNptelDataset();
async function showMCQToast(_0x509c68, _0x123edc, _0x59af6e = '') {
  const _0x4b7809 = await checkStealthMode();
  if (_0x4b7809) {
    return;
  }
  const _0x3f482f = await getToastOpacity();
  if (!_0x59af6e) {
    _0x59af6e = "This is the answer to the MCQ question based on analysis of the question content. If you received an incorrect answer, please try rephrasing your question or providing more context.";
  }
  await removeExistingToast(_0x509c68);
  const _0x13a8c8 = {
    tabId: _0x509c68
  };
  chrome.scripting.executeScript({
    "target": _0x13a8c8,
    "func": function (_0x43e40d, _0x486b60, _0x3b43fd) {
      let _0x3f0063;
      let _0x388939;
      const _0x8820f9 = _0x43e40d.match(/^([A-Za-z0-9]+)\.?\s+(.+)$/);
      if (_0x8820f9) {
        _0x3f0063 = _0x8820f9[1].trim();
        _0x388939 = _0x8820f9[2].trim();
      } else {
        const _0x2a29bc = _0x43e40d.split(" ");
        _0x3f0063 = _0x2a29bc[0].replace(".", '');
        _0x388939 = _0x2a29bc.slice(1).join(" ");
      }
      const _0x79a1c9 = /^[A-Za-z]$/.test(_0x3f0063);
      const _0x5ce6a9 = _0x79a1c9 ? "#4285f4" : "#f4b400";
      const _0x528655 = document.createElement("div");
      _0x528655.id = "neopass-active-toast";
      _0x528655.style.position = "fixed";
      _0x528655.style.bottom = "20px";
      _0x528655.style.left = "50%";
      _0x528655.style.transform = "translateX(-50%)";
      _0x528655.style.backgroundColor = "rgba(15, 15, 20, 0.95)";
      _0x528655.style.color = "#f8f9fa";
      _0x528655.style.padding = "14px 16px";
      _0x528655.style.borderRadius = "8px";
      _0x528655.style.zIndex = "999999";
      _0x528655.style.opacity = _0x486b60;
      _0x528655.style.transition = "all 0.3s ease";
      _0x528655.style.maxWidth = "400px";
      _0x528655.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
      _0x528655.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      _0x528655.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      _0x528655.style.backdropFilter = "blur(10px)";
      _0x528655.style.WebkitBackdropFilter = "blur(10px)";
      const _0x1636d8 = document.createElement("div");
      _0x1636d8.style.display = "flex";
      _0x1636d8.style.justifyContent = "space-between";
      _0x1636d8.style.alignItems = "center";
      const _0x1dc863 = document.createElement("div");
      _0x1dc863.style.display = "flex";
      _0x1dc863.style.alignItems = "center";
      _0x1dc863.style.flexGrow = "1";
      const _0x1b4c09 = document.createElement("div");
      _0x1b4c09.style.width = "22px";
      _0x1b4c09.style.height = "22px";
      _0x1b4c09.style.backgroundColor = _0x5ce6a9;
      _0x1b4c09.style.color = "white";
      _0x1b4c09.style.borderRadius = "50%";
      _0x1b4c09.style.display = "flex";
      _0x1b4c09.style.alignItems = "center";
      _0x1b4c09.style.justifyContent = "center";
      _0x1b4c09.style.marginRight = "10px";
      _0x1b4c09.style.fontWeight = "bold";
      _0x1b4c09.style.fontSize = "12px";
      _0x1b4c09.style.boxShadow = "0 2px 4px " + _0x5ce6a9 + "66";
      _0x1b4c09.textContent = _0x3f0063.toUpperCase();
      const _0x26e883 = document.createElement("span");
      _0x26e883.textContent = _0x388939;
      _0x26e883.style.fontSize = "14px";
      _0x26e883.style.fontWeight = "500";
      _0x1dc863.appendChild(_0x1b4c09);
      _0x1dc863.appendChild(_0x26e883);
      const _0x4b378d = document.createElement("div");
      _0x4b378d.style.display = "flex";
      _0x4b378d.style.alignItems = "center";
      _0x4b378d.style.marginLeft = "10px";
      const _0x15d1f6 = document.createElement("button");
      _0x15d1f6.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line></svg>";
      _0x15d1f6.title = "Show more information";
      _0x15d1f6.style.background = "none";
      _0x15d1f6.style.border = "none";
      _0x15d1f6.style.color = "rgba(255, 255, 255, 0.8)";
      _0x15d1f6.style.cursor = "pointer";
      _0x15d1f6.style.padding = "2px";
      _0x15d1f6.style.marginRight = "6px";
      _0x15d1f6.style.borderRadius = "4px";
      _0x15d1f6.style.lineHeight = "0";
      _0x15d1f6.style.transition = "all 0.2s";
      const _0x5f294e = document.createElement("button");
      _0x5f294e.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>";
      _0x5f294e.title = "Close";
      _0x5f294e.style.background = "none";
      _0x5f294e.style.border = "none";
      _0x5f294e.style.color = "rgba(255, 255, 255, 0.8)";
      _0x5f294e.style.cursor = "pointer";
      _0x5f294e.style.padding = "2px";
      _0x5f294e.style.borderRadius = "4px";
      _0x5f294e.style.lineHeight = "0";
      _0x5f294e.style.transition = "all 0.2s";
      const _0x5aa7fd = document.createElement("div");
      _0x5aa7fd.style.marginTop = "12px";
      _0x5aa7fd.style.padding = "10px 12px";
      _0x5aa7fd.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      _0x5aa7fd.style.borderRadius = "6px";
      _0x5aa7fd.style.fontSize = "13px";
      _0x5aa7fd.style.display = "none";
      _0x5aa7fd.style.maxHeight = "120px";
      _0x5aa7fd.style.overflow = "auto";
      _0x5aa7fd.style.lineHeight = "1.4";
      _0x5aa7fd.style.color = "rgba(255, 255, 255, 0.9)";
      _0x5aa7fd.textContent = _0x3b43fd;
      let _0x20380b = false;
      let _0x24a7a6 = null;
      _0x15d1f6.onmouseover = function () {
        _0x15d1f6.style.color = "#ffffff";
        _0x15d1f6.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      };
      _0x15d1f6.onmouseout = function () {
        _0x15d1f6.style.color = "rgba(255, 255, 255, 0.8)";
        _0x15d1f6.style.backgroundColor = "transparent";
      };
      _0x5f294e.onmouseover = function () {
        _0x5f294e.style.color = "#ffffff";
        _0x5f294e.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      };
      _0x5f294e.onmouseout = function () {
        _0x5f294e.style.color = "rgba(255, 255, 255, 0.8)";
        _0x5f294e.style.backgroundColor = "transparent";
      };
      _0x15d1f6.onclick = function () {
        _0x20380b = !_0x20380b;
        _0x5aa7fd.style.display = _0x20380b ? "block" : "none";
        _0x15d1f6.innerHTML = _0x20380b ? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"18 15 12 9 6 15\"></polyline></svg>" : "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line></svg>";
        if (_0x20380b) {
          if (_0x24a7a6) {
            clearTimeout(_0x24a7a6);
            _0x24a7a6 = null;
          }
        } else {
          _0x24a7a6 = setTimeout(() => {
            _0x528655.style.opacity = "0";
            _0x528655.style.transform = "translateY(10px) translateX(-50%)";
            setTimeout(() => _0x528655.remove(), 300);
          }, 5000);
        }
      };
      _0x5f294e.onclick = function () {
        if (_0x24a7a6) {
          clearTimeout(_0x24a7a6);
          _0x24a7a6 = null;
        }
        _0x528655.style.opacity = "0";
        _0x528655.style.transform = "translateY(10px) translateX(-50%)";
        setTimeout(() => _0x528655.remove(), 300);
      };
      _0x4b378d.appendChild(_0x15d1f6);
      _0x4b378d.appendChild(_0x5f294e);
      _0x1636d8.appendChild(_0x1dc863);
      _0x1636d8.appendChild(_0x4b378d);
      _0x528655.appendChild(_0x1636d8);
      _0x528655.appendChild(_0x5aa7fd);
      document.body.appendChild(_0x528655);
      _0x528655.style.transform = "translateY(10px) translateX(-50%)";
      setTimeout(() => {
        _0x528655.style.transform = "translateY(0) translateX(-50%)";
      }, 10);
      _0x24a7a6 = setTimeout(() => {
        _0x528655.style.opacity = "0";
        _0x528655.style.transform = "translateY(10px) translateX(-50%)";
        setTimeout(() => _0x528655.remove(), 300);
      }, 5000);
    },
    "args": [_0x123edc, _0x3f482f, _0x59af6e]
  });
}
async function showNPTELToast(_0x2e5d7f, _0x120509, _0x50def1 = false, _0x4d6733 = '') {
  const _0x444fca = await checkStealthMode();
  if (_0x444fca) {
    return;
  }
  const _0x3ede51 = await getToastOpacity();
  if (!_0x4d6733) {
    if (_0x50def1) {
      _0x4d6733 = "Possible issues with NPTEL search:\n• The question may not be in our database\n• Try selecting only the exact question text\n• The question might be newly added to NPTEL";
    } else {
      _0x4d6733 = "This answer was found by matching your question with the NPTEL question database. The confidence level depends on how closely your selected text matches a known question.";
    }
  }
  await removeExistingToast(_0x2e5d7f);
  const _0x3de858 = {
    tabId: _0x2e5d7f
  };
  chrome.scripting.executeScript({
    "target": _0x3de858,
    "func": function (_0x345cca, _0x59e205, _0x56c0ff, _0x28bb46) {
      const _0x48964b = document.createElement("div");
      _0x48964b.id = "neopass-active-toast";
      _0x48964b.style.position = "fixed";
      _0x48964b.style.bottom = "20px";
      _0x48964b.style.left = "50%";
      _0x48964b.style.transform = "translateX(-50%)";
      _0x48964b.style.backgroundColor = _0x59e205 ? "rgba(40, 10, 10, 0.95)" : "rgba(15, 15, 20, 0.95)";
      _0x48964b.style.color = _0x59e205 ? "#ff6b6b" : "#f8f9fa";
      _0x48964b.style.padding = "14px 16px";
      _0x48964b.style.borderRadius = "8px";
      _0x48964b.style.zIndex = "999999";
      _0x48964b.style.opacity = _0x56c0ff;
      _0x48964b.style.transition = "all 0.3s ease";
      _0x48964b.style.maxWidth = "320px";
      _0x48964b.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
      _0x48964b.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      _0x48964b.style.border = _0x59e205 ? "1px solid rgba(255, 107, 107, 0.2)" : "1px solid rgba(255, 255, 255, 0.1)";
      _0x48964b.style.backdropFilter = "blur(10px)";
      _0x48964b.style.WebkitBackdropFilter = "blur(10px)";
      const _0x220622 = document.createElement("div");
      _0x220622.style.display = "flex";
      _0x220622.style.justifyContent = "space-between";
      _0x220622.style.alignItems = "flex-start";
      const _0x38af2c = document.createElement("div");
      _0x38af2c.style.flexGrow = "1";
      _0x38af2c.style.marginRight = "12px";
      const _0x236173 = document.createElement("span");
      _0x236173.style.display = "inline-block";
      _0x236173.style.width = "8px";
      _0x236173.style.height = "8px";
      _0x236173.style.backgroundColor = _0x59e205 ? "#ff6b6b" : "#4ade80";
      _0x236173.style.borderRadius = "50%";
      _0x236173.style.marginRight = "8px";
      _0x236173.style.boxShadow = _0x59e205 ? "0 0 4px rgba(255, 107, 107, 0.6)" : "0 0 4px rgba(74, 222, 128, 0.6)";
      const _0x5bda80 = document.createElement("span");
      _0x5bda80.innerHTML = _0x345cca.replace(/\n/g, "<br>");
      _0x5bda80.style.fontSize = "14px";
      _0x5bda80.style.fontWeight = "500";
      _0x5bda80.style.lineHeight = "1.4";
      _0x5bda80.style.wordBreak = "break-word";
      const _0x34fb68 = document.createElement("div");
      _0x34fb68.style.display = "flex";
      _0x34fb68.style.alignItems = "center";
      _0x34fb68.appendChild(_0x236173);
      _0x34fb68.appendChild(_0x5bda80);
      _0x38af2c.appendChild(_0x34fb68);
      const _0x4e8e37 = document.createElement("div");
      _0x4e8e37.style.display = "flex";
      _0x4e8e37.style.alignItems = "center";
      _0x4e8e37.style.marginLeft = "8px";
      const _0x46f18f = document.createElement("button");
      _0x46f18f.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line></svg>";
      _0x46f18f.title = "Show more information";
      _0x46f18f.style.background = "none";
      _0x46f18f.style.border = "none";
      _0x46f18f.style.color = _0x59e205 ? "rgba(255, 107, 107, 0.8)" : "rgba(255, 255, 255, 0.8)";
      _0x46f18f.style.cursor = "pointer";
      _0x46f18f.style.padding = "2px";
      _0x46f18f.style.marginRight = "6px";
      _0x46f18f.style.borderRadius = "4px";
      _0x46f18f.style.lineHeight = "0";
      _0x46f18f.style.transition = "all 0.2s";
      const _0x3fa905 = document.createElement("button");
      _0x3fa905.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>";
      _0x3fa905.title = "Close";
      _0x3fa905.style.background = "none";
      _0x3fa905.style.border = "none";
      _0x3fa905.style.color = _0x59e205 ? "rgba(255, 107, 107, 0.8)" : "rgba(255, 255, 255, 0.8)";
      _0x3fa905.style.cursor = "pointer";
      _0x3fa905.style.padding = "2px";
      _0x3fa905.style.borderRadius = "4px";
      _0x3fa905.style.lineHeight = "0";
      _0x3fa905.style.transition = "all 0.2s";
      const _0x23d619 = document.createElement("div");
      _0x23d619.style.marginTop = "12px";
      _0x23d619.style.padding = "10px 12px";
      _0x23d619.style.backgroundColor = _0x59e205 ? "rgba(255, 107, 107, 0.1)" : "rgba(255, 255, 255, 0.1)";
      _0x23d619.style.borderRadius = "6px";
      _0x23d619.style.fontSize = "13px";
      _0x23d619.style.display = "none";
      _0x23d619.style.maxHeight = "120px";
      _0x23d619.style.overflow = "auto";
      _0x23d619.style.lineHeight = "1.4";
      _0x23d619.style.color = _0x59e205 ? "rgba(255, 107, 107, 0.9)" : "rgba(255, 255, 255, 0.9)";
      _0x23d619.textContent = _0x28bb46;
      let _0x3b4b53 = false;
      let _0x620c88 = null;
      _0x46f18f.onmouseover = function () {
        _0x46f18f.style.color = _0x59e205 ? "#ff6b6b" : "#ffffff";
        _0x46f18f.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      };
      _0x46f18f.onmouseout = function () {
        _0x46f18f.style.color = _0x59e205 ? "rgba(255, 107, 107, 0.8)" : "rgba(255, 255, 255, 0.8)";
        _0x46f18f.style.backgroundColor = "transparent";
      };
      _0x3fa905.onmouseover = function () {
        _0x3fa905.style.color = _0x59e205 ? "#ff6b6b" : "#ffffff";
        _0x3fa905.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      };
      _0x3fa905.onmouseout = function () {
        _0x3fa905.style.color = _0x59e205 ? "rgba(255, 107, 107, 0.8)" : "rgba(255, 255, 255, 0.8)";
        _0x3fa905.style.backgroundColor = "transparent";
      };
      _0x46f18f.onclick = function () {
        _0x3b4b53 = !_0x3b4b53;
        _0x23d619.style.display = _0x3b4b53 ? "block" : "none";
        _0x46f18f.innerHTML = _0x3b4b53 ? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"18 15 12 9 6 15\"></polyline></svg>" : "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line></svg>";
        if (_0x3b4b53) {
          if (_0x620c88) {
            clearTimeout(_0x620c88);
            _0x620c88 = null;
          }
        } else {
          _0x620c88 = setTimeout(() => {
            _0x48964b.style.opacity = "0";
            _0x48964b.style.transform = "translateY(10px) translateX(-50%)";
            setTimeout(() => _0x48964b.remove(), 300);
          }, 5000);
        }
      };
      _0x3fa905.onclick = function () {
        if (_0x620c88) {
          clearTimeout(_0x620c88);
          _0x620c88 = null;
        }
        _0x48964b.style.opacity = "0";
        _0x48964b.style.transform = "translateY(10px) translateX(-50%)";
        setTimeout(() => _0x48964b.remove(), 300);
      };
      _0x4e8e37.appendChild(_0x46f18f);
      _0x4e8e37.appendChild(_0x3fa905);
      _0x220622.appendChild(_0x38af2c);
      _0x220622.appendChild(_0x4e8e37);
      _0x48964b.appendChild(_0x220622);
      _0x48964b.appendChild(_0x23d619);
      document.body.appendChild(_0x48964b);
      _0x48964b.style.transform = "translateY(10px) translateX(-50%)";
      setTimeout(() => {
        _0x48964b.style.transform = "translateY(0) translateX(-50%)";
      }, 10);
      _0x620c88 = setTimeout(() => {
        _0x48964b.style.opacity = "0";
        _0x48964b.style.transform = "translateY(10px) translateX(-50%)";
        setTimeout(() => _0x48964b.remove(), 300);
      }, 5000);
    },
    "args": [_0x120509, _0x50def1, _0x3ede51, _0x4d6733]
  });
}