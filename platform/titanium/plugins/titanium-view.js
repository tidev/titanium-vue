import { TitaniumElement } from 'titanium-vdom';

export default {
	install(Vue) {
		Object.defineProperty(Vue.prototype, '$titaniumView', {
			get() {
				if (!(this.$el instanceof TitaniumElement)) {
					throw new Error(`The root element ${this.el.tagName} of component ${this.$options.name} is no known Titanium view.`);
				}

				return this.$el.titaniumView;
			}
		});
	}
};
