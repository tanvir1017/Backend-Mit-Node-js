{
  //Generics constraint with keyof operator
  type Vehicle = {
    bike: string;
    car: string;
    ship: string;
  };

  type Owner = "Bike" | "Car" | "Ship"; // Manual
  // ! using a operator or ts built in keywords "keyof"
  type Owner1 = keyof Vehicle;

  const person: Owner1 = "car";

  // TODO --> More example of using keyof

  const findTheValueByKey = <X, Y extends keyof X>(objekt: X, key: Y): X[Y] => {
    return objekt[key];
  };

  const userObjekt = {
    name: "Tanvir Hossain",
    age: 21,
    institute: "Dpi",
  };

  const res = findTheValueByKey(userObjekt, "name");
  console.log(res);

  //
}
