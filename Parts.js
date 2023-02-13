const { createApp } = Vue;

createApp({
    data() {
        return {
            Parts: [],
            Sales: [],
            PartialSale: [],
            Part: '',
            Cars: undefined,
            Car: -1,
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
                    Total: (Part.Price * this.Amount),
                })
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
            const Car = this.Cars[this.Car];
            let sales = JSON.parse(localStorage.getItem('sales'))
            console.log(Car);
            console.log(sales)
            sales.push({
                Car: 1513,
                Sell: this.PartialSale
            })
            console.log(sales)
            localStorage.setItem('sales',JSON.stringify(sales))
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
        localStorage.setItem('sales',JSON.stringify(this.Sales));
        this.Amount = 0;
        this.Cars = JSON.parse(localStorage.getItem('Vehicles'))

    },
}).mount("#root");