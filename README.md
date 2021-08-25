# Theme Kit Hot Reload

Adds hot reload to Shopify Theme Kit. Everytime a theme file is changed the browser window is automatically reloaded.

Requires [Shopify Theme Kit](https://shopify.dev/themes/tools/theme-kit/)!

## Install

### Client

1. Add `hotreload.js` ([link](https://github.com/benfaerber/themekitHotReload/blob/main/hotreload.js)) to your Userscript manager of choice (Greasemonkey, Tampermonkey, etc.)

The file can also be embedded into your Theme's source code.


### Flask Server

1. Download the GitHub repo

2. Unzip it and place it anywhere that's convenient.

3. Run `pip install -r requirements.txt`

4. Run the server with `python server.py`

#

### Configure Themekit

1. Add the notify property to themekit's `config.yml` file

`notify: http://localhost:7438/notify`

<p class="codeblock-label">Example config.yml:</p>

```
development:
  password: password
  theme_id: "123"
  store: can-i-buy-a-feeling.myshopify.com
  notify: http://localhost:7438/notify
```

2. Run `theme watch`

Now everytime a file is uploaded via themekit the browser should reload automatically!
