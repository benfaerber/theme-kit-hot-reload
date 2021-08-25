
(() => {
  const IS_TIME_AMERICAN = true;
  const STORE_NAMES = [];

  let isTabVisible = true;
  let isReloading = false;

  const prefix = 'Theme Kit Hot Reload: ';
  const base = 'http://localhost:7438/';

  if (!document.head.innerHTML.includes('Shopify.theme') || !document.body.innerHTML.includes('preview-bar-iframe')) return;

  if (STORE_NAMES && STORE_NAMES.length !== 0) {
    const url = location.href;
    const qualifies = (u) => url.startsWith(u) && !url.includes('preview_bar');
    if (!STORE_NAMES.some(qualifies)) return;
  }

  const getEpoch = () => {
    const time = new Date().getTime();
    const now = Math.floor(time / 1000);
    return now;
  };

  const createBanner = () => {
    const d = new Date();

    let hours = d.getHours();
    let post = ''
    if (IS_TIME_AMERICAN) {
      const isPM = hours > 12;
      post = ' ' + (isPM ? 'PM' : 'AM');
      hours = isPM ? hours - 12 : hours;
    }

    const pad = d => (d < 10 ? '0' + d.toString() : d.toString());

    const stamp = [hours, pad(d.getMinutes()), pad(d.getSeconds())].join(':') + post;

    const elem = document.createElement('div');
    elem.className = 'reloadBanner';
    elem.innerHTML = /*html*/`${stamp} -> Reloading in <span class="reloadNumber">5</span> seconds`;

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
      if (secs < 0) {
        secs = 0;
      }
      document.querySelector('.reloadNumber').innerHTML = secs.toString();
    }, 1000);
  };

  const delayedReload = () => {
    setTimeout(() => {
      console.clear();
      location.reload();
    }, 5000);
  }

  window.addEventListener('visibilitychange', () => isTabVisible = !isTabVisible);

  const lastReloaded = getEpoch();

  const inter = setInterval(async () => {
    if (isReloading || !isTabVisible) return;

    const response = await fetch(base + 'updated').catch(() => console.log(prefix + 'Connection to the Hot Reload Server failed! (endpoint: /updated)'));
    const text = await response.text();
    const lastUpdated = parseInt(text);

    if (lastUpdated > lastReloaded) {
      isReloading = true;

      createBanner();
      clearInterval(inter);
      fetch(base + 'notify').catch(() => console.log(prefix + 'Connection to the Hot Reload server failed! (endpoint: /notify)'));;
      delayedReload();
    }

  }, 500);

})();
