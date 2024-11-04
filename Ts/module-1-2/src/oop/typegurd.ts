{
  // * Type Guard
  type StringOrNumber = string | number;
  const addNumber = (
    param1: StringOrNumber,
    param2: StringOrNumber
  ): StringOrNumber => {
    if (typeof param1 === "number" && typeof param2 === "number") {
      return param1 + param2;
    } else {
      return param1.toString() + param2.toString;
    }
  };

  console.log(addNumber("2", "3"));

  // ** In Guard in Typescript
  type NormalUser = {
    name: string;
  };

  type AdminUser = {
    name: string;
    role: "ADMIN";
  };

  const getUser = (user: NormalUser | AdminUser) => {
    if ("role" in user) {
      console.log(`My name is ${user.name} and my role is ${user.role}`);
    } else {
      console.log(`${user.name} you are not admin`);
    }
  };

  const normalUser: NormalUser = {
    name: "Tanvir Hossain",
  };

  const adminUer: AdminUser = {
    name: "Abdur Rahman",
    role: "ADMIN",
  };

  const isAdmin = getUser(adminUer);

  //
}
