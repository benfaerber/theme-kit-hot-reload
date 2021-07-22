import time
import math
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
port = 7438

@app.route('/')
def homepage():
  homepage = '''
  <h1>Theme Kit Hot Reload Server</h1>
  <a href="/notify">/notify</a> - Ping when a file has been updated or when the content was last acquired.<br>
  <a href="/updated">/updated</a> - An epoch timestamp indicating when the content was last updated.
  '''
  return homepage

@app.route('/notify', methods=['get', 'post'])
def notify():
  epoch = math.floor(time.time())
  handle = open('timestamp.txt', 'w')
  handle.write(str(epoch))
  handle.close()
  return str(epoch)

@app.route('/updated')
def updated():
  handle = open('timestamp.txt', 'r')
  epoch = handle.read()
  handle.close()
  return epoch

if __name__ == "__main__":
  from waitress import serve

  intro = f'''
  Theme Kit Hot Reload Flask Server
   - Home Page           @ http://localhost:{port}/
   - Notify Change       @ http://localhost:{port}/notify
   - Check Last Updated  @ http://localhost:{port}/updated
  '''
  print(intro)

  serve(app, host='0.0.0.0', port=port)
