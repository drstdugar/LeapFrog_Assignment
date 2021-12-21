console.log("Exercise 4: Transform Array");

var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
  const transformed_array = [];
  for (let i = 0; i < collection.length; i++) {
    transformed_array.push(tranFunc(collection[i]));
  }
  return transformed_array;
}

var output = transform(numbers, function (num) {
  return num * 2;
});

console.log("Original Array", numbers);
console.log("Transformed Array", output);

console.log("----------------------------------------------------------------");
