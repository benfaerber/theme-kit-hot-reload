// ==UserScript==
// @name     Theme Kit Hot Reload
// @author   Ben Faerber
// @version  1
// @grant    none
// @include  *://*/*
// @icon     https://cdn.shopify.com/static/shopify-favicon.png
// @description Hot Reload for Shopify Theme Kit
// ==/UserScript==
let _isHotReloadRunning = false;

(() => {
  const IS_PHP = true;

  const STORE_NAMES = [];

  const prefix = 'Theme Kit Hot Reload: ';
  if (_isHotReloadRunning) return;
  _isHotReloadRunning = true;

  if (!document.head.innerHTML.includes('Shopify.theme')) return;

  if (STORE_NAMES && STORE_NAMES.length !== 0) {
    const url = location.href;
    const qualifies = (u) => url.startsWith(u) && !url.includes('preview_bar');
    if (!STORE_NAMES.some(qualifies)) return;
  }

  const base = IS_PHP ? 'http://localhost/themekitHotReload/' : 'https://localhost:7438/';
  const ext = IS_PHP ? '.php' : '';

  const getEpoch = () => {
    const time = new Date().getTime();
    const now = Math.floor(time / 1000);
    return now;
  };

  const createBanner = () => {
    const d = new Date();
    const stamp = [d.getHours(), d.getMinutes(), d.getSeconds()].map(d => {
      d = d.toString();
      return d.length === 1 ? '0' + d : d;
    }).join(':');

    const elem = document.createElement('div');
    elem.className = 'reloadBanner';
    elem.innerHTML = /*html*/`${stamp} => Reloading in <span class="reloadNumber">5</span> seconds`;

    const css = /*css*/`
      .reloadBanner {
        position: fixed;
        top: 0px;
        width: 100%;
        z-index: 9999;
        background-color: #eeeeee;
        color: black;
        padding: 5px;
        text-align: center;
        font-family: "fira code", monospace;
      }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
    document.body.prepend(elem);

    let secs = 5;
    setInterval(() => {
      secs--;
      document.querySelector('.reloadNumber').innerHTML = secs.toString();
    }, 1000);
  }

  const lastReloaded = getEpoch();

  let isReloading = false;

  const inter = setInterval(async () => {
    if (isReloading) return;

    const response = await fetch(base + 'updated' + ext).catch(() => console.log(prefix + 'Connection to the Hot Reload Server failed!'));
    const text = await response.text();
    const lastUpdated = parseInt(text);

    if (lastUpdated > lastReloaded) {
      createBanner();
      clearInterval(inter);
      isReloading = true;
      fetch(base + 'notify' + ext).catch(() => console.log(prefix + 'Connection to the Hot Reload server failed!'));;
      setTimeout(() => {
        console.clear();
        location.reload();
      }, 5000);
    }

  }, 1000);

})();
