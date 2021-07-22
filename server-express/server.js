const SHOW_REQUESTS = true;
const SHOW_NOTIFICATIONS = true;
const SHOW_UPDATES = true;

const { exec } = require('child_process');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 7438;

const fname = 'timestamp.txt';

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', (req, res) => {
  res.send(`
  <h1>Theme Kit Hot Reload Server</h1>
  <a href="/notify">/notify</a> - Ping when a file has been updated or when the content was last acquired.<br>
  <a href="/updated">/updated</a> - An epoch timestamp indicating when the content was last updated.
  `);
});

// The browser sends a get request and theme kit sends a post request, thus both must be used
const notify = (req, res) => {
  const time = new Date().getTime();
  const timestamp = Math.floor(time / 1000);
  const data = fs.writeFileSync(fname, timestamp.toString());

if (SHOW_REQUESTS && SHOW_NOTIFICATIONS) console.log(`Request: Notified Change    | ${timestamp.toString()}`);

  res.send(timestamp.toString());
}

app.get('/notify', notify);
app.post('/notify', notify);

app.get('/updated', (req, res) => {
  const data = fs.readFileSync(fname, 'utf8');

  if (SHOW_REQUESTS && SHOW_UPDATES) console.log(`Request: Check Last Updated | ${data}`);

  res.send(data);
})

app.listen(port, () => {
  const intro = `
  Theme Kit Hot Reload Express Server
   - Home Page           @ http://localhost:${port}/
   - Notify Change       @ http://localhost:${port}/notify
   - Check Last Updated  @ http://localhost:${port}/updated
  `;
  console.log(intro);
})