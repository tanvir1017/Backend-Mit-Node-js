/**
 * Functions in typescript
 *  */

interface returnPlaceHolderData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const getDataFromJsonPlaceholder = (): Promise<void> => {
  const data = fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => console.log(json));

  return data;
};

getDataFromJsonPlaceholder();

// Object --> Function --> Method
// _____________________type_________________________________________
type FunctionOfPoorPerson = {
  name: string;
  balance: number;
  depositBalance(balance: number): string;
};
// _____________________object_________________________________________
const poorMe: FunctionOfPoorPerson = {
  name: "Tanvir Hossain",
  balance: 0,
  depositBalance(balance: number): string {
    return `My new balance is ${this.balance + balance}`;
  },
};

poorMe.depositBalance(100); // This is how call the function inside object

// TODO --> Mapping over array
const arr: number[] = [1, 2, 3, 4, 5];
const squareNumberArr: number[] = arr.map((el: number): number => el * el);
