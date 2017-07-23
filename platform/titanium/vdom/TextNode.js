import VirtualDomNode from './VirtualDomNode';

/**
 * A test node in the vdom
 */
export default class TextNode extends VirtualDomNode {

	constructor(text) {
		super();

		this.nodeType = VirtualDomNode.NODE_TYPE_TEXT;
		this.text = text;
	}

	setText(text) {
		this.text = text;
		this.parentNode.setText(text);
	}

}
