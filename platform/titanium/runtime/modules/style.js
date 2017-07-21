import { extend, cached, camelize } from 'shared/util';

const normalize = cached(camelize);

/**
 * Read static style information from vnode and apply it
 *
 * @param {Object} oldVnode Old vnode
 * @param {Object} vnode Updated vnode
 */
function createStyle (oldVnode, vnode) {
	if (!vnode.data.staticStyle) {
		updateStyle(oldVnode, vnode);
		return;
	}
	const elm = vnode.elm;
	const staticStyle = vnode.data.staticStyle;
	for (const name in staticStyle) {
		if (staticStyle[name]) {
			elm.setStyle(normalize(name), staticStyle[name]);
		}
	}
	updateStyle(oldVnode, vnode);
}

/**
 * Updates the style of a vnode
 *
 * @param {Object} oldVnode Old vnode
 * @param {Object} vnode Updated vnode
 */
function updateStyle (oldVnode, vnode) {
	if (!oldVnode.data.style && !vnode.data.style) {
		return;
	}
	let cur, name;
	const elm = vnode.elm;
	const oldStyle = oldVnode.data.style || {};
	let style = vnode.data.style || {};

	const needClone = style.__ob__;

	// handle array syntax
	if (Array.isArray(style)) {
		style = vnode.data.style = toObject(style);
	}

	// clone the style for future updates,
	// in case the user mutates the style object in-place.
	if (needClone) {
		style = vnode.data.style = extend({}, style);
	}

	for (name in oldStyle) {
		if (!style[name]) {
			elm.setStyle(normalize(name), '');
		}
	}
	for (name in style) {
		cur = style[name];
		elm.setStyle(normalize(name), cur);
	}
}

/**
 * Combines the array style syntax to a single object
 *
 * @param {Array} arr Array of style objects
 * @return {Object} Combined style object
 */
function toObject (arr) {
	const res = {};
	for (var i = 0; i < arr.length; i++) {
		if (arr[i]) {
			extend(res, arr[i]);
		}
	}
	return res;
}

export default {
	create: createStyle,
	update: updateStyle
};
