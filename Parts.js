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
        */
        partialSell() {
            const Part = this.Parts[this.Part];
            console.log(Part)
                if (Part.Amount >= this.Amount) {
                    console.log(Part.Amount)
                    this.PartialSale.push({ 
                        Name: Part.Name, 
                        Amount: this.Amount, 
                        Price: Part.Price,
                    Total: (Part.Price*this.Amount),})
                    console.log(this.Amount)
                    this.Parts[this.Part].Amount -= this.Amount;
                    this.Part = '';
                    this.Amount = undefined;

                } else {
                    this.Message = 'Cantidad insuficiente, tenemos: ' + Part.Amount + ' unidades';
                    console.log(this.Message);
                }
        },

        /* 
        funcion para efectuar la venta incluyento el IVA y guardando el resultado en LocalStorage
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
            }, {
                Name: "Luces",
                Price: 35000,
                Amount: Math.floor(Math.random() * 125) + 75,
            }, {
                Name: "Baterías",
                Price: 120000,
                Amount: Math.floor(Math.random() * 125) + 75,
            }, {
                Name: "Llantas",
                Price: 350000,
                Amount: Math.floor(Math.random() * 125) + 75,
            }, {
                Name: "Espejos",
                Price: 100000,
                Amount: Math.floor(Math.random() * 125) + 75,
            }, {
                Name: "Rines",
                Price: 230000,
                Amount: Math.floor(Math.random() * 125) + 75,
            }, {
                Name: "Neumáticos",
                Price: 60000,
                Amount: Math.floor(Math.random() * 125) + 75,
            }, {
                Name: "Antenas",
                Price: 15000,
                Amount: Math.floor(Math.random() * 125) + 75,
            }, {
                Name: "Filtros",
                Price: 20000,
                Amount: Math.floor(Math.random() * 125) + 75,
            }, {
                Name: "Vidrios",
                Price: 45000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },
            ]
        }


    },
    mounted() {
        this.Parts = this.PartsGenerator();
        this.Sales = JSON.parse(localStorage.getItem("sales"));
        this.Amount = 0;

    },
}).mount("#root");




