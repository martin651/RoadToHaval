const Game = function () {

    //Im Vergleich zu Version_3 gleich geblieben
    this.world = new Game.World();

    this.update = function () {

        this.world.update();

    };

};

Game.prototype = { constructor: Game };

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

    this.frames = [
        /**PLAYER FRAMES***/
        new f(0, 128, 64, 60, 0, 0), // Player idle-right
        new f(192, 192, 64, 60, 0, 0), new f(256, 192, 64, 60, 0, 0), new f(320, 192, 64, 60, 0, 0),  // Player jump-left
        new f(0, 64, 64, 60, 0, 0), new f(64, 64, 64, 60, 0, 0), new f(128, 64, 64, 60, 0, 0), new f(192, 64, 64, 60, 0, 0), // Player walk-left
        new f(0, 64, 64, 60,0,0), // Player idle-left
        new f(0, 192, 64, 60, 0, 0), new f(64, 192, 64, 60, 0, 0), new f(128, 192, 64, 60, 0, 0), // Player jump-right
        new f(0, 128, 64, 60, 0, 0), new f(64, 128, 64, 60, 0, 0), new f(128, 128, 64, 60, 0, 0), new f(192, 128, 64, 60, 0, 0), // Player walk-right
        /**NPC FRAMES***/
        new f(0, 0, 64, 64, 0, 0), new f(65, 0, 64, 64, 0, 0), new f(129, 0, 64, 64, 0, 0), // NPC walk left
        /**KÖFTE FRAMES***/
        new f(7*64, 3*64, 64, 64, 0, -4), // Köftespieß
        
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

    Object: function (object) {

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
    /***NEW NEW NEW***/
    this.alive = true;

};
Game.MovingObject.prototype = {

    getOldBottom: function () { return this.y_old + this.height; },
    getOldCenterX: function () { return this.x_old + this.width * 0.5; },
    getOldCenterY: function () { return this.y_old + this.height * 0.5; },
    getOldLeft: function () { return this.x_old; },
    getOldRight: function () { return this.x_old + this.width; },
    getOldTop: function () { return this.y_old; },
    getAlive: function () {return this.alive},
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

    /***NEW NEW NEW***/
    //For Scroll function
    distance= 0;
    max_distance= 15;
    speed = 5;
    offset = 0;
    i = 0;
    //For Scroll function

    this.columns = 50; //ALTERNATIV zone.
    this.rows = 12; //ALTERNATIV zone.
    this.graphical_map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
        50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
        100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
        150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199,
        200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249,
        250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299,
        300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349,
        350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399,
        400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449,
        450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499,
        450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499,
        500, 501, 502,503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549

       
    ];
    this.tile_setWorld = new Game.TileSet(50, 32);
    this.tile_setPlayer = new Game.TileSet(8, 64);
    this.player = new Game.Player(10, 360 - 32 - 64);

    /**NEW NEW NEW **/
    this.npc = new Game.Npc(1100, 360 - 32 - 64);
    //this.koeftespiess = new Game.Koeftespiess(50, 360 - 32 - 64);



    /**NEW for creating Koeftespiess **/
    this.zone_id = "00";

    this.koeftespiesseArray = []; //Position of Koeftespiess
    this.koeftespiess_count = 0;// the number of Köftespieß you have.

   
    //this.doors = [];
    //this.door = undefined;
    //this.tile_size = 32;
    this.height = this.tile_setWorld.tile_size * this.rows;
    this.width = this.tile_setWorld.tile_size * this.columns;

};
Game.World.prototype = {

    constructor: Game.World,

    collideObject: function (object) {

        /* I got rid of the world boundary collision. Now it's up to the tiles to keep
        the player from falling out of the world. */

       
        if (object.y > 360 - 32 - 64) {

          
            object.jumping = false; //jump once
            object.y = 360 - 32 - 64; //defines position of ground
        };

        //boundry of the world (left rim)
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        //boundry of the world  (upper rim)
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }

    },

    woCollision: function () {

        // GAME OVER Collision
        
        if (this.player.getRight() >= this.npc.getLeft() &&
            this.player.getLeft() < this.npc.getLeft() &&
            this.player.getLeft() < this.npc.getRight() &&
            this.player.getBottom() == this.npc.getBottom() &&
            this.player.getTop() == this.npc.getTop()) {
            
            this.player.alive = false;

            if (confirm('Game Over! Retry?')) {
                window.location.reload();
            }

            return true;
        };

        // NPC Death Collision
        if (this.player.getTop() < this.npc.getTop() &&
            this.player.getRight() >= this.npc.getLeft() &&
            this.player.getLeft() < this.npc.getRight() &&
            this.player.getBottom() >= this.npc.getTop()) {

            this.npc.alive = false;

        };

        //if (this.koeftespiess.getRight() <= this.player.getRight()) {

            //splice-function --> method adds/removes items to/from an array, and returns the removed item(s).
            //array.splice(index, howmany, item1, ....., itemX) --> index = int specifies pos; 
            //                                                  --> howmany = optional - The number of items to be removed.If set to 0, no items will be removed
            //                                                  --> item1/x = optional - The new item(s) to be added to the array

        //    this.koeftespiess_count+=1;
        //    this.koeftespiess.constructor();

        //};

        return false;

    },

    //Moving NPC's 
    simulation: function (object) {

        if (this.player.velocity_x > 0) {

            this.npc.moving = false;
            this.npc.moveLeft();
        };

    },

    //Scrolling Background function 
    scroll: function () {

        distance += speed;


        if (distance > max_distance) max_distance = distance;

        offset += speed;

        

        while (offset >= this.tile_size && i<50) {

            offset -= this.tile_size;

            

            for (let index = 0; index < this.columns * 8 + 1 + i; index +=this.columns) {

                this.graphical_map.splice(index, 1);
                this.graphical_map.splice(index + this.columns - 1, 0, index+i);


            };

            i += 1;

            if (i == 49) {

                i = 0;

            }

                
            
        };
            
        
    },

    //NEW for creating Koeftespiess
    setup: function (zone) {

        this.koeftespiesseArray = new Array();
        //this.doors = new Array();
        //this.grass = new Array();
        //this.collision_map = zone.collision_map;
        //this.graphical_map = zone.graphical_map;
        //this.columns = zone.columns;
        //this.rows = zone.rows;
        this.zone_id = zone.id;

        for (let index = 0; index <zone.koeftespiesseArray.length; index++) {

            let koeftespiess = zone.koeftespiesseArray[index];
            koeftespiess[index] = new Game.Koeftespiess(koeftespiess[0] * this.tile_setPlayer.tile_size, koeftespiess[1] * this.tile_setPlayer.tile_size - 2);

            console.log(koeftespiess[index]);
            
        };
       

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
    
    update: function (zone) {

        //Trigger Scroll Background
        if (this.player.getRight() > 150) {
            this.scroll();
            //console.log("player Bottom: " + this.player.getBottom());
            //console.log("NPC TOP: " + this.npc.getTop());
        };

        
        //Player
        this.player.updatePosition(this.gravity, this.friction);
        this.player.updateAlive(this.player);
        this.collideObject(this.player);
        
       
        //NPC
        this.npc.updatePosition(this.gravity, this.friction);
        this.npc.updateAlive(this.npc);
        this.collideObject(this.npc);

        this.simulation(this.player);
        this.woCollision();        
    

        //    let carrot = this.carrots[index];
        for (let index = 0; index < this.koeftespiesseArray.length; index++) {

            let koeftespiessvar = this.koeftespiesseArray[index];
            koeftespiessvar.updatePosition();
            koeftespiessvar.animate();

            //if (koeftespiessvar.collideObjectCenter(this.player)) {

            //    this.koeftespiesseArray.splice(this.koeftespiesseArray.indexOf(koeftespiessvar), 1);
            //    this.koeftespiess_count++;

            //};
        };

        this.player.updateAnimation();
        this.npc.updateAnimation();

        
        

    }

};


//PLAYER Definition//
//PLAYER = MOVING OBJECT Definition
Game.Player = function (x, y) {

    Game.MovingObject.call(this, x, y, 24, 24);

    Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-right"], 10);

    this.jumping = false;
    this.direction_x = 0.1;
    this.velocity_x = 0;
    this.velocity_y = 0;

};
Game.Player.prototype = {

    
    frame_sets: {

        "idle-left": [8],
        "jump-left": [1,2,3],
        "move-left": [4,5,6,7],
        "idle-right": [0],
        "jump-right": [9,10,11],
        "move-right": [12,13,14,15]

    },
    
    jump: function () {

        /* Made it so you can only jump if you aren't falling faster than 10px per frame. */
        if (!this.jumping /*&&*/ /*this.velocity_y < 10*/) {

            this.jumping = true;
            this.velocity_y -= 80;

        }

    },

    moveLeft: function () {

        this.direction_x = -1;
        this.velocity_x -= 0.55;

    },

    moveRight: function () {

        this.direction_x = 1;
        this.velocity_x += 0.55;

    },

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

    },

    updateAlive: function () {

        this.getAlive();

        if (this.alive != true) {

            this.npc.moving = true;
            this.npc.velocity_x = 0;
            this.player.velocity_x = 0;         


        };
    }

};
Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;


///NPC DEFINITION
//NPC = MOVING OBJECT Definition
Game.Npc = function (x, y) {

    Game.MovingObject.call(this, x, y, 24, 24);

    Game.Animator.call(this, Game.Npc.prototype.frame_sets["idle-left"], 10);

    this.moving = false; //analog ==> Game.World.Npc.moving
    this.direction_x = -1;
    this.velocity_x = 0;
    this.velocity_y = 0;
   

};
Game.Npc.prototype = {

    
    frame_sets: {

        "idle-left": [16],
        "move-left": [16, 17, 18],

    },
        
    moveLeft: function () { //analog ==> Game.World.Npc.move()

        this.direction_x = -1;

        if (this.moving == false) {

            this.velocity_x -= 0.7
        };

    },

    stopMoving: function () {

        if (this.getLeft() == 0) {


            this.velocity_x = 0;
            
        };


    },

    
    //moveRight: function (frame_set) {

    //    this.direction_x = 1;
    //    this.velocity_x += 0.55;

    //},
    
    
    updateAnimation: function () {

        // MUSS ANGEPASST werden DIRECTION ist immer links also -1

        //Prüfen ob benötigt wird
        //if (this.velocity_y < 0) {

        //    if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["jump-left"], "pause");
        //    else this.changeFrameSet(this.frame_sets["jump-right"], "pause");

        //} 

        
        if (this.direction_x < 0) {

            if (this.velocity_x < -0.1) this.changeFrameSet(this.frame_sets["move-left"], "loop", 5);
            else this.changeFrameSet(this.frame_sets["idle-left"], "pause");

        } 

        //Prüfen ob benötigt wird

        //else if (this.direction_x > 0) {

        //    if (this.velocity_x > 0.1) this.changeFrameSet(this.frame_sets["move-right"], "loop", 5);
        //    else this.changeFrameSet(this.frame_sets["idle-right"], "pause");

        //}

        
        this.animate();

    },
    
    updatePosition: function (gravity, friction) {

        this.x_old = this.x;
        this.y_old = this.y;

        this.velocity_y += gravity;
        this.velocity_x *= friction;

         //Made it so that velocity cannot exceed velocity_max 
        if (Math.abs(this.velocity_x) > this.velocity_max)
            this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

        if (Math.abs(this.velocity_y) > this.velocity_max)
            this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    },

    updateAlive: function () {

        this.getAlive();

        if (this.alive != true) {

          
          this.constructor();
            

        };
    }

};
Object.assign(Game.Npc.prototype, Game.MovingObject.prototype);
Object.assign(Game.Npc.prototype, Game.Animator.prototype);
Game.Npc.prototype.constructor = Game.Npc;

//NPC Definition
// The Köftespieß class extends Game.Object and Game.Animation. //
Game.Koeftespiess = function (x, y) {

    Game.Object.call(this, x, y, 64, 64);
    Game.Animator.call(this, Game.Koeftespiess.prototype.frame_sets["twirl"], 15);

    this.frame_index = Math.floor(Math.random() * 2);

    /* base_x and base_y are the point around which the carrot revolves. position_x
    and y are used to track the vector facing away from the base point to give the carrot
    the floating effect. */
    this.base_x = x;
    this.base_y = y;
    this.position_x = Math.random() * Math.PI * 2;
    this.position_y = this.position_x * 2;

};
Game.Koeftespiess.prototype = {

    frame_sets: { "twirl": [19] },

    updatePosition: function () {

        this.position_x += 0.1;
        this.position_y += 0.2;

        this.x = this.base_x + Math.cos(this.position_x) * 2;
        this.y = this.base_y + Math.sin(this.position_y);


    }

};
Object.assign(Game.Koeftespiess.prototype, Game.Object.prototype);
Object.assign(Game.Koeftespiess.prototype, Game.Animator.prototype);
Game.Koeftespiess.prototype.constructor = Game.Koeftespiess;

