{
  // TODO --> Generics Type

  interface Developer<T, V> {
    name: string;
    computer: {
      brand: string;
      model: string;
      price: string;
    };
    smartWatch: T;
    bike?: V;
  }

  type WatchBrand = {
    brand: string;
  };

  type RichDevWatchBrand = {
    brand: string;
    model: string;
    color: string;
  };

  type RichDevBikeDetails = {
    brand: string;
  };

  const poorDeveloper: Developer<WatchBrand, null> = {
    name: "Tanvir Hossain",
    computer: {
      brand: "HP",
      model: "840 g3",
      price: "33,000",
    },
    smartWatch: {
      brand: "Chaines",
    },
  };

  const richDeveloper: Developer<RichDevWatchBrand, RichDevBikeDetails> = {
    name: "Jhonathon Weg",
    computer: {
      brand: "apple",
      model: "m3",
      price: "133,000",
    },
    smartWatch: {
      brand: "apple watch",
      model: "2024",
      color: "Titanium",
    },
    bike: {
      brand: "Yamaha",
    },
  };

  // ! Generics with function. How to write generics types with function
  const createArray = <T>(param: T): T[] => {
    return [param];
  };

  const res = createArray<string>("String has to pass");

  const createAnotherFuncArray = <T>(param: T): T[] => {
    return [param];
  };

  interface UserObj {
    id: number;
    name: string;
    role: string;
  }
  const res1 = createAnotherFuncArray<UserObj>({
    id: 222,
    name: "Tanvir Hossain",
    role: "Developer",
  });

  // ! create array with tuple
  const createArrayWithTuple = <T, Q>(p1: T, P2: Q): [T, Q] => {
    return [p1, P2];
  };

  const res3 = createArrayWithTuple<string, boolean>("Bangladesh", true);

  const createArrayWithTuple2 = <T, Q>(p1: T, p2: Q): [T, [Q]] => {
    return [p1, [p2]];
  };

  type DevInfo = {
    moreInfo: {
      city: string;
      zilla: string;
    };
  };
  /*   interface DevInfo {
    moreInfo: {
      city: string;
      zilla: string;
    };
  } */
  const res4 = createArrayWithTuple2<string, DevInfo>("Developer Tanvir", {
    moreInfo: {
      city: "Comilla",
      zilla: "Nangolkot",
    },
  });

  interface DevInfo2 {
    name: string;
    developerType: "GOOD" | "BETTER" | "BEST";
    devCategory: "Front-End" | "Back-End" | "Full-Stack";
  }
  const res5 = createArrayWithTuple2<DevInfo2, DevInfo>(
    {
      name: "Tanvir Hossain",
      devCategory: "Full-Stack",
      developerType: "BETTER",
    },
    {
      moreInfo: {
        city: "Comilla",
        zilla: "Nangolkot",
      },
    }
  );

  console.log(res4[1][0]?.moreInfo?.city);
  console.log({ ...res5[0], ...res5[1][0] });
  //
}
