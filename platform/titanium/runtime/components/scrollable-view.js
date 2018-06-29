export default {
    name: 'ScrollableView',
    render(createElement) {
        return createElement('titanium-scrollable-view', this.$slots.default);
    },
    mounted() {
        const views = [];
        for (const child of this.$el.children) {
            views.push(child.titaniumView);
        }
        this.$titaniumView.setViews(views);
    }
};
