document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    let btnLogIn = document.querySelector("#btn-login");
    let btnRegister = document.querySelector("#btn-registrarse");
    
    function checkLogin(){
        window.location.href = "martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/loadingToFeed.html";
        
    }

    function redirectRegister(){
        window.location.href = "https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/loadingToRegister.html";
    }
   
    btnRegister.addEventListener("click", redirectRegister);
    btnLogIn.addEventListener("click", checkLogin);
});