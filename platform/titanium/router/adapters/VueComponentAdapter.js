import { NodeType, TitaniumElement } from 'titanium-vdom';

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
        console.log('detachComponent');
        const element = component.$el;
        if (element.nodeType === NodeType.Comment) {
            // ???
            console.log('trying to detach CommentNode, do nothing');
        } else if (element.nodeType === NodeType.Element) {
            element.remove();
        }
    }

    getTopmostTitaniumElement(component) {
        const candidateElement = component.$el;
        if (candidateElement instanceof TitaniumElement) {
            return candidateElement;
        }

        return null;
    }
}