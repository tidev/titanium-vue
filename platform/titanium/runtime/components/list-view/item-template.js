export default {
	name: 'ItemTemplate',
	props: {
		name: {
			type: String,
			default: 'default'
		},
		properties: {
			type: Object,
			default: {}
		}
	},

	render(h) {
		return h('detached-view', this.$slots.default);
	},

	mounted() {
		this.$parent.registerTemplate(this);
	}
};
