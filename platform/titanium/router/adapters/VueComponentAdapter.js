import { TitaniumElement } from 'titanium-vdom';

export class VueComponentAdapter {
	getComponentName(component) {
		if (component.$options.name) {
			return component.$options.name;
		}

		let name = 'AnonymousComponent';
		if (component.$el) {
			name += `<${component.$el.tagName}>`;
		}

		return name;
	}

	detachComponent(component) {
		// not needed for Vue
	}

	getTopmostTitaniumElement(component) {
		const candidateElement = component.$el;
		if (candidateElement instanceof TitaniumElement) {
			return candidateElement;
		}

		return null;
	}
}
