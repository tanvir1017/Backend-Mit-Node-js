{
  // TODO => Instanceof type guard

  class Animal {
    name: string;
    species: string;
    constructor(name: string, species: string) {
      this.name = name;
      this.species = species;
    }

    makeSound() {
      console.log("I can give sound");
    }
  }

  class Dog extends Animal {
    constructor(name: string, species: string) {
      super(name, species);
    }

    dogSound() {
      console.log("Ghew Ghew");
    }
  }

  class Cat extends Animal {
    constructor(name: string, species: string) {
      super(name, species);
    }
    catSound() {
      console.log("Mew Mew");
    }
  }

  const dog: Dog = new Dog("Doina varir kutta", "Bangla");
  const cat: Cat = new Cat("Uttora varir billi", "Bangla");

  const getAnimal = (animal: Animal) => {
    if (animal instanceof Dog) {
      return animal.dogSound();
    } else if (animal instanceof Cat) {
      return animal.catSound();
    } else {
      return animal.makeSound();
    }
  };

  // ** Handling instanceof theory with smart 2.o dev mode

  const isDog = (animal: Animal) => {
    return animal instanceof Dog;
  };

  const isCat = (animal: Animal) => {
    return animal instanceof Cat;
  };
  const getWhatAnimal = (animal: Animal) => {
    if (isDog(animal)) {
      return animal.dogSound();
    } else if (isCat(animal)) {
      animal.catSound();
    } else {
      animal.makeSound();
    }
  };

  getWhatAnimal(dog);
  getWhatAnimal(cat);

  //   getAnimal(cat);

  //
}
