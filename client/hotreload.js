(() => {
  // Stores to hot reload
  const STORE_NAMES = ['trueleafmarket', 'sustainableseedco'];

  const url = location.href;
  if (!STORE_NAMES.some((u) => url.includes(u))) return;

  const base = 'http://localhost/themekitHotReload/';

  const getEpoch = () => {
    const time = new Date().getTime();
    const now = Math.floor(time / 1000);
    return now;
  };

  const lastReloaded = getEpoch();

  setInterval(async () => {
    const response = await fetch(base + 'updated.php');
    const text = await response.text();
    const lastUpdated = parseInt(text);

    if (lastUpdated > lastReloaded) {
      const response = await fetch(base + 'notify.php');
      location.reload();
    }
  }, 1000);
})();

//1626898810 1626899544672
