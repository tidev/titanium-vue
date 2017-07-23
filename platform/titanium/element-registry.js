/**
 * Mapping of element tag names and their respective Titanium view and meta data
 *
 * @type {Map}
 */
let elements = new Map();

/**
 * The default meta data for a Titanium view node
 *
 * @type {Object}
 */
const defaultViewMeta = {
	skipAddToDom: false,
	isUnaryTag: false,
	tagNamespace: '',
	canBeLeftOpen: false,
	model: {
		prop: 'text',
		event: 'textChange'
	}
};

/**
 * Gets the factory function for a Titanium view
 *
 * @param {string} tagName Tag name associated with the Titanium view
 * @return {Function} The view's create factory function
 */
export function getTitaniumViewFactory(tagName) {
	if (!isTitaniumView(tagName)) {
		throw new Error(`No titanium view registerd for ${tagName}`);
	}

	let elementData = elements.get(tagName);
	try {
		return elementData.factoryResolver();
	} catch (e) {
		throw new TypeError(`Could not load create factory for: ${tagName}. ${e}`);
	}
}

/**
 * Gets the meta data for a view associated with the given tag name
 *
 * @param {string} tagName Tag name of the Titianium view
 * @return {Object} Meta data object
 */
export function getViewMeta(tagName) {
	const elementData = elements.get(tagName);

	if (elementData === undefined) {
		throw new Error(`No view with meta data registered for tag ${tagName}`);
	}

	return elementData.meta;
}

/**
 * Checks if we have a Titanium view registered for the given tag name
 *
 * @param {string} tagName Tag name to check
 * @return {Boolean} True if there is a Titanium view for the tag, false if not
 */
export function isTitaniumView(tagName) {
	return elements.has(tagName);
}

/**
 * Registers a Titanium UI view as a new element
 *
 * @param {string} tagName Tag name to register the elements under
 * @param {Function} createFactoryResolver Create factory function of the Titanium view
 * @param {Object} meta Optional meta data to be associated with the view
 */
export function registerElement(tagName, createFactoryResolver, meta = {}) {
	if (elements.has(tagName)) {
		throw new Error(`Element ${tagName} already registered.`);
	}

	let elementData = {
		factoryResolver: createFactoryResolver,
		meta: Object.assign({}, defaultViewMeta, meta)
	};
	elements.set(tagName, elementData);
}

// Register all Titanium views as vdom elements here
// Titanium views that need to be wrapped in a Vue component for easier usability
// should be prefixed with titanium, so the component can expose them under their
// original name
/* global Ti */
registerElement('button', () => Ti.UI.createButton, {
	type: Ti.UI.Button
});
registerElement('label', () => Ti.UI.createLabel, {
	type: Ti.UI.Label
});
registerElement('titanium-list-section', () => Ti.UI.createListSection, {
	type: Ti.UI.ListSection,
	skipAddToDom: true
});
registerElement('titanium-list-view', () => Ti.UI.createListView, {
	type: Ti.UI.ListView
});
registerElement('titanium-tab-group', () => Ti.UI.createTabGroup, {
	type: Ti.UI.TabGroup
});
registerElement('titanium-tab', () => Ti.UI.createTab, {
	type: Ti.UI.Tab
});
registerElement('view', () => Ti.UI.createView, {
	type: Ti.UI.View
});
registerElement('window', () => Ti.UI.createWindow, {
	type: Ti.UI.Window,
	skipAddToDom: true
});
