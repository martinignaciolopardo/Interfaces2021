document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    window.onload = function(){
        setTimeout(redirectFeed, 5000);
    }

    function redirectFeed(){
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/feed.html';
    }
});