document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    window.onload = function(){
        setTimeout(redirectChat, 5000);
    }
    
    function redirectChat(){
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/chats.html';
    }
});