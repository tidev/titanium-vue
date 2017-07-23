export default {
	name: 'list-section',

	template: `
		<titanium-list-section ref="listSection"></titanium-list-section>
	`,

	props: {
		items: {
			type: Array
		}
	},

	watch: {
		items(newValue) {
			this.$refs.listSection.setAttribute('items', newValue);
		}
	},

	mounted() {
		this.$refs.listSection.setAttribute('items', this.items);
		this.$parent.appendSection(this.$refs.listSection.titaniumView);
	},
};
