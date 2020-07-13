//Anzeige 
const Display = function (canvas) {

    this.buffer = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");

    this.context.canvas.width = window.screen.width
    this.context.canvas.height = 360       // x, y, width, height

//drawing red rectangle  
    this.drawRectangle = function (x, y, width, height, color) {

        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);

    };