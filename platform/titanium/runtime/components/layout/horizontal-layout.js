export default {
    name: 'HorizontalLayout',

    render(h) {
        return h('view', {
            attrs: {
                layout: 'horizontal'
            }
        }, this.$slots.default);
    }
}