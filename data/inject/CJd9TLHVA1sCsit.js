(function () {
  var _0x22eb4d;
  try {
    _0x22eb4d = document.getElementById("lwys-ctv-port");
    _0x22eb4d.remove();
  } catch (_0x22262b) {
    _0x22eb4d = document.createElement("span");
    _0x22eb4d.id = "lwys-ctv-port";
    document.documentElement.append(_0x22eb4d);
  }
  _0x22eb4d.dataset.hidden = document.hidden;
  _0x22eb4d.dataset.enabled = true;
  _0x22eb4d.addEventListener("state", () => {
    _0x22eb4d.dataset.hidden = document.hidden;
  });
  const _0x4efce9 = {
    enabled: true,
    blur: true,
    focus: true,
    mouseleave: true,
    visibility: true,
    pointercapture: true,
    policies: null
  };
  const _0xaa81dd = () => chrome.storage.local.get(_0x4efce9, _0x19ede9 => {
    let _0xa54fa4 = location.hostname;
    try {
      _0xa54fa4 = parent.location.hostname;
    } catch (_0x3137f9) {}
    _0x19ede9.policies = _0x19ede9.policies ?? {};
    const _0x1c0f6e = _0x19ede9.policies[_0xa54fa4] || [];
    _0x22eb4d.dataset.enabled = _0x19ede9.enabled;
    _0x22eb4d.dataset.blur = _0x1c0f6e.includes("blur") ? false : _0x19ede9.blur;
    _0x22eb4d.dataset.focus = _0x1c0f6e.includes("focus") ? false : _0x19ede9.focus;
    _0x22eb4d.dataset.mouseleave = _0x1c0f6e.includes("mouseleave") ? false : _0x19ede9.mouseleave;
    _0x22eb4d.dataset.visibility = _0x1c0f6e.includes("visibility") ? false : _0x19ede9.visibility;
    _0x22eb4d.dataset.pointercapture = _0x1c0f6e.includes("pointercapture") ? false : _0x19ede9.pointercapture;
  });
  _0xaa81dd();
  chrome.storage.onChanged.addListener(_0xaa81dd);
})();