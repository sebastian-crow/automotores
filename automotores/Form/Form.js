const { createApp } = Vue;

createApp({
    data() {
        return {
            Nid: undefined,
            Name: undefined,
            Employee: undefined,
            Date: undefined,
            Information: undefined,
            Message: undefined,
        }
    },
    methods: {
        Join() {
            let actually = JSON.parse(localStorage.getItem('Vehicles'));
            this.Date = new Date();
            actually.push({
                Nid: this.Nid,
                Name: this.Name,
                Employee: this.Employee,
                Date: this.Date,
                Information: this.Information,
            })
            localStorage.setItem('Vehicles',JSON.stringify(actually))
        },

        /* 
        funcion para efectuar la venta incluyento el IVA y guardando el resultado en LocalStorage
        */

        mounted() {
        },
    }
}).mount("#root");




