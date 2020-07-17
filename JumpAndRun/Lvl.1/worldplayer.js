const Game = function () {

    this.world = {

        background_color: "rgba(40,48,56,0.25)",

        friction: 0.9,
        gravity: 3,

        player: new Game.Player(),
        npc: new Game.Npc(),

        height: 360,
        width: window.screen.width,

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


        },

        update: function () {

            //Player moves
            this.player.velocity_y += this.gravity;
            this.player.update();

            this.player.velocity_x *= this.friction;
            this.player.velocity_y *= this.friction;

            //*****NEW NEW NEW*******//

            //NPC moves
            this.npc.velocity_y += this.gravity;
            this.npc.update();

            this.npc.velocity_x *= this.friction;
            this.npc.velocity_y *= this.friction;

            //*****NEW NEW NEW*******//
            this.collideObject(this.player);

        }
    };

    this.update = function () {

        this.world.update();

    };
};

Game.prototype = { constructor: Game };

//Definition of Player-Character
Game.Player = function (x, y) {

    this.color = "#ff0000";
    this.height = 32;
    this.jumping = false;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 32;
    this.x = 0;
    this.y = 0;

};

//Definition character function
Game.Player.prototype = {

    constructor: Game.Player,

    jump: function () {

        if (!this.jumping) {

            this.jumping = true;
            this.velocity_y -= 60;
            
               

        };
      
    },  
          
 
    moveLeft: function () { this.velocity_x -= 0.5; },
    moveRight: function () { this.velocity_x += 0.5; },

    update: function () {

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }

};

//*****NEW NEW NEW*******//

//Import NPC
//Definition NPC
Game.Npc = function (x, y) {

    this.color = "#0000FF";
    this.height = 32;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 32;
    this.x = 1550//window.screen.width;   //starting position
    this.y = 360 - 32 - 64; //on the ground

};

Game.Npc.prototype = {

    constructor: Game.Npc,

    //moving functions

    
    move: function () {


        this.velocity_x -= 0.7;


    },

    update: function () {

        this.x += this.velocity_x;



    }
};

//*****NEW NEW NEW*******//





