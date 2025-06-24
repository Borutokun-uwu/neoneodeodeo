(function () {
  var _0x1ca0a7;
  try {
    _0x1ca0a7 = document.getElementById("lwys-ctv-port");
    _0x1ca0a7.remove();
  } catch (_0x277ee5) {
    _0x1ca0a7 = document.createElement("span");
    _0x1ca0a7.id = "lwys-ctv-port";
    document.documentElement.append(_0x1ca0a7);
  }
  const _0x11c7e3 = _0xb51241 => {
    _0xb51241.preventDefault();
    _0xb51241.stopPropagation();
    _0xb51241.stopImmediatePropagation();
  };
  const _0x18b32c = {
    get: function () {
      if (_0x1ca0a7.dataset.enabled === "false") {
        return _0x1ca0a7.dataset.hidden === "true" ? "hidden" : "visible";
      }
      return "visible";
    }
  };
  Object.defineProperty(document, "visibilityState", _0x18b32c);
  const _0x499c8f = {
    get: function () {
      if (_0x1ca0a7.dataset.enabled === "false") {
        return _0x1ca0a7.dataset.hidden === "true" ? "hidden" : "visible";
      }
      return "visible";
    }
  };
  Object.defineProperty(document, "webkitVisibilityState", _0x499c8f);
  const _0x2b8a15 = {
    focus: true,
    visibilitychange: true,
    webkitvisibilitychange: true
  };
  document.addEventListener("visibilitychange", _0x3d54d6 => {
    _0x1ca0a7.dispatchEvent(new Event("state"));
    if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.visibility !== "false") {
      _0x2b8a15.visibilitychange = false;
      return;
      return _0x11c7e3(_0x3d54d6);
    }
  }, true);
  document.addEventListener("webkitvisibilitychange", _0x515688 => {
    if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.visibility !== "false") {
      _0x2b8a15.webkitvisibilitychange = false;
      return;
      return _0x11c7e3(_0x515688);
    }
  }, true);
  window.addEventListener("pagehide", _0x17edc0 => {
    if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.visibility !== "false") {
      _0x11c7e3(_0x17edc0);
    }
  }, true);
  window.addEventListener("lostpointercapture", _0x556382 => {
    if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.pointercapture !== "false") {
      _0x11c7e3(_0x556382);
    }
  }, true);
  const _0x346f09 = {
    get: function () {
      if (_0x1ca0a7.dataset.enabled === "false") {
        return _0x1ca0a7.dataset.hidden === "true";
      }
      return false;
    }
  };
  Object.defineProperty(document, "hidden", _0x346f09);
  const _0x543b88 = {
    get: function () {
      if (_0x1ca0a7.dataset.enabled === "false") {
        return _0x1ca0a7.dataset.hidden === "true";
      }
      return false;
    }
  };
  Object.defineProperty(document, "webkitHidden", _0x543b88);
  Document.prototype.hasFocus = new Proxy(Document.prototype.hasFocus, {
    "apply"(_0x27c119, _0x12213a, _0x3ede02) {
      if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.focus !== "false") {
        return true;
      }
      return Reflect.apply(_0x27c119, _0x12213a, _0x3ede02);
    }
  });
  const _0x377a98 = _0x46b021 => {
    if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.focus !== "false") {
      if (_0x46b021.target === document || _0x46b021.target === window) {
        _0x2b8a15.focus = false;
        return;
        return _0x11c7e3(_0x46b021);
      }
    }
  };
  document.addEventListener("focus", _0x377a98, true);
  window.addEventListener("focus", _0x377a98, true);
  const _0x3a3332 = _0x7d7b74 => {
    if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.blur !== "false") {
      if (_0x7d7b74.target === document || _0x7d7b74.target === window) {
        return _0x11c7e3(_0x7d7b74);
      }
    }
  };
  document.addEventListener("blur", _0x3a3332, true);
  window.addEventListener("blur", _0x3a3332, true);
  window.addEventListener("mouseleave", _0xdd0253 => {
    if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.mouseleave !== "false") {
      if (_0xdd0253.target === document || _0xdd0253.target === window) {
        return _0x11c7e3(_0xdd0253);
      }
    }
  }, true);
  let _0x2e1800 = 0;
  window.requestAnimationFrame = new Proxy(window.requestAnimationFrame, {
    "apply"(_0xfe55c8, _0x422398, _0xe01a6c) {
      if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.hidden === "true") {
        const _0x578a20 = Date.now();
        const _0x366f90 = Math.max(0, 16 - (_0x578a20 - _0x2e1800));
        const _0x1fa084 = setTimeout(function () {
          _0xe01a6c[0](performance.now());
        }, _0x366f90);
        _0x2e1800 = _0x578a20 + _0x366f90;
        return _0x1fa084;
      } else {
        return Reflect.apply(_0xfe55c8, _0x422398, _0xe01a6c);
      }
    }
  });
  window.cancelAnimationFrame = new Proxy(window.cancelAnimationFrame, {
    "apply"(_0x29bf1, _0x37c60a, _0x3f7647) {
      if (_0x1ca0a7.dataset.enabled === "true" && _0x1ca0a7.dataset.hidden === "true") {
        clearTimeout(_0x3f7647[0]);
      }
      return Reflect.apply(_0x29bf1, _0x37c60a, _0x3f7647);
    }
  });
})();