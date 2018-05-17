<p align="center"><img width="450" src="./assets/titanium-vue.png" /></p>

<h1 align="center">Titanium Vue</h1>

Use [Vue.js](https://vuejs.org/) to easily create native mobile apps with Axway Appcelerator Titanium.

> ⚠️ This platform is currently in an early beta stage. Expect things to be broken or APIs to change as this project matures. DO NOT USE IN PRODUCTION!

## Introduction

First integration of Vue.js and Titanium. It works by replacing the virtual dom in Vue.js with a custom implementation that manages `Ti.UI.*` components.

## Example app

Copy [dist/titanium-vue.js](dist/titanium-vue.js) to a classic app's resource directory and paste the following to `app.js`

```js
import Vue from 'titanium-vue';

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

Features that are currently working are most of the base views from the Ti.UI.* namespace as well as applying inline styles, attributes and event handlers to those elements.

## Roadmap

- [ ] Properly implement more complex views that require more setup than just adding them as a child view with custom components like DashboardView, Picker and ScrollableView
- [ ] Integrate [vue-router](https://github.com/vuejs/vue-router), the official router for [Vue.js](https://vuejs.org/)
- [ ] Apply styles from CSS. This requires a CSS parser and a mechanism to apply those styles to the matching elements at runtime.
- [ ] Hot module reloading for single file components. This would probably build upon the precompiled single file components from .vue files and the [vue-hot-reload-api](https://github.com/vuejs/vue-hot-reload-api).

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

## Contributions

Open source contributions are greatly appreciated! If you have a bugfix, improvement or new feature, please create
[an issue](https://github.com/appcelerator/titanium-vue/issues/new) first and submit a [pull request](https://github.com/appcelerator/titanium-vue/pulls/new) against master.

## Getting Help

If you have questions about the Vue platform on Titanium, feel free to reach out on Stackoverflow or the
`#titanium-vue` channel on [TiSlack](http://tislack.org). In case you find a bug, create a [new issue](/issues/new)
or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache 2
