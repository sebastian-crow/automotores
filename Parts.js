function PartsGenerator(){
    let amount = Math.floor(Math.random() * 125) + 75;
    return [{
                Name: "Amortiguadores",
                Price:40000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },{
                Name: "Luces",
                Price:35000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },{
                Name: "Baterías",
                Price:120000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },{
                Name: "Llantas",
                Price:350000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },{
                Name: "Espejos",
                Price:100000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },{
                Name: "Rines",
                Price:230000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },{
                Name: "Neumáticos",
                Price:60000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },{
                Name: "Antenas",
                Price:15000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },{
                Name: "Filtros",
                Price:20000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },{
                Name: "Vidrios",
                Price:45000,
                Amount: Math.floor(Math.random() * 125) + 75,
            },
    ]
}
var app = new Vue({
    el: "#app",
    data: {
        Parts:[]
    },
    methods:{

    },

})