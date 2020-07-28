window.addEventListener("load", function (event) {

    "use strict";

    var keyDownUp = function (event) {

        controller.keyDownUp(event.type, event.keyCode);

    };

    var resize = function (event) {

        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();

    };

    var render = function () {

        display.drawMap(game.world.map, game.world.columns);
        display.drawPlayer(game.world.player, game.world.player.color1, game.world.player.color2);
        //*****NEW NEW NEW*******//
        display.drawPlayer(game.world.npc, game.world.npc.color1, game.world.npc.color2);//draws enenmy
        //*****NEW NEW NEW*******//
        display.render();

    };

    var update = function () {

        if (controller.left.active) { game.world.player.moveLeft(); }
        if (controller.right.active) { game.world.player.moveRight(); }
        if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }
        

        
        



        /*___________AUSGELAGERT in WORLDPLAYER.js
        *****NEW NEW NEW*******
        //if player moves - enenmy start to move//
        //if (game.world.player.x != 0) {
        //    game.world.npc.move();
        //}
        /*
        if (game.world.npc.x = game.world.player) {

            game.world.npc.moving == false;
        }
        

        //Everytime a NPC is leaving the screen a new one will be created 
        //if (game.world.npc.x < 0) {
        //    game.world.npc.constructor();

        //}
        
        ENDE ___________AUSGELAGERT in WORLDPLAYER.js__________*/


        //_____WICHTIG_________//
        // if collision GAME OVER -> controller left/right/up inactive


        game.update();

    };

  
    

    var controller = new Controller();
    var display = new Display(document.getElementById("myCanvas"));
    var game = new Game();
    var engine = new Engine(1000 / 30, render, update);

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    //Map laden
    display.tile_sheet.image.addEventListener("load", function (event) {
    
        resize();

        engine.start();

    }, { once: true });

    //Map aus PNG Datei ziehen und darstellen
    display.tile_sheet.image.src = "pictures/Prison Pixel Art.png";

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);

    });