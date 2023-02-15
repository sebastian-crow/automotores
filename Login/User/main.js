const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: [],
      orderPerUser: [],
      message: "",
      User: "",
      parts: [],
      userParts: [],
      partsPerUser: [],
      partsId: [],
    };
  },
  methods: {
    ordersPerUserF() {
      const orders = this.orders.find(
        (order) => order.document === this.User.document
      );
      this.orderPerUser = orders ? [orders] : [];
    },
    findUserParts() {
      const partsId = this.orderPerUser?.map((order) => {
        return order.parts;
      })[0];

      const mypartsId = JSON.parse(JSON.stringify(partsId));

      const myparts = JSON.parse(JSON.stringify(this.parts));
      let partsArray = [];
      mypartsId.map((part) => {
        myparts.find((e) => {
          e.id == part;
          return partsArray.push(e);
        });
      });
      const subTotal = partsArray
        .map((part) => part.Price)
        .reduce((partialSum, a) => partialSum + a, 0);
      const total = Math.floor(subTotal - 5000 - (100 * 19) / subTotal);
      partsArray.push({ subTotal: subTotal }, { total });
      return partsArray;
    },
  },
  mounted() {
    this.User = JSON.parse(localStorage.getItem("user"));
    this.parts = JSON.parse(localStorage.getItem("Parts"));
    this.orders = JSON.parse(localStorage.getItem("orders"));
    this.ordersPerUserF();
    this.partsPerUser = this.findUserParts();
    console.log(this.partsPerUser);
    console.log(this.orderPerUser);
  },
}).mount("#root");
