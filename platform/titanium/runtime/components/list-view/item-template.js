export default {
	name: 'ItemTemplate',
	props: {
		name: {
			type: String,
			default: 'default'
		}
	},

	render(h) {
		return h('detached-view', this.$slots.default);
	},

	mounted() {
		this.$parent.registerTemplate(this);
	}
};
