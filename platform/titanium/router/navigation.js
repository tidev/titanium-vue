import { loadNavigatorProviders, NavigationManager } from 'titanium-navigator';

export var navigationManager = null;

export function createNavigationManager(options) {
	if (navigationManager !== null) {
		throw new Error('Navigation manager already created.');
	}

	navigationManager = new NavigationManager({
		componentAdapter: options.componentAdapter,
		navigatorProviders: loadNavigatorProviders(options.createRouterStateAdapter)
	});

	return navigationManager;
}
