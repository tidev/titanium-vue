/* @flow */
import { getFirstComponentChild } from 'core/vdom/helpers/index'
import { navigationManager } from '../navigation';

export default {
    name: 'ReuseRoute',
    abstract: true,

    created() {
        this.cache = new Map();
        this.$router.afterEach((to, from) => {
            if (navigationManager.isNativeBackNavigation || navigationManager.isLocationBackNavigation) {
                this.cache.delete(from.fullPath);
            }
        });
    },

    destroyed() {
        this.cache.clear();
    },

    render() {
        const slot = this.$slots.default
        const vnode = getFirstComponentChild(slot)
        const componentOptions = vnode && vnode.componentOptions
        if (componentOptions) {
            const key = this.$route.fullPath;
            if (this.cache.has(key)) {
                vnode.componentInstance = this.cache.get(key).componentInstance
            } else {
                this.cache.set(key, vnode)
            }

            vnode.data.keepAlive = true
        }
        return vnode || (slot && slot[0])
    }
}