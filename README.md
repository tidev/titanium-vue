# Titanium + Vue.js

> Use Vue.js to utilize the cross-platform power of Titanium

## Introduction

First integration of Vue.js and Titanium. It works by replacing the virtual dom in Vue.js with a custom implementation that manages `Ti.UI.*` components.

## Example usage

Copy [dist/titanium-vue.js](dist/titanium-vue.js) to a classic app's resource directory and paste the following to `app.js`

```javascript
var Vue = require('titanium-vue');
new Vue({
	template: `
		<tab-group ref="tabGroup">
			<tab :title="'Tab1'">
				<window :title="'Tab 1'">
					<label :style="{ color: 'red' }" @click="onClick">Label 1</label>
				</window>
			</tab>
			<tab :title="'Tab 2'">
				<window :title="'Tab 2'">
					<label>Label 2</label>
				</window>
			</tab>
		</tab-group>`,

	methods: {
		onClick() {
			alert('Nice click!');
		}
	},

	mounted: function() {
		this.$refs.tabGroup.open();
	}
}).$start();

```

Features that are currently working are a few base components (Window, Button, Label and Tabs) as well as applying styles, attributes and event handlers to those elements.

## Developer Guide

### Setup

Clone the repo and run `npm run dev` to run an initial build to the dist directory and start watching for changes for easy development.

### Exposing Titanium UI

All `Ti.UI.*` views can be exposed by registering their create factory inside the [element registry](platform/titanium/element-registry.js) via `registerElement`.

`registerElement(tagName, createFactoryResolver, [meta])`

Basic elements like a Button can be exposed directly:

`registerElement('button', () => Ti.UI.createButton)`

More complex elements may require to be wrapped in a Vue component. To avoid naming collision expose those elements with a `Titanium` prefix.

`registerElement('titanium-tab-group', () => Ti.UI.createTabGroup);`

Take a look at the [platform components](platform/titanium/runtime/components) to see existing implementations of Vue.js components wrapping Titanium views.
