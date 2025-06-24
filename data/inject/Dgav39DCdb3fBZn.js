window.addEventListener("blur", function () {
  window.focus();
});
function extractQuestionCodeAndOptions() {
  const _0xb8c8e9 = document.querySelector("div[aria-labelledby=\"question-data\"]");
  const _0x5d469c = _0xb8c8e9 ? _0xb8c8e9.innerText.trim() : '';
  const _0xc2ecaf = [];
  const _0x3a9da5 = document.querySelectorAll(".ace_layer.ace_text-layer .ace_line");
  _0x3a9da5.forEach(_0x5023db => {
    _0xc2ecaf.push(_0x5023db.innerText.trim());
  });
  const _0x1d2d0a = _0xc2ecaf.length > 0 ? _0xc2ecaf.join("\n") : null;
  const _0x1529cf = document.querySelectorAll("div[aria-labelledby=\"each-option\"]");
  const _0x16c27f = [];
  _0x1529cf.forEach((_0xc98b8, _0x326165) => {
    _0x16c27f.push("Option " + (_0x326165 + 1) + ": " + _0xc98b8.innerText.trim());
  });
  return {
    "question": _0x5d469c,
    "code": _0x1d2d0a,
    "options": _0x16c27f.join("\n")
  };
}
async function handleQuestionExtraction() {
  const {
    question: _0x436c38,
    code: _0x4ebcf4,
    options: _0x31bcd4
  } = extractQuestionCodeAndOptions();
  if (!_0x436c38) {
    const _0x13b182 = {
      action: "showToast",
      message: "No question found.",
      isError: true
    };
    chrome.runtime.sendMessage(_0x13b182);
    return;
  }
//   console.log("Question:", _0x436c38);
//   console.log("Code:\n", _0x4ebcf4 ? _0x4ebcf4 : "No code available");
//   console.log("Options:\n", _0x31bcd4);
  const _0x25ac48 = {
    action: "extractData",
    question: _0x436c38,
    code: _0x4ebcf4,
    options: _0x31bcd4,
    isMCQ: true
  };
  chrome.runtime.sendMessage(_0x25ac48, _0x374c99 => {
    // console.log("Response from background:", _0x374c99);
  });
}
function extractCodingQuestion() {
  const _0x257189 = document.querySelector("span.inner-text");
  const _0x4d7002 = _0x257189 ? _0x257189.innerText.trim() : "Programming language not found.";
  const _0x1137fe = document.querySelector("div[aria-labelledby=\"question-data\"]");
  const _0x3c358d = _0x1137fe ? _0x1137fe.innerText.trim() : "Question not found.";
  const _0xcf403f = document.querySelector("div[aria-labelledby=\"input-format\"]");
  const _0x274ddf = _0xcf403f ? _0xcf403f.innerText.trim() : '';
  const _0x2cb6f3 = document.querySelector("div[aria-labelledby=\"output-format\"]");
  const _0x355c0f = _0x2cb6f3 ? _0x2cb6f3.innerText.trim() : '';
  const _0x59f6ce = document.querySelectorAll("div[aria-labelledby=\"each-tc-card\"]");
  let _0x291085 = '';
  _0x59f6ce.forEach((_0x24b68a, _0xe6fdd0) => {
    const _0x368cd2 = _0x24b68a.querySelector("div[aria-labelledby=\"each-tc-input-container\"] pre");
    const _0x446713 = _0x24b68a.querySelector("div[aria-labelledby=\"each-tc-output-container\"] pre");
    const _0xc6f4d7 = _0x368cd2 ? _0x368cd2.innerText.trim() : "Input not found";
    const _0x11547a = _0x446713 ? _0x446713.innerText.trim() : "Output not found";
    _0x291085 += "Sample Test Case " + (_0xe6fdd0 + 1) + ":\nInput:\n" + _0xc6f4d7 + "\nOutput:\n" + _0x11547a + "\n\n";
  });
  const _0x2e220c = {
    action: "extractData",
    programmingLanguage: _0x4d7002,
    question: _0x3c358d,
    inputFormat: _0x274ddf,
    outputFormat: _0x355c0f,
    testCases: _0x291085,
    isCoding: true
  };
  chrome.runtime.sendMessage(_0x2e220c, async _0x5cf8cc => {
    if (_0x5cf8cc && _0x5cf8cc.success && _0x5cf8cc.response) {
      try {
        let _0x5c1552 = _0x5cf8cc.response.trim();
        _0x5c1552 = _0x5c1552.replace(/^```[a-z]*\n/, '').replace(/\n```$/, '');
        await navigator.clipboard.writeText(_0x5c1552);
        const _0x5919b3 = document.querySelector("div[aria-labelledby=\"answer\"]");
        const _0x11670f = _0x5919b3 ? _0x5919b3.querySelector(".ace_text-input") : null;
        if (_0x11670f) {
          _0x11670f.focus();
          document.execCommand("paste");
        } else {
          const _0x4958c8 = {
            action: "showToast",
            message: "Copied to clipboard",
            isError: false
          };
          chrome.runtime.sendMessage(_0x4958c8);
        }
      } catch (_0x3fd412) {
        const _0x161b38 = {
          action: "showToast",
          message: "Copied to clipboard",
          isError: false
        };
        chrome.runtime.sendMessage(_0x161b38);
      }
    }
  });
}
function solveIamneoExamly() {
  const _0x2a0ad9 = document.querySelector("div[aria-labelledby=\"input-format\"]");
  if (_0x2a0ad9) {
    extractCodingQuestion();
  } else {
    handleQuestionExtraction();
  }
}
document.addEventListener("keydown", _0x41ba2c => {
  if (_0x41ba2c.altKey &&  _0x41ba2c.code === "Digit5") {
    solveIamneoExamly();
  }
});
document.addEventListener("keydown", _0x489353 => {
  if (_0x489353.altKey && _0x489353.code === "KeyO") {
    const _0x49de8b = {
      action: "toggleToastOpacity"
    };
    chrome.runtime.sendMessage(_0x49de8b);
  }
});
function extractSnippets() {
  const _0x1c76a5 = Array.from(document.querySelectorAll("div[aria-labelledby=\"tt-header\"]")).find(_0x5e8a2f => _0x5e8a2f.innerText.includes("Header Snippet"));
  const _0x4d9617 = Array.from(document.querySelectorAll("div[aria-labelledby=\"footer\"]")).find(_0x2fd8a3 => _0x2fd8a3.innerText.includes("Footer Snippet"));
  const _0x4f46f7 = _0x2cbdcc => {
    if (!_0x2cbdcc) {
      return '';
    }
    const _0x4b633a = _0x2cbdcc.querySelectorAll(".ace_line");
    return Array.from(_0x4b633a).map(_0x5b1236 => _0x5b1236.textContent).join("\n");
  };
  const _0x3c4b17 = {
    "header": _0x4f46f7(_0x1c76a5),
    "footer": _0x4f46f7(_0x4d9617)
  };
  const _0x269829 = {
    action: "processSnippets",
    snippets: _0x3c4b17
  };
  chrome.runtime.sendMessage(_0x269829);
}
chrome.runtime.onMessage.addListener((_0x36e766, _0x2124b4, _0x2bc65e) => {
  if (_0x36e766.action === "extractSnippets") {
    extractSnippets();
  }
  if (_0x36e766.action === "solveIamneoExamly") {
    solveIamneoExamly();
  }
});
chrome.runtime.onMessage.addListener((_0x528212, _0x1e3a68, _0x277eec) => {
  if (_0x528212.action === "updateChatHistory") {
    const {
      role: _0x5ea242,
      content: _0x58d1c9
    } = _0x528212;
    const _0x50a987 = document.getElementById("loading-message");
    if (_0x50a987) {
      _0x50a987.remove();
    }
    const _0x1d501c = {
      role: _0x5ea242,
      content: _0x58d1c9
    };
    chatHistory.push(_0x1d501c);
    addMessageToChat(_0x58d1c9, _0x5ea242);
  }
});
chrome.runtime.onMessage.addListener((_0x140840, _0x23d22c, _0x2009da) => {
  if (_0x140840.action === "clickMCQOption") {
    try {
      const _0x551b23 = _0x140840.response.match(/(?:options?\s*)?(\d+)\.?/i);
      if (_0x551b23) {
        const _0x50f8f1 = parseInt(_0x551b23[1]) - 1;
        const _0x3e8681 = "#tt-option-" + _0x50f8f1;
        const _0x34b151 = document.querySelector(_0x3e8681);
        if (_0x34b151) {
          _0x34b151.click();
        //   console.log("Option element " + _0x50f8f1 + " clicked successfully");
        } else {
          const _0x351d15 = {
            action: "showMCQToast",
            message: _0x140840.response
          };
          chrome.runtime.sendMessage(_0x351d15);
        }
      } else {
        const _0x42a412 = {
          action: "showMCQToast",
          message: _0x140840.response
        };
        chrome.runtime.sendMessage(_0x42a412);
      }
    } catch (_0x45ace5) {
      const _0x4c6f31 = {
        action: "showMCQToast",
        message: _0x140840.response
      };
      chrome.runtime.sendMessage(_0x4c6f31);
    }
  }
});