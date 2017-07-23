import VirtualDomNode from './VirtualDomNode';

/**
 * Element node in our vdom
 *
 * @TODO Merge this with TitaniumViewNode? All elements in our vdom should be
 * Titanium views anyway.
 */
export default class ElementNode extends VirtualDomNode {
	constructor(tagName) {
		super();

		this.nodeType = VirtualDomNode.NODE_TYPE_ELEMENT;
		this.tagName = tagName;
		this.attributes = new Map();
		this.styles = new Map();
	}

	setAttribute(key, value) {
		this.attributes.set(key, value);
	}

	setStyle(property, value) {
		this.styles.set(property, value);
	}

}
