const { createApp } = Vue
createApp({
    data() {
        return {
            escuderias: [],
            //url: 'http://localhost:5000/escuderias',
            //url:'http://hmollis.pythonanywhere.com/escuderias',
            url:'https://hmollis.pythonanywhere.com/escuderias',
            error: false,
            cargando: true,
            /*atributos para guardar los valores del formulario */
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
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.escuderias = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(escuderia) {
            const url = this.url + '/' + escuderia;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        crear() {
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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    //window.location.href = "./productos.html";  
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
