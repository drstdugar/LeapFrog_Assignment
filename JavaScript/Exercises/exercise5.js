console.log("Exercise 5: Sorting Array");

var arr = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Mary",
  },
  {
    id: 3,
    name: "Andrew",
  },
];

function sortBy(array, key) {
  const sorted_array = array.slice();
  for (i = 0; i < sorted_array.length; i++) {
    for (j = i + 1; j < sorted_array.length; j++) {
      if (sorted_array[j][key] < sorted_array[i][key]) {
        const temp = sorted_array[j];
        sorted_array[j] = sorted_array[i];
        sorted_array[i] = temp;
      }
    }
  }
  return sorted_array;
}

var sorted = sortBy(arr, "name");

console.log("Original Array", arr);
console.log("Sorted Array", sorted);

console.log("----------------------------------------------------------------");
