export default {
	name: 'tab-goup',

	props: ['selectedTab'],

	template: `
		<titanium-tab-group ref="tabGroup" v-model="selectedIndex">
			<slot></slot>
		</titanium-tab-group>
	`,

	data() {
		return {
			selectedIndex: 0
		};
	},

	watch: {
		'selectedTab'(index) {
			this.selectedIndex = index;
		}
	},

	methods: {
		addTab(tabView) {
			this.$refs.tabGroup.titaniumView.addTab(tabView);
		},

		open() {
			this.$refs.tabGroup.titaniumView.open();
		}
	}
};
