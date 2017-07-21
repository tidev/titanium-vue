import {getViewMeta} from '../element-registry';

/**
 * Base class for all nodes in our virtual dom
 */
export default class VirtualDomNode {

	/**
	 * Constructs a new vdom node
	 */
	constructor() {
		this.nodeType = null;
		this.tagName = null;
		this.parentNode = null;
		this.children = [];
		this.isComment = false;
		this.prevSibling = null;
		this.nextSibling = null;
	}

	static NODE_TYPE_ELEMENT = 1;
	static NODE_TYPE_TEXT = 3;
	static NODE_TYPE_COMMENT = 8;
	static NODE_TYPE_DOCUMENT = 9;

	/**
	 * Appends the child node to this vdom node
	 *
	 * The base implementation if this only creates the parent/child and sibling
	 * relations.
	 *
	 * @param {VirtualDomNode} childNode The child node to add
	 */
	appendChild(childNode) {
		if (!(childNode instanceof VirtualDomNode)) {
			throw new TypeError(`Can only add other virtual dom nodes as child`);
		}

		if (childNode.parentNode) {
			throw new Error(`Can't append child because it already has a parent.`);
		}

		childNode.parentNode = this;
		this.children.push(childNode);

		if (this.lastChild) {
			childNode.prevSibling = this.lastChild
			this.lastChild.nextSibling = childNode
		}
	}

	/**
	 * Removes a child node from this vnode
	 *
	 * @param {VirtualDomNode} childNode The child node to remove
	 */
	removeChild(childNode) {
		if (!(childNode instanceof VirtualDomNode)) {
			throw new TypeError(`Can only remove other virtual dom nodes`);
		}

		if (!childNode.parentNode) {
			throw new Error(`Can't remove child because it has no parent.`)
		}

		if (childNode.parentNode !== this) {
			throw new Error(`Can't remove child because it has a different parent.`)
		}

		if (childNode.prevSibling) {
			childNode.prevSibling.nextSibling = childNode.nextSibling
		}

		if (childNode.nextSibling) {
			childNode.nextSibling.prevSibling = childNode.prevSibling
		}

		childNode.parentNode = null
		this.children = this.children.filter(node => node !== childNode)
	}

	toString() {
		return `${this.constructor.name}(${this.tagName})`;
	}
}
