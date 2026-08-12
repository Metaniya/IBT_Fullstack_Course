// Loyalty Points Module
// Uses a closure to keep the points balance private, and a
// higher-order function (earnRule) so different point rules can be
// swapped in without changing this module's code.

function createLoyalty(earnRule = (etb) => Math.floor(etb / 10)) {
    let points = 0; // private state - only reachable through the closure below

    return {
        earn(etb) {
            points += earnRule(etb);
        },
        redeem(amount) {
            points = Math.max(0, points - amount);
        },
        balance() {
            return points;
        },
    };
}

module.exports = createLoyalty;
