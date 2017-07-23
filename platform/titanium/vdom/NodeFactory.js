import CommentNode from './CommentNode';
import ElementNode from './ElementNode';
import TitaniumViewNode from './TitaniumViewNode';
import TextNode from './TextNode';
import { isKnownView } from '../element-registry';

/**
 * Factory for creating the different vdom nodes
 */
export default class NodeFactory {

	/**
	 * Creates a new comment node
	 *
	 * @param {String} text Text of the comment
	 * @return {CommentNode}
	 */
	static createComment(text) {
		return new CommentNode(text);
	}

	/**
	 * Creates a new elment node
	 *
	 * This can either be a Titanium view if we have it registered or a general
	 * element node.
	 *
	 * @param {String} tagName Name of the tag
	 * @return {ElementNode|TitaniumViewNode}
	 */
	static createElement(tagName) {
		if (isKnownView(tagName)) {
			return new TitaniumViewNode(tagName);
		}  else {
			return new ElementNode(tagName);
		}
	}

	/**
	 * Creates a namespaces element node
	 *
	 * @param {String} namespace Element namespace
	 * @param {String} tagName Name of the tag
	 * @return {ElementNode|TitaniumViewNode}
	 */
	static createElementNS(namespace, tagName) {
		return NodeFactory.createEelement(namespace + ':' + tagName);
	}

	/**
	 * Creates a new text node
	 *
	 * @param {String} text Text of the node
	 * @return {TextNode}
	 */
	static createTextNode(text) {
		return new TextNode(text);
	}

}
