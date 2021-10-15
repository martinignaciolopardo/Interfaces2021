document.addEventListener('DOMContentLoaded',() => {

    let canvas = document.querySelector('#canvas');
    let ctx =  canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    function setBackground(){
        ctx.save();
        ctx.fillStyle = "#00aaaf95";
        ctx.fillRect(0,0,width,height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0,0,width,height);
        ctx.restore();
    }
    setBackground();

});