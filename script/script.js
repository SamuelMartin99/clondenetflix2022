/**
 * @sugerencia
 * podrías crear una función para el carousel y así poder reutilizar en cada nueva categoria (recomendado, mi lista, series, etc)
 */
function carousel(contenedor) {
    const fila = contenedor.querySelector('.contenedor-carousel');
    const peliculas = contenedor.querySelectorAll('.pelicula');
    //const indicadores = document.querySelector('.indicadores');

    /**
     * @obs podrés crear esta función "slide" para las flechas y así reducir un poco la repetición de código
     */
    function slide(direccion) {
        const indicadorActivo = contenedor.querySelector('.indicadores .active');
        if (direccion == 'derecha' && indicadorActivo.nextSibling){
            fila.scrollLeft += fila.offsetWidth;
            indicadorActivo.nextSibling.classList.add('active');
            indicadorActivo.classList.remove('active');
        } else
        if (direccion == 'izquierda' && indicadorActivo.previousSibling){
            fila.scrollLeft -= fila.offsetWidth;
            indicadorActivo.previousSibling.classList.add('active');
            indicadorActivo.classList.remove('active');
        }
    }

    const flechaIzquierda = contenedor.querySelector('.flecha-izquierda');
    const flechaDerecha = contenedor.querySelector('.flecha-derecha');

    // ---- Event listenner para flecha derecha ----
    flechaDerecha.addEventListener('click', () => {
        slide('derecha');
    });

    // ---- Event listenner para flecha izquierda ----
    flechaIzquierda.addEventListener('click', () => {
        slide('izquierda');
    });


    //---- paginacion ----
    const numeroPaginas = Math.ceil(peliculas.length / 5);

    for(let i = 0; i < numeroPaginas; i++){
        const indicador = document.createElement('button');
        if(i === 0) {
            indicador.classList.add('active');
        }

        // en esta parte intenté que los indicadores cuando se seleccionen se queden fijos con el color del hover, pero no funciona.
        /**
         * @respuesta el problema que tenías es que utilizaste la clase "active" en tu js pero en tu css la clase se llamaba "active" con una "e"
         */
        contenedor.querySelector('.indicadores').appendChild(indicador);
        indicador.addEventListener('click', (e) => {
            fila.scrollLeft = i * fila.offsetWidth;

            contenedor.querySelector('.indicadores .active').classList.remove('active');
            e.target.classList.add('active');
        });
    }

    // ---- Hover ----
    peliculas.forEach((pelicula) => {
        pelicula.addEventListener('mouseover', (e) => {
            const elemento = e.currentTarget;
            setTimeout(() => {
                peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
                elemento.classList.add('hover');
            }, 300);
        });
    });

    fila.addEventListener('mouseleave', ()=> {
        peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
    });

}


const contenedores = document.querySelectorAll('.bloque-carousel');
for (let i = 0; i < contenedores.length; i++) {
    carousel(contenedores[i]);
}
