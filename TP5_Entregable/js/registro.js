document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    let btnCreateAcc = document.querySelector("#btn-crear");

    btnCreateAcc.addEventListener("click", redirectFeed);

    function redirectFeed() {
        window.location.href = "https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/feed.html";
    }

});