{
  // TODO => Getter And Setter
  class BankAccount {
    id: string;
    name: string;
    protected _balance: number;

    constructor(id: string, name: string, balance: number) {
      this.id = id;
      this.name = name;
      this._balance = balance;
    }

    // Getter
    get accountBalance(): number {
      return this._balance;
    }

    // Setter
    set depositBalance(amount: number) {
      this._balance = this._balance + amount;
    }
  }

  const myAcc = new BankAccount("22d", "Tanvir Hossain", 40);

  myAcc.depositBalance = 60;
  const balance = myAcc.accountBalance;
  console.log(balance);

  //
}
