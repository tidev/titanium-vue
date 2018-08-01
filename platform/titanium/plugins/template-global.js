export default {
	install(Vue) {
		Vue.mixin({
			created() {
				this.Ti = Ti;
			}
		});
	}
};
