import Vue from 'core/index';

import ReuseRoute from './reuse-route';

export default {
	name: 'WindowRouterView',
	abstract: true,
	components: {
		ReuseRoute
	},
	render(h) {
		return h(ReuseRoute, [
			h(Vue.options.components['router-view'], this.$slots.default)
		]);
	}
};
