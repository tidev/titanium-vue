export default {
	name: 'ti-template',

	template: `
		<root>
			<slot></slot>
		</root>
	`,

	props: {
		name: String,
		default: 'default'
	},

	mounted() {
		// TODO: Parse node and convert to a titanium view template. Currently we
		// cannot set template after a Ti.UI.ListView is created so this needs further
		// evaluation.
		this.$children.forEach(child => this.$el.removeChild(child));
	},

	methods: {
		parseTemplate() {
			return {
				childTemplates: [
					{
						type: 'Ti.UI.Label',
						bindId: 'properties',
					}
				]
			};
		}
	}
};
