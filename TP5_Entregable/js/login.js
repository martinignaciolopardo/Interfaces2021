document.addEventListener('DOMContentLoaded', () => {

    let divHojas = document.querySelector("#hojas");
    let divLogo = document.querySelector('#imagenGatoPerro');
    let click = 0;
    
    function animarLogo(){
        
        divLogo.addEventListener('click',  () =>{
            if(click === 0){
                divHojas.classList.add('hojas');
                click++;
            }else{
                divHojas.classList.remove('hojas');
                click--;
            }
        })
    }
    animarLogo();
    
});