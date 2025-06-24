if (typeof chrome === "undefined") {}
(function () {
  chrome.storage.local.get(["stealth", "ultraStealth", "loggedIn"], function (_0x123691) {
    if (_0x123691.loggedIn !== true) {
    //   console.log("User not logged in. Chat overlay not injected.");
      return;
    }
    if (window.chatOverlayInjected) {
    //   console.log("Chat overlay script already injected.");
      return;
    }
    window.chatOverlayInjected = true;
    const _0x30309a = _0x123691.stealth === true;
    const _0x2558d3 = _0x123691.ultraStealth === true;
    // console.log("Initial stealth mode state:", _0x30309a);
    // console.log("Initial ultra stealth mode state:", _0x2558d3);
    function _0x4ca826() {
      return new Promise((_0x2a80cd, _0x44006a) => {
        if (typeof showdown !== "undefined") {
          _0x2a80cd();
          return;
        }
        const _0xe59a0e = document.createElement("script");
        _0xe59a0e.src = chrome.runtime.getURL("data/lib/showdown.min.js");
        _0xe59a0e.onload = _0x2a80cd;
        _0xe59a0e.onerror = _0x44006a;
        document.head.appendChild(_0xe59a0e);
      });
    }
    let _0xe980fa = false;
    let _0x1d640d = [];
    let _0x31f8a1 = false;
    let _0x567a74 = false;
    let _0x1d6a5c;
    let _0x196f54;
    let _0x3e9e9d;
    let _0x24fa56;
    let _0x267cc0;
    let _0x198315;
    const _0x47ade1 = document.createElement("link");
    _0x47ade1.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap";
    _0x47ade1.rel = "stylesheet";
    document.head.appendChild(_0x47ade1);
    function _0x3e41ca() {
      if (document.getElementById("chat-overlay")) {
        return document.getElementById("chat-overlay");
      }
      const _0xb8cc07 = document.createElement("div");
      _0xb8cc07.id = "chat-overlay";
      _0xb8cc07.style.cssText = "\n            position: fixed;\n            bottom: 20px;\n            right: 20px;\n            width: 380px;\n            height: 500px;\n            background-color: #fff;\n            border: none;\n            border-radius: 16px;\n            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n            z-index: 9999;\n            display: " + (_0xe980fa ? "flex" : "none") + ";\n            flex-direction: column;\n            font-family: 'Poppins', sans-serif;\n            overflow: hidden;\n            transition: opacity 0.3s ease;\n        ";
      const _0x16ab31 = document.createElement("div");
      _0x16ab31.style.cssText = "\n            padding: 20px !important;\n            border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;\n            font-weight: 500 !important;\n            display: flex !important;\n            justify-content: space-between !important;\n            align-items: center !important;\n            background-color: #fff !important;\n            color: #333 !important;\n            cursor: move !important;\n            font-size: 15px !important;\n            letter-spacing: 0.3px !important;\n        ";
      _0x16ab31.innerHTML = "\n        <span style=\"display: flex !important; align-items: center !important; gap: 8px !important;\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path>\n            </svg>\n            Chat\n        </span>\n        <div style=\"display: flex !important; gap: 12px !important; align-items: center !important;\">\n            <span \n            id=\"stealth-mode\" \n            role=\"button\"\n            tabindex=\"0\"\n            style=\"\n                display: inline-block !important;\n                font-size: 14px !important; \n                cursor: pointer !important; \n                padding: 6px 12px !important;\n                font-family: 'Poppins', sans-serif !important;\n                background: white !important;\n                border: none !important;\n                border-radius: 6px !important;\n                color: #333 !important;\n                user-select: none !important;\n                text-align: center !important;\n            \"\n            >\n            Enable Stealth Mode\n            </span>\n            <span id=\"close-chat\" style=\"cursor: pointer !important; font-size: 20px !important; line-height: 1 !important;\">×</span>\n        </div>\n        ";
      const _0xc29062 = document.createElement("div");
      _0xc29062.id = "chat-messages";
      _0xc29062.style.cssText = "\n        padding: 20px;\n        flex: 1;\n        overflow-y: auto;\n        background-color: #fafafa;\n        color: #333;\n        scroll-behavior: smooth;\n        white-space: pre-wrap;\n        ";
      const _0x1be8b1 = document.createElement("div");
      _0x1be8b1.style.cssText = "\n        padding: 16px 20px;\n        border-top: 1px solid rgba(0, 0, 0, 0.06);\n        background-color: #fff;\n        display: flex;\n        align-items: flex-end;\n        gap: 12px;\n        ";
      const _0x2d0807 = document.createElement("div");
      _0x2d0807.contentEditable = true;
      _0x2d0807.placeholder = "Type a message...";
      _0x2d0807.style.cssText = "\n        width: 100%;\n        padding: 12px 16px;\n        border: 1px solid rgba(0, 0, 0, 0.1);\n        border-radius: 12px;\n        outline: none;\n        background-color: #fff;\n        color: #333;\n        min-height: 24px;\n        max-height: 120px;\n        font-family: 'Poppins', sans-serif;\n        font-size: 14px;\n        line-height: 1.5;\n        font-weight: 400;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);\n        transition: all 0.2s ease;\n        overflow-y: auto;\n        white-space: pre-wrap;\n        ";
      _0x2d0807.addEventListener("paste", function (_0x270096) {
        _0x270096.preventDefault();
        const _0x3d80f3 = _0x270096.clipboardData.getData("text/plain");
        const _0x98381 = window.getSelection();
        if (_0x98381.rangeCount > 0) {
          const _0x58a0bf = _0x98381.getRangeAt(0);
          _0x58a0bf.deleteContents();
          const _0x3f0a21 = document.createTextNode(_0x3d80f3);
          _0x58a0bf.insertNode(_0x3f0a21);
          _0x58a0bf.setStartAfter(_0x3f0a21);
          _0x58a0bf.collapse(true);
          _0x98381.removeAllRanges();
          _0x98381.addRange(_0x58a0bf);
        } else {
          this.innerText += _0x3d80f3;
        }
      });
      const _0x532196 = document.createElement("button");
      _0x532196.id = "clear-chat";
      _0x532196.innerHTML = "Clear Chat";
      _0x532196.style.cssText = "\n        padding: 12px;\n        background-color: rgb(60, 84, 114);  /* Changed to match send button color */\n        color: #fff;\n        border: none;\n        border-radius: 12px;\n        cursor: pointer;\n        font-size: 14px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition: all 0.2s ease;\n        flex-shrink: 0;\n        box-shadow: 0 2px 4px rgba(60, 84, 114, 0.2);  /* Updated shadow color to match */\n        font-family: 'Poppins', sans-serif;\n        ";
      const _0x5a3f26 = document.createElement("button");
      _0x5a3f26.innerHTML = "\n        <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"13\"></line>\n            <polygon points=\"22 2 15 22 11 13 2 9 22 2\"></polygon>\n        </svg>\n        ";
      _0x5a3f26.style.cssText = "\n        padding: 12px;\n        background-color: rgb(60, 84, 114);\n        color: #fff;\n        border: none;\n        border-radius: 12px;\n        cursor: pointer;\n        font-size: 14px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition: all 0.2s ease;\n        flex-shrink: 0;\n        box-shadow: 0 2px 4px rgba(60, 84, 114, 0.2);\n        ";
      const _0x48cfed = document.createElement("div");
      _0x48cfed.style.cssText = "\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 12px;\n        height: 12px;\n        background-color: rgb(60, 84, 114);\n        cursor: nw-resize;\n        border-radius: 12px 0 12px 0;\n        opacity: 0.8;\n        ";
      const _0x2b5514 = document.createElement("style");
      _0x2b5514.innerHTML = "\n        #chat-overlay ::-webkit-scrollbar {\n            width: 6px;\n            height: 6px;\n        }\n\n        #chat-overlay ::-webkit-scrollbar-thumb {\n            background-color: rgba(0, 0, 0, 0.2);\n            border-radius: 3px;\n            transition: background-color 0.2s ease;\n        }\n\n        #chat-overlay ::-webkit-scrollbar-thumb:hover {\n            background-color: rgba(0, 0, 0, 0.3);\n        }\n\n        #chat-overlay ::-webkit-scrollbar-track {\n            background-color: transparent;\n        }\n\n        #chat-overlay [contenteditable]:empty:before {\n            content: attr(placeholder);\n            color: rgba(0, 0, 0, 0.4);\n            font-weight: 300;\n        }\n        ";
      _0x1be8b1.appendChild(_0x2d0807);
      _0x1be8b1.appendChild(_0x532196);
      _0x1be8b1.appendChild(_0x5a3f26);
      _0xb8cc07.appendChild(_0x16ab31);
      _0xb8cc07.appendChild(_0xc29062);
      _0xb8cc07.appendChild(_0x1be8b1);
      _0xb8cc07.appendChild(_0x48cfed);
      document.body.appendChild(_0xb8cc07);
      document.head.appendChild(_0x2b5514);
      _0x2d0807.addEventListener("focus", function () {
        if (this.textContent.trim() === '') {
          this.setAttribute("data-placeholder", "Type a message...");
        }
      });
      _0x2d0807.addEventListener("blur", function () {
        if (this.textContent.trim() === '') {
          this.removeAttribute("data-placeholder");
        }
      });
      _0x532196.addEventListener("mouseenter", () => {
        _0x532196.style.transform = "translateY(-1px)";
        _0x532196.style.boxShadow = "0 4px 8px rgba(244, 67, 54, 0.3)";
      });
      _0x532196.addEventListener("mouseleave", () => {
        _0x532196.style.transform = "translateY(0)";
        _0x532196.style.boxShadow = "0 2px 4px rgba(244, 67, 54, 0.2)";
      });
      _0x5a3f26.addEventListener("mouseenter", () => {
        _0x5a3f26.style.transform = "translateY(-1px)";
        _0x5a3f26.style.boxShadow = "0 4px 8px rgba(60, 84, 114, 0.3)";
      });
      _0x5a3f26.addEventListener("mouseleave", () => {
        _0x5a3f26.style.transform = "translateY(0)";
        _0x5a3f26.style.boxShadow = "0 2px 4px rgba(60, 84, 114, 0.2)";
      });
      _0x16ab31.addEventListener("mousedown", _0x76441e => {
        _0x31f8a1 = true;
        _0x1d6a5c = _0x76441e.clientX - _0xb8cc07.getBoundingClientRect().left;
        _0x196f54 = _0x76441e.clientY - _0xb8cc07.getBoundingClientRect().top;
      });
      chrome.storage.local.get(["stealth", "ultraStealth"], function (_0x4e01c1) {
        let _0x458dbd = _0x4e01c1.stealth === true;
        let _0x314701 = _0x4e01c1.ultraStealth === true;
        const _0x4b74db = document.getElementById("stealth-mode");
        if (_0x4b74db) {
          _0x4b74db.innerText = _0x458dbd ? "Disable Stealth Mode" : "Enable Stealth Mode";
          if (_0x314701) {
            _0x4b74db.style.opacity = "0.5";
            _0x4b74db.style.cursor = "not-allowed";
            _0x4b74db.title = "Ultra Stealth Mode is enabled. Disable it first from extension options.";
          } else {
            _0x4b74db.style.opacity = "1";
            _0x4b74db.style.cursor = "pointer";
            _0x4b74db.title = '';
          }
          _0x4b74db.addEventListener("click", () => {
            if (_0x314701) {
              _0x1f3575("Cannot change stealth mode while Ultra Stealth Mode is enabled");
              return;
            }
            const _0x40520b = document.getElementById("chat-button");
            const _0x15fcda = document.getElementById("close-chat");
            _0x458dbd = !_0x458dbd;
            if (_0x458dbd) {
              _0xb8cc07.style.opacity = "0.15";
              if (_0x40520b) {
                _0x40520b.style.display = "none";
              }
              if (_0x15fcda) {
                _0x15fcda.style.display = "block";
              }
              _0x4b74db.innerText = "Disable Stealth Mode";
              _0x1f3575("Chat icon hidden and Opacity reduced");
            } else {
              _0xb8cc07.style.opacity = "1";
              if (_0x40520b) {
                _0x40520b.style.display = "flex";
                _0x40520b.innerHTML = "\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                                    <path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/>\n                                </svg>\n                                ";
              }
              _0x4b74db.innerText = "Enable Stealth Mode";
              _0x1f3575("Chat icon enabled");
            }
            const _0x430209 = {
              stealth: _0x458dbd
            };
            chrome.storage.local.set(_0x430209);
          });
        }
        chrome.storage.onChanged.addListener(_0x232af3 => {
          if (_0x232af3.ultraStealth && _0x4b74db) {
            const _0x38b91f = _0x232af3.ultraStealth.newValue === true;
            if (_0x38b91f) {
              _0x4b74db.style.opacity = "0.5";
              _0x4b74db.style.cursor = "not-allowed";
              _0x4b74db.title = "Ultra Stealth Mode is enabled. Disable it first from extension options.";
            } else {
              _0x4b74db.style.opacity = "1";
              _0x4b74db.style.cursor = "pointer";
              _0x4b74db.title = '';
            }
            _0x314701 = _0x38b91f;
          }
        });
      });
      _0x48cfed.addEventListener("mousedown", _0x3b4f68 => {
        _0x567a74 = true;
        _0x267cc0 = _0x3b4f68.clientX;
        _0x198315 = _0x3b4f68.clientY;
        _0x3e9e9d = _0xb8cc07.offsetWidth;
        _0x24fa56 = _0xb8cc07.offsetHeight;
        _0x3b4f68.stopPropagation();
      });
      _0x48cfed.addEventListener("mouseenter", () => {
        _0x48cfed.style.opacity = "1";
      });
      _0x48cfed.addEventListener("mouseleave", () => {
        _0x48cfed.style.opacity = "0.8";
      });
      window.addEventListener("resize", () => {
        const _0x46ba29 = document.getElementById("chat-overlay");
        if (_0x46ba29) {
          const _0x4d8ff2 = _0x46ba29.getBoundingClientRect();
          const _0x1f7c3d = window.innerWidth - 40;
          const _0x707ce8 = window.innerHeight - 40;
          if (_0x4d8ff2.width > _0x1f7c3d) {
            _0x46ba29.style.width = _0x1f7c3d + "px";
          }
          if (_0x4d8ff2.height > _0x707ce8) {
            _0x46ba29.style.height = _0x707ce8 + "px";
          }
          if (_0x4d8ff2.right > window.innerWidth) {
            _0x46ba29.style.left = window.innerWidth - _0x4d8ff2.width + "px";
          }
          if (_0x4d8ff2.bottom > window.innerHeight) {
            _0x46ba29.style.top = window.innerHeight - _0x4d8ff2.height + "px";
          }
        }
      });
      const _0x4948a3 = document.getElementById("close-chat");
      if (_0x4948a3) {
        _0x4948a3.addEventListener("click", () => {
          _0xe980fa = false;
          _0xb8cc07.style.display = "none";
        });
      }
      const _0x5513fc = document.getElementById("clear-chat");
      if (_0x5513fc) {
        _0x5513fc.addEventListener("click", () => {
          _0x1d640d = [];
          _0xc29062.innerHTML = '';
          const _0x1f5cdc = {
            action: "resetContext"
          };
          chrome.runtime.sendMessage(_0x1f5cdc);
        });
      }
      _0x5a3f26.addEventListener("click", async () => {
        const _0x60753d = _0x2d0807.innerText.trim();
        if (_0x60753d) {
          try {
            const _0x36fd3a = {
              role: "user",
              content: _0x60753d
            };
            _0x1d640d.push(_0x36fd3a);
            _0x52a164(_0x60753d, "user");
            _0x2d0807.innerText = '';
            const _0x28afd8 = _0xcfcba3();
            _0xc29062.appendChild(_0x28afd8);
            const _0xec6134 = {
              action: "processChatMessage",
              message: _0x60753d,
              context: _0x1d640d
            };
            await chrome.runtime.sendMessage(_0xec6134);
          } catch (_0x9c2755) {
            // console.error("Error sending message:", _0x9c2755);
            _0x52a164("Error sending message. Please try again.", "assistant");
          }
        }
      });
      _0x3ef659("Alt + C to toggle the chat overlay.\nAlt + B to paste content inside the chat overlay.");
      return _0xb8cc07;
    }
    function _0x3ef659(_0xc6cb79) {
      const _0x181096 = document.getElementById("chat-messages");
      if (!_0x181096) {
        return;
      }
      const _0x4fec6c = document.createElement("div");
      _0x4fec6c.textContent = _0xc6cb79;
      _0x4fec6c.style.cssText = "\n                margin: 10px 0;\n                padding: 10px;\n                background-color: #eef;\n                border-radius: 8px;\n                color: #333;\n                font-size: 12px;\n                text-align: center;\n            ";
      _0x181096.appendChild(_0x4fec6c);
      _0x181096.scrollTop = _0x181096.scrollHeight;
    }
    function _0x473df1() {
      const _0x373d31 = document.createElement("button");
      _0x373d31.id = "chat-button";
      _0x373d31.style.cssText = "\n        position: fixed;\n        bottom: 20px;\n        right: 20px;\n        width: 50px;\n        height: 50px;\n        background-color: rgb(60, 84, 114);\n        border: none;\n        border-radius: 50%;\n        color: #fff;\n        cursor: pointer;\n        z-index: 9999;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        ";
      _0x373d31.innerHTML = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                <path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/>\n            </svg>";
      document.body.appendChild(_0x373d31);
      let _0x5a048c;
      let _0x28a9c5;
      let _0x58dc1f;
      let _0x1dca11;
      let _0x326912 = false;
      let _0x10b2d0 = false;
      _0x373d31.addEventListener("mousedown", _0x29a86c => {
        _0x326912 = true;
        _0x10b2d0 = false;
        _0x5a048c = _0x29a86c.clientX;
        _0x28a9c5 = _0x29a86c.clientY;
        _0x58dc1f = _0x373d31.getBoundingClientRect().left;
        _0x1dca11 = _0x373d31.getBoundingClientRect().top;
        _0x373d31.style.transition = "none";
      });
      document.addEventListener("mousemove", _0x363d67 => {
        if (_0x326912) {
          const _0xf46f23 = _0x363d67.clientX - _0x5a048c;
          const _0x3e46aa = _0x363d67.clientY - _0x28a9c5;
          if (Math.abs(_0xf46f23) > 5 || Math.abs(_0x3e46aa) > 5) {
            _0x10b2d0 = true;
          }
          const _0x496d83 = _0x58dc1f + _0xf46f23;
          const _0x33c3d0 = _0x1dca11 + _0x3e46aa;
          const _0x21aca3 = window.innerWidth - _0x373d31.offsetWidth;
          const _0x11d17d = window.innerHeight - _0x373d31.offsetHeight;
          _0x373d31.style.left = Math.min(Math.max(0, _0x496d83), _0x21aca3) + "px";
          _0x373d31.style.top = Math.min(Math.max(0, _0x33c3d0), _0x11d17d) + "px";
          _0x373d31.style.bottom = "auto";
          _0x373d31.style.right = "auto";
        }
      });
      document.addEventListener("mouseup", () => {
        if (_0x326912) {
          _0x326912 = false;
          _0x373d31.style.transition = '';
          if (!_0x10b2d0) {
            _0x20613c();
          }
        }
      });
      _0x373d31.addEventListener("click", _0x7e0d12 => {
        _0x7e0d12.preventDefault();
      });
      return _0x373d31;
    }
    function _0x52a164(_0x161d52, _0x26f444) {
      const _0xa3594a = document.getElementById("chat-messages");
      if (!_0xa3594a) {
        return;
      }
      const _0x72eded = document.createElement("div");
      _0x72eded.style.cssText = "\n                margin-bottom: 10px;\n                padding: 10px;\n                border-radius: 8px;\n                max-width: 90%;\n                word-wrap: break-word;\n            ";
      if (_0x26f444 === "user") {
        _0x72eded.style.backgroundColor = "#dcf8c6";
        _0x72eded.style.alignSelf = "flex-end";
        _0x72eded.style.paddingLeft = "10px";
      } else {
        _0x72eded.style.backgroundColor = "#f1f1f1";
        _0x72eded.style.alignSelf = "flex-start";
        _0x72eded.style.border = "1px solid #ddd";
        _0x72eded.style.paddingLeft = "10px";
      }
      try {
        if (typeof showdown !== "undefined") {
          const _0x4d5d40 = new showdown.Converter();
          const _0x4f047b = _0x4d5d40.makeHtml(_0x161d52);
          const _0x11c3df = document.createElement("div");
          _0x11c3df.innerHTML = _0x4f047b;
          _0x11c3df.querySelectorAll("pre code").forEach(_0x4b8e6c => {
            _0x4b8e6c.style.cssText = "\n                            border: 1px solid #ddd;\n                            border-radius: 4px;\n                            padding: 12px;\n                            display: block;\n                            margin: 15px 0;\n                            overflow-x: auto;\n                            white-space: pre;\n                        ";
            const _0x3ccd64 = document.createElement("div");
            _0x3ccd64.style.position = "relative";
            _0x4b8e6c.parentNode.insertBefore(_0x3ccd64, _0x4b8e6c);
            _0x3ccd64.appendChild(_0x4b8e6c);
            const _0x3f34d6 = document.createElement("button");
            _0x3f34d6.innerText = "Copy";
            _0x3f34d6.style.cssText = "\n                            position: absolute;\n                            right: 8px;\n                            top: 8px;\n                            background-color: rgb(60, 84, 114);\n                            color: #fff;\n                            border: none;\n                            border-radius: 6px;\n                            cursor: pointer;\n                            padding: 6px 12px;\n                            font-size: 12px;\n                            font-family: 'Poppins', sans-serif;\n                            opacity: 0;\n                            transition: opacity 0.2s ease;\n                        ";
            _0x3ccd64.addEventListener("mouseenter", () => {
              _0x3f34d6.style.opacity = "1";
            });
            _0x3ccd64.addEventListener("mouseleave", () => {
              _0x3f34d6.style.opacity = "0";
            });
            _0x3f34d6.addEventListener("click", () => {
              navigator.clipboard.writeText(_0x4b8e6c.innerText).then(() => {
                _0x3f34d6.innerText = "Copied";
                setTimeout(() => {
                  _0x3f34d6.innerText = "Copy";
                }, 5000);
              })["catch"](_0x31492d => {
                console.error("Failed to copy: ", _0x31492d);
              });
            });
            _0x3ccd64.appendChild(_0x3f34d6);
          });
          _0x72eded.appendChild(_0x11c3df);
        } else {
          _0x72eded.textContent = _0x161d52;
        }
      } catch (_0x5070ba) {
        console.error("Error rendering markdown:", _0x5070ba);
        _0x72eded.textContent = _0x161d52;
      }
      _0xa3594a.appendChild(_0x72eded);
      _0xa3594a.scrollTop = _0xa3594a.scrollHeight;
    }
    function _0xcfcba3() {
      const _0x3487c1 = document.createElement("div");
      _0x3487c1.id = "loading-message";
      _0x3487c1.style.cssText = "\n        margin-bottom: 16px;\n        padding: 14px 16px;\n        border-radius: 14px;\n        background-color: #fff;\n        align-self: flex-start;\n        border: 1px solid rgba(0, 0, 0, 0.08);\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        font-family: 'Poppins', sans-serif;\n        font-size: 14px;\n        color: rgba(0, 0, 0, 0.6);\n        ";
      const _0x564660 = document.createElement("div");
      _0x564660.style.cssText = "\n        display: flex;\n        gap: 4px;\n        margin-left: 4px;\n        ";
      for (let _0x100e0c = 0; _0x100e0c < 3; _0x100e0c++) {
        const _0x4b70fe = document.createElement("div");
        _0x4b70fe.style.cssText = "\n            width: 6px;\n            height: 6px;\n            background-color: rgba(0, 0, 0, 0.4);\n            border-radius: 50%;\n            animation: typingAnimation 1.4s infinite;\n            animation-delay: " + _0x100e0c * 0.2 + "s;\n        ";
        _0x564660.appendChild(_0x4b70fe);
      }
      _0x3487c1.textContent = "Thinking";
      _0x3487c1.appendChild(_0x564660);
      if (!document.getElementById("typing-animation-style")) {
        const _0x5e5936 = document.createElement("style");
        _0x5e5936.id = "typing-animation-style";
        _0x5e5936.textContent = "\n            @keyframes typingAnimation {\n            0%, 20% {\n                transform: translateY(0);\n                opacity: 0.5;\n            }\n            50% {\n                transform: translateY(-4px);\n                opacity: 1;\n            }\n            80%, 100% {\n                transform: translateY(0);\n                opacity: 0.5;\n            }\n            }\n        ";
        document.head.appendChild(_0x5e5936);
      }
      return _0x3487c1;
    }
    function _0x20613c() {
      _0xe980fa = !_0xe980fa;
      let _0x5c87d7 = document.getElementById("chat-overlay");
      if (!_0x5c87d7) {
        _0x5c87d7 = _0x3e41ca();
      }
      if (_0x5c87d7) {
        _0x5c87d7.style.display = _0xe980fa ? "flex" : "none";
        if (_0xe980fa) {
          chrome.storage.local.get(["stealth", "ultraStealth"], function (_0x5cfa92) {
            const _0x39bb7f = _0x5cfa92.stealth === true;
            const _0x3fdcd9 = _0x5cfa92.ultraStealth === true;
            _0x5c87d7.style.opacity = _0x39bb7f || _0x3fdcd9 ? "0.15" : "1";
            const _0x57d03b = document.getElementById("stealth-mode");
            if (_0x57d03b) {
              _0x57d03b.innerText = _0x39bb7f ? "Disable Stealth Mode" : "Enable Stealth Mode";
            }
            const _0xea63ea = document.getElementById("chat-button");
            if (_0xea63ea) {
              _0xea63ea.style.display = _0x39bb7f || _0x3fdcd9 ? "none" : "flex";
            }
          });
          setTimeout(() => {
            const _0x370700 = document.querySelector("#chat-overlay div[contenteditable='true']");
            if (_0x370700) {
              _0x370700.focus();
            }
          }, 100);
        }
      }
    }
    function _0x16f1bd() {
      const _0x330c05 = new MutationObserver(_0xcb4447 => {
        const _0x22ca25 = document.querySelectorAll("a.cc-1m2mf");
        _0x22ca25.forEach(_0x2c75ed => {
          _0x2c75ed.style.display = "none";
        //   console.log("Blocked clashing chat element with class cc-1m2mf");
        });
      });
      const _0x10ddeb = {
        childList: true,
        subtree: true
      };
      _0x330c05.observe(document.body, _0x10ddeb);
      const _0xa7cbfe = document.querySelectorAll("a.cc-1m2mf");
      _0xa7cbfe.forEach(_0x4865fb => {
        _0x4865fb.style.display = "none";
        // console.log("Blocked existing clashing chat element with class cc-1m2mf");
      });
      const _0x1da650 = document.createElement("style");
      _0x1da650.textContent = "\n                a.cc-1m2mf {\n                    display: none !important;\n                    visibility: hidden !important;\n                    opacity: 0 !important;\n                    pointer-events: none !important;\n                }\n            ";
      document.head.appendChild(_0x1da650);
    }
    document.addEventListener("mousemove", _0x2e66c8 => {
      const _0x58cf72 = document.getElementById("chat-overlay");
      if (!_0x58cf72) {
        return;
      }
      if (_0x31f8a1) {
        const _0x33ef7a = _0x2e66c8.clientX - _0x1d6a5c;
        const _0x8fe6fb = _0x2e66c8.clientY - _0x196f54;
        const _0x148615 = window.innerWidth - _0x58cf72.offsetWidth;
        const _0x464fd7 = window.innerHeight - _0x58cf72.offsetHeight;
        _0x58cf72.style.left = Math.min(Math.max(0, _0x33ef7a), _0x148615) + "px";
        _0x58cf72.style.top = Math.min(Math.max(0, _0x8fe6fb), _0x464fd7) + "px";
        _0x58cf72.style.bottom = "auto";
        _0x58cf72.style.right = "auto";
      }
      if (_0x567a74) {
        const _0x51986b = _0x58cf72.querySelector("div[style*='nw-resize']");
        if (!_0x51986b) {
          return;
        }
        const _0x2deef6 = window.innerWidth - 40;
        const _0x3cf6ca = window.innerHeight - 40;
        const _0x2fee20 = _0x267cc0 - _0x2e66c8.clientX;
        const _0x200416 = _0x198315 - _0x2e66c8.clientY;
        const _0x95d2aa = Math.min(Math.max(250, _0x3e9e9d + _0x2fee20), _0x2deef6);
        const _0x5ea37e = Math.min(Math.max(200, _0x24fa56 + _0x200416), _0x3cf6ca);
        const _0x40fce8 = _0x58cf72.getBoundingClientRect();
        const _0x55a3bb = _0x40fce8.right - _0x95d2aa;
        const _0x14484e = _0x40fce8.bottom - _0x5ea37e;
        if (_0x55a3bb >= 0 && _0x14484e >= 0) {
          _0x58cf72.style.width = _0x95d2aa + "px";
          _0x58cf72.style.height = _0x5ea37e + "px";
          _0x58cf72.style.left = _0x55a3bb + "px";
          _0x58cf72.style.top = _0x14484e + "px";
        }
      }
    });
    document.addEventListener("mouseup", () => {
      _0x31f8a1 = false;
      _0x567a74 = false;
    });
    document.addEventListener("keydown", _0x47c59c => {
      if (_0x47c59c.altKey && _0x47c59c.key === "3") {
        _0x47c59c.preventDefault();
        _0x20613c();
      }
      if (_0x47c59c.key === "Escape" && _0xe980fa) {
        _0xe980fa = false;
        const _0x258a29 = document.getElementById("chat-overlay");
        if (_0x258a29) {
          _0x258a29.style.display = "none";
        }
      }
      if (_0x47c59c.altKey && _0x47c59c.key === "4") {
        navigator.clipboard.readText().then(_0x10d425 => {
          const _0x1a3c4f = document.activeElement;
          if (_0x1a3c4f && (_0x1a3c4f.isContentEditable || _0x1a3c4f.tagName === "INPUT" || _0x1a3c4f.tagName === "TEXTAREA")) {
            if (_0x1a3c4f.isContentEditable) {
              _0x1a3c4f.innerText += _0x10d425;
            } else {
              _0x1a3c4f.value += _0x10d425;
            }
            const _0x51bfa7 = {
              "bubbles": true
            };
            const _0x365445 = new Event("input", _0x51bfa7);
            _0x1a3c4f.dispatchEvent(_0x365445);
          }
        })["catch"](_0x2fdfcc => {
        //   console.error("Failed to paste: ", _0x2fdfcc);
        });
      }
    });
    async function _0x2a2c3e() {
      try {
        await _0x4ca826();
        // console.log("Showdown library loaded successfully");
      } catch (_0x221f66) {
        // console.error("Failed to load Showdown library:", _0x221f66);
      }
      _0x16f1bd();
      const _0x48960c = _0x473df1();
      chrome.storage.local.get(["stealth", "ultraStealth"], function (_0x1f849c) {
        const _0x1175b5 = _0x1f849c.stealth === true;
        const _0x24b0f1 = _0x1f849c.ultraStealth === true;
        if ((_0x1175b5 || _0x24b0f1) && _0x48960c) {
          _0x48960c.style.display = "none";
        }
        try {
          const _0x50d89c = _0x3e41ca();
          if ((_0x1175b5 || _0x24b0f1) && _0x50d89c) {
            _0x50d89c.style.opacity = "0.15";
            const _0x27bfc3 = document.getElementById("stealth-mode");
            if (_0x27bfc3) {
              _0x27bfc3.innerText = "Disable Stealth Mode";
            }
          }
        } catch (_0x142f1e) {
        //   console.error("Error creating chat overlay:", _0x142f1e);
        }
      });
    }
    _0x2a2c3e();
    chrome.runtime.onMessage.addListener((_0x1aa569, _0xdae227, _0x18bd28) => {
      if (_0x1aa569.action === "updateChatHistory") {
        const {
          role: _0x40f42d,
          content: _0x45c64c
        } = _0x1aa569;
        const _0x1ba1ff = {
          role: _0x40f42d,
          content: _0x45c64c
        };
        _0x1d640d.push(_0x1ba1ff);
        const _0x2fdb5b = document.getElementById("loading-message");
        if (_0x2fdb5b) {
          _0x2fdb5b.remove();
        }
        _0x52a164(_0x45c64c, _0x40f42d);
      }
    });
    function _0x1f3575(_0x1da0a1) {
      const _0x1099af = document.createElement("div");
      _0x1099af.id = "stealth-mode-toast";
      const _0x5ee95e = _0x1da0a1.includes("enabled");
      const _0x3ed192 = _0x5ee95e ? "rgba(10, 40, 10, 0.95)" : "rgba(40, 10, 10, 0.95)";
      const _0xcc4ab5 = _0x5ee95e ? "#4ade80" : "#ff6b6b";
      const _0x45d7b2 = _0x5ee95e ? "rgba(74, 222, 128, 0.2)" : "rgba(255, 107, 107, 0.2)";
      _0x1099af.style.cssText = "\n                position: fixed;\n                bottom: 20px;\n                left: 50%;\n                transform: translateX(-50%) translateY(10px);\n                padding: 14px 16px;\n                background-color: " + _0x3ed192 + ";\n                color: #ffffff;\n                border-radius: 8px;\n                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n                font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n                font-size: 14px;\n                z-index: 999999;\n                transition: opacity 0.3s ease, transform 0.3s ease;\n                opacity: 0;\n                min-width: 300px;\n                border: 1px solid " + _0x45d7b2 + ";\n                backdrop-filter: blur(10px);\n                -webkit-backdrop-filter: blur(10px);\n            ";
      const _0x25931b = document.createElement("div");
      _0x25931b.style.cssText = "\n                display: flex;\n                justify-content: space-between;\n                align-items: flex-start;\n            ";
      const _0x4bb768 = document.createElement("div");
      _0x4bb768.style.cssText = "\n                display: flex;\n                align-items: center;\n                gap: 12px;\n                flex-grow: 1;\n                margin-right: 12px;\n            ";
      const _0x4661e5 = document.createElement("span");
      _0x4661e5.style.cssText = "\n                display: inline-block;\n                width: 8px;\n                height: 8px;\n                background-color: " + _0xcc4ab5 + ";\n                border-radius: 50%;\n                margin-right: 8px;\n                box-shadow: 0 0 4px " + (_0x5ee95e ? "rgba(74, 222, 128, 0.6)" : "rgba(255, 107, 107, 0.6)") + ";\n            ";
      const _0x227f4b = document.createElement("div");
      _0x227f4b.style.cssText = "\n                display: flex;\n                flex-direction: column;\n                gap: 4px;\n                flex-grow: 1;\n            ";
      const _0x4e0abe = document.createElement("div");
      _0x4e0abe.style.fontWeight = "500";
      _0x4e0abe.textContent = _0x1da0a1;
      _0x4e0abe.style.color = _0xcc4ab5;
      const _0x3fa2b9 = document.createElement("div");
      _0x3fa2b9.style.cssText = "\n                font-size: 12px;\n                color: rgba(255, 255, 255, 0.7);\n                white-space: pre-line;\n            ";
      _0x3fa2b9.textContent = "Press Alt+C to toggle the chatbot overlay";
      const _0x9b1756 = document.createElement("div");
      _0x9b1756.style.display = "flex";
      _0x9b1756.style.alignItems = "center";
      _0x9b1756.appendChild(_0x4661e5);
      _0x227f4b.appendChild(_0x4e0abe);
      _0x227f4b.appendChild(_0x3fa2b9);
      _0x9b1756.appendChild(_0x227f4b);
      _0x4bb768.appendChild(_0x9b1756);
      const _0x2cecae = document.createElement("div");
      _0x2cecae.style.display = "flex";
      _0x2cecae.style.alignItems = "center";
      const _0x578d8a = document.createElement("button");
      _0x578d8a.style.cssText = "\n                background: none;\n                border: none;\n                color: rgba(255, 255, 255, 0.7);\n                cursor: pointer;\n                padding: 4px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                border-radius: 4px;\n                transition: all 0.2s ease;\n            ";
      _0x578d8a.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>";
      _0x578d8a.addEventListener("mouseover", () => {
        _0x578d8a.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        _0x578d8a.style.color = "#ffffff";
      });
      _0x578d8a.addEventListener("mouseout", () => {
        _0x578d8a.style.backgroundColor = "transparent";
        _0x578d8a.style.color = "rgba(255, 255, 255, 0.7)";
      });
      _0x578d8a.addEventListener("click", () => {
        _0x1099af.style.opacity = "0";
        _0x1099af.style.transform = "translateX(-50%) translateY(10px)";
        setTimeout(() => _0x1099af.remove(), 300);
      });
      _0x2cecae.appendChild(_0x578d8a);
      _0x25931b.appendChild(_0x4bb768);
      _0x25931b.appendChild(_0x2cecae);
      _0x1099af.appendChild(_0x25931b);
      document.body.appendChild(_0x1099af);
      setTimeout(() => {
        _0x1099af.style.opacity = "1";
        _0x1099af.style.transform = "translateX(-50%) translateY(0)";
      }, 10);
      setTimeout(() => {
        _0x1099af.style.opacity = "0";
        _0x1099af.style.transform = "translateX(-50%) translateY(10px)";
        setTimeout(() => _0x1099af.remove(), 300);
      }, 5000);
      chrome.storage.local.set({
        "stealth": _0x1da0a1.includes("enabled")
      });
    }
  });
})();