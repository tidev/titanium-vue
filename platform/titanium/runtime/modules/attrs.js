import { extend, isDef, isUndef } from 'shared/util';

/**
 * Handles setting attributes on vdom nodes
 *
 * @param {Object} oldVnode Old vdom node
 * @param {Object} vnode Updated vdom node
 */
function updateAttrs(oldVnode, vnode) {
	const opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
	let key, cur, old;
	const elm = vnode.elm;
	const oldAttrs = oldVnode.data.attrs || {};
	let attrs = vnode.data.attrs || {};
	// clone observed objects, as the user probably wants to mutate it
	if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

	for (key in attrs) {
		cur = attrs[key];
		old = oldAttrs[key];
		if (old !== cur) {
			setAttr(elm, key, cur);
		}
	}
}

function setAttr(el, key, value) {
	if (key.indexOf(':') !== -1) {
		const [platformName, attributeName] = key.split(':');
		el.setAttribute(attributeName, value, platformName);
	} else {
		el.setAttribute(key, value);
	}
}

export default {
	create: updateAttrs,
	update: updateAttrs
};
