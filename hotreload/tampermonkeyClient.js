// ==UserScript==
// @name     Theme Kit Hot Reload
// @author   Ben Faerber
// @version  1
// @grant    none
// @include  *://*/*
// @icon     https://cdn.shopify.com/static/shopify-favicon.png
// @description Hot Reload for Shopify Theme Kit
// ==/UserScript==

(() => {
  if (location.href.includes('.myshopify.com')) return;
  const script = document.createElement('script');
  script.src = 'http://localhost:7438/hotreload.js';
  document.querySelector('body').appendChild(script);
})();
