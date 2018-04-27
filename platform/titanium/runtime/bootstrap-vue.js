import Vue from 'vue';
import {mountComponent} from 'core/instance/lifecycle.js';
import CommentNode from '../vdom/CommentNode';
import DocumentNode from '../vdom/DocumentNode';
import platformComponents from './components/index';
import {patch} from './patch';

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
	return mountComponent(this, el, hydrating);
};

export default Vue;
