{
  // Conditional Type  with generic

  type IsBool = string;
  type x = IsBool extends string ? string : boolean;

  // With Generics

  type ArabSeikh = {
    bike: string;
    car: string;
    ship: string;
    plane: string;
  };

  type CheckVehicle<T> = T extends keyof ArabSeikh ? true : false;
  type HasArabPlane = CheckVehicle<"tractor">;

  //
}
