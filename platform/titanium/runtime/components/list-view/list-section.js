export default {
	name: 'ListSection',

	props: {
		items: {
			type: Array
		}
	},

	render(h) {
		return h('titanium-list-section');
	},

	watch: {
		items(newValue) {
			this.$el.setAttribute('items', newValue);
		}
	},

	mounted() {
		this.$el.setAttribute('items', this.items);
		this.$parent.appendSection(this.$el.titaniumView);
	}
};
