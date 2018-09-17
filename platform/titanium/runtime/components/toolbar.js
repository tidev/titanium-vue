export default {
	name: 'Toolbar',
	render(createElement) {
		return createElement('titanium-toolbar', this.$slots.default);
	},
	mounted() {
		const items = [];
		for (const child of this.$el.children) {
			items.push(child.titaniumView);
		}
		this.$titaniumView.items = items;
	}
};
