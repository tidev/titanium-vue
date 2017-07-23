import VirtualDomNode from './VirtualDomNode';
import ElementNode from './ElementNode';
import { getTitaniumViewFactory, getViewMeta } from '../element-registry';
import { capitalize } from 'shared/util';

/**
 * A node in the vdom that represents a Titanium view
 */
export default class TitaniumViewNode extends ElementNode {

	/**
	 * Constructs a new Titanium view node
	 */
	constructor(tagName) {
		super(tagName);

		this._meta = null;
		this._titaniumViewFactory = getTitaniumViewFactory(tagName);
		this._titaniumView = null;
		this._createOptions = {};
	}

	/**
	 * Gets the underlying Titanium view
	 *
	 * @return {Object} Titanium view instance
	 */
	get titaniumView() {
		if (this._titaniumView) {
			return this._titaniumView;
		}
		console.log(`factory: ${this.tagName} ${this._titaniumViewFactory.name}(${this._createOptions})`);
		return this._titaniumView = this._titaniumViewFactory(this._createOptions);
	}

	/**
	 * Gets the meta data associated with this Titanium view
	 *
	 * @return {Object} Meta data object
	 */
	get meta() {
		if (this._meta) {
			return this._meta;
		}

		return this._meta = getViewMeta(this.tagName);
	}

	setAttribute(key, value) {
		super.setAttribute(key, value);

		let propertyName = key;
		let setterName = 'set' + capitalize(propertyName);

		if (this.titaniumView[propertyName]) {
			this.titaniumView[propertyName] = value;
			return;
		}

		if (this.titaniumView[setterName]) {
			this.titaniumView[setterName](value);
			return;
		}

		throw new Error(`${this.tagName} has no property ${propertyName} or matching setter ${setterName}.`);
	}

	hasAttribute(name) {
		let acessorNames = [name, `set${capitalize(name)}`];
		return acessorNames.some(accessorName => Reflect.has(this.titaniumView, accessorName));
	}

	setStyle(property, value) {
		super.setStyle(property, value);

		if (!(value = value.trim()).length) {
			return;
		}

		// Titanium styles are set via normal attributes
		// TODO: We need to map possible CSS name differences
		this.setAttribute(property, value);
	}

	setText(text) {
		let possibleProperties = ['text', 'title'];
		for (let textProperty of possibleProperties) {
			if (this.hasAttribute(textProperty)) {
				this.setAttribute(textProperty, text);
				break;
			}
		}
	}

	appendChild(childNode) {
		super.appendChild(childNode);

		if (childNode.nodeType === VirtualDomNode.NODE_TYPE_TEXT) {
			this.setText(childNode.text);
		}

		if (!(childNode instanceof TitaniumViewNode)) {
			return;
		}

		if (childNode.meta.skipAddToDom === true) {
			return;
		}

		let parentView = this.titaniumView;
		let childView = childNode.titaniumView;

		parentView.add(childView);
	}

	removeChild(childNode) {
		super.removeChild(childNode);

		if (childNode.nodeType === VirtualDomNode.NODE_TYPE_TEXT) {
			this.setText('');
		}

		let parentView = this.titaniumView;
		let childView = childNode.titaniumView;

		parentView.remove(childView);
	}

	addEventListener(event, handler) {
		this.titaniumView.addEventListener(event, handler);
	}

	removeEventListener(event) {
		this.titaniumView.removeEventListener(event);
	}

	toTemplate() {

	}
}
