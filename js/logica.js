(()=>{
    
    // variables
    let letras,
    tecla,
    munieco,
    splitPalabra = [],
    arrayGanaste = [],
    palabra = "",
    copiaPalabra = "",
    vidas = 0,
    ganaste = false;
    
    
    
    
    const letrasTeclado = e => {
    
        const regex = /^[a-z]$/; /* para validar solo minusculas al presionar teclas */
    
        let evento = e || window.event; /* evento en navegaador viejo y nuevo */
    
        tecla = String.fromCharCode(evento.charCode); /* muestra evento letras  de teclado*/
    
        let teclaPresionada = regex.test(tecla);
    
        if (teclaPresionada) {
    
            document.getElementById('teclaPress')
                .innerHTML = `tecla: ${tecla.toUpperCase()}`;
    
            comparacionLetras(tecla); /* enviamos el evento de tecla a comparar */
    
        } else { return null }
    
    }
    
    
    
    const jugar = () => {
    
        document.getElementById('jugar')
            .addEventListener('click', () => {
                       
                juegoIniciado();
    
                document.onkeypress = letrasTeclado; /* se activa evento al iniciar juego */
    
                copiaPalabra = [...new Set(splitPalabra)]; /* copia array y le quita palabras repetidas */
    
                vidas = copiaPalabra.length
    
                document.getElementById('vidas').innerHTML = `vidas: ${vidas}`
    
                return vidas;
                
            });
    }
    
    const btnDisabled = () => {
        const btnDisabled = document.getElementById('jugar');
        btnDisabled.classList = 'panel disabled';
    }

    const btnEnabled = () => {
        const btnDisabled = document.getElementById('jugar');
        btnDisabled.classList = 'panel';
    }
    

    const juegoIniciado = () => {
    
        limpiaTablero();
        btnDisabled();
        pidePalabra();
        agregaLetras();
        comparacionLetras();
        
        
    }
    
    
    
    const pidePalabra = () => {
    
        /* solo adminte letras de 2 a 12 caracteres */
        palabra = prompt('escribe palabra de 3-12 caracteres');
        palabra = palabra.match(/^[A-Za-z]{3,12}$/);
    
        if (!palabra) return palabra = "";
    
        palabra = palabra[0].toLowerCase();
    
        /* separamos las letras de palabra para nalizarlas */
        splitPalabra = palabra.split("");
    
        return splitPalabra;
    
    }
    
    
    
    const agregaLetras = () => {
    
        for (let i = 0; i < palabra.length; i++) {
    
            letras = document.createElement('span');
            letras.innerHTML = `<span id="${i}" class="letra">_</span>`;
            document.getElementById('letras').appendChild(letras);
    
        }
    
    }
    
    
    
    const comparacionLetras = tecla => {
    
        if (tecla === undefined) return null; /* evita error */
    
        splitPalabra.forEach((letra, i) => {
    
            let modificador = document.getElementById(`${i}`)
    
            if (letra === tecla) {
    
                /* analiza una por una las teclas que tocamos */
                modificador.innerHTML = letra.toUpperCase();
                modificador.classList = "letra modificaletra"
                
            }
    
            arrayGanaste[i] = modificador.textContent.toLocaleLowerCase(); /* guardo los valores para evaluar */
    
        });
    
        juegoMatches(arrayGanaste, splitPalabra, tecla); /* pasamos valores a la función para saber si ganas o perdes la partida */
    
    }
    
    
    
    const juegoMatches = (arrayGanaste, splitPalabra, tecla) => {
       
        
        /* every establece que todos los elementos del array deben ser diferentes en este caso */
        ganaste = arrayGanaste.every(a => a !== "_"); 
    
        if (ganaste) {
    
            limpiaTablero();
            /* cambia a imagen de mueñeco, cuando ganas */ 
            document.getElementById('ahorcado').setAttribute('src','../img/0.svg');
    
            for (let i = 0; i < palabra.length; i++) {
    
                letras = document.createElement('span');
                letras.innerHTML = `<span id="${i}" class="letra win">${palabra[i].toLocaleUpperCase()}</span>`;
                document.getElementById('letras').appendChild(letras);
        
            }
    
            setTimeout(() => {
    
                alert(`GANASTE!`)
                
            }, 600);
    
        }
    
        /* condición que valida la perdida de vidas */
        if(splitPalabra.includes(tecla) === false){
    
    
            
            vidas -=1;
            
            mutacionMunieco();
    
            document.getElementById('vidas').innerHTML = `vidas: ${vidas}`
    
    
            if( vidas === 0 ){
    
                limpiaTablero();
    
                let perder = "PERDISTE";
                /* cambia a imagen de mueñeco, cuando perdes */ 
                document.getElementById('ahorcado').setAttribute('src','../img/6.svg');
    
                for (let i = 0; i < perder.length; i++) {
    
                    letras = document.createElement('span');
                    letras.innerHTML = `<span id="${i}" class="letra lose">${perder[i]}</span>`;
                    document.getElementById('letras').appendChild(letras);
            
                }
    
                setTimeout(() => {
    
                    alert(`la palabra era ${palabra.toLocaleUpperCase()}`)
    
                },600);
                
            }
                
        }
          
    }
    
    let mutacionMunieco = () => {
    
        let vidaMax = copiaPalabra.length
    
        if ( vidas >= (vidaMax*0.8).toFixed(0) ){
    
            document.getElementById('ahorcado').setAttribute('src','../img/2.svg');
    
        } else if ( vidas >= (vidaMax*0.6).toFixed(0) ) {
               
            document.getElementById('ahorcado').setAttribute('src','../img/3.svg');
          
        } else if ( vidas >= (vidaMax*0.4).toFixed(0) ) {  
           
            document.getElementById('ahorcado').setAttribute('src','../img/4.svg');
    
        } else if ( vidas >= (vidaMax*0.2).toFixed(0) ) {
            
            document.getElementById('ahorcado').setAttribute('src','../img/5.svg');
    
        }
    
    }
    
    
    
    const limpiaTablero = () => {
    
        letras, tecla, munieco, splitPalabra = [], arrayGanaste = [],
        copiaPalabra = "", vidas = 0, ganaste = false;
    
        
    
        document.getElementById('ahorcado').setAttribute('src','../img/1.svg');
    
        let padre = document.getElementById('letras');
    
        while (padre.firstChild) {
    
            padre.removeChild(padre.firstChild);
        }

        btnEnabled();
    
    }
    
    
    
    jugar();



})()


