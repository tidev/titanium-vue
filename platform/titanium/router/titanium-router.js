import { warn } from 'core/util/index';

import { VueComponentAdapter, VueRouterStateAdapter } from './adapters/index';
import { createNavigationManager } from './navigation';
import WindowRouterView from './components/window-router-view';

let navigationManager;

function initializeWindowRouting(router) {
	if (router.__windowRoutingInitialized) {
		return;
	}

	router.isWindowRouting = true;
	router.__windowRoutingInitialized = true;
	router.isInitialRoute = true;

	navigationManager = createNavigationManager({
		componentAdapter: new VueComponentAdapter(),
		createRouterStateAdapter: () => new VueRouterStateAdapter(router.history)
	});
	navigationManager.nativeBackNavigationSignal.subscribe(() => {
		router.back();
	});

	patchRouter(router);
}

function patchRouter(router) {
	const originalPush = router.push;
	router.push = (location, onComplete, onAbort) => {
		function patchHistoryIfRouteHasNoMatch(to, from) {
			if (to.matched.length === 0) {
				if (process.env.NODE_ENV !== 'production') {
					warn(`No route found for path "${to.fullPath}"`);
				}
				router.history.stack.pop();
				router.history.index -= 1;
				router.history.current = router.history.stack[router.history.index];
			}
		}
		const patchedOnComplete = onComplete ? wrap(null, onComplete, patchHistoryIfRouteHasNoMatch) : patchHistoryIfRouteHasNoMatch;
		originalPush.call(router, location, patchedOnComplete, onAbort);
	};
	router.back = wrap(router, router.back, () => navigationManager.locationBackNavigation = true);
	router.forward = () => {
		throw new Error('Using $router.forward is not supported in the Titanium window router.');
	};
	router.go = wrap(router, router.go, n => {
		if (n !== -1) {
			throw new Error(`The Titanium window router only supports $router.go(-1) but received ${n} as an argument.`);
		}
	});
}

function wrap(context, originalFunction, beforeFunction) {
	function wrappedFunction() {
		var args = [ ...arguments ].splice(0);
		beforeFunction.apply(context, args);
		return originalFunction.apply(context, args);
	}

	return wrappedFunction;
}

export default {
	install(Vue) {
		Vue.mixin({
			beforeCreate() {
				if (this.$options.router && this.$options.router.options.windowRouting) {
					initializeWindowRouting(this.$options.router);
				}
			},

			beforeRouteEnter(to, from, next) {
				next(vm => {
					if (!vm.$router.isWindowRouting) {
						return;
					}

					const topmostMatchedInstance = to.matched[0].instances.default;
					if (topmostMatchedInstance !== vm) {
						return;
					}

					if (navigationManager.isNativeBackNavigation) {
						navigationManager.resetBackNavigationFlags();
					} else if (navigationManager.isLocationBackNavigation) {
						navigationManager.back();
						navigationManager.resetBackNavigationFlags();
					} else if (vm.$router.isInitialRoute) {
						navigationManager.createAndOpenRootNavigator(vm);
						vm.$router.isInitialRoute = false;
					} else {
						navigationManager.open(vm);
					}
				});
			}
		});

		Vue.component('WindowRouterView', WindowRouterView);
	}
};
