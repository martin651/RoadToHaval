window.addEventListener("load", function (event) {

    "use strict";


    ////////////////////
    //// CONSTANTS ////
    //////////////////


    const ZONE_PREFIX = "zone";
    const ZONE_SUFFIX = ".json";

    /////////////////
    //// CLASSES ////
    /////////////////

    const AssetsManager = function () {

        this.tile_set_image = undefined; //deklaration als Image

        this.tile_set_imageChar = undefined; 
    };
    AssetsManager.prototype = {

        constructor: Game.AssetsManager,

        
        requestJSON: function (url, callback) {

            let request = new XMLHttpRequest();

            request.addEventListener("load", function (event) {

                callback(JSON.parse(this.responseText));

            }, { once: true });

            request.open("GET", url);
            request.send();

        },
        

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

        display.resize(document.documentElement.clientWidth /*- 32*/, document.documentElement.clientHeight /*- 32*/, game.world.height / game.world.width);
        display.render();
        /***NEW NEW NEW***/
        //var rectangle = display.context.canvas.getBoundingClientRect();

        //p.style.left = rectangle.left + "px";
        //p.style.top = rectangle.top + "px";
        //p.style.fontSize = game.world.tile_set.tile_size * rectangle.height / game.world.height + "px";
    };

    var render = function () {

        //drawMap
        display.drawMap(assets_manager.tile_set_image,
            game.world.tile_setWorld.columns, game.world.graphical_map, game.world.columns, game.world.tile_setWorld.tile_size);

        let playerframe = game.world.tile_setPlayer.frames[game.world.player.frame_value]; //abholen des Frame-Wertes aus den Klassen (worldplayer.js)

        //drawPlayer ruft relevanten Informationen ab um eine Animation zu ermöglichen
        display.drawObject(assets_manager.tile_set_imageChar,
            playerframe.x, playerframe.y,
            game.world.player.x + Math.floor(game.world.player.width * 0.5 - playerframe.width * 0.5) + playerframe.offset_x, //--> "Inperfektion" überlappen der Pixel und Verzögerung der Animation mit Zentrum-Ermittlung des Frames
            game.world.player.y + playerframe.offset_y, playerframe.width, playerframe.height);

       
        //*** NEW VErSION OF drawNPC ***//
        for (let index = 0; index < game.world.npcArray.length; index++) {
            let policeman = game.world.npcArray[index];
            //console.log(policeman);
            let npcframe = game.world.tile_setPlayer.frames[policeman.frame_value];
            display.drawObject(assets_manager.tile_set_imageChar,
                npcframe.x, npcframe.y,
                policeman.x + Math.floor(policeman.width * 0.5 - npcframe.width * 0.5) + npcframe.offset_x,
                policeman.y + npcframe.offset_y, npcframe.width, npcframe.height);

        };
        
        //*** NEW VErSION OF drawKoeftespiess ***//
        for (let index = 0; index < game.world.koeftespiesseArray.length; index++) {

            let koefte = game.world.koeftespiesseArray[index];
            let koefteframe = game.world.tile_setPlayer.frames[koefte.frame_value];
            display.drawObject(assets_manager.tile_set_imageChar,
                koefteframe.x, koefteframe.y,
                koefte.x + Math.floor(koefte.width * 0.5 - koefteframe.width * 0.5) + koefteframe.offset_x,
                koefte.y + koefteframe.offset_y, koefteframe.width, koefteframe.height);
                   
        };


        //TEST TEST TEST TEST//

        //drawDoor ruft relevanten Informationen ab um eine Animation zu ermöglichen

        for (let index = 0; index < game.world.doors.length; index++) {
            let door = game.world.doors[index];
            let doorframe = game.world.tile_setDoor.frames[door.frame_value]; //abholen des Frame-Wertes aus den Klassen (worldplayer.js)

            display.drawObject(assets_manager.tile_set_imageDoor,
                doorframe.x, doorframe.y,
                game.world.door.x + Math.floor(game.world.door.width * 0.5 - doorframe.width * 0.5) + doorframe.offset_x, //--> "Inperfektion" überlappen der Pixel und Verzögerung der Animation mit Zentrum-Ermittlung des Frames
                game.world.door.y + doorframe.offset_y, doorframe.width, doorframe.height);
        };

        ////****NEW NEW NEW****//
        p.innerHTML = "Köftespieß: " + game.world.koeftespiess_count;
        ////****NEW NEW NEW****//


        display.render();

    };

    var update = function () {

        if (controller.left.active) { game.world.player.moveLeft(); }
        if (controller.right.active) { game.world.player.moveRight(); }
        if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }
        game.update();

        //NEW NEW NEW 
        if (game.world.player.updateAlive() == false) {

            //if (confirm('Game Over! Retry?')) window.location.reload();

            ConfirmDialog('Ab in die Zelle');

            function ConfirmDialog(message) {
                $('<div></div>').appendTo('body')
                    .html('<div><h6>' + "Do You Wanna Retry?" + '?</h6></div>')
                    .dialog({
                        modal: true,
                        title: 'Game Over!',
                        zIndex: 10000,
                        autoOpen: true,
                        width: '400px',
                        resizable: false,
                        buttons: {
                            Yes: function () {
                                // $(obj).removeAttr('onclick');                                
                                // $(obj).parents('.Parent').remove();

                                $('body').append('<h1>Confirm Dialog Result: <i>Yes</i></h1>');

                                //$(this).dialog("close");
                                window.location.reload();

                            },
                            No: function () {
                                l
                                $('body').append('<h1>Confirm Dialog Result: <i>No</i></h1>');

                                //$(this).dialog("close");

                                //window.location.href = "www.google.de";
                            }
                        },
                        close: function (event, ui) {
                            $(this).remove();
                        }
                    });
            };     



        };


        


    };

  
     /////////////////
    //// OBJECTS ////
    /////////////////
    var assets_manager = new AssetsManager();
    var controller = new Controller();
    var display = new Display(document.getElementById("myCanvas"));
    var game = new Game();
    var engine = new Engine(1000 / 30, render, update);

      ///////////////////////////
     //// KÖFTESPIEß-ZÄHLER ////
    ///////////////////////////

    //Creating p-Element (HTML) for "Köftespieß" Counter 
    var p = document.createElement("p");
    p.setAttribute("style", "color:red; font-size:2.0em; position:absolute; top: 0px;font-family: impact;");
    p.innerHTML = "Köftespieße: 0"; /*Köfte-Zähler-Funktion*/
    document.body.appendChild(p);



     ////////////////////
    //// INITIALIZE ////
    ////////////////////

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
    display.buffer.imageSmoothingEnabled = false;

    //Koefteposition

    assets_manager.requestJSON(ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX, (zone) => {

        game.world.setup(zone);


        //Map-Image//
        assets_manager.requestImage("pictures/RoadToHavalComplete.png", (image) => {

            assets_manager.tile_set_image = image;

            resize();
            engine.start();

        });
        //Char+NPC-Image//
        assets_manager.requestImage("pictures/RoadToHavalChars.png", (image) => {

            assets_manager.tile_set_imageChar = image;

            resize();
            engine.start();

        });
        //Door
        assets_manager.requestImage("pictures/Exit-Tür.png", (image) => {

            assets_manager.tile_set_imageDoor = image;

            resize();
            engine.start();

        });
    });

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);


    
    });