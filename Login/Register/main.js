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
      message: "",
      success: "",
    };
  },
  methods: {
    register() {
      if (
        this.input.rol !== "" &&
        this.input.document !== "" &&
        this.input.name !== "" &&
        this.input.lastname !== "" &&
        this.input.address !== "" &&
        this.input.phoneNumber !== ""
      ) {
        const newUser = {
          rol: this.input.rol,
          document: this.input.document,
          name: this.input.name,
          lastname: this.input.lastname,
          address: this.input.address,
          phoneNumber: this.input.phoneNumber,
        };

        if (this.users?.length > 0) {
          const user = this.users.find(
            (user) =>
              user.document === this.input.document &&
              user.rol === this.input.rol
          );
          if (user) {
            this.message = "El usuario ya se encuentra registrado";
            return;
          }

          localStorage.setItem(
            "users",
            JSON.stringify([...this.users, newUser])
          );
          this.success = "Usuario nuevo agregado con exito";
          localStorage.setItem(
            "user",
            JSON.stringify({
              rol: newUser.rol,
              document: newUser.document,
              name: `${newUser.name} ${newUser.lastname}`,
            })
          );
          location.href = "../User/index.html";
          return;
        }
        localStorage.setItem("users", JSON.stringify([newUser]));
        this.success = "Usuario nuevo agregado con exito";
        localStorage.setItem(
          "user",
          JSON.stringify({
            rol: newUser.rol,
            document: newUser.document,
            name: `${newUser.name} ${newUser.lastname}`,
          })
        );
        location.href = "../User/index.html";
      } else {
        this.message = "Debes llenar todos los campos";
      }
    },
  },
  beforeMount() {},
  mounted() {
    this.users = JSON.parse(localStorage.getItem("users"));
  },
}).mount("#root");
