import { navigationManager } from './navigation';
import WindowRouterView from './components/window-router-view';

function initializeWindowRouting(router) {
	if (router.__windowRoutingInitialized) {
		return;
	}

	router.isWindowRouting = true;
	router.__windowRoutingInitialized = true;
	router.isInitialRoute = true;

	patchRouter(router);
}

function patchRouter(router) {
	router.back = wrap(router, router.back, () => navigationManager.locationBackNavigation = true);
	router.forward = () => { throw new Error('Using $router.forward is not supported in the Titanium window router.') };
	router.go = wrap(router, router.go, n => { 
		if (n !== -1) {
			throw new Error(`The Titanium window router only supports $router.go(-1) but received ${n} as an argument.`);
		}
	 })
}

function wrap(context, originalFunction, beforeFunction) {
	let wrappedFunction = function () {
		var args = [...arguments].splice(0);
		beforeFunction.apply(context, args);
		return originalFunction.apply(context, args);
	}
	
	return wrappedFunction;
}

export default {
	install(Vue) {
		Vue.mixin({
			beforeCreate() {
				console.log(`[TR] - beforeCreate ${this.$options.name}`);

				if (this.$options.router && this.$options.router.options.windowRouting) {
					console.log('patching router');
					initializeWindowRouting(this.$options.router);
				}
			},

			beforeRouteEnter(to, from, next) {
				next(vm => {
					if (!vm.$router.isWindowRouting) {
						return;
					}

					console.log('beforeRouteEnter');

					if (navigationManager.isNativeBackNavigation) {
						navigationManager.resetBackNavigationFlags();
					} else if (navigationManager.isLocationBackNavigation) {
						navigationManager.back();
						navigationManager.resetBackNavigationFlags();
					} else {
						if (vm.$router.isInitialRoute) {
							navigationManager.createAndOpenRootNavigator(vm);
							vm.$router.isInitialRoute = false;
						} else {
							navigationManager.open(vm);
						}
					}
				});
			}
		});

		Vue.component('WindowRouterView', WindowRouterView);
	}
};