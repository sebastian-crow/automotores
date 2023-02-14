const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: [],
      orderPerUser: [],
      message: "",
      User: "",
    };
  },
  methods: {
    ordersPerUserF() {
      const orders = this.orders.find(
        (order) => order.document === this.User.document
      );
      this.orderPerUser = orders ? [orders] : [];
    },
  },
  mounted() {
    this.User = JSON.parse(localStorage.getItem("user"));
    this.orders = JSON.parse(localStorage.getItem("orders"));
    this.ordersPerUserF();
    console.log(this.orderPerUser);
  },
}).mount("#root");
