export default {
	name: 'TableViewSection',
	render(h) {
		const children = [];

		if (this.$slots.headerView) {
			children.push(h('header', { ref: 'headerView', attrs: { detached: true } }, this.$slots.headerView));
		}

		children.push(...this.$slots.default);

		if (this.$slots.footerView) {
			children.push(h('footer', { ref: 'footerView', attrs: { detached: true } }, this.$slots.footerView));
		}

		return h('titanium-table-view-section', { ref: 'section' }, children);
	},
	mounted() {
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
	computed: {
		dataSource() {
			return this.$refs.section.titaniumView;
		}
	}
};
