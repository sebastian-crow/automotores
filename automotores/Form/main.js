const { createApp } = Vue;

createApp({
  data() {
    return {
      input: {
        name: "",
        lastname: "",
        documentType: "",
        document: "",
        phoneNumber: "",
        address: "",
        dateOfEntry: "",
        deliveryDate: "",
        vehicleType: "",
        vehicleTypeDetail: "",
        licensePlates: "",
        details: "",
        parts: [],
      },
      parts: [],
      message: "",
      success: "",
      orders: [],
      localParts: [],
      User: [],
      counter: 0,
      orderParts: [],
      checkedParts: [],
      mechanics: [],
    };
  },
  methods: {
    enter() {
      if (
        this.input.name !== "" &&
        this.input.lastname !== "" &&
        this.input.documentType !== "" &&
        this.input.document !== "" &&
        this.input.phoneNumber !== "" &&
        this.input.address !== "" &&
        this.input.deliveryDate !== "" &&
        (this.input.vehicleType !== "" || this.input.vehicleTypeDetail) &&
        this.input.licensePlates !== "" &&
        this.input.details !== "" &&
        this.input.phoneNumber !== ""
      ) {
        const newOrder = {
          name: this.input.name,
          lastname: this.input.lastname,
          documentType: this.input.documentType,
          document: this.input.document,
          phoneNumber: this.input.phoneNumber,
          address: this.input.address,
          dateOfEntry: new Date(),
          deliveryDate: this.input.deliveryDate,
          vehicleType: this.input.vehicleType,
          vehicleTypeDetail: this.input.vehicleTypeDetail,
          licensePlates: this.input.licensePlates,
          details: this.input.details,
          parts: this.checkedParts,
          orderNumber: `#${Date.now()}`,
          mechanic:
            this.mechanics[Math.floor(Math.random() * this.mechanics.length)],
          user: this.User,
        };
        if (this.orders?.length > 0) {
          localStorage.setItem(
            "orders",
            JSON.stringify([...this.orders, newOrder])
          );
          this.success = "Su orden ha sido recibida correctamente";
          setTimeout(() => {
            location.href = "../../Login/User/index.html";
          }, 1500);
          return;
        }

        localStorage.setItem("orders", JSON.stringify([newOrder]));
        this.success = "Su orden ha sido recibida correctamente";
        setTimeout(() => {
          location.href = "../../Login/User/index.html";
        }, 1500);
      } else {
        this.message = "Debes llenar todos los campos obligatorios";
      }
    },

    increase(id) {
      this.checkedParts.filter((part) => {
        if (part.id === id) {
          part.cant++;
          part.total += part.Price;
          return part;
        }
      });
    },
    decrease(id) {
      this.checkedParts.map((c) => {
        if (c.id === id) {
          if (c.cant === 1) {
            c.cant = 1;
            c.total = c.Price;
            return c;
          } else {
            c.cant--;
            c.total = c.total - c.Price;
            return c;
          }
        }
      });
    },
    calcCost() {
      const summary = this.checkedParts.map((part) => part.total);
      this.subtotal = summary.reduce((partialSum, a) => partialSum + a, 0);
    },
    logout() {
      localStorage.removeItem("user");
    },
  },
  beforeMount() {
    this.User = JSON.parse(localStorage.getItem("user"));
    this.parts = JSON.parse(localStorage.getItem("Parts"));
    this.orders = JSON.parse(localStorage.getItem("orders"));
    this.mechanics = JSON.parse(localStorage.getItem("mechanics"));
  },

  mounted() {},
  beforeUpdate() {
    this.calcCost();
  },
  updated() {},
}).mount("#form");
