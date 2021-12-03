document.addEventListener('DOMContentLoaded', () => {
    "use strict"
    let iconoNext = document.querySelector('#icono-next');
    let iconoPrev = document.querySelector('#icono-prev');
    let circulo1 = document.querySelector('#circulo1');
    let circulo2 = document.querySelector('#circulo2');
    let circulo3 = document.querySelector('#circulo3');
    let galeria = ["../assets/images/publicacion4.jfif", "../assets/images/publicacion3.jfif", "../assets/images/publicacion6.jpg"];
    let img = document.querySelector('#imagen-publicacion2');
    let posicion = 0;
    let msjIcon = document.querySelector("#chats");
    let searchIcon = document.querySelector("#buscar");
    let notificacionPop = document.querySelector(".notificaciones-pop");
    let notificacionImg = document.querySelector("#imagen-notif");
    let cerrarNotificaciones = document.querySelector("#cerrar-notif");
    let opcion1 = document.querySelector(".op1");
    let popUP = document.querySelector("#popUp");
    let btnPop = document.querySelector("#configuracion");
    let like = document.querySelector("#like");
    let mg = document.querySelector("#mg");
    let mg2 = document.querySelector("#mg2");
    let noMg = document.querySelector("#no-mg");
    let noMg2 = document.querySelector("#no-mg2");
    let cantMg = document.querySelector("#cantidad-mg-publicacion1");
    let cantMg2 = document.querySelector("#cantidad-mg-publicacion2");
    let toggle = 1;
    let toggle2 = 1;
    let toggleDislike = 1;
    let toggleDislike2 = 1;

    popUP.classList.add("ocultar");
    notificacionPop.classList.add("ocultar");
    notificacionImg.classList.add("ocultar");
    cerrarNotificaciones.classList.add("ocultar");
    img.src = galeria[posicion];
    iconoPrev.classList.add('ocultar');

    function siguienteImagen() {
        if (posicion < 2) {
            posicion++;
            img.src = galeria[posicion];
            iconoPrev.classList.remove('ocultar');
        } if (posicion > 1) {
            iconoNext.classList.add('ocultar');
        }
        actualizarIconoGaleria();
    }

    function actualizarIconoGaleria() {
        if (posicion == 1) {
            circulo2.setAttribute('fill', 'black');
            circulo2.setAttribute('stroke', 'black');
            circulo1.setAttribute('fill', '#606060');
            circulo1.setAttribute('stroke', '#606060');
        }
        if (posicion == 2) {
            circulo3.setAttribute('fill', 'black');
            circulo3.setAttribute('stroke', 'black');
            circulo2.setAttribute('fill', '#606060');
            circulo2.setAttribute('stroke', '#606060');
        }
    }

    function imagenPrevia() {
        if (posicion > 0) {
            posicion--;
            img.src = galeria[posicion];
            iconoNext.classList.remove('ocultar');
        } if (posicion < 1) {
            iconoPrev.classList.add('ocultar');
        }
        actualizarIcoGaleria();
    }

    function actualizarIcoGaleria() {
        if (posicion == 0) {
            circulo1.setAttribute('fill', 'black');
            circulo1.setAttribute('stroke', 'black');
            circulo2.setAttribute('fill', '#606060');
            circulo2.setAttribute('stroke', '#606060');
        }
        if (posicion == 1) {
            circulo2.setAttribute('fill', 'black');
            circulo2.setAttribute('stroke', 'black');
            circulo3.setAttribute('fill', '#606060');
            circulo3.setAttribute('stroke', '#606060');
        }
    }

    function redirectChats() {
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/loadingToChat.html';
    }

    function redirectSearch() {
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/loadingToSearch.html';
    }

    function tooglePop() {
        popUP.classList.toggle("ocultar");
    }

    function logOut() {
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/loadingToLogOut.html';
    }

    function liked() {
        toggle = toggle*-1;
        if (toggle == -1) {
            mg.innerHTML = `<svg width="32" height="32" viewBox="0 -2 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.1844 13.5546C24.7094 12.861 25 12.0111 25 11.1268C25 9.72383 24.2156 8.39587 22.9531
                7.65534C22.6281 7.46472 22.2581 7.3644 21.8812 7.36475H14.3875L14.575 3.52459C14.6187 2.59658
                14.2906 1.71544 13.6531 1.04365C13.3403 0.712524 12.9628 0.449071 12.5441 0.269569C12.1254 
                0.0900667 11.6743 -0.00167171 11.2187 2.30602e-05C9.59375 2.30602e-05 8.15625 1.09364 7.725
                2.65907L5.04062 12.3766H5.03125V25.75H19.7906C20.0781 25.75 20.3594 25.6938 20.6187 25.5813C22.1062
                24.947 23.0656 23.494 23.0656 21.8817C23.0656 21.488 23.0094 21.1006 22.8969 20.7256C23.4219 20.0319
                23.7125 19.1821 23.7125 18.2978C23.7125 17.9041 23.6562 17.5166 23.5437 17.1417C24.0687 16.448 
                24.3594 15.5981 24.3594 14.7138C24.3531 14.3201 24.2969 13.9296 24.1844 13.5546ZM0 13.3765V24.7501C0
                25.3032 0.446875 25.75 1 25.75H3.03125V12.3766H1C0.446875 12.3766 0 12.8235 0 13.3765Z" fill="#EEBA02"/>
                </svg>`
            noMg.innerHTML = `<svg  width="32" height="32" viewBox="0 -2 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.6844 15.3219C27.7969 14.9469 27.8531 14.5594 27.8531 14.1656C27.8531 13.2812 27.5625
                12.4312 27.0375 11.7375C27.15 11.3625 27.2062 10.975 27.2062 10.5812C27.2062 9.69687 26.9156 8.84687
                26.3906 8.15312C26.5031 7.77812 26.5594 7.39062 26.5594 6.99687C26.5594 5.38437 25.6 3.93125 24.1125
                3.29687C23.851 3.18415 23.5691 3.1267 23.2844 3.12812H4.5C3.94687 3.12812 3.5 3.575 3.5 4.12812V15.5031C3.5
                16.0562 3.94687 16.5031 4.5 16.5031H8.54062L11.2219 26.2156C11.6531 27.7812 13.0906 28.875 14.7156
                28.875C15.6438 28.875 16.5094 28.5062 17.15 27.8312C17.7906 27.1594 18.1187 26.2781 18.0719 25.35L17.8844
                21.5094H25.3813C25.7594 21.5094 26.1281 21.4094 26.4531 21.2187C27.7156 20.4844 28.5 19.1531 28.5 17.75C28.5
                16.8656 28.2094 16.0156 27.6844 15.3219ZM5.75 14.25V5.375H8.28125V14.25H5.75ZM25.35 19.2625H15.525L15.825
                25.4625C15.8438 25.8344 15.6781 26.1844 15.3687 26.4156C15.1781 26.5562 14.9438 26.6281 14.7094 26.625C14.4099
                26.6221 14.1195 26.5221 13.8817 26.3401C13.644 26.1581 13.4716 25.9039 13.3906 25.6156L10.2812 
                14.35V5.375H23.2625C23.5749 5.51499 23.8401 5.74223 24.0264 6.02941C24.2127 6.31658 24.312 6.65145 24.3125
                6.99375C24.3125 7.29687 24.2406 7.58437 24.0969 7.84687L23.6625 8.64062L24.3469 9.23437C24.5395 9.40121 24.6939 9.60759
                24.7996 9.83948C24.9053 10.0714 24.9598 10.3233 24.9594 10.5781C24.9594 10.8812 24.8875 11.1687 24.7437
                11.4312L24.3094 12.225L24.9937 12.8187C25.1864 12.9856 25.3408 13.192 25.4465 13.4239C25.5522 13.6557 
                25.6067 13.9077 25.6063 14.1625C25.6063 14.4656 25.5344 14.7531 25.3906 15.0156L24.9531 15.8125L25.6375
                16.4062C25.8301 16.5731 25.9845 16.7795 26.0902 17.0113C26.1959 17.2432 26.2504 17.4952 26.25 17.75C26.25 
                18.3469 25.9062 18.9219 25.35 19.2625Z" fill="#EEBA02"/>`
            cantMg.innerHTML = '11 Me gusta';
        }else if(toggle == 1){
            mg.innerHTML = `<svg id="like"  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.6844 16.6781C28.2094 15.9844 28.5 15.1344 28.5 14.25C28.5 12.8469 27.7156 11.5187 26.4531
                            10.7781C26.1281 10.5875 25.7581 10.4871 25.3813 10.4875H17.8875L18.075 6.64687C18.1188 5.71875 17.7906
                            4.8375 17.1531 4.16562C16.8403 3.83446 16.4628 3.57098 16.0441 3.39145C15.6254 3.21193 15.1743 3.12018
                            14.7188 3.12187C13.0938 3.12187 11.6562 4.21562 11.225 5.78125L8.54062 15.5H4.5C3.94687 15.5 3.5 15.9469
                            3.5 16.5V27.875C3.5 28.4281 3.94687 28.875 4.5 28.875H23.2906C23.5781 28.875 23.8594 28.8187 24.1187 
                            28.7062C25.6062 28.0719 26.5656 26.6187 26.5656 25.0062C26.5656 24.6125 26.5094 24.225 26.3969 23.85C26.9219
                            23.1562 27.2125 22.3062 27.2125 21.4219C27.2125 21.0281 27.1562 20.6406 27.0438 20.2656C27.5688 19.5719
                            27.8594 18.7219 27.8594 17.8375C27.8531 17.4437 27.7969 17.0531 27.6844 16.6781ZM5.75
                            26.625V17.75H8.28125V26.625H5.75ZM25.6375 15.5937L24.9531 16.1875L25.3875 16.9812C25.5306 17.2427 25.6048
                            17.5363 25.6031 17.8344C25.6031 18.35 25.3781 18.8406 24.9906 19.1781L24.3062 19.7719L24.7406 20.5656C24.8837
                            20.8271 24.9579 21.1207 24.9562 21.4187C24.9562 21.9344 24.7313 22.425 24.3438 22.7625L23.6594 23.3562L24.0938
                            24.15C24.2369 24.4115 24.3111 24.7051 24.3094 25.0031C24.3094 25.7031 23.8969 26.3344 23.2594 
                            26.6219H10.2812V17.65L13.3906 6.38437C13.4708 6.09562 13.6429 5.84088 13.8809 5.65874C14.1189 5.47659 14.4097
                            5.37698 14.7094 5.375C14.9469 5.375 15.1812 5.44375 15.3687 5.58437C15.6781 5.81562 15.8438 6.16562 15.825
                            6.5375L15.525 12.7375H25.35C25.9062 13.0781 26.25 13.6531 26.25 14.25C26.25 14.7656 26.025 15.2531 
                            25.6375 15.5937Z" fill="#EEBA02"/>
                        </svg>`
            cantMg.innerHTML = '10 Me gusta';
        }
    }

    function disliked() {
        toggleDislike = toggleDislike*-1;
        if (toggleDislike == -1) {
            noMg.innerHTML = `<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.1844 12.1969C24.2969 11.8219 24.3531 11.4344 24.3531 11.0406C24.3531 10.1562
                            24.0625 9.30625 23.5375 8.6125C23.65 8.2375 23.7062 7.85 23.7062 7.45625C23.7062 6.57188 23.4156
                            5.72187 22.8906 5.02812C23.0031 4.65312 23.0594 4.26562 23.0594 3.87187C23.0594 2.25937 22.1 0.80625
                            20.6125 0.171875C20.351 0.0591519 20.0691 0.0016995 19.7844 0.00312495H5.03125V13.3781H5.04062L7.72188
                            23.0906C8.15312 24.6562 9.59062 25.75 11.2156 25.75C12.1438 25.75 13.0094 25.3812 13.65 24.7062C14.2906
                            24.0344 14.6187 23.1531 14.5719 22.225L14.3844 18.3844H21.8813C22.2594 18.3844 22.6281 18.2844 22.9531
                            18.0938C24.2156 17.3594 25 16.0281 25 14.625C25 13.7406 24.7094 12.8906 24.1844 12.1969ZM0 1V12.375C0
                            12.9281 0.446875 13.375 1 13.375H3.03125V0H1C0.446875 0 0 0.446875 0 1Z" fill="#EEBA02"/>
                        </svg>`
            mg.innerHTML = `<svg id="like"  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.6844 16.6781C28.2094 15.9844 28.5 15.1344 28.5 14.25C28.5 12.8469 27.7156 11.5187 26.4531
                            10.7781C26.1281 10.5875 25.7581 10.4871 25.3813 10.4875H17.8875L18.075 6.64687C18.1188 5.71875 17.7906
                            4.8375 17.1531 4.16562C16.8403 3.83446 16.4628 3.57098 16.0441 3.39145C15.6254 3.21193 15.1743 3.12018
                            14.7188 3.12187C13.0938 3.12187 11.6562 4.21562 11.225 5.78125L8.54062 15.5H4.5C3.94687 15.5 3.5 15.9469
                            3.5 16.5V27.875C3.5 28.4281 3.94687 28.875 4.5 28.875H23.2906C23.5781 28.875 23.8594 28.8187 24.1187 
                            28.7062C25.6062 28.0719 26.5656 26.6187 26.5656 25.0062C26.5656 24.6125 26.5094 24.225 26.3969 23.85C26.9219
                            23.1562 27.2125 22.3062 27.2125 21.4219C27.2125 21.0281 27.1562 20.6406 27.0438 20.2656C27.5688 19.5719
                            27.8594 18.7219 27.8594 17.8375C27.8531 17.4437 27.7969 17.0531 27.6844 16.6781ZM5.75
                            26.625V17.75H8.28125V26.625H5.75ZM25.6375 15.5937L24.9531 16.1875L25.3875 16.9812C25.5306 17.2427 25.6048
                            17.5363 25.6031 17.8344C25.6031 18.35 25.3781 18.8406 24.9906 19.1781L24.3062 19.7719L24.7406 20.5656C24.8837
                            20.8271 24.9579 21.1207 24.9562 21.4187C24.9562 21.9344 24.7313 22.425 24.3438 22.7625L23.6594 23.3562L24.0938
                            24.15C24.2369 24.4115 24.3111 24.7051 24.3094 25.0031C24.3094 25.7031 23.8969 26.3344 23.2594 
                            26.6219H10.2812V17.65L13.3906 6.38437C13.4708 6.09562 13.6429 5.84088 13.8809 5.65874C14.1189 5.47659 14.4097
                            5.37698 14.7094 5.375C14.9469 5.375 15.1812 5.44375 15.3687 5.58437C15.6781 5.81562 15.8438 6.16562 15.825
                            6.5375L15.525 12.7375H25.35C25.9062 13.0781 26.25 13.6531 26.25 14.25C26.25 14.7656 26.025 15.2531 
                            25.6375 15.5937Z" fill="#EEBA02"/>
                        </svg>`
            cantMg.innerHTML = '10 Me gusta';
        }else if (toggleDislike == 1){
            noMg.innerHTML = `
                <svg  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.6844 15.3219C27.7969 14.9469 27.8531 14.5594 27.8531 14.1656C27.8531 13.2812 27.5625
                    12.4312 27.0375 11.7375C27.15 11.3625 27.2062 10.975 27.2062 10.5812C27.2062 9.69687 26.9156 8.84687
                    26.3906 8.15312C26.5031 7.77812 26.5594 7.39062 26.5594 6.99687C26.5594 5.38437 25.6 3.93125 24.1125
                    3.29687C23.851 3.18415 23.5691 3.1267 23.2844 3.12812H4.5C3.94687 3.12812 3.5 3.575 3.5 4.12812V15.5031C3.5
                    16.0562 3.94687 16.5031 4.5 16.5031H8.54062L11.2219 26.2156C11.6531 27.7812 13.0906 28.875 14.7156
                    28.875C15.6438 28.875 16.5094 28.5062 17.15 27.8312C17.7906 27.1594 18.1187 26.2781 18.0719 25.35L17.8844
                    21.5094H25.3813C25.7594 21.5094 26.1281 21.4094 26.4531 21.2187C27.7156 20.4844 28.5 19.1531 28.5 17.75C28.5
                    16.8656 28.2094 16.0156 27.6844 15.3219ZM5.75 14.25V5.375H8.28125V14.25H5.75ZM25.35 19.2625H15.525L15.825
                    25.4625C15.8438 25.8344 15.6781 26.1844 15.3687 26.4156C15.1781 26.5562 14.9438 26.6281 14.7094 26.625C14.4099
                    26.6221 14.1195 26.5221 13.8817 26.3401C13.644 26.1581 13.4716 25.9039 13.3906 25.6156L10.2812 
                    14.35V5.375H23.2625C23.5749 5.51499 23.8401 5.74223 24.0264 6.02941C24.2127 6.31658 24.312 6.65145 24.3125
                    6.99375C24.3125 7.29687 24.2406 7.58437 24.0969 7.84687L23.6625 8.64062L24.3469 9.23437C24.5395 9.40121 24.6939 9.60759
                    24.7996 9.83948C24.9053 10.0714 24.9598 10.3233 24.9594 10.5781C24.9594 10.8812 24.8875 11.1687 24.7437
                    11.4312L24.3094 12.225L24.9937 12.8187C25.1864 12.9856 25.3408 13.192 25.4465 13.4239C25.5522 13.6557 
                    25.6067 13.9077 25.6063 14.1625C25.6063 14.4656 25.5344 14.7531 25.3906 15.0156L24.9531 15.8125L25.6375
                    16.4062C25.8301 16.5731 25.9845 16.7795 26.0902 17.0113C26.1959 17.2432 26.2504 17.4952 26.25 17.75C26.25 
                    18.3469 25.9062 18.9219 25.35 19.2625Z" fill="#EEBA02"/>`
        }
    }

    function liked2() {
        toggle2 = toggle2*-1;
        if (toggle2 == -1) {
            mg2.innerHTML = `<svg width="32" height="32" viewBox="0 -2 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.1844 13.5546C24.7094 12.861 25 12.0111 25 11.1268C25 9.72383 24.2156 8.39587 22.9531
                             7.65534C22.6281 7.46472 22.2581 7.3644 21.8812 7.36475H14.3875L14.575 3.52459C14.6187 2.59658
                            14.2906 1.71544 13.6531 1.04365C13.3403 0.712524 12.9628 0.449071 12.5441 0.269569C12.1254 
                            0.0900667 11.6743 -0.00167171 11.2187 2.30602e-05C9.59375 2.30602e-05 8.15625 1.09364 7.725
                            2.65907L5.04062 12.3766H5.03125V25.75H19.7906C20.0781 25.75 20.3594 25.6938 20.6187 25.5813C22.1062
                            24.947 23.0656 23.494 23.0656 21.8817C23.0656 21.488 23.0094 21.1006 22.8969 20.7256C23.4219 20.0319
                            23.7125 19.1821 23.7125 18.2978C23.7125 17.9041 23.6562 17.5166 23.5437 17.1417C24.0687 16.448 
                            24.3594 15.5981 24.3594 14.7138C24.3531 14.3201 24.2969 13.9296 24.1844 13.5546ZM0 13.3765V24.7501C0
                            25.3032 0.446875 25.75 1 25.75H3.03125V12.3766H1C0.446875 12.3766 0 12.8235 0 13.3765Z" fill="#EEBA02"/>
            </svg>`
            noMg2.innerHTML = `<svg  width="32" height="32" viewBox="0 -2 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.6844 15.3219C27.7969 14.9469 27.8531 14.5594 27.8531 14.1656C27.8531 13.2812 27.5625
                                12.4312 27.0375 11.7375C27.15 11.3625 27.2062 10.975 27.2062 10.5812C27.2062 9.69687 26.9156 8.84687
                                26.3906 8.15312C26.5031 7.77812 26.5594 7.39062 26.5594 6.99687C26.5594 5.38437 25.6 3.93125 24.1125
                                3.29687C23.851 3.18415 23.5691 3.1267 23.2844 3.12812H4.5C3.94687 3.12812 3.5 3.575 3.5 4.12812V15.5031C3.5
                                16.0562 3.94687 16.5031 4.5 16.5031H8.54062L11.2219 26.2156C11.6531 27.7812 13.0906 28.875 14.7156
                                28.875C15.6438 28.875 16.5094 28.5062 17.15 27.8312C17.7906 27.1594 18.1187 26.2781 18.0719 25.35L17.8844
                                21.5094H25.3813C25.7594 21.5094 26.1281 21.4094 26.4531 21.2187C27.7156 20.4844 28.5 19.1531 28.5 17.75C28.5
                                16.8656 28.2094 16.0156 27.6844 15.3219ZM5.75 14.25V5.375H8.28125V14.25H5.75ZM25.35 19.2625H15.525L15.825
                                25.4625C15.8438 25.8344 15.6781 26.1844 15.3687 26.4156C15.1781 26.5562 14.9438 26.6281 14.7094 26.625C14.4099
                                26.6221 14.1195 26.5221 13.8817 26.3401C13.644 26.1581 13.4716 25.9039 13.3906 25.6156L10.2812 
                                14.35V5.375H23.2625C23.5749 5.51499 23.8401 5.74223 24.0264 6.02941C24.2127 6.31658 24.312 6.65145 24.3125
                                6.99375C24.3125 7.29687 24.2406 7.58437 24.0969 7.84687L23.6625 8.64062L24.3469 9.23437C24.5395 9.40121 24.6939 9.60759
                                24.7996 9.83948C24.9053 10.0714 24.9598 10.3233 24.9594 10.5781C24.9594 10.8812 24.8875 11.1687 24.7437
                                11.4312L24.3094 12.225L24.9937 12.8187C25.1864 12.9856 25.3408 13.192 25.4465 13.4239C25.5522 13.6557 
                                25.6067 13.9077 25.6063 14.1625C25.6063 14.4656 25.5344 14.7531 25.3906 15.0156L24.9531 15.8125L25.6375
                                16.4062C25.8301 16.5731 25.9845 16.7795 26.0902 17.0113C26.1959 17.2432 26.2504 17.4952 26.25 17.75C26.25 
                                18.3469 25.9062 18.9219 25.35 19.2625Z" fill="#EEBA02"/>`
            cantMg2.innerHTML = '28 Me gusta';
        }else if (toggle2 == 1){
            mg2.innerHTML = ` <svg id=""  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.6844 16.6781C28.2094 15.9844 28.5 15.1344 28.5 14.25C28.5 12.8469 27.7156 11.5187 26.4531
                                10.7781C26.1281 10.5875 25.7581 10.4871 25.3813 10.4875H17.8875L18.075 6.64687C18.1188 5.71875 17.7906
                                4.8375 17.1531 4.16562C16.8403 3.83446 16.4628 3.57098 16.0441 3.39145C15.6254 3.21193 15.1743 3.12018 
                                14.7188 3.12187C13.0938 3.12187 11.6562 4.21562 11.225 5.78125L8.54062 15.5H4.5C3.94687 15.5 3.5 15.9469
                                3.5 16.5V27.875C3.5 28.4281 3.94687 28.875 4.5 28.875H23.2906C23.5781 28.875 23.8594 28.8187 24.1187 
                                28.7062C25.6062 28.0719 26.5656 26.6187 26.5656 25.0062C26.5656 24.6125 26.5094 24.225 26.3969 23.85C26.9219 
                                23.1562 27.2125 22.3062 27.2125 21.4219C27.2125 21.0281 27.1562 20.6406 27.0438 20.2656C27.5688 19.5719 27.8594
                                18.7219 27.8594 17.8375C27.8531 17.4437 27.7969 17.0531 27.6844 16.6781ZM5.75 
                                26.625V17.75H8.28125V26.625H5.75ZM25.6375 15.5937L24.9531 16.1875L25.3875
                                16.9812C25.5306 17.2427 25.6048 17.5363 25.6031 17.8344C25.6031 18.35 25.3781 18.8406 24.9906 19.1781L24.3062
                                19.7719L24.7406 20.5656C24.8837 20.8271 24.9579 21.1207 24.9562 21.4187C24.9562 21.9344 24.7313 22.425 24.3438
                                22.7625L23.6594 23.3562L24.0938 24.15C24.2369 24.4115 24.3111 24.7051 24.3094 25.0031C24.3094 25.7031 23.8969
                                26.3344 23.2594 26.6219H10.2812V17.65L13.3906 6.38437C13.4708 6.09562 13.6429 5.84088 13.8809 5.65874C14.1189
                                5.47659 14.4097 5.37698 14.7094 5.375C14.9469 5.375 15.1812 5.44375 15.3687 5.58437C15.6781 5.81562 15.8438
                                6.16562 15.825 6.5375L15.525 12.7375H25.35C25.9062 13.0781 26.25 13.6531 26.25 14.25C26.25 14.7656 26.025
                                15.2531 25.6375 15.5937Z" fill="#EEBA02"/>
                            </svg>`
            cantMg2.innerHTML = '27 Me gusta';
        }
    }

    function disliked2() {
        toggleDislike2 = toggleDislike2*-1;
        if (toggleDislike2 == -1) {
            noMg2.innerHTML = `<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.1844 12.1969C24.2969 11.8219 24.3531 11.4344 24.3531 11.0406C24.3531 10.1562
                                24.0625 9.30625 23.5375 8.6125C23.65 8.2375 23.7062 7.85 23.7062 7.45625C23.7062 6.57188 23.4156
                                5.72187 22.8906 5.02812C23.0031 4.65312 23.0594 4.26562 23.0594 3.87187C23.0594 2.25937 22.1 0.80625
                                20.6125 0.171875C20.351 0.0591519 20.0691 0.0016995 19.7844 0.00312495H5.03125V13.3781H5.04062L7.72188
                                23.0906C8.15312 24.6562 9.59062 25.75 11.2156 25.75C12.1438 25.75 13.0094 25.3812 13.65 24.7062C14.2906
                                24.0344 14.6187 23.1531 14.5719 22.225L14.3844 18.3844H21.8813C22.2594 18.3844 22.6281 18.2844 22.9531
                                18.0938C24.2156 17.3594 25 16.0281 25 14.625C25 13.7406 24.7094 12.8906 24.1844 12.1969ZM0 1V12.375C0
                                12.9281 0.446875 13.375 1 13.375H3.03125V0H1C0.446875 0 0 0.446875 0 1Z" fill="#EEBA02"/>
                            </svg>`
            mg2.innerHTML = `<svg id="like"  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.6844 16.6781C28.2094 15.9844 28.5 15.1344 28.5 14.25C28.5 12.8469 27.7156 11.5187 26.4531
                                10.7781C26.1281 10.5875 25.7581 10.4871 25.3813 10.4875H17.8875L18.075 6.64687C18.1188 5.71875 17.7906
                                4.8375 17.1531 4.16562C16.8403 3.83446 16.4628 3.57098 16.0441 3.39145C15.6254 3.21193 15.1743 3.12018
                                14.7188 3.12187C13.0938 3.12187 11.6562 4.21562 11.225 5.78125L8.54062 15.5H4.5C3.94687 15.5 3.5 15.9469
                                3.5 16.5V27.875C3.5 28.4281 3.94687 28.875 4.5 28.875H23.2906C23.5781 28.875 23.8594 28.8187 24.1187 
                                28.7062C25.6062 28.0719 26.5656 26.6187 26.5656 25.0062C26.5656 24.6125 26.5094 24.225 26.3969 23.85C26.9219
                                23.1562 27.2125 22.3062 27.2125 21.4219C27.2125 21.0281 27.1562 20.6406 27.0438 20.2656C27.5688 19.5719
                                27.8594 18.7219 27.8594 17.8375C27.8531 17.4437 27.7969 17.0531 27.6844 16.6781ZM5.75
                                26.625V17.75H8.28125V26.625H5.75ZM25.6375 15.5937L24.9531 16.1875L25.3875 16.9812C25.5306 17.2427 25.6048
                                17.5363 25.6031 17.8344C25.6031 18.35 25.3781 18.8406 24.9906 19.1781L24.3062 19.7719L24.7406 20.5656C24.8837
                                20.8271 24.9579 21.1207 24.9562 21.4187C24.9562 21.9344 24.7313 22.425 24.3438 22.7625L23.6594 23.3562L24.0938
                                24.15C24.2369 24.4115 24.3111 24.7051 24.3094 25.0031C24.3094 25.7031 23.8969 26.3344 23.2594 
                                26.6219H10.2812V17.65L13.3906 6.38437C13.4708 6.09562 13.6429 5.84088 13.8809 5.65874C14.1189 5.47659 14.4097
                                5.37698 14.7094 5.375C14.9469 5.375 15.1812 5.44375 15.3687 5.58437C15.6781 5.81562 15.8438 6.16562 15.825
                                6.5375L15.525 12.7375H25.35C25.9062 13.0781 26.25 13.6531 26.25 14.25C26.25 14.7656 26.025 15.2531 
                                25.6375 15.5937Z" fill="#EEBA02"/>
                            </svg>`
            cantMg2.innerHTML = '27 Me gusta';
        }else if (toggleDislike2 == 1){
            noMg2.innerHTML =`<svg  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.6844 15.3219C27.7969 14.9469 27.8531 14.5594 27.8531 14.1656C27.8531 13.2812 27.5625
                                12.4312 27.0375 11.7375C27.15 11.3625 27.2062 10.975 27.2062 10.5812C27.2062 9.69687 26.9156 8.84687
                                26.3906 8.15312C26.5031 7.77812 26.5594 7.39062 26.5594 6.99687C26.5594 5.38437 25.6 3.93125 24.1125
                                3.29687C23.851 3.18415 23.5691 3.1267 23.2844 3.12812H4.5C3.94687 3.12812 3.5 3.575 3.5 4.12812V15.5031C3.5
                                16.0562 3.94687 16.5031 4.5 16.5031H8.54062L11.2219 26.2156C11.6531 27.7812 13.0906 28.875 14.7156
                                28.875C15.6438 28.875 16.5094 28.5062 17.15 27.8312C17.7906 27.1594 18.1187 26.2781 18.0719 25.35L17.8844
                                21.5094H25.3813C25.7594 21.5094 26.1281 21.4094 26.4531 21.2187C27.7156 20.4844 28.5 19.1531 28.5 17.75C28.5
                                16.8656 28.2094 16.0156 27.6844 15.3219ZM5.75 14.25V5.375H8.28125V14.25H5.75ZM25.35 19.2625H15.525L15.825
                                25.4625C15.8438 25.8344 15.6781 26.1844 15.3687 26.4156C15.1781 26.5562 14.9438 26.6281 14.7094 26.625C14.4099
                                26.6221 14.1195 26.5221 13.8817 26.3401C13.644 26.1581 13.4716 25.9039 13.3906 25.6156L10.2812 
                                14.35V5.375H23.2625C23.5749 5.51499 23.8401 5.74223 24.0264 6.02941C24.2127 6.31658 24.312 6.65145 24.3125
                                6.99375C24.3125 7.29687 24.2406 7.58437 24.0969 7.84687L23.6625 8.64062L24.3469 9.23437C24.5395 9.40121 24.6939 9.60759
                                24.7996 9.83948C24.9053 10.0714 24.9598 10.3233 24.9594 10.5781C24.9594 10.8812 24.8875 11.1687 24.7437
                                11.4312L24.3094 12.225L24.9937 12.8187C25.1864 12.9856 25.3408 13.192 25.4465 13.4239C25.5522 13.6557 
                                25.6067 13.9077 25.6063 14.1625C25.6063 14.4656 25.5344 14.7531 25.3906 15.0156L24.9531 15.8125L25.6375
                                16.4062C25.8301 16.5731 25.9845 16.7795 26.0902 17.0113C26.1959 17.2432 26.2504 17.4952 26.25 17.75C26.25 
                                18.3469 25.9062 18.9219 25.35 19.2625Z" fill="#EEBA02"/>`
        }
    }

    function showNotifications(){
        notificacionPop.classList.remove("ocultar");
        notificacionImg.classList.remove("ocultar");
        cerrarNotificaciones.classList.remove("ocultar");
    }

    function closeNotifications(){
        notificacionPop.classList.add("ocultar");
        notificacionImg.classList.add("ocultar");
        cerrarNotificaciones.classList.add("ocultar");
    }

    iconoNext.addEventListener('click', siguienteImagen);
    iconoPrev.addEventListener('click', imagenPrevia);
    msjIcon.addEventListener("click", redirectChats);
    searchIcon.addEventListener("click", redirectSearch);
    btnPop.addEventListener("click", tooglePop);
    mg.addEventListener("click", liked);
    mg2.addEventListener("click", liked2);
    noMg.addEventListener("click", disliked);
    noMg2.addEventListener("click", disliked2);
    opcion1.addEventListener("click", showNotifications);
    cerrarNotificaciones.addEventListener("click", closeNotifications);

});