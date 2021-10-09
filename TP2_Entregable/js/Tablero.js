class Tablero{
    constructor(alto, ancho, ctx, color, posX, posY, radio, separacionCirculos){
        this.alto = alto;
        this.ancho = ancho;
        this.ctx = ctx;
        this.color = color;
        this.posX = posX;
        this.posY = posY;
        this.radio = radio;
        this.separacionCirculos = separacionCirculos;
        this.posiciones = new Array();
    }

    crearTablero(){
        let fila = 1;
        let ocupada = false;
        let jugador = -1;
        const xFija = this.posX;
        for (let x = 0; x < this.alto; x++) {
            let columna = 1;
            this.posY += this.separacionCirculos;
            this.posX = xFija;
            for (let y = 0; y < this.ancho; y++) {
               /* if (columna === 1) {
                    this.color = 'red';
                }if (columna === 2) {
                    this.color = 'green';
                }if (columna === 3) {
                    this.color = 'cyan';
                }if (columna === 4) {
                    this.color = 'purple';
                }*/
                let coordenada = new Circulo(this.posX, this.posY, columna, fila, this.radio, 
                                            this.color, this.ctx, this.posX+this.radio, 
                                            this.posX-this.radio, this.posY+this.radio, 
                                            this.posY-this.radio, ocupada, jugador);
                this.posiciones.push(coordenada);
                this.posX += this.separacionCirculos;
                columna++;
            }
            fila++;  
        }console.log(this.posiciones);
    }

    dibujar(){
        for (let i = 0; i < this.posiciones.length; i++) {
            this.posiciones[i].draw();
        }
    }

    dentroDelArea(x, y) {
        let inicio = this.posiciones[0].getIniX();
        let fin = this.posiciones[this.posiciones.length-1].getFinX();
        let yMax = this.posiciones[0].getIniY()-20;
        //console.log(yMax);
        if (x >= inicio && x <= fin && y <= yMax) {
            //console.log("dentro");
            return true;
        }else{
            //console.log("fuera");
            return false;
        } 
    }
    
    //devuelve en que columna se solto la ficha
    queColumna(x,y){
        if (this.dentroDelArea(x,y)) {
            let encontro = false;
            let colum = 1;
            while (encontro === false && colum <= this.ancho) {
                let inicioColumna = this.posiciones[colum-1].getIniX();
                if (x >= inicioColumna && x <= (inicioColumna+this.separacionCirculos)) {
                    if (y + (this.separacionCirculos/3) > this.posiciones[colum-1].getIniY()) {
                        console.log("por favor, inserte la ficha por encima del tablero");
                        return;
                    }
                    encontro = true;
                }
                else{
                    colum++;
                }
            }
            return colum; 

        }else {
            return null;
        }
    }
    //226.5
    //286.5
    queFila(x,y,yN){
        if (this.dentroDelArea(x,y)) {
            let encontro = false;
            let fila = 1;
            let inicioFila;
            let cadaFila = 0;
            while (encontro === false && fila <= this.alto) {
                if (fila == 1) {
                    inicioFila = this.posiciones[fila].getIniY();  
                }if (fila > 1) {
                    cadaFila+=this.ancho;
                    inicioFila = this.posiciones[cadaFila].getIniY();
                }
                if (yN >= inicioFila && yN <= (inicioFila+this.separacionCirculos)) {
                    encontro = true;
                }
                else{
                    fila++
                }
            }return fila;
        }else {
            return null;
        }
    }

    //devuelve las posiciones de la columna
    recorroColumna(col){
        let posicionesCol = [];
        for (let i = 0; i < this.posiciones.length; i++) {
            if (this.posiciones[i].getColumna() == col) {
                posicionesCol.push(this.posiciones[i]);
                //columnaLibre(this.posiciones[i]);
                //console.log(posicionesCol);
            }
            
        }return posicionesCol;
    }

    columnaLibre(colum, jugador){
        //console.log(colum);
        let i = this.alto - 1;
        //console.log(colum[i].getOcupada());
        while (i >= 0) {
            if (colum[i].getOcupada() === false) {
                colum[i].setOcupada(true);
                colum[i].setJugador(jugador);
                return colum[i];
            }
            i--;
        }
    }

    setDesocupada(){
        for (let i = 0; i < this.posiciones.length-1; i++) {
           this.posiciones[i].setOcupada(false);
           console.log(this.posiciones[i].getOcupada());
        }
    }

    columnaLlena(columna){
        if (this.posiciones[columna-1].getOcupada() == true) {
            return true;
        }
    }

    resetearPosiciones(){
        for (let i = 0; i < this.posiciones.length; i++) {
            this.posiciones[i].setOcupada(false);
        }
    }

    hayGanador(){
        if (this.checkVertical() == true) {
            console.log("gana por vertical");
            return true;
        } if (this.checkHorizontal() == true) {
            console.log("gana por horizontal");
            return true;
        }else if (this.checkDiagonalD() == true) {
            console.log("gana por diagonal DERECHA");
            return true;
        }else if (this.checkDiagonalI() == true) {
            console.log("gana por diagonal IZQUIERDA");
            return true;
        }
        return false;
    }

    checkVertical(){
        let columna = 1;
        let contador = 1;
        let ultimaPosColumna = this.posiciones.length - 1 - (this.ancho - 1);
        while (columna != this.ancho+1) {
            for (let i = 0; i < ultimaPosColumna; i++) {
                let siguienteFichaColumna = i+this.ancho;
                let columnaI = this.posiciones[i].getColumna();
                let ocupadaI = this.posiciones[i].getOcupada();
                let jugadorI = this.posiciones[i].getJugador();
                let jugadorIsiguiente = this.posiciones[siguienteFichaColumna].getJugador();
                let ocupadaIsiguiente = this.posiciones[siguienteFichaColumna].getOcupada();
                if (columnaI == columna) {
                    if (ocupadaI == true) {
                        if ((ocupadaIsiguiente == true) && (jugadorI == jugadorIsiguiente)) {
                        contador++;
                        //console.log(contador);
                            if (contador == 4) {
                                return true;
                            }
                        }
                        else{
                            contador = 1;
                        }
                    }
                }         
            }
           // console.log(iterador);
            //console.log(columna);
            //console.log(contador);
            contador = 1;
            columna++;
        }
        
    }
  
    checkHorizontal(){
        let fila = 1;
        let contador = 0;
        while (fila != this.alto+1) {
            for (let i = 0; i < this.posiciones.length-1; i++) {
                let filaI = this.posiciones[i].getFila();
                let ocupadaI = this.posiciones[i].getOcupada();
                let jugadorI = this.posiciones[i].getJugador();
                let jugadorIsiguiente= this.posiciones[i+1].getJugador();
                if (filaI == fila) {
                    if (ocupadaI == true){
                        if (jugadorI == jugadorIsiguiente) {
                            contador++;
                            //console.log(contador);
                            if (contador == 4) {
                                contador=0;
                                return true;
                            }
                        }    
                        else{
                            contador = 1;
                        }   
                    }
                }
            }
            contador = 1;
            fila++;
        }
    }

    checkDiagonalD(){
        let i = 0;
        while (i < this.posiciones.length-1) {
            let columnaI = this.posiciones[i].getColumna();
            let filaI = this.posiciones[i].getFila();
            if (columnaI <= this.ancho-3 && filaI <= this.alto-3) {
                let ocupadaI = this.posiciones[i].getOcupada();
                if (ocupadaI == true) {
                    let jugadorI = this.posiciones[i].getJugador();
                    let ocupadaIsiguiente = this.posiciones[i+this.ancho+1].getOcupada();
                    let jugadorIsiguiente = this.posiciones[i+this.ancho+1].getJugador();
                    let jugadorIsiguiente2 = this.posiciones[i+this.ancho+this.ancho+2].getJugador();
                    let jugadorIsiguiente3 = this.posiciones[i+this.ancho+this.ancho+this.ancho+3].getJugador();
                    if (ocupadaIsiguiente == true && jugadorI == jugadorIsiguiente && jugadorI == jugadorIsiguiente2 && jugadorI == jugadorIsiguiente3) {
                        return true;
                    }
                }
            }
            i++;
        }

    }

    checkDiagonalI(){
        let i = 0;
        while (i < this.posiciones.length-1) {
            let columnaI = this.posiciones[i].getColumna();
            let filaI = this.posiciones[i].getFila();
            if (columnaI > 3 && filaI <= this.alto-3) {
                let ocupadaI = this.posiciones[i].getOcupada();
                if (ocupadaI == true) {
                    let jugadorI = this.posiciones[i].getJugador();
                    let ocupadaIsiguiente = this.posiciones[i+this.ancho-1].getOcupada();
                    let jugadorIsiguiente = this.posiciones[i+this.ancho-1].getJugador();
                    let jugadorIsiguiente2 = this.posiciones[i+this.ancho+this.ancho-2].getJugador();
                    let jugadorIsiguiente3 = this.posiciones[i+this.ancho+this.ancho+this.ancho-3].getJugador();
                    if (ocupadaIsiguiente == true && jugadorI == jugadorIsiguiente && jugadorI == jugadorIsiguiente2 && jugadorI == jugadorIsiguiente3) {
                        return true;
                    }
                }
            }
            i++;
        }

    }

}