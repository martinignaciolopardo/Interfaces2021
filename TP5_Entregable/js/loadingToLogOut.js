document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    window.onload = function(){
        setTimeout(redirectLogin, 5300);
    }

    function redirectLogin(){
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/index.html';
    }
});