const Game = function () {
    this.world = {
        background: "grey";

       var context.canvas.width = window.screen.width
       var context.canvas.height = 360       // x, y, width, height


        friction: 0.9,
        gravity: 3,

        player: new Game.Player(),

        height: context.canvas.height;
        width: context.canvas.width;



    // if rectangle is falling below floor line
    // Defines Y-Position of the ground
    if(Object.y > 360 - 32 - 64) {
        Object.jumping = false;
        Object.y = 360 - 32 - 64;
        Object.y_velocity = 0;

    }

    // if rectangle is going off the left of the screen
    // Defines X-Position of the ground
    if (Object.x < -(context.canvas.width / 10)) {

        Object.x = context.canvas.width;

    } else if (Object.x > context.canvas.width) {// if rectangle goes past right boundary

        Object.x = -(context.canvas.width / 10);

    }


    }
}