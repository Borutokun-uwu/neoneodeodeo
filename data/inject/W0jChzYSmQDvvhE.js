(function () {
  'use strict';

  if (!window.__ENABLE_RIGHT_CLICK_SETUP) {
    window.document.addEventListener("contextmenu", _0x4db921 => {
      _0x4db921.stopPropagation();
    }, true);
  }
  window.__ENABLE_RIGHT_CLICK_SETUP = true;
})();