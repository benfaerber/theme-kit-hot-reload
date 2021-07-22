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
  // SETTINGS
  // Stores to hot reload (leave empty for all shopify stores)
  const STORE_NAMES = [];
  // To avoid having to custom configure a PHP server, set IS_PHP to true
  // This uses a subfolder on your PHP server and the .php extension
  const IS_PHP = false;
  // If your PHP server has a custom port, enter it here
  // Leave blank for default port (can you access your server by typing http://localhost/?)
  const PHP_PORT = '';

  // How often to check for changed content
  const CHECK_INTERVAL = 1.5; // Seconds
  // It sometimes takes a view seconds to update the content after the notifcation ping is sent
  // OFFEST is how long to wait after the page was last reloaded
  const OFFSET = 7; // Seconds
  // The minimun amount of time to reload content after last reload
  // For example: if set to 5, it will not update until at least 5 seconds after the last reload
  const MIN_UPDATE_TIME = 1;
  // END SETTNGS

  const url = location.href;
  if (STORE_NAMES.length !== 0 && !STORE_NAMES.some((u) => url.includes(u)))
    return;

  if (!document.head.innerHTML.includes('Shopify.theme')) return;

  const phpPort = !PHP_PORT ? '' : ':' + PHP_PORT;
  const base = IS_PHP
    ? `http://localhost${PHP_PORT}/themekitHotReload/`
    : 'http://localhost:7438/';
  const ext = IS_PHP ? '.php' : '';

  const time = new Date().getTime();
  // Epoch
  const lastReloaded = Math.floor(time / 1000);

  setInterval(async () => {
    const response = await fetch(base + 'updated' + ext);
    const text = await response.text();
    const lastUpdated = parseInt(text);

    if (
      lastUpdated > lastReloaded + OFFSET &&
      lastReloaded - lastUpdated > MIN_UPDATE_TIME
    ) {
      const response = await fetch(base + 'notify' + ext);
      location.reload();
    }
  }, CHECK_INTERVAL * 1000);
})();
