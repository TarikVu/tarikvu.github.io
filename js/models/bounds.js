
// Returns Four rectangle bodies that outlines the game screen.
// The top and bottom Walls have extra padding for the screen vertices.
var Bodies = Matter.Bodies
export class Bounds {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        var wallThick = 150;
        this.wallTop = Bodies.rectangle(
            // x,y
            (this.width / 2) - 100,
            0 - wallThick / 2,
            // w,h
            this.width + 200,
            wallThick,
            { isStatic: true, }
        );

        this.wallBot = Bodies.rectangle(
            // x,y
            (this.width / 2) - 100,
            this.height + (wallThick / 2),
            // w,h
            this.width + 200,
            wallThick,
            { isStatic: true}
        );

        this.wallLeft = Bodies.rectangle(
            // x,y
            0 - wallThick / 2,
            this.height / 2,
            // w,h
            wallThick,
            this.height,
            { isStatic: true}
        );

        this.wallRight = Bodies.rectangle(
            // x,y
            this.width + wallThick / 2,
            this.height / 2,
            // w,h
            wallThick,
            this.height,
            { isStatic: true}
        );

        // Setting friction after creation for static bodies
        // Matter.js oversight / bug? REF README
        // without this, a body colliding with a vertical wall
        // would slowly slide down the side. 
        this.wallTop.friction = 0;
        this.wallBot.friction = 0;
        this.wallLeft.friction = 0;
        this.wallRight.friction = 0;

    }


}