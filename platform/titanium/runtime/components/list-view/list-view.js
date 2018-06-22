export default {
	name: 'list-view',

	props: {
		sections: {
			type: Array,
			default: () => []
		}
	},

	render(h) {
		return h('titanium-list-view', this.$slots.default);
	},

	created() {
		this.templates = {};
	},

	mounted() {
		this.$el.setAttribute('templates', this.templates);
		this.$el.setAttribute('sections', this.sections);
		const owningView = this.$el.parentElement.titaniumView;
		if (!owningView) {
			throw new Error(`Parent ${this.$el.parentElement} of list-view component is not a Titanium element`);
		}
		owningView.add(this.$el.titaniumView);
		this.$el.titaniumView.update
	},

	methods: {
		addTemplate(templateName, template) {
			this.templates[templateName] = template;
		},
		appendSection(section) {
			this.sections.push(section);
			if (this._isMounted) {
				this.$el.titaniumView.appendSection(section);
			}
		}
	}
};
