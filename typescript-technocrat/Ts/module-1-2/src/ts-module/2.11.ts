{
  // TODO ->  Utility type list
  // * Pick ==> Pick<TypeAliases, "key" | "key"> [Opposite of Omit]
  // ** Omit ==> Omit<TypeAliases, "key" | "key"> [Opposite of Pick]
  // *** Required ==> Required<TypeAliases> [Opposite of Partial]
  // **** Partial ==> Partial<TypeAliases> [Opposite of Required]
  // *****
  // ******

  type UserInfo = {
    id: number;
    name: string;
    email?: string;
    contact: string;
    isMarried: boolean;
  };

  // ! Use Of  ==> Pick Utility
  type UserOnly = Pick<UserInfo, "name" | "isMarried">;

  // ! Use Of  ==> Omit Utility
  type ContactOnly = Omit<UserInfo, "id" | "name" | "isMarried">;

  // ! Use Of  ==> Required
  type RequiredUserInfo = Required<UserInfo>;

  // ! Use Of  ==> Partial
  type PartialUserInfo = Partial<UserInfo>;

  //
}
