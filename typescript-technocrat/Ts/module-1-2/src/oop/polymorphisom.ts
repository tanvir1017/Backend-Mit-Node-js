{
  // TODO => Polymorphism  in OOP | Second pillar of OOP
  // ! A particular method from class behave different by inheriting to another class it's called  / polymorphism \

  class Person {
    getSleep() {
      console.log(`I am sleeping for 8 hours per day`);
    }
  }

  class Student extends Person {
    getSleep() {
      console.log(`I am sleeping for 7 hours per day`);
    }
  }

  class Developer extends Person {
    getSleep() {
      console.log(`I am sleeping for 6 hours per day`);
    }
  }

  const getSleepingHours = (param: Person) => {
    param.getSleep();
  };

  const person1 = new Person();
  const person2 = new Student();
  const person3 = new Developer();

  //   getSleepingHours(person1);
  //   getSleepingHours(person2);
  //   getSleepingHours(person3);

  class Shape {
    getArea(): number {
      return 0;
    }
  }

  // ! Radius => PI * radius * radius
  class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
      super();
      this.radius = radius;
    }
    getArea(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

  // ! Height * Width
  class Rectangle extends Shape {
    height: number;
    width: number;
    constructor(height: number, width: number) {
      super();
      this.height = height;
      this.width = width;
    }

    getArea(): number {
      return this.height * this.width;
    }
  }

  const getShape = (param: Shape): number => {
    return param.getArea();
  };

  const shape1 = new Shape();
  const shape2 = new Circle(10);
  const shape3 = new Rectangle(10, 20);

  console.log(getShape(shape1));
  console.log(getShape(shape2));
  console.log(getShape(shape3   ));

  //
}
