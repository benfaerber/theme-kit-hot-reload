(() => {
  const script = document.createElement('script');
  script.src = 'http://localhost:7438/hotreload.js';
  document.querySelector('body').appendChild(script);
})();