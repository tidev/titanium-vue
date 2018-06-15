import Vue from 'vue';

import ReuseRoute from './reuse-route';

export default {
    name: 'WindowRouterView',
    functional: true,
    components: {
        ReuseRoute
    },
    render(h,  { props, children, parent, data }) {
        return h(ReuseRoute, [
            h(Vue.options.components['router-view'], data, children)
        ]);
    }
}