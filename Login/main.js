const { createApp } = Vue;

createApp({
  data() {
    return {
      input: {
        rol: "",
        document: "",
      },
      users: [],
      message: "",
    };
  },
  methods: {
    login() {
      if (this.input.rol !== "" && this.input.document !== "") {
        const user = this.users.find(
          (user) =>
            user.rol === this.input.rol && user.document == this.input.document
        );
        if (user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              rol: user.rol,
              document: CryptoJS.SHA512(user.document),
            })
          );
          window.location.href = "../Repuestos/index.html";
        } else {
          this.message = "Rol o documento incorrecto";
        }
      } else {
        this.message = "El rol y el documento deben ser ingresados";
      }
    },
  },
  mounted() {
    this.users = JSON.parse(localStorage.getItem("users"));
    console.log(this.users);
  },
}).mount("#root");
