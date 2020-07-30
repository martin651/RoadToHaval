﻿const Game = function () {

    //Im Vergleich zu Version_3 gleich geblieben
    this.world = new Game.World();

    this.update = function () {

        this.world.update();

    };

};

Game.prototype = { constructor: Game };

/*BEGIN ----------------------------------------------------NEW NEW NEW ----------------------------------------------------*/

//_____________________________________________________________________________________//

//ANIMATOR Definition
Game.Animator = function (frame_set, delay, mode = "loop") {

    //ANimator Klasse --> Es "loopt" das Frame 
    this.count = 0;
    this.delay = (delay >= 1) ? delay : 1;
    this.frame_set = frame_set;         //Sheet/Bildarray - unterschiedliche Frame Sets von Player; 
    this.frame_index = 0;               //Array index - unterschiedliche Frame Sets von Player; 
    this.frame_value = frame_set[0];
    this.mode = mode;                   //es gibt pause/loop 

};
Game.Animator.prototype = {

    constructor: Game.Animator,

    animate: function () {

        switch (this.mode) {

            case "loop": this.loop(); break;    //Aufruf der Frames
            case "pause": break;        //keine Animation

        }

    },

    changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) { //ändert das Frame-Set wenn man z.B. links/rechts geht

        if (this.frame_set === frame_set) { return; }

        this.count = 0;
        this.delay = delay;
        this.frame_set = frame_set;
        this.frame_index = frame_index;
        this.frame_value = frame_set[frame_index];
        this.mode = mode;

    },

    loop: function () {

        this.count++;

        while (this.count > this.delay) {

            this.count -= this.delay;

            this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0; //fragt die Regionen der Images ab z.B. Idle-Left, wenn es Ende angelangen ist setzt es auf "0"

            this.frame_value = this.frame_set[this.frame_index];

        }

    }

};

//FRAME Definition
Game.Frame = function (x, y, width, height, offset_x = 0, offset_y = 0) {
    //zuständig für das Schneiden der Tilesets "Frames" --> Bewegung der Charaktere/Welt
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offset_x = offset_x;
    this.offset_y = offset_y;

};
Game.Frame.prototype = { constructor: Game.Frame };

//TILESET Definition
Game.TileSet = function (columns, tile_size) {

    this.columns = columns;
    this.tile_size = tile_size;

    let f = Game.Frame;

    //individuelle Anpassung der Arrays nötig, da hier definiert wird, welche Regionen/Bereiche des Tilsets ausgeschnitten werden sollen//

    this.frames = [new f(115, 96, 13, 16, 0, -4), // idle-left
    new f(50, 96, 13, 16, 0, -4), // jump-left
    new f(102, 96, 13, 16, 0, -4), new f(89, 96, 13, 16, 0, -4), new f(76, 96, 13, 16, 0, -4), new f(63, 96, 13, 16, 0, -4), // walk-left
    new f(0, 112, 13, 16, 0, -4), // idle-right
    new f(65, 112, 13, 16, 0, -4), // jump-right
    new f(13, 112, 13, 16, 0, -4), new f(26, 112, 13, 16, 0, -4), new f(39, 112, 13, 16, 0, -4), new f(52, 112, 13, 16, 0, -4), // walk-right
    //new f(81, 112, 14, 16), new f(96, 112, 16, 16), // carrot
    //new f(112, 115, 16, 4), new f(112, 124, 16, 4), new f(112, 119, 16, 4) // grass
    ];

};
Game.TileSet.prototype = { constructor: Game.TileSet };

//COLIDER Definition
Game.Collider = function () {

    /* I changed this so all the checks happen in y first order. */
    this.collide = function (value, object, tile_x, tile_y, tile_size) {

        switch (value) {

            case 1: this.collidePlatformTop(object, tile_y); break;
            case 2: this.collidePlatformRight(object, tile_x + tile_size); break;
            case 3: if (this.collidePlatformTop(object, tile_y)) return;
                this.collidePlatformRight(object, tile_x + tile_size); break;
            case 4: this.collidePlatformBottom(object, tile_y + tile_size); break;
            case 5: if (this.collidePlatformTop(object, tile_y)) return;
                this.collidePlatformBottom(object, tile_y + tile_size); break;
            case 6: if (this.collidePlatformRight(object, tile_x + tile_size)) return;
                this.collidePlatformBottom(object, tile_y + tile_size); break;
            case 7: if (this.collidePlatformTop(object, tile_y)) return;
                if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
                this.collidePlatformRight(object, tile_x + tile_size); break;
            case 8: this.collidePlatformLeft(object, tile_x); break;
            case 9: if (this.collidePlatformTop(object, tile_y)) return;
                this.collidePlatformLeft(object, tile_x); break;
            case 10: if (this.collidePlatformLeft(object, tile_x)) return;
                this.collidePlatformRight(object, tile_x + tile_size); break;
            case 11: if (this.collidePlatformTop(object, tile_y)) return;
                if (this.collidePlatformLeft(object, tile_x)) return;
                this.collidePlatformRight(object, tile_x + tile_size); break;
            case 12: if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
                this.collidePlatformLeft(object, tile_x); break;
            case 13: if (this.collidePlatformTop(object, tile_y)) return;
                if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
                this.collidePlatformLeft(object, tile_x); break;
            case 14: if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
                if (this.collidePlatformLeft(object, tile_x)) return;
                this.collidePlatformRight(object, tile_x + tile_size); break;
            case 15: if (this.collidePlatformTop(object, tile_y)) return;
                if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
                if (this.collidePlatformLeft(object, tile_x)) return;
                this.collidePlatformRight(object, tile_x + tile_size); break;

        }

    }

};
Game.Collider.prototype = {

    constructor: Game.Collider,

    collidePlatformBottom: function (object, tile_bottom) {

        if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {

            object.setTop(tile_bottom);
            object.velocity_y = 0;
            return true;

        } return false;

    },

    collidePlatformLeft: function (object, tile_left) {

        if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {

            object.setRight(tile_left - 0.01);
            object.velocity_x = 0;
            return true;

        } return false;

    },

    collidePlatformRight: function (object, tile_right) {

        if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {

            object.setLeft(tile_right);
            object.velocity_x = 0;
            return true;

        } return false;

    },

    collidePlatformTop: function (object, tile_top) {

        if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {

            object.setBottom(tile_top - 0.01);
            object.velocity_y = 0;
            object.jumping = false;
            return true;

        } return false;

    }

};





//OBJECT Definition
Game.Object = function (x, y, width, height) {

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

};
Game.Object.prototype = {

    constructor: Game.Object,

    /* Now does rectangular collision detection. */
    collideObject: function (object) {

        if (this.getRight() < object.getLeft() ||
            this.getBottom() < object.getTop() ||
            this.getLeft() > object.getRight() ||
            this.getTop() > object.getBottom()) return false;

        return true;

    },

    /* Does rectangular collision detection with the center of the object. */
    collideObjectCenter: function (object) {

        let center_x = object.getCenterX();
        let center_y = object.getCenterY();

        if (center_x < this.getLeft() || center_x > this.getRight() ||
            center_y < this.getTop() || center_y > this.getBottom()) return false;

        return true;

    },

    getBottom: function () { return this.y + this.height; },
    getCenterX: function () { return this.x + this.width * 0.5; },
    getCenterY: function () { return this.y + this.height * 0.5; },
    getLeft: function () { return this.x; },
    getRight: function () { return this.x + this.width; },
    getTop: function () { return this.y; },
    setBottom: function (y) { this.y = y - this.height; },
    setCenterX: function (x) { this.x = x - this.width * 0.5; },
    setCenterY: function (y) { this.y = y - this.height * 0.5; },
    setLeft: function (x) { this.x = x; },
    setRight: function (x) { this.x = x - this.width; },
    setTop: function (y) { this.y = y; }

};
//OBJECT 


//MOVING OBJECT Definition
Game.MovingObject = function (x, y, width, height, velocity_max = 15) {

    Game.Object.call(this, x, y, width, height);

    this.jumping = false;
    this.velocity_max = velocity_max;// added velocity_max so velocity can't go past 16
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x_old = x;
    this.y_old = y;

};
/* added setCenterX, setCenterY, getCenterX, and getCenterY */
Game.MovingObject.prototype = {

    getOldBottom: function () { return this.y_old + this.height; },
    getOldCenterX: function () { return this.x_old + this.width * 0.5; },
    getOldCenterY: function () { return this.y_old + this.height * 0.5; },
    getOldLeft: function () { return this.x_old; },
    getOldRight: function () { return this.x_old + this.width; },
    getOldTop: function () { return this.y_old; },
    setOldBottom: function (y) { this.y_old = y - this.height; },
    setOldCenterX: function (x) { this.x_old = x - this.width * 0.5; },
    setOldCenterY: function (y) { this.y_old = y - this.height * 0.5; },
    setOldLeft: function (x) { this.x_old = x; },
    setOldRight: function (x) { this.x_old = x - this.width; },
    setOldTop: function (y) { this.y_old = y; }

};
Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;
//MOVING OBJECT

//_____________________________________________________________________________________//

//WORLD Definition
Game.World = function (friction = 0.85, gravity = 2) {

    this.collider = new Game.Collider();

    this.friction = friction;
    this.gravity = gravity;

    this.columns = 50; //ALTERNATIV zone.
    this.rows = 11; //ALTERNATIV zone.

    this.tile_set = new Game.TileSet(50, 32);
    this.player = new Game.Player(32, 76);

    //this.zone_id = "00";

    //this.carrots = [];// the array of carrots in this zone;
    //this.carrot_count = 0;// the number of carrots you have.
    //this.doors = [];
    //this.door = undefined;
    this.tile_size = 32;
    this.height = this.tile_set.tile_size * this.rows;
    this.width = this.tile_set.tile_size * this.columns;

};
Game.World.prototype = {

    constructor: Game.World,

    collideObject: function (object) {

        /* I got rid of the world boundary collision. Now it's up to the tiles to keep
        the player from falling out of the world. */

        var bottom, left, right, top, value;

        top = Math.floor(object.getTop() / this.tile_set.tile_size);
        left = Math.floor(object.getLeft() / this.tile_set.tile_size);
        value = this.collision_map[top * this.columns + left];
        this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

        top = Math.floor(object.getTop() / this.tile_set.tile_size);
        right = Math.floor(object.getRight() / this.tile_set.tile_size);
        value = this.collision_map[top * this.columns + right];
        this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
        left = Math.floor(object.getLeft() / this.tile_set.tile_size);
        value = this.collision_map[bottom * this.columns + left];
        this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
        right = Math.floor(object.getRight() / this.tile_set.tile_size);
        value = this.collision_map[bottom * this.columns + right];
        this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

    },

    setup: function (zone) {

        //this.carrots = new Array();
        //this.doors = new Array();
        //this.grass = new Array();
        //this.collision_map = zone.collision_map;
        //this.graphical_map = zone.graphical_map;

        /*ANGAPASST*/
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
        this.graphical_map = this.map;
        this.columns = 50;
        this.rows = 11;
        //this.zone_id = zone.id;

        //for (let index = zone.carrots.length - 1; index > -1; --index) {

        //    let carrot = zone.carrots[index];
        //    this.carrots[index] = new Game.Carrot(carrot[0] * this.tile_set.tile_size + 5, carrot[1] * this.tile_set.tile_size - 2);

        //}

        //for (let index = zone.doors.length - 1; index > -1; --index) {

        //    let door = zone.doors[index];
        //    this.doors[index] = new Game.Door(door);

        //}

        //for (let index = zone.grass.length - 1; index > -1; --index) {

        //    let grass = zone.grass[index];
        //    this.grass[index] = new Game.Grass(grass[0] * this.tile_set.tile_size, grass[1] * this.tile_set.tile_size + 12);

        //}

        //if (this.door) {

        //    if (this.door.destination_x != -1) {

        //        this.player.setCenterX(this.door.destination_x);
        //        this.player.setOldCenterX(this.door.destination_x);// It's important to reset the old position as well.

        //    }

        //    if (this.door.destination_y != -1) {

        //        this.player.setCenterY(this.door.destination_y);
        //        this.player.setOldCenterY(this.door.destination_y);

        //    }

        //    this.door = undefined;// Make sure to reset this.door so we don't trigger a zone load.

        //}

    },

    update: function () {

        this.player.updatePosition(this.gravity, this.friction);

        this.collideObject(this.player);
        
       /*Anpassen 
        * 
        * 
        for (let index = this.carrots.length - 1; index > -1; --index) {

            let carrot = this.carrots[index];

            carrot.updatePosition();
            carrot.animate();

            if (carrot.collideObject(this.player)) {

                this.carrots.splice(this.carrots.indexOf(carrot), 1);
                this.carrot_count++;

            }

        }

        for (let index = this.doors.length - 1; index > -1; --index) {

            let door = this.doors[index];

            if (door.collideObjectCenter(this.player)) {

                this.door = door;

            };

        }

        for (let index = this.grass.length - 1; index > -1; --index) {

            let grass = this.grass[index];

            grass.animate();

        }
        */

        this.player.updateAnimation();

    }

};



//PLAYER = MOVING OBJECT Definition
Game.Player = function (x, y) {

    Game.MovingObject.call(this, x, y, 64, 60);

    Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-left"], 10);

    this.jumping = true;
    this.direction_x = -1;
    this.velocity_x = 0;
    this.velocity_y = 0;

};
Game.Player.prototype = {

    
    frame_sets: {

        "idle-left": [],
        "jump-left": [],
        "move-left": [, , , ],
        "idle-right": [],
        "jump-right": [],
        "move-right": [, , , ]

    },
    
    jump: function () {

        /* Made it so you can only jump if you aren't falling faster than 10px per frame. */
        if (!this.jumping && this.velocity_y < 10) {

            this.jumping = true;
            this.velocity_y -= 13;

        }

    },

    moveLeft: function () {

        this.direction_x = -1;
        this.velocity_x -= 0.55;

    },

    moveRight: function (/*frame_set*/) {

        this.direction_x = 1;
        this.velocity_x += 0.55;

    },

    //nachstehende Funktionen unverändert

    updateAnimation: function () {

        if (this.velocity_y < 0) {

            if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["jump-left"], "pause");
            else this.changeFrameSet(this.frame_sets["jump-right"], "pause");

        } else if (this.direction_x < 0) {

            if (this.velocity_x < -0.1) this.changeFrameSet(this.frame_sets["move-left"], "loop", 5);
            else this.changeFrameSet(this.frame_sets["idle-left"], "pause");

        } else if (this.direction_x > 0) {

            if (this.velocity_x > 0.1) this.changeFrameSet(this.frame_sets["move-right"], "loop", 5);
            else this.changeFrameSet(this.frame_sets["idle-right"], "pause");

        }

        this.animate();

    },
    
    updatePosition: function (gravity, friction) {

        this.x_old = this.x;
        this.y_old = this.y;

        this.velocity_y += gravity;
        this.velocity_x *= friction;

        /* Made it so that velocity cannot exceed velocity_max */
        if (Math.abs(this.velocity_x) > this.velocity_max)
            this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

        if (Math.abs(this.velocity_y) > this.velocity_max)
            this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }

};
Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;
/*PLAYER Definition*/

///NPC DEFINITION
//NPC = MOVING OBJECT Definition
//*
//* 
//* 
//Game.Npc = function (x, y) {

//    Game.MovingObject.call(this, x, y, 58, 58);

//    //Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-left"], 10);

//    this.moving = false; //analog ==> Game.World.Npc.moving
//    this.direction_x = -1;
//    this.velocity_x = 0;
//    this.velocity_y = 0;

//};
//Game.Npc.prototype = {

//    /*
//    frame_sets: {

//        "idle-left": [0],
//        "jump-left": [1],
//        "move-left": [2, 3, 4, 5],
//        "idle-right": [6],
//        "jump-right": [7],
//        "move-right": [8, 9, 10, 11]

//    },
//    */
//    /*
//    jump: function () {

//        // Made it so you can only jump if you aren't falling faster than 10px per frame. 
//        if (!this.jumping && this.velocity_y < 10) {

//            this.jumping = true;
//            this.velocity_y -= 13;

//        }

//    },
    
//    moveLeft: function () { //analog ==> Game.World.Npc.move()

//        this.direction_x = -1;

//        if (this.moving == false) {

//            this.velocity_x -= 0.7
//        };

//    },

//    /*
//    moveRight: function (/*frame_set) {

//        this.direction_x = 1;
//        this.velocity_x += 0.55;

//    },
    
    
//    updateAnimation: function () {

//        // MUSS ANGEPASST werden DIRECTION ist immer links also -1

//        //Prüfen ob benötigt wird
//        if (this.velocity_y < 0) {

//            if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["jump-left"], "pause");
//            else this.changeFrameSet(this.frame_sets["jump-right"], "pause");

//        } 

//        //==> WIRD BENÖTIGT
//        else if (this.direction_x < 0) {

//            if (this.velocity_x < -0.1) this.changeFrameSet(this.frame_sets["move-left"], "loop", 5);
//            else this.changeFrameSet(this.frame_sets["idle-left"], "pause");

//        } 

//        //Prüfen ob benötigt wird

//        else if (this.direction_x > 0) {

//            if (this.velocity_x > 0.1) this.changeFrameSet(this.frame_sets["move-right"], "loop", 5);
//            else this.changeFrameSet(this.frame_sets["idle-right"], "pause");

//        }

//        //==> WIRD BENÖTIGT
//        this.animate();

//    },
    
//    updatePosition: function (gravity, friction) {

//        this.x_old = this.x;
//        this.y_old = this.y;

//        this.velocity_y += gravity;
//        this.velocity_x *= friction;

//         Made it so that velocity cannot exceed velocity_max 
//        if (Math.abs(this.velocity_x) > this.velocity_max)
//            this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

//        if (Math.abs(this.velocity_y) > this.velocity_max)
//            this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

//        this.x += this.velocity_x;
//        this.y += this.velocity_y;

//    }

//};
//Object.assign(Game.Npc.prototype, Game.MovingObject.prototype);
////Object.assign(Game.Npc.prototype, Game.Animator.prototype);
//Game.Npc.prototype.constructor = Game.Npc;
//*/
////NPC Definition

///* The carrot class extends Game.Object and Game.Animation. */
//Game.Koeftespiess = function (x, y) {

//    Game.Object.call(this, x, y, 7, 14);
//    //Game.Animator.call(this, Game.Carrot.prototype.frame_sets["twirl"], 15);

//    //this.frame_index = Math.floor(Math.random() * 2);

//    /* base_x and base_y are the point around which the carrot revolves. position_x
//    and y are used to track the vector facing away from the base point to give the carrot
//    the floating effect. */
//    this.base_x = x;
//    this.base_y = y;
//    this.position_x = Math.random() * Math.PI * 2;
//    this.position_y = this.position_x * 2;

//};
//Game.Koeftespiess.prototype = {

//    //frame_sets: { "twirl": [12, 13] },

//    updatePosition: function () {

//        this.position_x += 0.1;
//        this.position_y += 0.2;

//        this.x = this.base_x + Math.cos(this.position_x) * 2;
//        this.y = this.base_y + Math.sin(this.position_y);

//    }

//};
//Object.assign(Game.Koeftespiess.prototype, Game.Object.prototype);
////Object.assign(Game.Koeftespiess.prototype, Game.Animator.prototype);
//Game.Koeftespiess.prototype.constructor = Game.Koeftespiess;

/*END ----------------------------------------------------NEW NEW NEW ----------------------------------------------------*/




/* ------------------------------ OLD WORLD DECLARATION -------------------------*/



////WORLD CLASS
//Game.World = function (friction = 0.9, gravity = 3) {

//    this.friction = friction;
//    this.gravity = gravity;

//    // BEGINN -----> Export as own class

//        ///* Player is now its own class inside of the Game.World object. */
//        //this.player = new Game.World.Player();

    
//        ///* NPC is now its own class inside of the Game.World object. */
//        //this.npc = new Game.World.Npc();

//        ////****NEW NEW NEW****//

//        ///* NPC is now its own class inside of the Game.World object. */
//        //this.koftespiess = new Game.World.Koftespiess();

//        ////****NEW NEW NEW****//


//    // ENDE -----> Export as own class


//    // Anzahl Tile Spalten
//    this.columns =50;
//    //Anzahl Tile Zeilen
//    this.rows = 11;
//    //Tile Größe in Pixeln
//    this.tile_size = 32;
//    //Codierung der einzelnen Tiles (Beispiel)
//    //Codierung der Map
//    //--> Prison Pixel Art.png
//    // --> Tiles müssen evtl. noch erweitert werden, da Map noch zu klein ist
//    this.map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
//        50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
//        100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
//        150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199,
//        200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249,
//        250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299,
//        300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349,
//        350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399,
//        400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449,
//        450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499,
//        450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499
//    ];

//    /* Height and Width now depend on the map size. */
//    this.height = this.tile_size * this.rows;
//    this.width = this.tile_size * this.columns;

  
//};
//Game.World.prototype = {

//    constructor: Game.World,

//    collideObject: function (object) {


//        // Ground
//        if (object.y > 360 - 32 - 64) {
//            object.jumping = false; //jump once
//            object.y = 360 - 32 - 64; //defines position of ground
//        }
//        //boundry of the world (left rim)
//        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
//        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
//        //boundry of the world  (upper rim)
//        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
//        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }
//        //on Top
//        if (object.getbottom() >= object.gettop()) { object.y = object.y + object.height; }


//    },


//    /////-----HIER WEITERMACHEN-------/////////
//    //COLLISION AND REPSONSE 28.07.2020//

//    goCollision: function (player, npc) {


//        // GAME OVER Collision
//        if (this.player.getright() >= this.npc.getleft() && this.player.getleft() < this.npc.getright() && this.player.y == this.npc.y) {

//            this.npc.moving = true;
//            this.npc.velocity_x = 0;
//            this.player.velocity_x = 0;
//            console.log("G O COLLISION");


//            return true;
//        };

        
//            return false;
        
//    },

//    toCollision: function (player, npc) {


//        // Top Collision
//        if (this.player.getbottom() >= this.npc.gettop() && this.player.getleft() >= this.npc.getleft() && this.player.getright() >= this.npc.getright){

//            console.log("TOP COLLISION");
//        };
//        return false;
//    },




//    update: function () {

//        this.player.velocity_y += this.gravity;
//        this.player.update();

//        this.player.velocity_x *= this.friction;
//        this.player.velocity_y *= this.friction;

//        this.npc.update();

//        this.npc.velocity_x *= this.friction;
//        this.npc.velocity_y *= this.friction;


//        //Collision
//        this.collideObject(this.player);
//        this.goCollision();
//        this.toCollision();

//        //preparing Köftespieß counter

//        /*
//        if (koftspiess.collideObject(this.player)) {

//            this.koftspiess.splice(this.koftspiess.indexOf(koftspiess), 1);
//            this.koftspiess_count++;

//        }
//        */
        
        
       

//        //if player moves - enenmy start to move//
//        if (this.player.x != 0) {
           
//            this.npc.move();
//        };

//        //Everytime a NPC is leaving the screen a new one will be created 
//        if (this.npc.x < 0) {
//            this.npc.constructor();

//        };        


//         /*ENDE_______FROM MAIN.js______*****NEW NEW NEW********/

//        //<<<<<DEMO COLLISION>>>>>>//

//        //----CHECK postition PLAYER & NPC

//            //Get position player
//            //console.log("x: ", this.player.getright() + "y: ", this.player.getbottom());

//            //Get position player
//            //console.log("x: ", this.npc.getleft() /*+ "y: ", this.player.getbottom()*/);

//        //if (this.player.right >= this.npc.left) {

//        //    this.npc.moving = true
//        //    this.npc.velocity_x = 0;
            

//        //    console.log("GAME OVER");
//        //};
        

//    }

//};
////WORLD END CLASS

////PLAYER class
//Game.World.Player = function (x, y) {

//    this.color1 = "#404040";
//    this.color2 = "#f0f0f0";
//    this.height = 60;
//    this.jumping = true;
//    this.velocity_x = 0;
//    this.velocity_y = 0;
//    this.width = 64;
//    this.x = 0;
//    this.y = 0;
//    this.right = null;
//    this.left = null;
//    this.bottom = null;
//    this.top = null;

//};
//Game.World.Player.prototype = {

//    constructor: Game.World.Player,

//    //*****NEW NEW NEW*******//
//    //getting position for collision detection

//    gettop: function () { return this.top = this.y + this.height; },
//    getbottom: function () { return this.bottom = this.y; },
//    getright: function () { return this.right = this.x + this.width; },
//    getleft: function () { return this.left = this.x; },


//    //*****NEW NEW NEW*******//

//    //move+jump function

//    jump: function () {

//        if (!this.jumping) {

//            this.jumping = true;
//            this.velocity_y -= 65;

//        }

//    },

//    moveLeft: function () { this.velocity_x -= 0.5; },
//    moveRight: function () { this.velocity_x += 0.5; },

//    update: function () {

//        this.x += this.velocity_x;
//        this.y += this.velocity_y;
//        this.getright();
//        this.getleft();
//        this.getbottom();
//        this.gettop();

//    }

//};
////PLAYER END CLASS//


////NPC CLASS
//Game.World.Npc = function (x, y) {

//    this.color1 = "#f0f0f0";
//    this.color2 = "#0000FF";
//    this.height = 58;
//    this.top = null;
//    this.left = null;
//    this.right = null;
//    this.bottom = null;
//    this.velocity_x = 0;
//    this.velocity_y = 0;
//    this.width = 58;
//    this.x = 1600;   //starting position
//    this.y = 360 - 32 - 64; //on the ground
//    this.moving = false;

//};
//Game.World.Npc.prototype = {

//    constructor: Game.World.Npc,

//    //getting position for collision detection

//    getbottom: function () { return this.bottom = this.y; },
//    getright: function () { return this.right = this.left + this.width; },
//    getleft: function () { return this.left = this.x; },
//    gettop: function () { return this.top = this.y + this.height; },

//    //move function

//    move: function () {

//        if (this.moving == false) {

//            this.velocity_x -= 0.7;

//        };
//    },

//    update: function () {

//        this.x += this.velocity_x;
//        this.getleft();
//        this.getright();
//        this.gettop();
//        this.getbottom();

//    }
//};
////NPC  CLASS END//


////ITEM CLASS "Köftespieß"
//Game.World.Koftespiess = function (x, y) {

//    /*
//        Game.Object.call(this, x, y, 7, 14);
//        Game.Animator.call(this, Game.Carrot.prototype.frame_sets["twirl"], 15);

//        this.frame_index = Math.floor(Math.random() * 2);
//    */


//    //TEST
//    this.color1 = "#FFD700";
//    this.color2 = "#A0522D";
//    this.height = 32;
//    this.width = 32;
//    this.x = 300;
//    this.y = 150;



//    /* base_x and base_y are the point around which the carrot revolves. position_x
//     and y are used to track the vector facing away from the base point to give the carrot
//     the floating effect. */
//    this.base_x = x;
//    this.base_y = y;
//    this.position_x = Math.random() * Math.PI * 2;
//    this.position_y = this.position_x * 2;
//};
//Game.World.Koftespiess.prototype = {

//    // frame_sets: { "twirl": [12, 13] },

//    updatePosition: function () {

//        this.position_x += 0.1;
//        this.position_y += 0.2;

//        this.x = this.base_x + Math.cos(this.position_x) * 2;
//        this.y = this.base_y + Math.sin(this.position_y);

//    }





//};
////ITEM CLASS END//
