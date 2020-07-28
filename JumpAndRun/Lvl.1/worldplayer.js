const Game = function () {

    //Eigene Klasse World
    this.world = new Game.World();

    this.update = function () {

        this.world.update();

    };

};

Game.prototype = { constructor: Game };

Game.World = function (friction = 0.9, gravity = 3) {

    this.friction = friction;
    this.gravity = gravity;

    /* Player is now its own class inside of the Game.World object. */
    this.player = new Game.World.Player();

    //*****NEW NEW NEW*******//
    /* NPC is now its own class inside of the Game.World object. */
    this.npc = new Game.World.Npc();
    //*****NEW NEW NEW*******//


    // Anzahl Tile Spalten
    this.columns =50;
    //Anzahl Tile Zeilen
    this.rows = 11;
    //Tile Größe in Pixeln
    this.tile_size = 32;
    //Codierung der einzelnen Tiles (Beispiel)
    //Codierung der Map
    //--> Prison Pixel Art.png
    // --> Tiles müssen evtl. noch erweitert werden, da Map noch zu klein ist
    this.map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
        50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
        100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
        150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199,
        200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249,
        250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299,
        300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349,
        350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399,
        400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449,
        450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499,
        450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499
    ];

    /* Height and Width now depend on the map size. */
    this.height = this.tile_size * this.rows;
    this.width = this.tile_size * this.columns;

    //this.height = 360;
    //this.width = window.screen.width;
};


//World-Level own class - functions
Game.World.prototype = {

    constructor: Game.World,

    collideObject: function (object) {


        // Ground
        if (object.y > 360 - 32 - 64) {
            object.jumping = false; //jump once
            object.y = 360 - 32 - 64; //defines position of ground
        }
        //boundry of the world (left rim)
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        //boundry of the world  (upper rim)
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }
        //on Top
        if (object.getbottom() >= object.gettop()) { object.y = object.y + object.height; }


    },


    /////-----HIER WEITERMACHEN-------/////////
    //COLLISION AND REPSONSE 28.07.2020//

    goCollision: function (player, npc) {


        // GAME OVER Collision
        if (this.player.getright() >= this.npc.getleft() && this.player.getleft() < this.npc.getright() && this.player.y == this.npc.y) {

            this.npc.moving = true;
            this.npc.velocity_x = 0;
            this.player.velocity_x = 0;
            console.log("G O COLLISION");


            return true;
        };

        
            return false;
        
    },

    toCollision: function (player, npc) {


        // Top Collision
        if (this.player.getbottom() >= this.npc.gettop() && this.player.getleft() >= this.npc.getleft() && this.player.getright() >= this.npc.getright){

            console.log("TOP COLLISION");
        };
        return false;
    },




    update: function () {

        this.player.velocity_y += this.gravity;
        this.player.update();

        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;

        /*_______FROM VERSION_3.1 NPC______*/

        //NPC moves
        //this.npc.velocity_y += this.gravity;
        this.npc.update();

        this.npc.velocity_x *= this.friction;
        this.npc.velocity_y *= this.friction;
        /*ENDE _______FROM VERSION_3.1 NPC______*/

        this.collideObject(this.player);
        this.goCollision();
        this.toCollision();

        
       

        /*_______FROM MAIN.js______*****NEW NEW NEW********/
        //if player moves - enenmy start to move//
        if (this.player.x != 0) {
           
            this.npc.move();
        };

        //Everytime a NPC is leaving the screen a new one will be created 
        if (this.npc.x < 0) {
            this.npc.constructor();

        };        


         /*ENDE_______FROM MAIN.js______*****NEW NEW NEW********/

        //<<<<<DEMO COLLISION>>>>>>//

        //----CHECK postition PLAYER & NPC

            //Get position player
            //console.log("x: ", this.player.getright() + "y: ", this.player.getbottom());

            //Get position player
            //console.log("x: ", this.npc.getleft() /*+ "y: ", this.player.getbottom()*/);

        //if (this.player.right >= this.npc.left) {

        //    this.npc.moving = true
        //    this.npc.velocity_x = 0;
            

        //    console.log("GAME OVER");
        //};
        

    }

};

//Player own class - attitudes//

Game.World.Player = function (x, y) {

    this.color1 = "#404040";
    this.color2 = "#f0f0f0";
    this.height = 60;
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 64;
    this.x = 0;
    this.y = 0;
    this.right = null;
    this.left = null;
    this.bottom = null;
    this.top = null;

};

//Player Char - constructor + function//


Game.World.Player.prototype = {

    constructor: Game.World.Player,

    //*****NEW NEW NEW*******//
    //getting position for collision detection

    gettop: function () { return this.top = this.y + this.height; },
    getbottom: function () { return this.bottom = this.y; },
    getright: function () { return this.right = this.x + this.width; },
    getleft: function () { return this.left = this.x; },


    //*****NEW NEW NEW*******//

    //move+jump function

    jump: function () {

        if (!this.jumping) {

            this.jumping = true;
            this.velocity_y -= 65;

        }

    },

    moveLeft: function () { this.velocity_x -= 0.5; },
    moveRight: function () { this.velocity_x += 0.5; },

    update: function () {

        this.x += this.velocity_x;
        this.y += this.velocity_y;
        this.getright();
        this.getleft();
        this.getbottom();
        this.gettop();

    }

};

//*****NEW NEW NEW*******//

//Import NPC
//Definition NPC
Game.World.Npc = function (x, y) {

    this.color1 = "#f0f0f0";
    this.color2 = "#0000FF";
    this.height = 58;
    this.top = null;
    this.left = null;
    this.right = null;
    this.bottom = null;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 58;
    this.x = 1600;   //starting position
    this.y = 360 - 32 - 64; //on the ground
    this.moving = false;

};

Game.World.Npc.prototype = {

    constructor: Game.World.Npc,

    //getting position for collision detection

    getbottom: function () { return this.bottom = this.y; },
    getright: function () { return this.right = this.left + this.width; },
    getleft: function () { return this.left = this.x; },
    gettop: function () { return this.top = this.y + this.height; },

    //move function

    move: function () {

        if (this.moving == false) {

            this.velocity_x -= 0.7;

        };
    },


    //death function
    /*
    death: function () {}
    */

    update: function () {

        this.x += this.velocity_x;
        this.getleft();
        this.getright();
        this.gettop();
        this.getbottom();



    }
};

//*****NEW NEW NEW*******//





