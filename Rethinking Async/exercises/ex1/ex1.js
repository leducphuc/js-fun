import _Promise from './Promise';
let count = 0;
function fakeAjax(url,cb) {
	count ++;
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = ((Math.round(Math.random() * 1E4) % 8000) + 1000)*count;

	return new _Promise((resolve, reject) => {
		 setTimeout(function(){
			resolve(fake_responses[ url ]);
			// try {
			// 	if (randomDelay > 1600) throw new Error();
			// 	resolve(fake_responses[ url ]);
			// }
			//  catch (error) {
			// 	return Promise.resolve((fakeAjax( url )));
			// }
		},randomDelay);
	})
}

function output(text) {
	console.log(text);
}

function getFile(file, log) {
	if (log) {
		console.log(log);
	}
	return fakeAjax(file)
}

const out1 = () => console.log('final');

const result = () => getFile("file1")
.then((result) => getFile("file2", result))
.then((result) => getFile("file3", result))
.then((result) => getFile("file1", result))
.then((result) => getFile("file2", result))
.then((result) => getFile("file3", result))
.then((result) => getFile("file1", result))
.then((result) => getFile("file2", result))
.then((result) => getFile("file3", result))
.then((result) => getFile("file1", result))
.then((result) => getFile("file2", result))
.then((result) => getFile("file3", result))
.then((result) => getFile("file1", result))
.then((result) => getFile("file2", result))
.then((result) => getFile("file3", result))
.then((result) => getFile("file1", result))
.then((result) => getFile("file1", result))
.then((result) => getFile("file2", result))
.then((result) => getFile("file3", result))
.then((result) => getFile("file3", result))
.then((result) => getFile("file1", result))
.then((result) => getFile("file2", result))
.then((result) => getFile("file3", result))
.then((result) => getFile("file1", result))
.then((result) => getFile("file2", result))
.then(out1);
// .catch(() => console.log('1234'))
result();
