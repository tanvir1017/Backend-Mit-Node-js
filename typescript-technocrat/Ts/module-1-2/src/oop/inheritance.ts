// TODO --> inheritance in oop

const dasGeshäft = "Shop ";

// ** Inheritance For Both Student And Teacher Class
class Person {
  name: string;
  age: number;
  address: string;

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  getSleep(numberOfHour: number) {
    console.log(`${this.name} will sleep for ${numberOfHour}`);
  }
}

// ** Inheritance For Both Student And Teacher Class

class Student extends Person {
  constructor(name: string, age: number, address: string) {
    super(name, age, address);
  }
}

const AbdurRahman = new Student("Abdur Rahman", 8, "Bangladesh");
AbdurRahman.getSleep(8);
console.log(AbdurRahman.address);

// * class for teacher

class Teacher extends Person {
  designation: string;

  constructor(name: string, age: number, address: string, designation: string) {
    super(name, age, address);
    this.designation = designation;
  }

  takeClass(numberOfClass: number) {
    console.log(`${this.name} will take class for ${numberOfClass}`);
  }
}

const Asif__Mahtab = new Teacher(
  "Asif Mahtab",
  40,
  "Bangladesh 2.0",
  "Professor"
);
console.log(Asif__Mahtab.takeClass(5));
//
