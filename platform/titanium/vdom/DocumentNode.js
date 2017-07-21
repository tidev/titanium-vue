import VirtualDomNode from './VirtualDomNode';

/**
 * The root node in our vdom
 */
export default class DocumentNode extends VirtualDomNode {
	constructor() {
		super();

		this.tagName = 'document';
		this.nodeType = VirtualDomNode.NODE_TYPE_DOCUMENT;
	}
}
