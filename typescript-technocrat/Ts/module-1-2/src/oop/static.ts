{
  // TODO => Static OOP || A Premium Concept from OOP

  class Counter {
    count: number = 0;

    increment(): number {
      return (this.count += 1);
    }

    decrement(): number {
      return (this.count -= 1);
    }
  }

  const counter1 = new Counter();
  const counter2 = new Counter();
  //   console.log(counter1.increment()); // Storing data in different place of memory
  //   console.log(counter2.increment()); // Storing data in different place of memory

  // For storing same variable in the same memory portion we've to use Static Method in class, like below:

  class StaticCounter {
    static count: number = 0;

    increment(): number {
      return (StaticCounter.count += 1);
    }

    decrement(): number {
      return (StaticCounter.count -= 1);
    }
  }

  const staticCounter = new StaticCounter();
  const staticCounter2 = new StaticCounter();
  console.log(staticCounter.increment());
  console.log(staticCounter.increment());
  console.log(staticCounter2.increment());
  console.log(staticCounter2.increment());
  console.log(staticCounter2.increment());

  //
}
