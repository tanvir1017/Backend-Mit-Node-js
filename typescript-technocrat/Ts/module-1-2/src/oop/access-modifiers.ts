{
  // Access modifiers
  class BankAccount {
    readonly id: number;
    public name: string;
    protected _balance: number;

    constructor(id: number, name: string, balance: number) {
      this.id = id;
      this.name = name;
      this._balance = balance;
    }

    addBalance(money: number) {
      this._balance = this._balance + money;
    }

    getBalance() {
      return this._balance;
    }
  }

  const myAcc = new BankAccount(11, "Tanvir Hossain", 1600);

  myAcc.addBalance(800);

  const myBalance = myAcc.getBalance();

  console.log(myBalance);

  // ** Use of Protected Modifiers

  class StudentAccount extends BankAccount {
    test() {
      console.log(
        `This is a student account and use for test purpose. check ${this._balance}`
      );
    }
  }

  const student: StudentAccount = new StudentAccount(121, "Abdur Rahman", 10);
  student.test();
  //
}
