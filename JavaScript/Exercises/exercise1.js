console.log("Exercise 1: Asterisk Pattern");

function showPattern(nos) {
  for (let i = nos; i >= 1; i--) {
    pattern = "";
    for (let j = i; j >= 1; j--) {
      pattern += " * ";
    }
    console.log(pattern);
  }
}

showPattern(10);

console.log("----------------------------------------------------------------");
