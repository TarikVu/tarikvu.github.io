
import { Controller } from './controller.js'
import { Player } from './models/player.js'


import { Shop } from './models/maps.js'
import { PauseMenu } from './models/pausemenu.js'


// Module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

export class Game {
    constructor(
        {
            engine,
            fps,
            ctx,
            width,
            height
        }
    ) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        // Set up physics and Game world
        this.engine = engine;
        this.world = this.engine.world;

        this.player = new Player({
            gravity: this.engine.gravity,
            position: { x: 200, y: 100 },
        });

        this.ctrl = new Controller();
        this.map = new Shop(this, this.player);

        // Add to move the sprites w/ the mouse (for now)
       /*   const mouseConstraint = Matter.MouseConstraint.create(
            this.engine, { element: canvas }
        );

        Composite.add(this.world, mouseConstraint)  */

        this.fps = fps;

        // Set the FPS and delta ( timestep ) according to the fps option.
        this.runner = Runner.create({
            fps: this.fps,
            isFixed: false,
            delta: 1000 / this.fps,
        });

        // Adjust gravity to match timestep speed,
        // This helps normalize the physics engines on different refresh rates.
        // IMPORTANT**** THIS WAY OF scaling for delta may need to be applied for velocity of movement
        // and other logic as well.
        // May need to set game's refresh to a baseline 60fps. this is causing issues for
        // the physics calculations.
        if (this.fps == 60) {
            this.engine.gravity.scale = 0.01
        } else {
            this.engine.gravity.scale = 0.0075
        }


        Runner.run(this.runner, this.engine)
    }



    // Looped from main
    update() {

        // Updates the current gameworld's map.
        this.map.update(this.ctrl);

    }



}