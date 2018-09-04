export default {
	name: 'Tab',
	inject: [ 'getTabGroup' ],
	render(h) {
		return h('titanium-tab', this.$slots.default);
	},
	mounted() {
		const window = this.$el.children.length === 1 ? this.$el.firstElementChild.titaniumView : null;
		if (!window) {
			throw new Error('A Tab view must contain a single window as its only child');
		}

		const tabView = this.$titaniumView;
		tabView.window = window;
		const tabIndex = this.$parent.$children.indexOf(this);
		if (this.getTabGroup().tabs) {
			const tabs = this.getTabGroup().tabs;
			tabs.splice(tabIndex, 0, tabView);
			this.getTabGroup().tabs = tabs;
		} else {
			this.getTabGroup().addTab(tabView);
		}
	},
	destroyed() {
		const tabView = this.$titaniumView;
		this.getTabGroup().removeTab(tabView);
	}
};
