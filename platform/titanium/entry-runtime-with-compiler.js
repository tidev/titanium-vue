import Vue from './runtime/bootstrap-vue';
import {warn} from 'core/util/debug';
import {compileToFunctions} from './compiler/index';

const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (el, hydrating) {
	const options = this.$options;
	// resolve template/el and convert to render function
	if (!options.render) {
		let template = options.template;
		if (template && typeof template !== 'string') {
			warn('invalid template option: ' + template, this);
			return this;
		}

		if (template) {
			const {render, staticRenderFns} = compileToFunctions(template, {
				delimiters: options.delimiters
			}, this);
			options.render = render;
			options.staticRenderFns = staticRenderFns;
		}
	}
	return mount.call(this, el, hydrating);
};

Vue.compile = compileToFunctions;

export default Vue;
