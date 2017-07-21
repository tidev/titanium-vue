import { updateListeners } from 'core/vdom/helpers/update-listeners';

/**
 * Target vnode for an event
 *
 * @type {Object}
 */
let target;

/**
 * Adds a new event handler
 *
 * @param {Object} event Event object
 * @param {Function} handler Event handler function
 * @param {boolean} once True if the handler should only be colled once
 */
function add(event, handler, once, capture) {
	if (capture) {
		console.log('bubble phase not supported');
		return;
	}
	if (once) {
		const oldHandler = handler;
		const _target = target; // save current target element in closure
		handler = function (ev) {
			const res = arguments.length === 1 ? oldHandler(ev) : oldHandler.apply(null, arguments);
			if (res !== null) {
				remove(event, null, null, _target);
			}
		};
	}
	target.addEventListener(event, handler);
}

/**
 * Removes all handlers for an event from the target
 *
 * @param {Object} event Event object
 * @param {Fuction} handler Event handler function
 * @param {boolean} capture
 * @param {Object} _target
 */
function remove(event, handler, capture, _target) {
	(_target || target).removeEventListener(event);
}

/**
 * Updates the event listeners on a vnode
 *
 * @param {Object} oldVnode Old vnode
 * @param {Object} vnode Updated vnode
 */
function updateDOMListeners (oldVnode, vnode) {
	if (!oldVnode.data.on && !vnode.data.on) {
		return;
	}
	const on = vnode.data.on || {};
	const oldOn = oldVnode.data.on || {};
	target = vnode.elm;
	updateListeners(on, oldOn, add, remove, vnode.context);
}

export default {
	create: updateDOMListeners,
	update: updateDOMListeners
};
