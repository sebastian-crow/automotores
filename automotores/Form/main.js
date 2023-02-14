const { createApp } = Vue;

createApp({
  data() {
    return {
      input: {
        name: "",
        lastname: "",
        documentType: "",
        document: "",
        address: "",
        dateOfEntry: "",
        deliveryDate: "",
        vehicleType: "",
        vehicleTypeDetail: "",
        licensePlates: "",
        details: "",
        parts: "",
      },
      parts: [],
      message: "",
      success: "",
      orders: [],
    };
  },
  methods: {
    enter() {
      if (
        this.input.name !== "" &&
        this.input.lastname !== "" &&
        this.input.documentType !== "" &&
        this.input.document !== "" &&
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
          address: this.input.address,
          dateOfEntry: new Date(),
          deliveryDate: this.input.deliveryDate,
          vehicleType: this.input.vehicleType,
          vehicleTypeDetail: this.input.vehicleTypeDetail,
          licensePlates: this.input.licensePlates,
          details: this.input.details,
          parts: this.input.parts,
          orderNumber: `#${Date.now()}`,
          mechanic: "",
        };
        if (this.orders?.length > 0) {
          localStorage.setItem(
            "orders",
            JSON.stringify([...this.orders, newOrder])
          );
          this.success = "Su orden ha sido recibida correctamente";
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          return;
        }

        localStorage.setItem("orders", JSON.stringify([newOrder]));
        this.success = "Su orden ha sido recibida correctamente";
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.message = "Debes llenar todos los campos obligatorios";
      }
    },

    populateParts() {
      var select = document.getElementById("partsSelect");
      for (var i = 0; i <= this.parts?.length; i++)
        select.options.add(
          new Option(this.parts[i]?.Name, this.parts[i]?.Price)
        );
    },
  },
  mounted() {
    this.parts = JSON.parse(localStorage.getItem("Parts"));
    this.orders = JSON.parse(localStorage.getItem("orders"));
    this.populateParts();
    console.log();
  },
}).mount("#root");
