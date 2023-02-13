const { createApp } = Vue;

createApp({
  data() {
    return {
      input: {
        rol: "",
        document: "",
      },
      users: [],
    };
  },
  methods: {
    login() {
      if (this.input.rol != "" && this.input.document != "") {
        const user = this.users.find(
          (user) =>
            user.rol === this.input.rol && user.document == this.input.document
        );
        if (
          this.input.rol === user.rol &&
          this.input.document == user.document
        ) {
          const userToStore = {
            rol: user.rol,
            document: CryptoJS.SHA512(user.document),
          };
          localStorage.setItem("user", JSON.stringify(userToStore));
        } else {
          console.log("Rol o documento incorrecto");
        }
      } else {
        console.log("El rol y el documento deben ser ingresadosF");
      }
    },
  },
  mounted() {
    this.users = JSON.parse(localStorage.getItem("users"));
  },
}).mount("#root");
