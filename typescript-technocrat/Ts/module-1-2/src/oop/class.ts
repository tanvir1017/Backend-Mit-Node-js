{
  // TODO: OOP --> Class
  class Animal {
    name: string;
    species: string;
    sound: string;

    constructor(name: string, species: string, sound: string) {
      this.name = name;
      this.species = species;
      this.sound = sound;
    }
    makeSound() {
      console.log(`The ${this.name} say's ${this.sound}`);
    }
  }

  // Making new object with declaring Class in this syntax = new ClassName()
  const cat = new Animal("Persian Bhai", "Cat", "Mew Mew");
  const dog = new Animal("The German Shepard", "Dog", "Ghew Ghew");
  console.log(dog.name);
  cat.makeSound();

  // * With parameter property you can keep your class more cleaner: See this example
  class CreateAnimal {
    constructor(
      public name: string,
      public species: string,
      public sound: string
    ) {}
    makeSound() {
      console.log(`The ${this.name} say's ${this.sound}`);
    }
  }

  const cat1 = new CreateAnimal("The German Shepard", "dog", "ghew ghew");
  cat1.makeSound();
  //
}
