export default {
	name: 'TableViewRow',
	render(h) {
		return h('titanium-table-view-row', {
			ref: 'row',
			on: this.$listeners
		}, this.$slots.default);
	},
	mounted() {
		if (this.$parent.$options.name === 'TableViewSection') {
			this.$parent.$titaniumView.add(this.$titaniumView);
		}
	},
	computed: {
		dataSource() {
			return this.$refs.row.titaniumView;
		}
	}
}
