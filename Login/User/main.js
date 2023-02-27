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
    ordersPerUser() {
      const orders = this.orders?.map((order) => {
        if (order.user.document === this.User.document) {
          order.descuento = 25;
          order.iva = 19;
          order.subtotal = order.parts
            .map((p) => {
              return p.total;
            })
            .reduce((partialSum, a) => partialSum + a, 0);
          order.total =
            order.subtotal + Math.floor((order.subtotal / 100) * 19);
          order.total =
            order.total - Math.floor((order.total / 100) * order.descuento);
          return order;
        }
      });
      this.orderPerUser = orders;
      console.log(this.orderPerUser);
    },
    /*  ordersPerUserF() {
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
    }, */
  },
  beforeMount() {
    this.User = JSON.parse(localStorage.getItem("user"));
    this.parts = JSON.parse(localStorage.getItem("Parts"));
    this.orders = JSON.parse(localStorage.getItem("orders"));
  },
  mounted() {
    /* this.ordersPerUserF(); */
    this.ordersPerUser();
    if (!this.User) location.href = "../../index.html";
  },
  created() {},
}).mount("#user");
