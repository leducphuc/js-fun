import _Promise from './Promise';
function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url, randomDelay);

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

// **************************************
// The old-n-busted callback way

function getFile(file) {
	return fakeAjax(file)
}


const out1 = () => console.log('aha');

// request all files at once in "parallel"
const start = Date.now();
// const result = () => Promise.all([getFile("file1"), getFile("file2"), getFile("file3")]).then(([x,y,z]) => {
// 	console.log(x);
// 	console.log(y);
// 	console.log(z);
// 	out1;
// 	console.log(Date.now() - start);
// }).catch(() => console.log('error'));
// result();

const result = () => getFile("file1").then(out1)
// .catch(() => console.log('1234'))
console.log(result());
