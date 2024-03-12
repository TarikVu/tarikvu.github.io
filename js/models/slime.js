import { Sprite } from './sprite.js'

// Module aliases
var Bodies = Matter.Bodies

export class Slime {
    constructor({
        position,
        debug = false
    }
    ) {

        this.width = 80;
        this.height = 40;
        this.position = position;

        // offset to align ctx and matter drawing
        this.position.x += this.width / 2;
        this.position.y -= this.height / 2;


        this.image = document.getElementsByClassName("enemy")[0];
        this.flipped = true;

        // Debugging
        this.debug = debug;


        // Create The Slime's sprite &
        // body for the physics engine.
        this.sprite = new Sprite(
            {
                image: this.image,
                position: this.position,
                flipped: this.flipped,
                scale: 3,
                ColRow: { cols: 8, rows: 3 },
                framesHold: 18,
                offset: { x: 10, y: 30 },
                showDrawBox: this.debug
            }
        );

        // inf inertia keeps ctx.draw consistent /w body
        // because this disables rotations.
        this.body = Bodies.rectangle(
            position.x,
            position.y,
            this.width,
            this.height,
            {
                inertia: Infinity,
                restitution: 0.35,
                friction: 0.005,
                chamfer:5
            }
        );

    }

    // update position w/ the body position 
    // Body position is updated w/ the physics engine.
    update(ctrl) {

        this.position = this.body.vertices[0];
        this.sprite.position = this.position;
        this.sprite.update();

        if (this.debug) {
            ctx.fillStyle = "red";
            ctx.globalAlpha = 0.5;
            ctx.fillRect(
                this.position.x,
                this.position.y,
                this.width,
                this.height,
            );
            ctx.globalAlpha = 1.0;

        }
    }


}