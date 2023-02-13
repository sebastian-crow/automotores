const { createApp } = Vue;

createApp({
  data() {
    return {
      Parts: [],
      Sales: [],
      PartialSale: [],
      Part: "",
      Amount: undefined,
      Message: undefined,
      User: "",
    };
  },
  methods: {
    /*
        función acumular las ventas de los productos.
        */
    partialSell() {
      if (
        this.Part != undefined &&
        this.Part != "" &&
        this.Amount != undefined &&
        this.Amount != ""
      ) {
        const part = this.Parts.filter((part) => part.Name == this.Part);
        const index = this.Parts.findIndex((elemento, index) => {
          if (elemento.Name == this.Part) {
            return true;
          }
        });

        if (part[0].Amount >= this.Amount) {
          let price = this.Amount * part[0].Price;
          this.PartialSale.push({
            Name: this.Part,
            Amount: this.Amount,
            Price: price,
          });
          this.Parts[index].Amount = this.Parts[index].Amount - this.Amount;

          this.Message = "Repuesto agregado";
          console.log(this.Message);
          this.Part = undefined;
          this.Amount = undefined;
        } else {
          this.Message =
            "Cantidad insuficiente, tenemos: " + part[0].Amount + " unidades";
          console.log(this.Message);
        }
      } else {
        this.Message = "Todos los campos son obligatorios";
        console.log(this.Message);
      }
    },

    /* 
        funcion para efectuar la venta incluyento el IVA y guardando el resultado en LocalStorage
        */
    sell() {
      if (
        (this.Part == undefined ||
          this.Part == "" ||
          this.Amount == undefined ||
          this.Amount == "") &&
        this.PartialSale.length == 0
      ) {
        this.Message = "Seleccione repuesto y cantidad";
        console.log(this.Message);
      } else {
        this.partialSell();

        if (!this.Amount) {
          const sales = this.PartialSale.reduce(function (resultado, elemento) {
            return resultado + elemento.Price;
          }, 0);

          let sale = sales + sales * 0.19;

          this.PartialSale.push({ Sale: sale });

          // const Sales = this.Sales?.length > 0 ? [...this.Sales, this.PartialSale] : [this.PartialSale];
          // localStorage.setItem("Sales", JSON.stringify(Sales));
          // location.reload();

          if (this.Sales?.length > 0) {
            this.Sales.push(this.PartialSale);
          } else {
            this.Sales = [{ n: 1 }];
            this.Sales.push(this.PartialSale);
          }
          localStorage.setItem("Sales", JSON.stringify(this.Sales));

          this.PartialSale = [];

          this.Message = "Venta realizada con exito";
          console.log(this.Message);
          console.log(this.Parts);
        }
      }
    },

    PartsGenerator() {
      return [
        {
          Name: "Amortiguadores",
          Price: 40000,
          Amount: Math.floor(Math.random() * 125) + 75,
          url: "https://t1.uc.ltmcdn.com/es/posts/4/9/2/amortiguadores_hidraulicos_para_coches_49294_0_600.jpg",
          description:
            "El amortiguador es uno de los elementos que conforman la suspensión de un vehículo. Su función es la de limitar el movimiento de la suspensión, evitando el rebote constante de los muelles",
        },
        {
          Name: "Luces",
          Price: 35000,
          Amount: Math.floor(Math.random() * 125) + 75,
          url: "https://resizer.glanacion.com/resizer/3-w5R9gV90Vq8XlP7lZIdVSMC7Q=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/COHU2PETZVFQ7PYLTSGYPGMN5M.jpg",
          description:
            "Las luces situadas en la parte delantera, lateral y trasera de un automóvil son unos elementos de seguridad básicos que tienen como finalidad proveer de iluminación al conductor",
        },
        {
          Name: "Baterías",
          Price: 120000,
          Amount: Math.floor(Math.random() * 125) + 75,
          url: "https://i0.wp.com/blog.soyrappi.com/wp-content/uploads/2020/02/Bater%C3%ADa-de-carro.jpg?fit=1674%2C1121&ssl=1",
          description:
            " Las baterías para carro se encargan de acumular y suministrar la corriente eléctrica del vehículo, para que este pueda funcionar con normalidad. Baterias recargables",
        },
        {
          Name: "Llantas",
          Price: 350000,
          Amount: 0,
          /* Amount: Math.floor(Math.random() * 125) + 75, */
          url: "https://www.carroya.com/noticias/sites/default/files/entradillas/506024311carroya-llantasparacarros.jpg",
          description:
            "Es una pieza generalmente circular y metálica, aunque su forma varía en relación al tipo y tamaño del vehículo. Se sitúa en el centro de la rueda, sobre la que se coloca un neumatico.  ",
        },
        {
          Name: "Espejos",
          Price: 100000,
          Amount: Math.floor(Math.random() * 125) + 75,
          url: "https://www.comparaonline.cl/blog-statics/cl/uploads/2015/06/Espejo_retrovisor_del_carro_jf8clj.jpg",
          description:
            "Los espejos retrovisores son dispositivos que permiten visualizar los vehículos, objetos y personas que están detrás del coche, para evitar el peligro que significa mirar hacia atrás o hacia los lados girando la cabeza o el cuerpo.",
        },
        {
          Name: "Rines",
          Price: 230000,
          Amount: Math.floor(Math.random() * 125) + 75,
          url: "https://i.pinimg.com/736x/36/52/83/36528361aa5324fd5c612cfed5f05ef0.jpg",
          description:
            "Los rines vienen en diferentes materiales como aluminio, acero, magnesio y de aleación. A grandes rasgos sus características principales por material son: Aluminio: El más común, ligero, bastante resistente y accesible en costo",
        },
        {
          Name: "Neumáticos",
          Price: 60000,
          Amount: Math.floor(Math.random() * 125) + 75,
          url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-finger-checking-tire-royalty-free-image-1634225316.jpg?crop=0.669xw:1.00xh;0.189xw,0&resize=640:*",
          description:
            "Un neumático es una pieza de caucho con forma toroidal que forma parte de las ruedas de un automóvil y suelen ir protegidos por llantas de metal. Puede que los neumáticos reciban otros nombres como cubierta, goma o caucho.",
        },
        {
          Name: "Antenas",
          Price: 15000,
          Amount: Math.floor(Math.random() * 125) + 75,
          url: "https://http2.mlstatic.com/D_NQ_NP_783383-MLM47475550205_092021-O.jpg",
          description:
            "La antena del coche es un dispositivo que tiene como función captar las ondas electromagnéticas del espacio. Así pues, es el medio de comunicación entre el exterior y el interior del vehículo. Radio AM, FM y DAB.  ",
        },
        {
          Name: "Filtros",
          Price: 20000,
          Amount: Math.floor(Math.random() * 125) + 75,
          url: "https://noticias.coches.com/wp-content/uploads/2015/01/filtro-aire-1-700x466.jpg",
          description:
            "Es una parte esencial del motor.La función primordial de los filtros es neutralizar los contaminantes y eliminar malos olores y sabores del agua. Disminuyendo la contaminación",
        },
        {
          Name: "Vidrios",
          Price: 45000,
          Amount: Math.floor(Math.random() * 125) + 75,
          url: "https://norisk.mx/wp-content/uploads/2020/07/REEMPLAZO-PARABRISAS-1024x684.jpg",
          description:
            "Los cristales son parte fundamental en un automóvil, hacen parte de la seguridad activa y pasiva, a demás de permitir la visibilidad del conductor del camino y todo el entorno.",
        },
      ];
    },

    logout() {
      localStorage.removeItem("user");
      window.location.href = "../Repuestos/index.html";
    },
  },
  mounted() {
    this.User = JSON.parse(localStorage.getItem("user"));
    this.Parts = this.PartsGenerator();
    this.Sales = JSON.parse(localStorage.getItem("sales"));
    this.Amount = 0;
    console.log("parts", this.Parts);
  },
}).mount("#root");
