import { loadNavigatorProviders, NavigationManager } from 'titanium-navigator';
import { VueComponentAdapter, VueRouterStateAdapter } from './adapters/index';

const config = {
    componentAdapter: new VueComponentAdapter(),
    navigatorProviders: loadNavigatorProviders(new VueRouterStateAdapter())
};
export const navigationManager = new NavigationManager(config);

export function shouldAttach() {

}

export function shouldDetach() {
    
}
