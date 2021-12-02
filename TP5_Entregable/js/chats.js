document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    document.querySelector("#feed").addEventListener('click', redirectFeed);
    document.querySelector("#buscar").addEventListener('click', redirectSearch);
    let chat3 = document.querySelector("#contacto3");
    chat3.addEventListener("click", openChat);

    function openChat(){
        location.href = "https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/chat1a1.html";
    }
        
    function redirectFeed(){
        location.href = "https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/loadingToFeed.html";
    }

    function redirectSearch(){
        location.href = "https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/loadingToSearch.html";
    }
  
});