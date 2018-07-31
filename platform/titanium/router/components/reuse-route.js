import { getFirstComponentChild } from 'core/vdom/helpers/index';
import { navigationManager } from '../navigation';

export default {
	name: 'ReuseRoute',
	abstract: true,

	created() {
		this.cache = new Map();
		this.$router.afterEach((to, from) => {
			if (navigationManager.isNativeBackNavigation || navigationManager.isLocationBackNavigation) {
				const key = from.fullPath;
				const cached = this.cache.get(key);
				const current = this._vnode;
				if (cached && (!current || cached.tag !== current.tag)) {
					cached.componentInstance.$destroy();
				}
				this.cache.delete(key);
			}
		});
	},

	destroyed() {
		this.cache.clear();
	},

	render() {
		const slot = this.$slots.default;
		const vnode = getFirstComponentChild(slot);
		const componentOptions = vnode && vnode.componentOptions;
		if (componentOptions) {
			const key = this.$route.fullPath;
			if (this.cache.has(key)) {
				vnode.componentInstance = this.cache.get(key).componentInstance;
			} else {
				this.cache.set(key, vnode);
			}

			vnode.data.keepAlive = true;
		}
		return vnode || (slot && slot[0]);
	}
};
