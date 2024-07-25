
// collections of the maps for the game. 
import { Slime } from '/js/models/slime.js'
import { Tile } from '/js/models/tile.js'
import { Bounds } from '/js/models/bounds.js'

const IDLE = 0,
    RUNNING = 1,
    ATTACKING = 2

var Composite = Matter.Composite,
    Bodies = Matter.Bodies,

    Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector;

export class Shop {
    constructor(game, player) {

        this.background = document.getElementsByClassName('field');
        this.player = player;


        this.sprites = [];
        this.enemies = [];
        this.tiles = [];
        this.bodies = [];
        this.bodies.push(this.player.body);

        this.height = game.height;
        this.width = game.width;
        this.world = game.engine.world;
        this.bounds = new Bounds(this.width, this.height);

        //slime
        this.slime = new Slime({
            position: { x: 450, y: 150 },
        });

        this.enemies.push(this.slime);
        this.bodies.push(this.slime.body);

        /*  this.slime2 = new Slime({
             position: { x: 550, y: 50 },
         });
 
         this.enemies.push(this.slime2);
         this.bodies.push(this.slime2.body);
  */

        //floor
        const floorImage = document.getElementById("grass");

        this.floor = new Tile({
            image: floorImage,
            position: { x: 0, y: this.height - floorImage.height },
        });

        // Add Sprites to be updated
        this.tiles.push(this.floor);
        // this.tiles.push(this.floor2);

        // Add to all bodies to be updated
        this.bodies.push(this.floor.body);
        // this.bodies.push(this.floor2.body);

        this.bodies.push(this.bounds.wallTop);
        this.bodies.push(this.bounds.wallBot);
        this.bodies.push(this.bounds.wallLeft);
        this.bodies.push(this.bounds.wallRight);


        // Add the bodies to Matter.js engine
        Composite.add(this.world, this.bodies);


    }



    drawBG() {

        for (var img of this.background) {

            // Parallax effect 
            var move_val = img.getAttribute('data-value');
            //var x = ctrl.mouse.x * move_val / 700
            var x = this.player.position.x * move_val / 700

            //var y = ctrl.mouse.y * move_val / 2000

            // Draw the image slightly larger than screen
            // and offset to the left in order to acc for parallax.
            ctx.drawImage(img,
                x - 100, // offset
                //y,
                0,
                this.width + 150,  // slightly bigger
                this.height - 55); // adjust for floor sprite

        }
    }

    update(ctrl) {

        this.drawBG();

        for (var e in this.enemies) {

            // Respawn the enemy when knocked out of bounds.
            //console.log(this.bounds);


            console.log("pos");
             console.log(this.enemies[e].position);
            console.log("body");

             console.log(this.enemies[e].body.position);

             if(this.enemies[e].position.x > this.bounds.width || this.enemies[e].position.x < -5){

                this.enemies[e].position.x = 450;
                this.enemies[e].position.y = 450;
                this.enemies[e].body.position.x = 450;
                this.enemies[e].body.position.y = 450; 
 
             }
           

            if(this.enemies[e].position.y > this.bounds.height || this.enemies[e].position.y < 0){
                this.enemies[e].position.x = 50;
                this.enemies[e].position.y = 50;
            } 


        }

        for (var t in this.tiles) {
            this.tiles[t].update();
        }

        this.player.update(ctrl);

        // Collision detection w/ player in the attacking state

        if (this.player.currentState == ATTACKING) {
            console.log("attacking");

            this.enemies.forEach((element) => {
                if (this.collision(this.player.attackBox, element)) {
                    console.log("ENEMY HIT");

                    var xvel = Math.floor(Math.random() * 100) + 50;
                    var yvel = Math.floor(Math.random() * 100) + 50;

                    this.player.flipped ? xvel *= -1 : xvel;

                    // Experiment w/ apply force
                    Matter.Body.applyForce(
                        element.body,
                        element.body.position,
                        { x: xvel, y: yvel }
                    );

                }
                else {
                    console.log("Nothing was hit");
                }

                this.enemies[e].update()

            })
        }
    }

    collision(attackBox, enemy) {



        var min_x = attackBox.position.x
        var min_y = attackBox.position.y

        var max_x = attackBox.position.x + attackBox.width;
        var max_y = attackBox.position.y + attackBox.height;

        return ((enemy.position.x > min_x && enemy.position.x < max_x) &&
            (enemy.position.y > min_y && enemy.position.y < max_y))

    }


}