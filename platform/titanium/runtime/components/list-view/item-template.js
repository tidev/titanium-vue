import { getViewMeta } from '../../element-registry';

export default {
	name: 'item-template',

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
		this.$parent.addTemplate(this.name, {
			childTemplates: this.convertNodesToTemplates(this.$el.children)
		});
		this.$children.forEach(child => this.$el.removeChild(child));
	},

	methods: {
		convertNodesToTemplates(nodes) {
			let templates = [];
			for (let node of nodes) {
				let meta = getViewMeta(node.tagName);
				let templateDefintion = {
					type: meta.type
				};
				let properties = {};
				node.attributes.forEach((attributeValue, attributeName) => {
					if (attributeName === 'bindId') {
						templateDefintion.bindId = attributeValue;
					} else {
						properties[attributeName] = attributeValue;
					}
				});
				templateDefintion.properties = properties;
				if (node.children.length > 0) {
					templateDefintion.childTemplates = this.convertNodesToTemplates(node.children);
				}
				templates.push(templateDefintion);
			}
			return templates;
		}
	}
};
