export default {
	name: 'VerticallLayout',

	render(h) {
		return h('view', {
			attrs: {
				layout: 'vertical'
			}
		}, this.$slots.default);
	}
};
