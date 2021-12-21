console.log("Exercise 3: Search in Object");

var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
  { id: 3, name: "Grape", color: "Green" },
];

function searchByName(fruit_name) {
  const result = fruits.filter((value) => value.name === fruit_name);
  if (result.length > 0) {
    console.log("Found by Name:", result);
  } else {
    console.log("Not Found");
  }
}

function searchByKey(key_name, fruit_name) {
  const key = Object.keys(fruits[0]).filter((value) => value === key_name);
  const result = fruits.filter((f) => f[key] === fruit_name);
  if (result.length > 0) {
    console.log("Found by Key:", result);
  } else {
    console.log("Not Found by Key");
  }
}

searchByName("Apple");
searchByKey("color", "Green");

console.log("----------------------------------------------------------------");
