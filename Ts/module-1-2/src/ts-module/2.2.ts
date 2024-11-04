{
  // Interface

  /**
   * Interface
   * How to use interface in typescript
   * How to extend type with interface
   *  How to intersect types by interface
   */

  // Extend interface with type aliases
  type UserInfo = {
    name: string;
    age: string;
  };

  interface UserInfos {
    name: string;
    age: string;
  }

  interface UserDetails extends UserInfos {
    role: string;
  }

  const user: UserDetails = {
    name: "Tanvir Hossain",
    age: "21 years",
    role: "Developer",
  };

  // ? How to define interface with array
  // ? Interface is an object so it can't be declare for primitive Data types
  // ! In js object --> [array --> Function --> Object]
  // TODO --> How to declare a interface types for an array ?
  // ! it's simply done by declaring index and value's type for array. In array we've index number for each value. Let's see an example
  interface ListItem {
    [index: number]: number;
  }
  const listItem: ListItem = [1, 2, 3];
  // ? 0, 1, 2 --> Index Number

  // ? How to declare interface types for Function

  //
}
