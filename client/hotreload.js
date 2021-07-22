// ==UserScript==
// @name     Theme Kit Hot Reload
// @author   Ben Faerber
// @version  1
// @grant    none
// @include  *://*/*
// @icon     https://cdn.shopify.com/static/shopify-favicon.png
// @description Hot Reload for Shopify Theme Kit
// ==/UserScript==
let isRunning = false;

(() => {
  const STORE_NAMES = [];

  const prefix = 'Theme Kit Hot Reload: ';
  if (isRunning) return;
  isRunning = true;

  if (!document.head.innerHTML.includes('Shopify.theme')) return;

  if (STORE_NAMES && STORE_NAMES.length !== 0) {
    const url = location.href;
    const qualifies = (u) => url.startsWith(u) && !url.includes('preview_bar');
    if (!STORE_NAMES.some(qualifies)) return;
  }

  const base = 'http://localhost/themekitHotReload/';

  const getEpoch = () => {
    const time = new Date().getTime();
    const now = Math.floor(time / 1000);
    return now;
  };

  const createBanner = () => {
    const elem = document.createElement('div');
    const d = new Date();
    const stamp = d.toLocaleTimeString();
    elem.innerHTML = `${stamp}: Reloading in 5 seconds...`;
    elem.style = `
    background-color: #424242;
    color: white;
    padding: 5px;
    text-align: center;
    `;
    document.body.prepend(elem);
  }

  const lastReloaded = getEpoch();

  let isReloading = false;

  const inter = setInterval(async () => {
    if (isReloading) return;

    const response = await fetch(base + 'updated.php').catch(() => console.log(prefix + 'Connection to the Hot Reload Server failed!'));
    const text = await response.text();
    const lastUpdated = parseInt(text);

    if (lastUpdated > lastReloaded) {
      createBanner();
      clearInterval(inter);
      isReloading = true;
      fetch(base + 'notify.php').catch(() => console.log(prefix + 'Connection to the Hot Reload server failed!'));;
      setTimeout(() => {
        console.clear();
        location.reload();
      }, 5000);
    }

  }, 1000);

})();
