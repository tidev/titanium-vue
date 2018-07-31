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
				this._useReactiveUpdates = false;
				this.$titaniumView.items = newValue;
			}
		}
	},
	render(h) {
		const children = [];

		if (this.$slots.headerView) {
			children.push(h('detached-view', { ref: 'headerView' }, this.$slots.headerView));
		}

		if (this.items.length) {
			for (let index = 0; index < this.items.length; index++) {
				const item = this.items[index];
				children.push(h('list-item', {
					props: { index, item },
					on: {
						'item-updated': this.onItemUpdated
					}
				}));
			}
		}

		if (this.$slots.footerView) {
			children.push(h('detached-view', { ref: 'footerView' }, this.$slots.footerView));
		}

		return h('titanium-list-section', children);
	},
	created() {
		this._useReactiveUpdates = false;
	},
	mounted() {
		// For whatever reason, we need to append the section first before setting
		// header and foot views
		this.$titaniumView.items = this.items;
		this.$parent.appendSection(this.$titaniumView);

		if (this.$refs.headerView) {
			const headerViewElement = this.$refs.headerView.firstElementChild;
			headerViewElement.remove();
			this.$titaniumView.headerView = headerViewElement.titaniumView;
		}

		if (this.$refs.footerView) {
			const footerViewElement = this.$refs.footerView.firstElementChild;
			footerViewElement.remove();
			this.$titaniumView.footerView = footerViewElement.titaniumView;
		}
	},
	updated() {
		this._useReactiveUpdates = false;
	},
	methods: {
		insertItem(itemVm) {
			if (!this._useReactiveUpdates) {
				return;
			}

			this.$titaniumView.insertItemsAt(itemVm.index, [ itemVm.item ]);
		},
		deleteItem(itemVm) {
			if (!this._useReactiveUpdates) {
				return;
			}

			this.$titaniumView.deleteItemsAt(itemVm.index, 1);
		},
		onItemUpdated(itemVm) {
			if (!this._useReactiveUpdates) {
				return;
			}

			this.$titaniumView.updateItemAt(itemVm.index, itemVm.item);
		}
	}
};
