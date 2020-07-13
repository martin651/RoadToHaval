const Game = function () {

    this.world = {

        background_color: "rgba(40,48,56,0.25)",

        friction: 0.9,
        gravity: 3,

        player: new Game.Player(),

        height: 360,
        width: window.screen.width,

        collideObject: function (object) {

            // Ground
            if (object.y > 360 - 32 - 64) {
                //object.jumping = false;
                object.y = 360 - 32 - 64;
                object.y_velocity = 0;
            }

            if (object.x < 0) { object.x = 0; object.velocity_x = 0; } //Begrenzung Spielwelt
            else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
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

    this.update = function () {

        this.world.update();

    };
};

Game.prototype = { constructor: Game };

Game.Player = function (x, y) {

    this.color = "#ff0000";
    this.height = 32;
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 32;
    this.x = 0;
    this.y = 0;

};

Game.Player.prototype = {

    constructor: Game.Player,

    jump: function () {
        this.jumping = true;
        this.velocity_y -= 60;
    },

    moveLeft: function () { this.velocity_x -= 0.5; },
    moveRight: function () { this.velocity_x += 0.5; },

    update: function () {

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }

};





