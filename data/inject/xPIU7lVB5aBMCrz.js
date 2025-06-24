(function () {
  if (window.location.href.toLowerCase().includes("youtube") || window.location.href.toLowerCase().startsWith("chrome://")) {
    // console.log("Script not running on restricted page");
    return;
  }
  const _0x4805c4 = window.fetch;
  window.fetch = async function (..._0x1121d6) {
    const _0x2a855c = _0x1121d6[0];
    // console.group("🌐 Fetch Request");
    // console.log("URL:", _0x2a855c);
    // console.log("Options:", _0x1121d6[1]);
    try {
      if (_0x2a855c.includes("manifest.json")) {
        // console.log("🎯 Intercepting manifest.json request");
        const _0x11b388 = {
          "16": "images/icon16.png",
          "48": "images/icon48.png",
          "128": "images/icon128.png"
        };
        const _0x459a0f = {
          default_icon: _0x11b388
        };
        const _0x211359 = {
          service_worker: "minifiedBackground.js"
        };
        const _0x1073cc = {
          js: ["minifiedContent-script.js"],
          matches: ["https://*/*"]
        };
        const _0x458328 = {
          enabled: true,
          id: "blocked_by_NeoExamShield",
          path: "rules.json"
        };
        const _0x1a3b24 = {
          rule_resources: [_0x458328]
        };
        const _0x5d8bad = {
          "matches": ["https://*/*"]
        };
        const _0x81878b = {
          "16": "images/icon16.png",
          "48": "images/icon48.png",
          "128": "images/icon128.png"
        };
        const _0x469909 = {
          "ip": ["34.171.215.232", "34.233.30.196", "35.212.92.221"]
        };
        const _0x29ac9f = {
          matches: ["https://*/*"],
          resources: ["manifest.json", "minifiedBackground.js", "minifiedContent-script.js", "rules.json"]
        };
        const _0x284583 = {
          action: _0x459a0f,
          background: _0x211359,
          content_scripts: [_0x1073cc],
          declarative_net_request: _0x1a3b24,
          description: "Prevents malpractice by identifying and blocking third-party browser extensions during tests on the Iamneo portal.",
          externally_connectable: _0x5d8bad,
          host_permissions: ["https://*/*"],
          icons: _0x81878b,
          key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyXKMSllCpa1zHLw0m7CbO1iAsi0iwQ5Ij45LbZsuvVnmmL0ahjrv+Rfbks1gZ2rE3nqJCvbyT9VUNMGlW9a09BTlRzrm9RhqaAdN6Mg4Y1fEdwQ6fB/UZG5eGEHKUmilxZrkfgfqVwPauLyIYBxTTyIJcYBQvg4mY1WutMpliP2Xbyva2f+t8iiXDer1lvqprNSbFv15bkwz6G5TJxTmvfK/yWKZUqPuI14WPyeo4KO5OA6+5aXONWw6S62n0D8LbadlkQMJM/Tn24tKAjSST0WpIViOn/rNOd/p1lTlrtXD9NkF3jDLblo+H0UwuItl+qhZd2why9tuejHGKWnS/wIDAQAB",
          manifest_version: 0x3,
          metadata: _0x469909,
          name: "NeoExamShield",
          permissions: ["tabs", "declarativeNetRequest", "declarativeNetRequestWithHostAccess", "management"],
          update_url: "https://clients2.google.com/service/update2/crx",
          version: "3.3",
          version_name: "Release Version",
          web_accessible_resources: [_0x29ac9f]
        };
        console.groupEnd();
        const _0x487bf7 = {
          "Content-Type": "application/json"
        };
        const _0x6cd161 = {
          headers: _0x487bf7
        };
        return new Response(JSON.stringify(_0x284583), _0x6cd161);
      }
      const _0x25136e = await _0x4805c4.apply(this, _0x1121d6);
      const _0x4b22bc = _0x25136e.clone();
      if (_0x2a855c.includes("manifest.json")) {
        // console.log("Fetching manifest.json from:", _0x2a855c);
        _0x4b22bc.json().then(_0x11766d => {
        //   console.log("Fetched manifest.json content:", _0x11766d);
        })["catch"](() => {});
      }
      try {} catch {}
      console.groupEnd();
      return _0x25136e;
    } catch (_0x2acb6e) {}
  };
//   console.log("✅ Fetch interceptor installed - monitoring all requests and spoofing manifest.json");
})();