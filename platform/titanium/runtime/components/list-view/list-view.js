export default {
	name: 'list-view',

	template: `
		<titanium-list-view ref="listView" @itemClick="onItemClick">
			<slot></slot>
		</titanium-list-view>
	`,

	props: {
		sections: {
			type: Map
		}
	},

	methods: {
		addTemplate(templateName, template) {
			console.log('addTemplate');
			
			/*
			let templates = this.$refs.listView.titaniumView.templates || {};
			templates[templateName] = template;
			this.$refs.listView.titaniumView.setTemplates(templates);
			*/
		},
		appendSection(section) {
			this.$refs.listView.titaniumView.appendSection(section);
		},
		onItemClick(args) {
			this.$emit('itemClick', args);
		}
	}
};
