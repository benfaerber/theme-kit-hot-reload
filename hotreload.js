console.log("Hello from Firefox code"); //output messages to the console</pr
console.log(browser);

function readFile(_path, _cb){

	fetch(_path, {mode:'same-origin'})   // <-- important

	.then(function(_res) {
			return _res.blob();
	})

	.then(function(_blob) {
			var reader = new FileReader();

			reader.addEventListener("loadend", function() {
					_cb(this.result);
			});

			reader.readAsText(_blob);
	});
};


setInterval(() => {
	readFile('file:///Users/ben/Code/theme-kit-hot-reload/test-notifier.txt', console.log)
}, 1000);
