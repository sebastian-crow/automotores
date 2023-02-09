const { createApp } = Vue;

createApp({
    data() {
        return {
            helloWorld: "Hello world",
            parts: [
                { name: 'Llanta', amount: 200, price: 250 },
                { name: 'Aceite', amount: 120, price: 20 },
                { name: 'Bateria', amount: 100, price: 500 },
                { name: 'Espejo', amount: 300, price: 50 }
            ],
            sales: [],
            partialSale: [],
            part: undefined,
            amount: undefined,
            message: undefined

        }
    },
    methods: {

        /*
        función para cambiar el estado de los repuestos: vendido o en inventario.
        */
        sell() {

            if (this.part != undefined || this.part != '' || this.amount != undefined || this.amount != '') {

                const part = this.parts.filter(part => part.name == this.part);
                console.log(part[0].amount);

                if (part[0].amount> this.amount) { 
                    let price = this.amount * part[0].price;
                    this.partialSale.push({name: this.part, amount: this.amount, price: price});

                    

                    console.log(this.partialSale)
                } else {
                    this.message = 'Cantidad insuficiente, tenemos: ' + part[0].amount + ' unidades';
                    console.log(this.message);
                }

            } else {
                this.message = 'Todos los campos son obligatorios';
                console.log(this.message);
            }


        }


    },
    mounted() {
        this.carParts = JSON.parse(localStorage.getItem("carParts"));
    },
}).mount("#root");
