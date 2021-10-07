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
    estaEnPrimerFila(x,y){
        if (this.dentroDelArea(x,y)) {
            let encontro = false;
            let fila = 1;
            if (y >= inicioFila && y <= (inicioFila+this.separacionCirculos)) {
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
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

    //obtiene la columna donde debe insertarse la ficha, setea la posicion en ocupada y el jugador que metio la ficha.
    columnaLibre(colum, jugador){
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

    resetearPosiciones(){
        for (let i = 0; i < this.posiciones.length; i++) {
            this.posiciones[i].setOcupada(false);
        }
    }

    hayGanador(){
        if (this.checkVertical() == true) {
            return true;
        } if (this.checkHorizontal() == true) {
            return true;
        }else if (this.checkDiagonalD() == true) {
            return true;
        }else if (this.checkDiagonalI() == true) {
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
                        console.log(contador);
                            if (contador == 4) {
                                return true;
                            }
                        }
                    }
                }         
            }
           // console.log(iterador);
            //console.log(columna);
            console.log(contador);
            contador = 1;
            columna++;
        }
        
    }
  
    //FALTA CONTROLAR EXTREMOS ------------------------------
    checkHorizontal(){
        let fila = 1;
        let contador = 1;
        while (fila != this.alto+1) {
            for (let i = 0; i < this.posiciones.length-2; i++) {
                let filaI = this.posiciones[i].getFila();
                let ocupadaI = this.posiciones[i].getOcupada();
                let jugadorI = this.posiciones[i].getJugador();
                let jugadorIsiguiente= this.posiciones[i+1].getJugador();
                let ocupadaIsiguiente= this.posiciones[i+1].getFila();
                if (filaI == fila) {
                    if (ocupadaI == true){
                        if (jugadorI == jugadorIsiguiente && ocupadaIsiguiente == fila) {
                            contador++;
                            console.log(contador);
                            if (contador == 4) {
                                return true;
                            }
                        }    
                            
                    }
                }
            }
            contador = 1;
            fila++;
        }
    }

    checkDiagonalD(){
        return false;
    }

    checkDiagonalI(){
        return false;
    }
}