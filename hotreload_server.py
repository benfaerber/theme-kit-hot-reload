import time
import math
from flask import Flask
from flask import Response
from flask import request
from flask_cors import CORS
from werkzeug.utils import redirect
from waitress import serve

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
    print(f'Notified @ {str(epoch)}')
    with open('hotreload/timestamp.txt', 'w') as file:
        file.write(str(epoch))
        return str(epoch)


@app.route('/updated')
def updated():
    with open('hotreload/timestamp.txt', 'r') as file:
        epoch = file.read()
        return epoch


@app.route('/hotreload.js')
def hotreload():
    handle = open('hotreload/hotreload.js')
    source = handle.read()
    handle.close()
    return Response(source, mimetype='text/javascript')

@app.route('/report')
def reporturl():
    url = request.args.get('url')
    if not url or 'http' not in url or len(url) > 200:
        return url or 'error: No URL Reported!'


    with open('../url.txt', 'w') as file:
        file.write(url)
        epoch = math.floor(time.time())
        print(f'Reported @ {str(epoch)} - URL {url} was reported!')
    return 'Reported'


@app.route('/preview')
def preview():
    with open('../url.txt', 'r') as file:
        url = file.read()
        return redirect(url)

def start_server():
    title = 'Theme Kit Hot Reload Flask Server'
    intro = [title, '-' * len(title), 'https://github.com/benfaerber/theme-kit-hot-reload']
    print('\n'.join(intro))
    serve(app, host='0.0.0.0', port=port)

def main():
    start_server()

if __name__ == "__main__":
    main()