export default {
	name: 'list-view',

	template: `
		<titanium-list-view ref="listView" @itemClick="onItemClick">
			<slot></slot>
		</titanium-list-view>
	`,

	props: {
		sections: {
			type: Array,
			default: () => []
		}
	},

	created() {
		this.templates = {};
	},

	mounted() {
		this.$el.setAttribute('templates', this.templates);
		this.sections.forEach(section => {
			this.$refs.listView.titaniumView.appendSection(section);
		});
	},

	methods: {
		addTemplate(templateName, template) {
			this.templates[templateName] = template;
		},
		appendSection(section) {
			this.sections.push(section);
		},
		onItemClick(args) {
			this.$emit('itemClick', args);
		}
	}
};
