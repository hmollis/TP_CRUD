console.log(location.search)     // lee los argumentos pasados a este formulario
var id = location.search.substr(4)
console.log("location.search: ", location.search)
console.log("id: ", id)
const { createApp } = Vue
createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            base: "",
            presidente: "",
            director: "",
            dir_tecnico: "",
            primera_participacion: 0,
            chasis: "",
            motor: "",
            neumaticos: "",
            mejor_vuelta: 0,
            pole_positions: 0,
            mundiales: 0,
            logo: "",
            //url: 'http://localhost:5000/escuderias/' + id,
            //url:'http://hmollis.pythonanywhere.com/escuderias/' + id,
            url:'https://hmollis.pythonanywhere.com/escuderias/' + id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.nombre = data.nombre
                    this.base = data.base
                    this.presidente = data.presidente
                    this.director = data.director
                    this.dir_tecnico = data.dir_tecnico
                    this.primera_participacion = data.primera_participacion
                    this.chasis = data.chasis
                    this.motor = data.motor
                    this.neumaticos = data.neumaticos
                    this.mejor_vuelta = data.mejor_vuelta
                    this.pole_positions = data.pole_positions
                    this.mundiales = data.mundiales
                    this.logo = data.logo
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        editar() {
            let escuderia = {
                nombre: this.nombre,
                base: this.base,
                presidente: this.presidente,
                director: this.director,
                dir_tecnico: this.dir_tecnico,
                primera_participacion: this.primera_participacion,
                chasis: this.chasis,
                motor: this.motor,
                neumaticos: this.neumaticos,
                mejor_vuelta: this.mejor_vuelta,
                pole_positions: this.pole_positions,
                mundiales: this.mundiales,
                logo: this.logo
            }
            var options = {
                body: JSON.stringify(escuderia),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
