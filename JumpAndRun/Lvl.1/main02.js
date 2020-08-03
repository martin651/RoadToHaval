window.addEventListener("load", function (event) {

    "use strict";


    /////////////////
    //// CLASSES ////
    /////////////////

    const AssetsManager = function () {

        this.tile_set_image = undefined; //deklaration als Image

        this.tile_set_imageChar = undefined; 
    };
    AssetsManager.prototype = {

        constructor: Game.AssetsManager,

        /*
        requestJSON: function (url, callback) {

            let request = new XMLHttpRequest();

            request.addEventListener("load", function (event) {

                callback(JSON.parse(this.responseText));

            }, { once: true });

            request.open("GET", url);
            request.send();

        },
        */

        requestImage: function (url, callback) {

            let image = new Image(); //ladet das Tilesheet

            image.addEventListener("load", function (event) {

                callback(image);

            }, { once: true });

            image.src = url;

        },

    };


    var keyDownUp = function (event) {

        controller.keyDownUp(event.type, event.keyCode);

    };

    var resize = function (event) {

        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();

    };

    var render = function () {

        display.drawMap(assets_manager.tile_set_image,
            game.world.tile_setWorld.columns, game.world.graphical_map, game.world.columns, game.world.tile_setWorld.tile_size);

        let frame = game.world.tile_setPlayer.frames[game.world.player.frame_value]; //abholen des Frame-Wertes aus den Klassen (worldplayer.js)

        //drawObject ruft relevanten Informationen ab um eine Animation zu ermöglichen
        display.drawObject(assets_manager.tile_set_imageChar,
            frame.x, frame.y,
            game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x, //--> "Inperfektion" überlappen der Pixel und Verzögerung der Animation mit Zentrum-Ermittlung des Frames
            game.world.player.y + frame.offset_y, frame.width, frame.height);


        /*****OLD OLD OLD****/
        //display.drawMap(game.world.map, game.world.columns);
        //display.drawPlayer(game.world.player, game.world.player.color1, game.world.player.color2);
        //display.drawPlayer(game.world.npc, game.world.npc.color1, game.world.npc.color2);
        
        ////****NEW NEW NEW****//
        p.innerHTML = "Köftespieß: " /*+ game.world.carrot_count*/;
        ////****NEW NEW NEW****//



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

  
     /////////////////
    //// OBJECTS ////
    /////////////////
    var assets_manager = new AssetsManager();

    var controller = new Controller();
    var display = new Display(document.getElementById("myCanvas"));
    var game = new Game();
    var engine = new Engine(1000 / 30, render, update);


    /***KÖFTESPIEß-ZÄHLER***/

    ////*****NEW NEW NEW*****//
    ////Creating p-Element (HTML) for "Köftespieß" Counter 
    //var p = document.createElement("p");
    //p.setAttribute("style", "color:#c07000; font-size:2.0em; position:fixed;");
    //p.innerHTML = "Carrots: 0";
    //document.body.appendChild(p);
    ////*****NEW NEW NEW*****//

     ////////////////////
    //// INITIALIZE ////
    ////////////////////

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
    display.buffer.imageSmoothingEnabled = false;

    assets_manager.requestImage("pictures/RoadToHavalComplete.png", (image) => {

        assets_manager.tile_set_image = image;

        resize();
        engine.start();

    });



    assets_manager.requestImage("pictures/RoadToHavalChars.png", (image) => {

        assets_manager.tile_set_imageChar = image;

        resize();
        engine.start();

    });

    

    /***OLD OLD OLD***/
    ////Map laden
    //display.tile_sheet.image.addEventListener("load", function (event) {
    
    //    resize();

    //    engine.start();

    //}, { once: true });

    ////Map aus PNG Datei ziehen und darstellen
    //display.tile_sheet.image.src = "pictures/Prison Pixel Art.png";



    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);


    
    });