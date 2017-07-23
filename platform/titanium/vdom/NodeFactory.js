import CommentNode from './CommentNode';
import ElementNode from './ElementNode';
import TitaniumViewNode from './TitaniumViewNode';
import TextNode from './TextNode';
import { isKnownView } from '../element-registry';

export default class NodeFactory {

	static createComment(text) {
		return new CommentNode(text);
	}

	static createElement(tagName) {
		if (isKnownView(tagName)) {
			return new TitaniumViewNode(tagName);
		}  else {
			return new ElementNode(tagName);
		}
	}

	static createElementNS(namespace, tagName) {
		return NodeFactory.createEelement(namespace + ':' + tagName);
	}

	static createTextNode(text) {
		return new TextNode(text);
	}

}
