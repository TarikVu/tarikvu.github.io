import { Sprite } from './sprite.js'
var Bodies = Matter.Bodies

const IDLE = 0,
    RUNNING = 1


export class Player {
    constructor(
        {
            position,
            debug = false,
            flipped = false,
            gravity
        }
    ) {

        this.bodyWidth = 80;
        this.bodyHeight = 135;

        this.position = position;
        this.velocity = 12;
        this.flipped = flipped;
        this.gravity = gravity;

        var images = document.getElementsByClassName('player')
        this.debug = debug;

        this.states = [IDLE, RUNNING];
        this.sprites = [];


        this.body = Bodies.rectangle(
            this.position.x,
            this.position.y,
            this.bodyWidth,
            this.bodyHeight,
            {
                inertia: Infinity,
                restitution: 0,
                friction: 1,
                frictionAir: .04
            });

        // Create and add a new sprite per image
        for (var i in images) {
            var s = new Sprite({
                image: images[i],
                spriteDims: { width: 120, height: 80 },
                scale: 3.5,
                debug: this.debug
            });
            this.sprites.push(s);
        }

        this.currentState = this.states[0];
        this.currentSprite = this.sprites[0];
    }

    setState(stateID) {
        this.currentState = this.states[stateID];
        this.currentSprite = this.sprites[stateID];
    }


    update(ctrl) {
        console.log(ctrl);

        if (ctrl.keys === undefined || ctrl.keys.length == 0) {
            this.setState(IDLE);
        }

        if (ctrl.keys == 'a' && ctrl.keys == 'd' ) {
            console.log("HEre");
            this.setState(IDLE, true);
        }


       /*  if (ctrl.keys == 'w') {
            this.setState(IDLE);
            this.flipped = false;
            Matter.Body.setVelocity(
                this.body,
                { x: 0, y: 20 * -1 }
            );
        }
 */
        if (ctrl.keys == 'd') {
            this.setState(RUNNING);
            this.flipped = false;

            Matter.Body.setVelocity(
                this.body,
                { x: this.velocity, y:0 }
            );

        }

        if (ctrl.keys == 'a') {
            this.setState(RUNNING, true);
            this.flipped = true;

            Matter.Body.setVelocity(
                this.body,
                { x: this.velocity * -1, y:0}
            );

        }

       

        // Position the spirte in the correct place 
        // relative to the body.  
        this.position = this.body.vertices[0];

        this.currentSprite.position.y = this.position.y - 145;

        if (this.flipped) {
            this.currentSprite.position.x = this.position.x - 185;
        }
        else {
            this.currentSprite.position.x = this.position.x - 150;
        }
        this.currentSprite.flipped = this.flipped;
        this.currentSprite.update();

        if (this.debug) {
            ctx.fillStyle = "red";
            ctx.globalAlpha = 0.5;
            ctx.fillRect(
                this.position.x,
                this.position.y,
                this.bodyWidth,
                this.bodyHeight,
            );
            ctx.globalAlpha = 1.0;

        }
    }

    draw() {

    }
}
