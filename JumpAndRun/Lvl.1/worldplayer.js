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

    // Anzahl Tile Spalten
    this.columns =25;
    //Anzahl Tile Zeilen
    this.rows = 5;
    //Tile Größe in Pixeln
    this.tile_size = 64;
    //Codierung der einzelnen Tiles (Beispiel)
    //Codierung der Map
    //--> Prison Pixel Art.png
    // --> Tiles müssen evtl. noch erweitert werden, da Map noch zu klein ist
    this.map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
        50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
        75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
        100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124
];

    /* Height and Width now depend on the map size. */
    //this.height = this.tile_size * this.rows;
    //this.width = this.tile_size * this.columns;

    this.height = 360;
    this.width = window.screen.width;
};

Game.World.prototype = {

    constructor: Game.World,

    collideObject: function (object) {// Same as in part 2.


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

    },

    update: function () {

        this.player.velocity_y += this.gravity;
        this.player.update();

        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;

        this.collideObject(this.player);

    }

};

//Player eigene Klasse
Game.World.Player = function (x, y) {

    this.color1 = "#404040";
    this.color2 = "#f0f0f0";
    this.height = 12;
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 12;
    this.x = 100;
    this.y = 50;

};

Game.World.Player.prototype = {

    constructor: Game.World.Player,

    jump: function () {

        if (!this.jumping) {

            this.jumping = true;
            this.velocity_y -= 60;

        }

    },

    moveLeft: function () { this.velocity_x -= 0.5; },
    moveRight: function () { this.velocity_x += 0.5; },

    update: function () {

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }

};






