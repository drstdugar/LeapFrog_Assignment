console.log("Exercise 6: Normalizing Array");

var input = {
  1: {
    id: 1,
    name: "John",
    children: [
      { id: 2, name: "Sally" },
      { id: 3, name: "Mark", children: [{ id: 4, name: "Harry" }] },
    ],
  },
  5: {
    id: 5,
    name: "Mike",
    children: [{ id: 6, name: "Peter" }],
  },
};

function normalize(input) {
  const result = Object.keys(input).reduce((acc, data) => {
    acc[data] = input[data];

    children(input[data]["children"]);

    function children(child_array) {
      child_array.forEach((value) => {
        acc[value.id] = value;
        if (acc[value.id].children) {
          children(value.children);
        }
      });
    }
    return acc;
  }, {});

  Object.keys(result).forEach((value) => {
    if (result[value].children) {
      child_id = result[value].children.map((m) => m.id);
      result[value]["children"] = child_id;
    }
  });

  return result;
}

var normalized = normalize(input);

console.log("Normalized Output", normalized);

console.log("----------------------------------------------------------------");
