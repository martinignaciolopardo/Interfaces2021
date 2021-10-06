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
        const xFija = this.posX;
        for (let x = 0; x < this.alto; x++) {
            let columna = 1;
            this.posY += this.separacionCirculos;
            this.posX = xFija;
            for (let y = 0; y < this.ancho; y++) {
                if (columna === 1) {
                    this.color = 'red';
                }if (columna === 2) {
                    this.color = 'green';
                }if (columna === 3) {
                    this.color = 'cyan';
                }if (columna === 4) {
                    this.color = 'purple';
                }
                let coordenada = new Circulo(this.posX, this.posY, columna, fila, this.radio, 
                                            this.color, this.ctx, this.posX+this.radio, 
                                            this.posX-this.radio, this.posY+this.radio, 
                                            this.posY-this.radio, ocupada);
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

    dentroDelArea(x) {
        let inicio = this.posiciones[0].getIniX();
        let fin = this.posiciones[this.posiciones.length-1].getFinX();
        if (x >= inicio && x <= fin) {
            //console.log("dentro");
            return true;
        }else{
            //console.log("fuera");
            return false;
        } 
    }
    
    //devuelve en que columna se solto la ficha
    queColumna(x,y){
        if (this.dentroDelArea(x)) {
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
            console.log(colum);
            return colum;
        }else{
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

    //obtiene la columna donde debe insertarse la ficha
    columnaLibre(colum){
        let i = this.alto - 1;
        //console.log(colum[i].getOcupada());
        while (i >= 0) {
            if (colum[i].getOcupada() === false) {
                colum[i].setOcupada(true);
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

}