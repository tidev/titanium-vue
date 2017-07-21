import VirtualDomNode from './VirtualDomNode';

/**
 * Comment node in our vdom
 *
 * This will only be used as a placeholder node which we mount Vue on.
 */
export default class CommentNode extends VirtualDomNode {
	constructor(text) {
		super();

		this.isComment = true;
		this.tagName = 'comment';
		this.nodeType = VirtualDomNode.NODE_TYPE_COMMENT;
		this.text = text;
	}
}
