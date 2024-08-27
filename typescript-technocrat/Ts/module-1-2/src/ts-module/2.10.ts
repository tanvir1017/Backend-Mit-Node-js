{
  // Mapped Type
  type AreaNumber = {
    height: number;
    width: number;
  };

  type AreaString = {
    height: string;
    width: string;
    dipper: string;
  };

  // OR

  type AreaStringWithMap = {
    [key in keyof AreaString]: string;
  };

  // With Generics
  type Area = {
    height: string;
    width: number;
  };

  type FindArea<T> = {
    [key in keyof T]: T[key]; // Area['height] --> lookup type // It's more like finding a key from a object obj["key"]
  };

  const findArea: FindArea<Area> = {
    height: "100",
    width: 200,
  };

  //
}
