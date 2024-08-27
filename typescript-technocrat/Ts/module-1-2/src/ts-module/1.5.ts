{
  // Reference Type

  const user: {
    firstName: string;
    middleName?: string;
    lastName: string;
    isMarried: boolean;
    readonly company: "Google Inc"; // Literal Type
  } = {
    firstName: "John Doe",
    lastName: "Smith",
    isMarried: false,
    company: "Google Inc",
  };

  const friendsArr: string[] = ["chandler", "joey", "ross", "rachel", "monica"];
  const [a, b, c] = friendsArr;
  console.log(a); //! This is how call destructuring data from array
}
