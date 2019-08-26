const fs = require('fs');
const path = require('path');
const rollup = require('rollup');

if (!fs.existsSync('dist')) {
	fs.mkdirSync('dist');
}

let builds = require('./config').getAllBuilds();

// filter builds via command line arg
if (process.argv[2]) {
	const filters = process.argv[2].split(',');
	builds = builds.filter(b => {
		return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1);
	});
}

build(builds);

function build(builds) {
	let built = 0;
	const total = builds.length;
	const next = () => {
		buildEntry(builds[built]).then(() => {
			built++;
			if (built < total) {
				next();
			}
		}).catch(logError);
	};

	next();
}

function buildEntry(config) {
	const output = config.output;
	const { file } = output;
	return rollup.rollup(config)
		.then(bundle => bundle.generate(output))
		.then(({ output: [ { code } ] }) => write(file, code));
}

function write(dest, code) {
	return new Promise((resolve, reject) => {
		function report (extra) {
			console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''));
			resolve();
		}

		fs.writeFile(dest, code, err => {
			if (err) {
				return reject(err);
			}
			report();
		});
	});
}

function getSize(code) {
	return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
	console.log(e);
}

function blue(str) {
	return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
