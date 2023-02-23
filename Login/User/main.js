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
      const orders = this.orders?.map((order) => {
        if (order.user?.document === this.User.document) {
          let localParts = [];
          order.parts.map((o) => {
            for (let p = 0; p < this.parts.length; p++) {
              if (this.parts[p].id === parseInt(o)) {
                localParts.push(this.parts[p]);
                console.log(this.parts[p]);
              }
            }
          });
          order.parts = localParts;
          return order;
        }
      });

      this.orderPerUser = orders ? [orders] : [];
    },
  },
  beforeMount() {
    this.User = JSON.parse(localStorage.getItem("user"));
    this.parts = JSON.parse(localStorage.getItem("Parts"));
    this.orders = JSON.parse(localStorage.getItem("orders"));
  },
  mounted() {
    this.ordersPerUserF();
    console.log(this.orderPerUser[0]);
  },
}).mount("#user");

/* const subTotal = partsArray
.map((part) => part.Price)
.reduce((partialSum, a) => partialSum + a, 0);
const total = Math.floor(subTotal - 5000 - (100 * 19) / subTotal);
partsArray.push({ subTotal: subTotal }, { total });
return partsArray; */
