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
    this.columns = 0;
    //Anzahl Tile Zeilen
    this.rows = 0;
    //Tile Größe in Pixeln
    this.tile_size = 16;
    //Codierung der einzelnen Tiles (Beispiel)
    this.map = "world.png";

    /* Height and Width now depend on the map size. */
    this.height = this.tile_size * this.rows;
    this.width = this.tile_size * this.columns;

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






