export default {
	name: 'ListSection',
	props: {
		items: {
			type: Array,
			default: () => []
		}
	},
	watch: {
		items(newValue, oldValue) {
			if (newValue !== oldValue) {
				this._newDataSource = true;
				this.$titaniumView.setItems(newValue);
			}
		}
	},
	render(h) {
		const items = [];
		if (this.items.length) {
			for (let index = 0; index < this.items.length; index++) {
				const item = this.items[index];
				items.push(h('list-item', {
					props: { index, item },
					on: {
						'item-updated': this.onItemUpdated
					}
				}));
			}
		}
		return h('titanium-list-section', items);
	},
	created() {
		this._newDataSource = false;
	},
	mounted() {
		this.$el.setAttribute('items', this.items);
		this.$parent.appendSection(this.$titaniumView);
	},
	updated() {
		this._newDataSource = false;
	},
	methods: {
		insertItem(itemVm) {
			if (this._newDataSource) {
				return;
			}

			this.$titaniumView.insertItemsAt(itemVm.index, [itemVm.item]);
		},
		deleteItem(itemVm) {
			if (this._newDataSource) {
				return;
			}

			this.$titaniumView.deleteItemsAt(itemVm.index, 1);
		},
		onItemUpdated(itemVm) {
			if (this._newDataSource) {
				return;
			}

			this.$titaniumView.updateItemAt(itemVm.index, itemVm.item);
		}
	}
};
