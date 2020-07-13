const Game = function () {

    this.world = {

        background: "grey",

        friction: 0.9,
        gravity: 3,

        height: 360,
        width: window.screen.width,

        player: new Game.Player(),

        height: 72,
        width: 128,

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
}

Game.prototype = { constructor: Game };

Game.Player = function (x, y) {

    this.color = "#ff0000";
    this.height = 16;
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 16;
    this.x = 100;
    this.y = 50;

};

Game.Player.prototype = {

    constructor: Game.Player,

    moveLeft: function () { this.velocity_x -= 0.5; },
    moveRight: function () { this.velocity_x += 0.5; },

    update: function () {

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }

};



