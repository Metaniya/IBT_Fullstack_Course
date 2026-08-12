

// Totals every transaction of a given type using filter + reduce
export const totalByType = (txns, type) =>
    txns
        .filter(t => t.type === type)
        .reduce((sum, { amount }) => sum + amount, 0);

// Builds a list of formatted receipt strings using map with destructuring
export const formatReceipts = (txns) =>
    txns.map(({ id, customer, amount, type }) =>
        `#${id} - ${customer}: ${type === "credit" ? "+" : "-"}${amount} ETB`
    );

// Returns a corrected copy of one transaction without mutating the original
export const correctAmount = (txn, newAmount) => ({
    ...txn,
    amount: newAmount
});
