//handles user input (keyboard input)
var controller = new Controller();
//Windows resizing while gaming etc.
var display = new Display(document.querySelector("canvas"));
//game logic
var game = new Game();
//interaction of the three components above (1000/30= 30 frames per second)
var engine = new Engine(1000 / 30);

display.resize();
//executes render, update functions 30 times a second
engine.start();
