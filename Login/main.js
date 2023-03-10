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
              document: user.document,
              name: `${user.name} ${user.lastname}`,
            })
          );
          location.href = "./User/index.html";
        } else {
          this.message = "Rol o documento incorrecto";
        }
      } else {
        this.message = "El rol y el documento deben ser ingresados";
      }
    },
  },
  beforeMount() {
    this.users = JSON.parse(localStorage.getItem("users"));
  },
  mounted() {},
}).mount("#root");
