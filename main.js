const { createApp } = Vue;

createApp({
    data() {
        return {
            Parts: [],
            Sales: [],
            PartialSale: [],
            Part: undefined,
            Amount: undefined,
            Message: undefined

        }
    },
    methods: {

        /*
        función acumular las ventas de los productos.
        */
        partialSell() {

            if (this.Part != undefined || this.Part != '' || this.Amount != undefined || this.Amount != '') {

                const part = this.Parts.filter(part => part.Name == this.Part);
                const index = this.Parts.findIndex((elemento, index) => {
                    if (elemento.Name == this.Part) {
                        return true;
                    }
                });
                console.log(index);
                console.log(part[0].Amount);

                if (part[0].Amount > this.Amount) {
                    let price = this.Amount * part[0].Price;
                    this.PartialSale.push({ Name: this.Part, Amount: this.Amount, Price: price });

                    this.Parts[index].Amount = this.Parts[index].Amount - this.Amount;

                    console.log(this.PartialSale)
                    console.log(this.Parts)
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
        funcion para efectuar la venta incluyento el IVA y guardando el resultado en LocalStorage
        */
        sell() {

            const sales = this.PartialSale.reduce(function (resultado, elemento) {
                return resultado + elemento.Price;
            }, 0);

            let sale = sales + (sales * 0.19);

            this.PartialSale.push({ Sale: sale });

            console.log(this.PartialSale);

            localStorage.setItem("sales", JSON.stringify(this.PartialSale));

            this.PartialSell = [];

            console.log(sales + '-' + sale)

        },
        PartsGenerator() {
            let amount = Math.floor(Math.random() * 125) + 75;
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
        
    },
}).mount("#root");


