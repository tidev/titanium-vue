import { TitaniumElementRegistry } from 'titanium-vdom';

const registry = TitaniumElementRegistry.getInstance();

export default {
	name: 'ItemTemplate',
	props: {
		name: {
			type: String,
			default: 'default'
		}
	},

	render() {
		this.$parent.addTemplate(this.name, {
			childTemplates: convertNodesToTemplates(this.$slots.default)
		});
		return null;
	}
};

function convertNodesToTemplates(nodes) {
	let templates = [];
	for (let node of nodes) {
		let meta = registry.getViewMetadata(node.tag);
		let templateDefinition = {
			type: meta.typeName
		};
		let properties = {};
		for (let attributeName in node.data.attrs) {
			const attributeValue = node.data.attrs[attributeName];
			if (attributeName === 'bindId') {
				templateDefinition.bindId = attributeValue;
			} else {
				properties[attributeName] = attributeValue;
			}
		}
		templateDefinition.properties = properties;
		if (node.children && node.children.length > 0) {
			templateDefinition.childTemplates = convertNodesToTemplates(node.children);
		}
		templates.push(templateDefinition);
	}
	return templates;
}
