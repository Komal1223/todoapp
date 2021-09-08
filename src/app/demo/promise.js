const Demo = () => {
  const john = {
    name: 'john',
    balance: 1500,
    deduct(amount) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          this.balance = this.balance - amount;
          res(`${this.name} has a balance of ${this.balance}`);
        }, 2000);
      });
    },
  };

  john.deduct(200).then(msg => console.log(msg));
};

export default Demo;
