import { Sprite } from './sprite.js'
var Bodies = Matter.Bodies

const IDLE = 0,
    RUNNING = 1,
    ATTACKING = 2


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

        this.states = [IDLE, RUNNING, ATTACKING];
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


        // Attack box coordinates relative to sprite 
        this.attackBox = {
            position: this.currentSprite.position,
            height: this.bodyHeight,
            width: 265
        }

        /* [
            {x:this.currentSprite.position.x, y:this.currentSprite.position.y},// Top Left
            {x:this.currentSprite.position.x+100, y:this.currentSprite.position.y}, // Top Right
            {x:this.currentSprite.position.x, y:this.currentSprite.position.y-100}, // Bot Left
            {x:this.currentSprite.position.x+100, y:this.currentSprite.position.y-100}] // Bot Right */

    }

    setState(stateID) {
        this.currentState = this.states[stateID];
        this.currentSprite = this.sprites[stateID];
    }


    update(ctrl) {
        //console.log(ctrl);

        if (ctrl.keys === undefined || ctrl.keys.length == 0) {
            this.setState(IDLE);
        }

        if (ctrl.keys == 'a' && ctrl.keys == 'd') {

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

        // use of includes makes for smoother gameplay
        if (ctrl.keys.includes('q')) {
            this.setState(ATTACKING);
        }

        if (ctrl.keys == 'd') {
            this.setState(RUNNING);
            this.flipped = false;

            Matter.Body.setVelocity(
                this.body,
                { x: this.velocity, y: 0 }
            );

        }

        if (ctrl.keys == 'a') {
            this.setState(RUNNING, true);
            this.flipped = true;

            Matter.Body.setVelocity(
                this.body,
                { x: this.velocity * -1, y: 0 }
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

        // Update the position of the Attackbox 
        this.attackBox.position.y = this.position.y;
        if (this.flipped) {
            this.attackBox.position.x = this.currentSprite.position.x;
        }
        else {
            this.attackBox.position.x = this.currentSprite.position.x + 150;
        }


        // Draw the matter body and atk box
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

            ctx.fillStyle = "blue";
            ctx.globalAlpha = 0.5;
            ctx.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height,
            );
            ctx.globalAlpha = 1.0;

        }
    }

    draw() {

    }
}
