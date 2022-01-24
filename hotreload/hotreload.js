// Client loaded in by the TamperMonkey Client
(() => {
  const IS_TIME_AMERICAN = true;

  let isTabVisible = true;
  let isReloading = false;

  const prefix = 'Theme Kit Hot Reload: ';
  const base = 'http://localhost:7438/';

  if (!document.head.innerHTML.includes('Shopify.theme')) return;

  const getEpoch = () => {
    const time = new Date().getTime();
    const now = Math.floor(time / 1000);
    return now;
  };

  const getReloadTime = () => {
    const d = new Date();

    let hours = d.getHours();
    let post = '';
    if (IS_TIME_AMERICAN) {
      const isPM = hours > 12;
      post = ' ' + (isPM ? 'PM' : 'AM');
      hours = isPM ? hours - 12 : hours;
    }

    const pad = (d) => (d < 10 ? '0' + d.toString() : d.toString());

    const stamp =
      [hours, pad(d.getMinutes()), pad(d.getSeconds())].join(':') + post;
    return stamp;
  };

  const createBanner = () => {
    const stamp = getReloadTime();

    const elem = document.createElement('div');
    elem.className = 'reloadBanner';
    elem.innerHTML = /*html*/ `${stamp} -> Reloading in <span class="reloadNumber">5</span> seconds`;

    const css = /*css*/ `
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
      if (--secs < 0) secs = 0;
      document.querySelector('.reloadNumber').innerHTML = secs.toString();
    }, 1000);
  };

  window.addEventListener(
    'visibilitychange',
    () => (isTabVisible = !isTabVisible)
  );

  const delayedReload = () => {
    setTimeout(() => {
      console.clear();
      location.reload();
    }, 5000);
  };

  const lastReloaded = getEpoch();

  const inter = setInterval(async () => {
    if (isReloading || !isTabVisible) return;

    const response = await fetch(base + 'updated').catch(() =>
      console.log(
        prefix +
          'Connection to the Hot Reload Server failed! (endpoint: /updated)'
      )
    );
    const text = await response.text();
    const lastUpdated = parseInt(text);

    if (lastUpdated > lastReloaded) {
      isReloading = true;
      clearInterval(inter);

      createBanner();
      delayedReload();
      fetch(base + 'notify').catch(() =>
        console.log(
          prefix +
            'Connection to the Hot Reload server failed! (endpoint: /notfiy)'
        )
      );
    }
  }, 500);

  // URL Reporter
  (() => {
    setTimeout(async () => {
      if (location.href.includes('shopifypreview')) return;

      const frame = document.querySelector('#preview-bar-iframe');
      if (!frame) return;
      const doc = frame.contentWindow.document;
      const urlInput = doc.querySelector('#share_theme_url');
      const url = urlInput.value;

      console.log(
        prefix + `Preview URL: ${url ?? 'Could not find preview URL!'}`
      );

      if (url) {
        const reportURL = base + `/report?url=${url}`;
        const response = await fetch(reportURL);
        const text = await response.text();
        const isValid = !text.includes('error');
        console.log(
          prefix +
            (isValid ? `URL Reported Successfully!` : `URL Report Failed!`)
        );
      }
    }, 2000);
  })();
})();
