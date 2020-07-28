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
        display.drawPlayer(game.world.npc, game.world.npc.color1, game.world.npc.color2);

        //****NEW NEW NEW****//
        display.drawPlayer(game.world.koftespiess, game.world.koftespiess.color1, game.world.koftespiess.color2);
        p.innerHTML = "Köftespieß: " + game.world.carrot_count;
        //****NEW NEW NEW****//



        display.render();

    };

    var update = function () {

        if (controller.left.active) { game.world.player.moveLeft(); }
        if (controller.right.active) { game.world.player.moveRight(); }
        if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }

        game.update();



        /*
        if (game.world.door) {

            engine.stop();

            assets_manager.requestJSON(ZONE_PREFIX + game.world.door.destination_zone + ZONE_SUFFIX, (zone) => {

                game.world.setup(zone);

                engine.start();

            });

            return;
        }*/

    };

  
   // 
   // var assets_manager = new AssetsManager();
    var controller = new Controller();
    var display = new Display(document.getElementById("myCanvas"));
    var game = new Game();
    var engine = new Engine(1000 / 30, render, update);

    //*****NEW NEW NEW*****//
    //Creating p-Element (HTML) for "Köftespieß" Counter 
    var p = document.createElement("p");
    p.setAttribute("style", "color:#c07000; font-size:2.0em; position:fixed;");
    p.innerHTML = "Carrots: 0";
    document.body.appendChild(p);
    //*****NEW NEW NEW*****//



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