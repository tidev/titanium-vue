import {warn} from 'core/util/debug';

export default {
	name: 'tab',

	template: `
		<titanium-tab ref="tab">
			<slot></slot>
		</titanium-tab>
	`,

	mounted() {
		if (this.$el.children.length > 1) {
			warn('A Tab view should contain only 1 root element', this);
		}

		let tabView = this.$refs.tab.titaniumView;
		tabView.window = this.$el.children[0].titaniumView;
		this.$parent.addTab(tabView);
	}
};
