{
  //Asynchronous Typescript

  interface UserData {
    name: string;
    age: number;
  }

  type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };

  const createPromise = <T>(): Promise<string | UserData> => {
    return new Promise<string | UserData>((resolve, reject) => {
      const checkStatement: string = "something";
      if (checkStatement) {
        resolve({
          name: "Tanvir",
          age: 21,
        });
      } else {
        reject("Failed to load data!");
      }
    });
  };

  const showData = async () => {
    const data = await createPromise();
    console.log(data);
    return data;
  };

  showData();

  const getTodo = async (): Promise<Todo[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const result = await response.json();
    return result;
  };

  const showTodo = async (): Promise<void> => {
    const data = await getTodo();
    console.log(data);
  };
  //   console.log(showTodo());

  //
}
