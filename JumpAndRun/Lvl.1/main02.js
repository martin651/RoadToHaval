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

        display.fill(game.world.background_color);// Clear background to game's background color.
        display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);//draws charakter
        //*****NEW NEW NEW*******//
        display.drawRectangle(game.world.npc.x, game.world.npc.y, game.world.npc.width, game.world.npc.height, game.world.npc.color);//draws enenmy
        //*****NEW NEW NEW*******//
        display.render();

    };

    var update = function () {

        if (controller.left.active) { game.world.player.moveLeft(); }
        if (controller.right.active) { game.world.player.moveRight(); }
        if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }

        //*****NEW NEW NEW*******//

        //if player moves - enenmy start to move//

        if (game.world.player.x != 0) { game.world.npc.move(); }

        //*****TEST TEST TEST*******//
        /*--IDEE--*/
        //creating new enemies - vielleicht in world.game.update() implementieren - ggf. While player.x > enemy.x -> constructor: new Game.Npc
        if (game.world.player.x >= game.world.npc.x) {
            game.world.npc.constructor();
            
        }


        //*****NEW NEW NEW*******//
                

        game.update();

    };


    var controller = new Controller();
    var display = new Display(document.getElementById("myCanvas"));
    var game = new Game();
    var engine = new Engine(1000 / 30, render, update);

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);

    resize();

    engine.start();

});