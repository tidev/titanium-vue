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

	created() {
		this.templates = {};
	},

	mounted() {
		this.$el.setAttribute('templates', this.templates);
	},

	methods: {
		addTemplate(templateName, template) {
			this.templates[templateName] = template;
		},
		appendSection(section) {
			this.$refs.listView.titaniumView.appendSection(section);
		},
		onItemClick(args) {
			this.$emit('itemClick', args);
		}
	}
};
