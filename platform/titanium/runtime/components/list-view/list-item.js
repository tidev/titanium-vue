export default {
	name: 'ListItem',
	props: {
		index: Number,
		item: Object
	},
	watch: {
		item: {
			handler: function () {
				this.$emit('item-updated', this);
			},
			deep: true
		}
	},
	render(h) {
		return h('item-placeholder');
	},
	mounted() {
		this.$parent.insertItem(this);
	},
	beforeDestroy() {
		this.$parent.deleteItem(this);
	}
};
