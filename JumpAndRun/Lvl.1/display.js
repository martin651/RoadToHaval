﻿//Anzeige 
const Display = function (canvas) {

    this.buffer = document.getElementById("myCanvas").getContext("2d"),
        this.context = canvas.getContext("2d");

    this.context.canvas.width = window.screen.width
    this.context.canvas.height = 360       // x, y, width, height

    //drawing red rectangle  
    this.drawRectangle = function (x, y, width, height, color) {

        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);

    };

    this.fill = function (color) {

        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

    };

    this.render = function () { this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); };

    //resize

    this.resize = function (width, height, height_width_ratio) {

        if (height / width > height_width_ratio) {

            this.context.canvas.height = width * height_width_ratio;
            this.context.canvas.width = width;

        } else {

            this.context.canvas.height = height;
            this.context.canvas.width = height / height_width_ratio;

        }

        this.context.imageSmoothingEnabled = false;

    };

};

Display.prototype = {

    constructor: Display

};