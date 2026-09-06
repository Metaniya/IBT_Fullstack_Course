export const selectTotal = (state) =>
    state.items.reduce((sum, item) => sum + item.price, 0);