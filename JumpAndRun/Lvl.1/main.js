/*Test 
 * Aktivität 14.02 Bewegung der Figur
 * MN;PS
 * Darstellung und Aufruf Fenster & Figur
 */
var context, controller, rectangle, loop, height, width;

context = document.getElementById("myCanvas").getContext("2d");
//document.getElementById("myCanvas").getContext("2d").getContext.width;



window.screen.height;
window.screen.width;

context.canvas.height = 360;
context.canvas.width = window.screen.width;


//character
rectangle = {

    height: 50, //char-höhe
    jumping: true,
    width: 25, //Char-breite
    x: 0, // x-startposition
    x_velocity: 0,
    y: 0, //y-startposition
    y_velocity: 0

};

//Controlling Keys/Events
controller = {

    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37:// left key
                controller.left = key_state;
                break;
            case 38:// up key
                controller.up = key_state;
                break;
            case 39:// right key
                controller.right = key_state;
                break;

        }

    }

};

//Game-Loop Function
loop = function () {


    //Jumping Function
    
    if (controller.up && rectangle.jumping == false) {
        
        rectangle.y_velocity -= 20 //Jumping strength;
        rectangle.jumping = true;

    }

    //Moving left -> Speed

    if (controller.left) {

        rectangle.x_velocity -= 0.5;

    }

    //Moving right -> Speed character

    if (controller.right) {

        rectangle.x_velocity += 0.5;

    }

    rectangle.y_velocity += 1.5;// gravity
    rectangle.x += rectangle.x_velocity;//Position.X + Move.X
    rectangle.y += rectangle.y_velocity;//Position.Y + Move.Y
    rectangle.x_velocity *= 0.9;// friction - slow down
    rectangle.y_velocity *= 0.9;// friction - jumping strenth

    // if rectangle is falling below floor line
    // Defines Y-Position of the ground
    if (rectangle.y > 360 - 32 - 64) {
                rectangle.jumping = false;
        rectangle.y = 360 - 32 - 64;
        rectangle.y_velocity = 0;

    }

    // if rectangle is going off the left of the screen
    // Defines X-Position of the ground
    if (rectangle.x < -(context.canvas.width/10)) {

        rectangle.x = context.canvas.width;

    } else if (rectangle.x > context.canvas.width) {// if rectangle goes past right boundary

        rectangle.x = -(context.canvas.width / 10);

    }
    //Black Screen
        //context.fillStyle = "#202020";
        /*context.fillStyle = "grey";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);// x, y, width, height
        */
        


    //Red Box
        //context.fillStyle = "#ff0000";// hex for red
        context.fillStyle = "blue";
        context.beginPath();
        context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        context.fill();
        



    ////Graue Linie
    //context.strokeStyle = "#202830";
    //context.lineWidth = 4;
    //context.beginPath();
    //context.moveTo(0, 164);
    //context.lineTo(320, 164);
    //context.stroke();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);


};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);