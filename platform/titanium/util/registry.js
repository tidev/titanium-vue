import { registerTitaniumElements, TitaniumElementRegistry } from 'titanium-vdom';

const elementRegistry = TitaniumElementRegistry.getInstance();
elementRegistry.defaultViewMetadata = {
    detached: false,
    model: {
        prop: 'value',
        event: 'change'
    }
};
elementRegistry.namingStrategy = { normalizeName: name => name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() };

export function initializeTitaniumElements() {
    registerTitaniumElements(elementRegistry);
    renameWrappedElements(elementRegistry);
}

export function hasElement(tagName) {
    return elementRegistry.hasElement(tagName);
}

export function getViewMeta(tagName) {
    return elementRegistry.getViewMetadata(tagName);
}

function renameWrappedElements(elementRegistry) {
    const elementsToRename = [
        'list-view',
        'list-section',
        'navigation-window',
        'scrollable-view',
        'tab-group',
        'tab'
    ];

    for (const tagName of elementsToRename) {
        if (!elementRegistry.hasElement(tagName)) {
            continue;
        }
        
        const elementEntry = elementRegistry.getElement(tagName);
        elementRegistry.unregisterElement(tagName);
        elementRegistry.registerElement(`titanium-${tagName}`, elementEntry.resolveFactory, elementEntry.meta);
    }
}