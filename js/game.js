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
            width,
            height
        }
    ) {

        this.width = width;
        this.height = height;
        
        
        // Set up physics and Game world
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.map = new Shop(this);

        // Add to move the sprites w/ the mouse (for now)
        const mouseConstraint = Matter.MouseConstraint.create(
            this.engine, {element: canvas}
          );
        Composite.add(this.world,mouseConstraint)

        Runner.run(this.engine);
    }





    // Looped from main
    update(ctrl) {

        // Draws Bg for now.
       this.draw();
        
        // Updates the current gameworld's map.
        this.map.update()

   
    }

    draw() {
        this.drawImageScaled(this.map.background, canvas)
    }


    // Scales Bg to game screen REF: README
    drawImageScaled(img, canvas) {
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }

}