const windowEvents = ["blur", "focus", "beforeunload", "pagehide", "unload", "popstate", "resize", "pagehide", "lostpointercapture", "fullscreenchange", "visibilitychange"];
const documentEvents = ["paste", "onpaste", "contextmenu", "visibilitychange", "webkitvisibilitychange"];
const eventHandler = _0x1f5432 => {
  _0x1f5432.stopPropagation();
  _0x1f5432.stopImmediatePropagation();
};
function bypassRestrictions() {
  windowEvents.forEach(_0x2a0f32 => {
    window.addEventListener(_0x2a0f32, eventHandler, true);
  });
  documentEvents.forEach(_0x1125cb => {
    document.addEventListener(_0x1125cb, eventHandler, true);
  });
  const _0x2a5ff6 = {
    get: () => "visible",
    configurable: true
  };
  Object.defineProperty(document, "visibilityState", _0x2a5ff6);
  const _0x59f1fb = {
    get: () => "visible",
    configurable: true
  };
  Object.defineProperty(document, "webkitVisibilityState", _0x59f1fb);
  const _0x48ce21 = {
    get: () => false,
    configurable: true
  };
  Object.defineProperty(document, "hidden", _0x48ce21);
}
function spoofScreenRecording() {
  const _0x303dd5 = navigator.mediaDevices.getDisplayMedia;
  navigator.mediaDevices.getDisplayMedia = async function (_0x19d579) {
    return new Promise((_0x18d25e, _0x5e6074) => {
      showPopup(_0x18d25e, _0x5e6074, _0x19d579, _0x303dd5);
    });
  };
}
function showPopup(_0x101de3, _0x76b36, _0x3047c6, _0x5716fd) {
  const _0x2b02ea = document.createElement("div");
  _0x2b02ea.style.cssText = "\n        position: fixed;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        padding: 1px;\n        background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);\n        border-radius: 8px;\n        z-index: 999999;\n        animation: fadeIn 0.3s ease-in;\n    ";
  const _0x526b25 = document.createElement("div");
  _0x526b25.style.cssText = "\n        position: relative;\n        background-color: rgba(0, 0, 0, 0.8);\n        backdrop-filter: blur(8px);\n        color: white;\n        padding: 20px;\n        border-radius: 7px;\n        font-family: monospace;\n        min-width: 400px;\n        border: 1px solid rgba(255, 255, 255, 0.1);\n        transition: background-color 0.2s;\n    ";
  const _0x58c202 = document.createElement("style");
  _0x58c202.textContent = "\n        @keyframes fadeIn {\n            from { opacity: 0; transform: translate(-50%, -45%); }\n            to { opacity: 1; transform: translate(-50%, -50%); }\n        }\n        @keyframes fadeOut {\n            from { opacity: 1; transform: translate(-50%, -50%); }\n            to { opacity: 0; transform: translate(-50%, -45%); }\n        }\n    ";
  document.head.appendChild(_0x58c202);
  _0x526b25.innerHTML = "\n        <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);\">\n            <div style=\"font-size: 16px; font-weight: bold; background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;\">\n                NeoPass Extension\n            </div>\n            <span class=\"close-btn\" style=\"cursor: pointer; font-size: 20px; color: rgba(255, 255, 255, 0.8); transition: color 0.2s; line-height: 1; padding: 4px 8px;\">×</span>\n        </div>\n        <div style=\"text-align: justify; color: #10B981; font-weight: bold; margin-bottom: 15px;\">\n            FullScreen ScreenShare Bypassed!\n        </div>\n        <div style=\"margin-bottom: 15px;\">\n            <label style=\"display: flex; align-items: center; cursor: pointer; color: #9CA3AF;\">\n                <input type=\"checkbox\" id=\"privacy-checkbox\" style=\"margin-right: 8px;\">\n                Show additional privacy options\n            </label>\n        </div>\n        <div id=\"privacy-content\" style=\"display: none; color: white; margin-bottom: 20px; text-align: justify; padding: 0 10px;\">\n            <span style=\"color: #9CA3AF; font-style: italic;\">(These steps are optional)</span><br>\n            1. Create a duplicate tab.<br>\n            2. Hide the chatbutton in the duplicate tab using stealth mode.<br>\n            3. Come back to this tab and click on \"Proceed\".<br>\n            4. ScreenShare duplicated tab.\n        </div>\n        <div style=\"display: flex; justify-content: center; gap: 10px;\">\n            <button class=\"ok-btn\" style=\"padding: 8px 20px; border: none; border-radius: 5px; background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; cursor: pointer; font-weight: bold; transition: opacity 0.2s;\">\n                Proceed\n            </button>\n            <button class=\"duplicate-btn\" style=\"padding: 8px 20px; border: none; border-radius: 5px; background: linear-gradient(to right, #10B981, #059669); color: white; cursor: pointer; font-weight: bold; transition: opacity 0.2s; display: none;\">\n                Create Duplicate Tab\n            </button>\n        </div>\n    ";
  const _0x400913 = _0x526b25.querySelector("#privacy-checkbox");
  const _0x32cdb1 = _0x526b25.querySelector("#privacy-content");
  const _0xaa1e2f = _0x526b25.querySelector(".duplicate-btn");
  _0x400913.addEventListener("change", function () {
    _0x32cdb1.style.display = this.checked ? "block" : "none";
    _0xaa1e2f.style.display = this.checked ? "block" : "none";
  });
  const _0x4c9277 = _0x526b25.querySelector(".close-btn");
  const _0x58114d = _0x526b25.querySelector(".ok-btn");
  const _0x128f64 = () => {
    _0x2b02ea.style.animation = "fadeOut 0.3s ease-out";
    setTimeout(() => _0x2b02ea.remove(), 280);
  };
  _0x4c9277.onclick = () => {
    _0x128f64();
    _0x76b36(new Error("Screen share cancelled by user"));
  };
  _0xaa1e2f.onclick = () => {
    const _0x210ec2 = window.location.href;
    const _0x304664 = screen.width;
    const _0x42e8a9 = screen.height;
    const _0x4a912a = window.open(_0x210ec2, "_blank", "width=" + _0x304664 + ",height=" + _0x42e8a9 + ",top=0,left=0,noopener,menubar=no,toolbar=no,location=no,status=no");
    if (_0x4a912a) {
      setTimeout(() => {
        window.focus();
      }, 0);
    }
  };
  _0x58114d.onclick = async () => {
    _0x128f64();
    try {
      const _0x2d965a = {
        displaySurface: "window"
      };
      const _0x2e7e5d = {
        selfBrowserSurface: "include",
        monitorTypeSurfaces: "exclude",
        video: _0x2d965a
      };
      _0x3047c6 = _0x2e7e5d;
      const _0x19a0af = await _0x5716fd.call(navigator.mediaDevices, _0x3047c6);
      const _0xdf5580 = _0x19a0af.getVideoTracks()[0];
      const _0x59f485 = _0xdf5580.getSettings.bind(_0xdf5580);
      _0xdf5580.getSettings = function () {
        const _0x50626f = _0x59f485();
        _0x50626f.displaySurface = "monitor";
        return _0x50626f;
      };
      _0x101de3(_0x19a0af);
    } catch (_0x140f8c) {
      _0x76b36(_0x140f8c);
    }
  };
  _0x58114d.onmouseover = () => _0x58114d.style.opacity = "0.9";
  _0x58114d.onmouseout = () => _0x58114d.style.opacity = "1";
  _0xaa1e2f.onmouseover = () => _0xaa1e2f.style.opacity = "0.9";
  _0xaa1e2f.onmouseout = () => _0xaa1e2f.style.opacity = "1";
  _0x4c9277.onmouseover = () => _0x4c9277.style.color = "white";
  _0x4c9277.onmouseout = () => _0x4c9277.style.color = "rgba(255, 255, 255, 0.8)";
  _0x2b02ea.appendChild(_0x526b25);
  document.body.appendChild(_0x2b02ea);
}
const observer = new MutationObserver(_0x2281b1 => {
  for (const _0x2e5b7b of _0x2281b1) {
    if (_0x2e5b7b.type === "childList") {
      const _0x5bc3c4 = document.querySelector("#tt-start-accept > div > div > span");
      const _0x32a659 = document.querySelector("body > app-root > div > div > div > test-taking > app-dialog-sidebar > div");
      if (_0x32a659) {
        _0x32a659.remove();
      }
      if (_0x5bc3c4 && _0x5bc3c4.textContent == "Agree & Proceed") {
        _0x5bc3c4.addEventListener("click", () => {});
        _0x5bc3c4.click();
      }
    }
  }
});
function initializeObserver() {
  if (document.body) {
    const _0x5b6468 = {
      childList: true,
      subtree: true
    };
    observer.observe(document.body, _0x5b6468);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      const _0x15d4cc = {
        childList: true,
        subtree: true
      };
      observer.observe(document.body, _0x15d4cc);
    });
  }
}
bypassRestrictions();
spoofScreenRecording();
initializeObserver();