var encryptedData = null;
var decrypted = null;
let mcqArray = [];
let codingArray = [];
function resetExamData() {
  examData = {};
  encryptedData = null;
  decryptedData = null;
}
function interceptAndDecrypt() {
  let _0x345c4f = 0;
  const _0x21781b = setInterval(() => {
    if (encryptedData) {
      try {
        decryptedData = decryptData(encryptedData);
        clearInterval(_0x21781b);
      } catch (_0x45244b) {}
    }
    _0x345c4f++;
    if (_0x345c4f > 50) {
      clearInterval(_0x21781b);
    }
  }, 100);
}
(function () {
  let _0x2699f5 = location.href;
  function _0x1cbd66() {
    encryptedData = null;
    decrypted = null;
    mcqArray = [];
    codingArray = [];
    (function () {
      const _0x3ed532 = window.XMLHttpRequest;
      function _0x24acff() {
        const _0x4c07e6 = new _0x3ed532();
        _0x4c07e6.addEventListener("readystatechange", function () {
          if (_0x4c07e6.readyState === 4) {
            const _0xdbe5e2 = _0x4c07e6.responseURL;
            if (_0xdbe5e2.includes("https://api.examly.io/api/sEKMRyOJKjIzZbUa") || _0xdbe5e2.includes("https://api.examly.io/api/9DECJfxqhu0cgJAQ")) {
              encryptedData = _0x4c07e6.responseText;
            }
          }
        }, false);
        return _0x4c07e6;
      }
      window.XMLHttpRequest = _0x24acff;
    })();
    function _0xe7f441(_0x5538ec, _0x3f1c71) {
      try {
        const _0x59ea2c = CryptoJS.AES.decrypt(_0x5538ec, _0x3f1c71);
        return JSON.parse(_0x59ea2c.toString(CryptoJS.enc.Utf8));
      } catch (_0x16de0a) {
        return null;
      }
    }
    function _0x24370f() {
      let _0x1b3496 = localStorage.getItem("accord_event");
      let _0x135d93 = localStorage.getItem("school_details");
      if (!_0x1b3496 || !_0x135d93) {
        return;
      }
      _0x1b3496 = JSON.parse(_0x1b3496);
      _0x135d93 = JSON.parse(_0x135d93);
      if (_0x1b3496.list?.["test_details"]?.[0]) {
        const _0x442cef = _0x1b3496.list.test_details[0].user_id;
        const _0x3e4033 = _0x135d93.school_id;
        const _0x164786 = _0x442cef.concat(_0x3e4033.toString(), "k3QL95NjdP!cA34CsXL").split("-").join('');
        try {
          const _0x21dd4a = JSON.parse(encryptedData);
          decrypted = _0xe7f441(_0x21dd4a.data, _0x164786);
          if (!decrypted) {
            return;
          }
          let _0x1f14fe = decrypted.frozen_test_data;
          resetExamData();
          _0x1f14fe.forEach(_0x4afb3b => {
            _0x4afb3b.questions.forEach(_0x5bb0cd => {
              if (_0x5bb0cd.mcq_questions) {
                let _0x596629 = _0x5bb0cd.mcq_questions.actual_answer.args[0];
                let _0x17b9b0 = _0x5bb0cd.options.findIndex(_0x3e0491 => _0x3e0491.text === _0x596629);
                if (_0x17b9b0 !== -1) {
                  mcqArray.push(_0x17b9b0);
                }
              }
              if (_0x5bb0cd.programming_question) {
                let _0x15cb27 = _0x5bb0cd.programming_question.solution[0].solutiondata[0].solution;
                codingArray.push(_0x15cb27);
              }
            });
          });
        } catch (_0x5dbec0) {}
      }
    }
    var _0x4c16b1 = setInterval(function () {
      if (encryptedData !== null) {
        clearInterval(_0x4c16b1);
        const _0x51c58c = document.createElement("script");
        _0x51c58c.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
        _0x51c58c.onload = _0x24370f;
        document.head.appendChild(_0x51c58c);
      }
    }, 100);
  }
  setInterval(() => {
    if (location.href !== _0x2699f5) {
      _0x2699f5 = location.href;
      if (location.href.includes("/mycourses/details")) {
        _0x1cbd66();
      }
    }
  }, 1);
  if (location.href.includes("/mycourses/details")) {
    _0x1cbd66();
  }
})();
(function () {
  let _0x4a3849;
  let _0x1a3ac4 = [];
  let _0x19712f = 0;
  let _0x8ad6fb = 0;
  let _0x4e1ef8 = false;
  let _0x4e8078 = '';
  let _0x5957e1 = false;
  let _0x284f37 = false;
  let _0x39ea01 = null;
  function _0x8f52a6() {
    const _0x10e0f1 = document.querySelector("#content-left > content-left > div > div.t-h-full > testtaking-question > div > div.t-flex.t-items-center.t-justify-between.t-whitespace-nowrap.t-px-10.t-py-8.lg\\:t-py-8.lg\\:t-px-20.t-bg-primary\\/\\[0\\.1\\].t-border-b.t-border-solid.t-border-b-neutral-2.t-min-h-\\[30px\\].lg\\:t-min-h-\\[35px\\].ng-star-inserted > div:nth-child(1) > div > div");
    if (_0x10e0f1) {
      const _0x2b8267 = _0x10e0f1.textContent;
      const _0x3112e1 = _0x2b8267.match(/Question No : (\d+) \/ \d+/);
      const _0x24f86e = _0x3112e1 ? _0x3112e1[1] : null;
      if (_0x24f86e && _0x24f86e !== _0x39ea01) {
        _0x39ea01 = _0x24f86e;
        _0x5957e1 = false;
        _0x284f37 = false;
        const _0xc25d18 = document.querySelector("#programme-compile");
        if (_0xc25d18) {
          const _0x1ed7b0 = document.querySelector("div[aria-labelledby=\"editor-answer\"]");
          if (_0x1ed7b0) {
            _0x4a3849 = ace.edit(_0x1ed7b0);
          }
        }
      }
    }
  }
  setInterval(_0x8f52a6, 500);
  document.addEventListener("keydown", function (_0x30aa10) {
    _0x8f52a6();
    if (_0x30aa10.key === "Backspace" && _0x5957e1) {
      _0x30aa10.preventDefault();
      _0x4a3849.setValue('');
      _0x4a3849.clearSelection();
      _0x19712f = 0;
      _0x8ad6fb = 0;
      _0x50f077();
      return;
    }
    if ((_0x30aa10.key.toLowerCase() === "1" || _0x30aa10.altKey &&  _0x30aa10.key.toLowerCase() === "1") && _0x284f37 && !_0x30aa10.ctrlKey && !_0x30aa10.metaKey) {
      if (_0x5957e1) {
        _0x30aa10.preventDefault();
        _0x50f077();
      }
      return;
    }
    if (_0x30aa10.altKey && _0x30aa10.key.toLowerCase() === "2") {
      _0x5957e1 = false;
      _0x284f37 = false;
      const _0x22270b = document.querySelector("#programme-compile");
      if (_0x22270b) {
        const _0x230ecb = document.querySelector("#content-left > content-left > div > div.t-h-full > testtaking-question > div > div.t-flex.t-items-center.t-justify-between.t-whitespace-nowrap.t-px-10.t-py-8.lg\\:t-py-8.lg\\:t-px-20.t-bg-primary\\/\\[0\\.1\\].t-border-b.t-border-solid.t-border-b-neutral-2.t-min-h-\\[30px\\].lg\\:t-min-h-\\[35px\\].ng-star-inserted > div:nth-child(1) > div > div");
        if (_0x230ecb) {
          const _0x7c088a = _0x230ecb.textContent;
          const _0xc6272f = _0x7c088a.match(/Question No : (\d+) \/ \d+/);
          let _0x2991b3 = _0xc6272f ? parseInt(_0xc6272f[1]) : null;
          if (_0x2991b3 && codingArray[_0x2991b3 - 1]) {
            const _0x427631 = document.querySelector("div[aria-labelledby=\"editor-answer\"]");
            if (_0x427631) {
              _0x4a3849 = ace.edit(_0x427631);
              _0x4e8078 = codingArray[_0x2991b3 - 1];
              _0x4a3849.setValue(_0x4e8078);
              _0x4a3849.clearSelection();
              _0x4a3849.navigateFileEnd();
            }
          }
        }
      } else {
        const _0x428bc2 = document.querySelector("#content-left > content-left > div > div.t-h-full > testtaking-question > div > div.t-flex.t-items-center.t-justify-between.t-whitespace-nowrap.t-px-10.t-py-8.lg\\:t-py-8.lg\\:t-px-20.t-bg-primary\\/\\[0\\.1\\].t-border-b.t-border-solid.t-border-b-neutral-2.t-min-h-\\[30px\\].lg\\:t-min-h-\\[35px\\].ng-star-inserted > div:nth-child(1) > div > div");
        if (_0x428bc2) {
          const _0x56b95d = _0x428bc2.textContent;
          const _0x4b22ff = _0x56b95d.match(/Question No : (\d+) \/ \d+/);
          let _0x14d4fe = _0x4b22ff ? _0x4b22ff[1] : null;
          if (_0x14d4fe) {
            const _0x18b0fe = mcqArray[_0x14d4fe - 1];
            const _0x130a24 = document.querySelector("#tt-option-" + _0x18b0fe + " > label > span.checkmark1");
            if (_0x130a24) {
              const _0x33f0d6 = {
                bubbles: true
              };
              _0x130a24.dispatchEvent(new Event("click", _0x33f0d6));
            }
          }
        }
      }
    }
    if (_0x30aa10.altKey &&  _0x30aa10.key.toLowerCase() === "1") {
      const _0x25bf85 = document.querySelector("#programme-compile");
      if (_0x25bf85) {
        const _0x2cf69a = document.querySelector("#content-left > content-left > div > div.t-h-full > testtaking-question > div > div.t-flex.t-items-center.t-justify-between.t-whitespace-nowrap.t-px-10.t-py-8.lg\\:t-py-8.lg\\:t-px-20.t-bg-primary\\/\\[0\\.1\\].t-border-b.t-border-solid.t-border-b-neutral-2.t-min-h-\\[30px\\].lg\\:t-min-h-\\[35px\\].ng-star-inserted > div:nth-child(1) > div > div");
        if (_0x2cf69a) {
          const _0x15f8a9 = _0x2cf69a.textContent;
          const _0x5a8a56 = _0x15f8a9.match(/Question No : (\d+) \/ \d+/);
          let _0x1f607e = _0x5a8a56 ? parseInt(_0x5a8a56[1]) : null;
          if (_0x1f607e && codingArray[_0x1f607e - 1]) {
            const _0x2a127c = document.querySelector("div[aria-labelledby=\"editor-answer\"]");
            if (_0x2a127c) {
              _0x4a3849 = ace.edit(_0x2a127c);
              _0x4e8078 = codingArray[_0x1f607e - 1];
              _0x4a3849.setValue('');
              _0x4a3849.clearSelection();
              _0x1a3ac4 = _0x4e8078.split("\n");
              _0x19712f = 0;
              _0x8ad6fb = 0;
              _0x4e1ef8 = true;
              _0x5957e1 = true;
              _0x284f37 = true;
              _0x50f077();
            }
          }
        }
      }
    }
  });
  function _0x50f077() {
    if (_0x8ad6fb < _0x1a3ac4.length) {
      const _0x59bc9f = _0x1a3ac4[_0x8ad6fb];
      if (_0x59bc9f.trim().startsWith("//")) {
        _0x8ad6fb++;
        _0x19712f = 0;
        _0x50f077();
        return;
      }
      if (_0x19712f < _0x59bc9f.length) {
        _0x4a3849.setValue(_0x4a3849.getValue() + _0x59bc9f[_0x19712f]);
        _0x4a3849.clearSelection();
        _0x4a3849.navigateFileEnd();
        _0x19712f++;
      } else {
        _0x4a3849.setValue(_0x4a3849.getValue() + "\n");
        _0x4a3849.clearSelection();
        _0x4a3849.navigateFileEnd();
        _0x8ad6fb++;
        _0x19712f = 0;
      }
    } else {
      _0x4e1ef8 = false;
      _0x5957e1 = false;
      _0x284f37 = false;
    }
  }
})();