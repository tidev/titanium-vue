import { warn } from 'core/util/index'

export default {
    name: 'navigation-window',

    mounted() {
        const windowElement = this.$el.firstElementChild;
        if (!windowElement || windowElement.tagName !== 'window') {
            throw new Error('The first child of a NavigationWindow always must be a Window.');
        }

        let navigationWindow = this.$refs.navigationWindow;
        navigationWindow.setAttribute('window', windowElement.titaniumView);
    },

    render(createElement) {
        const children = this.$slots.default;
        if (!children) {
            return;
        }

        if (children.length > 1) {
            warn('<navigation-window> must wrap a single <window> element.');
        }

        return createElement('titanium-navigation-window', {
            ref: 'navigationWindow'
        },  this.$slots.default);
    }
};
