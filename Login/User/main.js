const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: [],
      message: "",
    };
  },
  methods: {},
  mounted() {
    this.orders = JSON.parse(localStorage.getItem("orders"));
  },
}).mount("#root");
