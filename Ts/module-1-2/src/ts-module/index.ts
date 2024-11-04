// TODO --> Type Aliases

// TODO --> Function type aliases

type GetDataFunc = () => Promise<void>;

const getData: GetDataFunc = async () => {
  const res = await fetch("https://jsonplaceholder.com/api/post/1");
  const data = await res.json();
  return data;
};

// TODO --> Normal Function
type AddTowNumbersFunc = (num1: number, num2: number) => number;
const addTwoNumbers: AddTowNumbersFunc = (num1, num2) => num1 + num2;

addTwoNumbers(1, 2);

// TODO --> Union(or type) Type is called use this symbol(|) between two types, and intersection(and type) is called using this symbol (&) between two types

// ! Ternary operator
const age: number = 18;
if (age >= 18) {
  console.log("Welcome to the party! You are adult now!");
} else {
  console.log("Sorry, you are not adult yet.");
}
