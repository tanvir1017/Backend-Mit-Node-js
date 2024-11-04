{
  // Abstraction specific
  interface VehicleProperties {
    startEngine(): void;
    stopEngine(): void;
    move(): void;
  }

  //So if class need have any typescript property then it should need to use implements as like extends in other cases
  class Car implements VehicleProperties {
    startEngine(): void {
      console.log("Starting the engine");
    }

    stopEngine(): void {
      console.log("Stopping the engine");
    }

    move(): void {
      console.log("Moving the car");
    }
  }

  //
}
