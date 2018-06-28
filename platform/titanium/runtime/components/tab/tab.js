export default {
	name: 'tab',
	inject: ['getTabGroup'],
	render(h) {
		return h('titanium-tab', this.$slots.default);
	},
	mounted() {
		const window = this.$el.children.length === 1 ? this.$el.firstElementChild.titaniumView : null;
		if (!window) {
			throw new Error('A Tab view must contain a single window as its only child');
		}

		let tabView = this.$titaniumView;
		tabView.window = window;
		this.getTabGroup().addTab(tabView);
	}
};
