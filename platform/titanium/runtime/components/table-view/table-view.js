export default {
	name: 'TableView',
	props: {
		data: {
			type: Array,
			default: () => []
		}
	},
	render(h) {
		return h('titanium-table-view', {
			on: this.$listeners
		}, this.$slots.default);
	},
	mounted() {
		this.$el.setAttribute('data', this.data);
		const tableView = this.$el.titaniumView;
		const owningView = this.$el.parentElement.titaniumView;
		if (!owningView) {
			throw new Error(`Parent ${this.$el.parentElement} of table-view component is not a Titanium element`);
		}
		owningView.add(tableView);
	},
	methods: {
		pushData(sectionOrRow) {
			this.data.push(sectionOrRow);
		}
	}
}
