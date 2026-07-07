const jsonString = '{"name":"jhon","age":30,"city":"New York"}';
const jsonObject = JSON.parse(jsonString);

console.log(jsonObject.name);

const objectToConvert = {
  name: "Alice",
  age: 25,
};
const jsonStringified = JSON.stringify(objectToConvert);
console.log(jsonStringified);
