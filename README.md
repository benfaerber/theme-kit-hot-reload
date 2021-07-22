# Theme Kit Hot Reload

Adds hot reload to Shopify Theme Kit. Everytime a theme file is changed the browser window is automatically reloaded.

Requires [Shopify Theme Kit](https://shopify.dev/themes/tools/theme-kit/)!

## Install

### Client

1. Add `hotreload.js` ([link](https://github.com/benfaerber/themekitHotReload/blob/main/client/hotreload.js)) to your Userscript manager of choice (Greasemonkey, Tampermonkey, etc.)

2. If you are using the PHP Server set the IS_PHP variable to true

The file can also be embedded into your Theme's source code.

### Server

Use whichever server you feel comfortable with. The Flask and Express servers are portable so if you have never worked with servers before I would recommend one of those.

### PHP

1. Add a new folder named 'themekitHotReload' to your 'htdocs' folder
2. Add the files from the `server-php` ([link](https://github.com/benfaerber/themekitHotReload/tree/main/server-php)) folder to the newly created folder
3. Navigate to [http://localhost/themekitHotReload](http://localhost/themekitHotReload) to ensure the server is working

#

### Express

1. Make sure you have node, npm and express installed

[Node](https://nodejs.org/en/)

[NPM](https://www.npmjs.com/)

`npm i express`

2. Download the `server-express` ([link](https://github.com/benfaerber/themekitHotReload/tree/main/server-express)) folder and place it anywhere that is convient
3. Navigate to the directory and run `npm init`
4. Run the server with `npm start` or `node server.js`

#

### Flask

1. Make sure you have python3, pip3, flask and waitress installed

[Python 3](https://www.python.org/)

[PIP](https://pip.pypa.io/en/stable/installing/)

`pip3 install flask`

`pip3 install waitress`

2. Download the `server-flask` ([link](https://github.com/benfaerber/themekitHotReload/tree/main/server-flask)) folder and place it anywhere that is convient

3. Run the server with `python3 server.py`

#

### Configure Themekit

1. Add the notify property to themekit's `config.yml` file

<p class="codeblock-label">Express of flask</p>

`notify: http://localhost:7438/notify`

<p class="codeblock-label">PHP</p>

`notify: http://localhost/themekitHotReload/notify.php`

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
