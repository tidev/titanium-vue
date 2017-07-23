import Vue from 'vue';
import {mountComponent} from 'core/instance/lifecycle.js';
import {warn} from 'core/util/debug';
import CommentNode from '../vdom/CommentNode';
import DocumentNode from '../vdom/DocumentNode';
import platformComponents from './components/index';
import {patch} from './patch';
import {compileToFunctions} from '../compiler/index';

Vue.prototype.$document = new DocumentNode();

Vue.options.components = platformComponents;

Vue.prototype.__patch__ = patch;

Vue.prototype.$start = function () {
	this.__is_root__ = true;

	const placeholder = new CommentNode('placeholder');
	this.$document.appendChild(placeholder);

	this.$mount(placeholder);
};

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
	return mountComponent(this, el, hydrating);
};

export default Vue;
