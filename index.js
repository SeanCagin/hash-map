import HashMap from "./hash-map.js";
console.log(0);
const test = new HashMap();

console.log(1);

test.set("apple", "red");

console.log(2);
test.set("banana", "blue");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "yellow");
test.set("kite", "pink");
test.set("lion", "golden");
console.log("Let's do this!");
test.entries().forEach((entry) => {
  console.log(entry);
});

test.set("kite", "new color 1");
test.set("lion", "new color 2");
test.set("moon", "silver");

console.log("Round 2 baby");
test.entries().forEach((entry) => {
  console.log(entry);
});
test.remove("moon");
console.log("One last push");
test.entries().forEach((entry) => {
  console.log(entry);
});

console.log(test.get("lion"));
console.log(test.has("lion"));
console.log(test.get("moon"));
console.log(test.has("moon"));

test.clear();
