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
	if (!elements.has(tagName)) {
		throw new Error(`No component registerd for ${tagName}`);
	}

	let componentData = elements.get(tagName);
	try {
		return componentData.factoryResolver();
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
	let meta = defaultViewMeta;
	const elementData = elements.get(tagName);

	if (elementData === null) {
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
export function isKnownView(tagName) {
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

registerElement('activity-indicator', () => Ti.UI.createActivityIndicator, {
	type: 'Ti.UI.ActivityIndicator'
});

registerElement('button', () => Ti.UI.createButton, {
	type: 'Ti.UI.Button'
});

registerElement('button-bar', () => Ti.UI.createButtonBar, {
	type: 'Ti.UI.ButtonBar'
});

registerElement('cover-flow-view', () => Ti.UI.createCoverFlowView, {
	type: 'Ti.UI.CoverFlowView'
});

registerElement('dashboard-item', () => Ti.UI.createDashboardItem, {
	type: 'Ti.UI.DashboardItem'
});

registerElement('dashboard-view', () => Ti.UI.createDashboardView, {
	type: 'Ti.UI.DashboardView'
});

registerElement('image-view', () => Ti.UI.createImageView, {
	type: 'Ti.UI.ImageView'
});

registerElement('label', () => Ti.UI.createLabel, {
	type: 'Ti.UI.Label'
});

registerElement('picker', () => Ti.UI.createPicker, {
	type: 'Ti.UI.Picker'
});

registerElement('progress-bar', () => Ti.UI.createProgressBar, {
	type: 'Ti.UI.ProgressBar'
});

registerElement('refresh-control', () => Ti.UI.createRefreshControl, {
	type: 'Ti.UI.RefreshControl'
});

registerElement('scrollable-view', () => Ti.UI.createScrollableView, {
	type: 'Ti.UI.ScrollableView'
});

registerElement('search-bar', () => Ti.UI.createSearchBar, {
	type: 'Ti.UI.SearchBar'
});

registerElement('slider', () => Ti.UI.createSlider, {
	type: 'Ti.UI.Slider'
});

registerElement('switch', () => Ti.UI.createSwitch, {
	type: 'Ti.UI.Switch'
});

registerElement('text-area', () => Ti.UI.createTextArea, {
	type: 'Ti.UI.TextArea'
});

registerElement('text-field', () => Ti.UI.createTextField, {
	type: 'Ti.UI.TextField'
});

registerElement('titanium-list-view', () => Ti.UI.createListView, {
	type: 'Ti.UI.ListView'
});

registerElement('titanium-list-section', () => Ti.UI.createListSection, {
	type: 'Ti.UI.ListSection',
	skipAddToDom: true
});

registerElement('titanium-tab-group', () => Ti.UI.createTabGroup, {
	type: 'Ti.UI.TabGroup'
});

registerElement('titanium-tab', () => Ti.UI.createTab, {
	type: 'Ti.UI.Tab'
});

registerElement('toolbar', () => Ti.UI.createToolbar, {
	type: 'Ti.UI.Toolbar'
});

registerElement('view', () => Ti.UI.createView, {
	type: 'Ti.UI.View'
});

registerElement('web-view', () => Ti.UI.createWebView, {
	type: 'Ti.UI.WebView'
});

registerElement('window', () => Ti.UI.createWindow, {
	type: 'Ti.UI.Window',
	skipAddToDom: true
});
