import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import path from 'path';

const banner =
`/*!
 * Titanium-Vue
 * (c) 2017 Axway Appcelerator
 * Released under MIT license.
 */`;

const resolveVue = subModulePath => {
	return path.resolve(__dirname, 'node_modules', 'vue/src/', subModulePath) + '/';
};

export default {
	entry: './platform/titanium/titanium-vue.js',
	format: 'cjs',
	dest: './dist/titanium-vue.js',
	moduleName: 'Titanium-Vue',
	sourceMap: true,
	plugins: [
		alias({
			vue: resolveVue('core/index'),
			compiler: resolveVue('compiler'),
			web: resolveVue('platforms/web'),
			core: resolveVue('core'),
			shared: resolveVue('shared'),
			sfc: resolveVue('sfc'),
			he: path.resolve(__dirname, 'platform/titanium/he-stub')
		}),
		replace({
			'__VERSION__': '2.3.4',
			'__WEEX__': false,
			'process.env.NODE_ENV': '\'development\'',
			'let _isServer': 'let _isServer = false'
		}),
		babel({
			exclude: ['node_modules/vue-template-compiler/*']
		}),
		resolve({jsnext: true, main: true}),
		commonjs(),
		json()
	],
	external(id) {
		return id.startsWith('ui/') || id.startsWith('application');
	},
	banner
};
