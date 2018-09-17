export default {
	name: 'RefreshControl',
	render(createElement) {
		return createElement('titanium-refresh-control', { on: this.$listeners }, this.$slots.default);
	},
	mounted() {
		const validParents = [ 'Ti.UI.TableView', 'Ti.UI.ListView', 'Ti.UI.ScrollView' ];
		const parentView = this.$parent.$titaniumView;
		if (validParents.indexOf(parentView.apiName) === -1) {
			throw new Error(`Invalid parent element ${parentView.apiName} for RefreshControl. Valid parent are ${validParents.join(', ')}`);
		}
		parentView.refreshControl = this.$titaniumView;
	}
};
