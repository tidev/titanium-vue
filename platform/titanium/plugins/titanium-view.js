export default {
	install(Vue) {
		Object.defineProperty(Vue.prototype, '$titaniumView', {
			get() {
				return this.$el.titaniumView;
			}
		});
	}
};
