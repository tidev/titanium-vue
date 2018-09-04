export default {
	name: 'TableView',
	render(h) {
		return h('titanium-table-view', {
			on: this.$listeners
		}, this.$slots.default);
	},
	mounted() {
		if (this.$children.length) {
			this.$el.setAttribute('data', this.$children.map(rowOrSection => rowOrSection.dataSource));
		}
		const tableView = this.$titaniumView;
		const owningView = this.$el.parentElement.titaniumView;
		if (!owningView) {
			throw new Error(`Parent ${this.$el.parentElement} of table-view component is not a Titanium element`);
		}
		owningView.add(tableView);
	}
};
