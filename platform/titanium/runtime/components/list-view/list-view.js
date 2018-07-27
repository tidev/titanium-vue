import { TitaniumElementRegistry } from 'titanium-vdom';

const registry = TitaniumElementRegistry.getInstance();

export default {
	name: 'ListView',

	props: {
		sections: {
			type: Array,
			default: () => []
		}
	},

	render(h) {
		return h('titanium-list-view', {
			on: this.$listeners
		}, this.$slots.default);
	},

	created() {
		this.templates = {};
	},

	mounted() {
		this.$el.setAttribute('templates', this.templates);
		this.$el.setAttribute('sections', this.sections);
		const listView = this.$el.titaniumView;
		const owningView = this.$el.parentElement.titaniumView;
		if (!owningView) {
			throw new Error(`Parent ${this.$el.parentElement} of list-view component is not a Titanium element`);
		}
		owningView.add(listView);
	},

	methods: {
		registerTemplate(itemTemplate) {
			const templates = [];
			convertNodesToTemplates(itemTemplate.$el.children, templates);
			this.templates[itemTemplate.name] = {
				properties: itemTemplate.properties,
				childTemplates: templates
			};
			itemTemplate.$destroy();
		},

		appendSection(section) {
			this.sections.push(section);
			if (this._isMounted) {
				this.$el.titaniumView.appendSection(section);
			}
		}
	}
};

function convertNodesToTemplates(nodes, templates) {
	if (!nodes) {
		console.log('No more child nodes to convert, stopping');
		return;
	}
	for (let node of nodes) {
		console.log(`converting ${node} to template`);
		let meta = registry.getViewMetadata(node.tagName);
		let templateDefinition = {
			type: meta.typeName,
			childTemplates: []
		};
		let properties = {};
		node.attributes.forEach((attributeValue, attributeName) => {
			if (attributeName === 'bindId') {
				templateDefinition.bindId = attributeValue;
			} else {
				properties[attributeName] = attributeValue;
			}
		});
		templateDefinition.properties = properties;
		if (node.children && node.children.length > 0) {
			convertNodesToTemplates(node.children, templateDefinition.childTemplates);
		}
		templates.push(templateDefinition);
	}
}