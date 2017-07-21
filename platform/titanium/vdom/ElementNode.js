import TitaniumViewNode from './TitaniumViewNode';
import VirtualDomNode from './VirtualDomNode';
import {getTitaniumViewFactory} from '../element-registry';

/**
 * Element node in our vdom
 *
 * @TODO Merge this with TitaniumViewNode? All elements in our vdom should be
 * Titanium views anyway.
 */
export default class ElementNode extends TitaniumViewNode {
	constructor(tagName) {
		super();

		this.nodeType = VirtualDomNode.NODE_TYPE_ELEMENT;
		this.tagName = tagName;

		let titaniumViewFactory = getTitaniumViewFactory(tagName);
		this._titaniumView = titaniumViewFactory();
	}

	appendChild(childNode) {
		super.appendChild(childNode);

		if (childNode.nodeType === VirtualDomNode.NODE_TYPE_TEXT) {
			this.setText(childNode.text);
		}
	}

	removeChild(childNode) {
		super.removeChild(childNode);

		if (childNode.nodeType === VirtualDomNode.NODE_TYPE_TEXT) {
			this.setText('');
		}
	}

}
