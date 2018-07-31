export default {
	name: 'TableViewSection',
	render(h) {
		const children = [];

		if (this.$slots.headerView) {
			children.push(h('detached-view', { ref: 'headerView' }, this.$slots.headerView));
		}

		children.concat(this.$slots.default);

		if (this.$slots.footerView) {
			children.push(h('detached-view', { ref: 'footerView' }, this.$slots.footerView));
		}

		return h('titanium-table-view-section', children);
	},
	mounted() {
		// For whatever reason, we need to append the section first before setting
		// header and footer views
		this.$titaniumView.items = this.items;
		this.$parent.appendSection(this.$titaniumView);

		if (this.$refs.headerView) {
			const headerViewElement = this.$refs.headerView.firstElementChild;
			headerViewElement.remove();
			this.$titaniumView.headerView = headerViewElement.titaniumView;
		}

		if (this.$refs.footerView) {
			const footerViewElement = this.$refs.footerView.firstElementChild;
			footerViewElement.remove();
			this.$titaniumView.footerView = footerViewElement.titaniumView;
		}
	},
	methods: {

	}
};
