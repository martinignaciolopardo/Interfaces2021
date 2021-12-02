document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    window.onload = function(){
        setTimeout(redirectSearch, 4500);
    }

    function redirectSearch(){
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/busqueda.html';
    }
});