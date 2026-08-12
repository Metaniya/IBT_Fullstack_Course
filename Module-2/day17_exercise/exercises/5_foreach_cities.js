// Exercise 5: forEach with a callback

const cities = ["Addis Ababa", "Bahir Dar", "Gondar", "Mekelle", "Hawassa"];

cities.forEach(function (city, index) {
    console.log(`${index + 1}. ${city}`);
});
