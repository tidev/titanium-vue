export default {
	name: 'TableViewRow',
	render(h) {
		return h('titanium-table-view-row', {
			on: this.$listeners
		}, this.$slots.default);
	},
	mounted() {
		this.$parent.pushData(this.$el.titaniumView);
	}
}
