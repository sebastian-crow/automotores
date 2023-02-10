const { createApp } = Vue;

createApp({
    data() {
        return {
            Parts: [],
            Sales: [],
            PartialSale: [],
            Part: '',
            Amount: undefined,
            Message: undefined,


        }
    },
    methods: {

        /*
        función acumular las ventas de los productos.
        Hacer el descuento de unidades segun corresponda en el array Parts.
        Agregar la venta con sus respectivos campos un array parcial de ventas PartialSale.
        */
        partialSell() {

            if (this.Part != undefined && this.Part != '' && this.Amount != undefined && this.Amount != '') {

                const part = this.Parts.filter(part => part.Name == this.Part);
                const index = this.Parts.findIndex((elemento, index) => {
                    if (elemento.Name == this.Part) {
                        return true;
                    }
                });

                if (part[0].Amount >= this.Amount) {
                    let price = this.Amount * part[0].Price;
                    this.PartialSale.push({ Name: this.Part, Amount: this.Amount, Price: price, Url: part[0].Url });
                    this.Parts[index].Amount = this.Parts[index].Amount - this.Amount;

                    this.Message = 'Repuesto agregado';
                    console.log(this.Message);
                    this.Part = '';
                    this.Amount = undefined;

                } else {
                    this.Message = 'Cantidad insuficiente, tenemos: ' + part[0].Amount + ' unidades';
                    console.log(this.Message);
                }

            } else {
                this.Message = 'Todos los campos son obligatorios';
                console.log(this.Message);
            }
        },

        /* 
        funcion para efectuar la venta incluyento el IVA.
        Guardar el resultado de la venta con IVA en LocalStorage con el nombre de Sales.
        */
        sell() {

            if ((this.Part == undefined || this.Part == '' || this.Amount == undefined || this.Amount == '') && this.PartialSale.length == 0) {
                this.Message = 'Seleccione repuesto y cantidad';
                console.log(this.Message)
            } else {
                this.partialSell();

                if (!this.Amount) {
                    const sales = this.PartialSale.reduce(function (resultado, elemento) {
                        return resultado + elemento.Price;
                    }, 0);

                    let sale = sales + (sales * 0.19);

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

                    this.Message = 'Venta realizada con exito';
                    console.log(this.Message);
                    console.log(this.Parts)
                }

            }
        },

        PartsGenerator() {
            return [{
                Name: "Amortiguadores",
                Price: 40000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            }, {
                Name: "Luces",
                Price: 35000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            }, {
                Name: "Baterías",
                Price: 120000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            }, {
                Name: "Llantas",
                Price: 350000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            }, {
                Name: "Espejos",
                Price: 100000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            }, {
                Name: "Rines",
                Price: 230000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            }, {
                Name: "Neumáticos",
                Price: 60000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            }, {
                Name: "Antenas",
                Price: 15000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            }, {
                Name: "Filtros",
                Price: 20000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            }, {
                Name: "Vidrios",
                Price: 45000,
                Amount: Math.floor(Math.random() * 125) + 75,
                Url: ''
            },
            ]
        }


    },
    mounted() {
        this.Parts = this.PartsGenerator();
        console.log(this.Parts)
        this.Sales = JSON.parse(localStorage.getItem("Sales"));

    },
}).mount("#root");




