const { createApp } = Vue;

createApp({
  data() {
    return {
      input: {
        rol: "",
        document: "",
        name: "",
        lastname: "",
        address: "",
        phoneNumber: "",
      },
      users: [],
    };
  },
  methods: {
    register() {
      const user = this.users.find(
        (user) =>
          user.rol === this.input.rol && user.document == this.input.document
      );
      if (
        this.input.rol === user.rol &&
        this.input.document === user.document
      ) {
        alert("El usuario ya se encuentra registrado");
      }
      const newUser = {
        rol: this.input.rol,
        document: CryptoJS.SHA512(this.input.document),
        name: this.input.name,
        lastname: this.input.lastname,
        address: this.input.address,
        phoneNumber: this.input.phoneNumber,
      };
      const users = [...this.users, newUser];
      localStorage.setItem("users", JSON.stringify(users));
    },
  },
  mounted() {
    this.users = JSON.parse(localStorage.getItem("users"));
  },
}).mount("#root");
