const path = require('path');

const resolve = subModulePath => path.resolve(__dirname, '..', 'node_modules', 'vue', subModulePath) + '/';

module.exports = {
	compiler: resolve('src/compiler'),
	core: resolve('src/core'),
	shared: resolve('src/shared'),
	titanium: path.resolve(__dirname, '..', 'platform/titanium'),
	web: resolve('src/platforms/web'),
	weex: resolve('src/platforms/weex'),
	sfc: resolve('src/sfc'),
	he: path.resolve(__dirname, '..', 'platform/titanium/he-stub')
};
