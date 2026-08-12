// Exercise 2: Closure - private counter

function makeCounter() {
    let count = 0; // private variable, only reachable through the returned function

    return function () {
        count += 1;
        return count;
    };
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// count stays private because it lives inside makeCounter's own scope.
// The only way to reach it is through the inner function that was
// returned, which "remembers" the scope it was created in (that's the
// closure). There is no way to type "count" from outside and access it
// directly - it simply is not visible outside of makeCounter.
