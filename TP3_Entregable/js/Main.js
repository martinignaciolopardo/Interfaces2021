document.addEventListener('DOMContentLoaded',() => {

    let canvas = document.querySelector('#canvas');
    let ctx =  canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let img = new Image();

    function setBackground(){
        ctx.save();
        ctx.fillStyle = "#00aaaf95";
        ctx.fillRect(0,0,width,height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0,0,width,height);
        ctx.restore();
    }
    setBackground();
    img.onload = function(){
        ctx.drawImage(img,100,350,170,100);
    }
    img.src = "images/caracol.png"
});