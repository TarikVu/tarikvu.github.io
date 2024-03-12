import { Game } from './game.js'
import { Controller } from './controller.js'

// Utilize the event listener "load" to load in all assets "image"
window.addEventListener('load', function () {

    // Clear loading header
    const loading = this.document.getElementById('loading');
    loading.style.display = 'none';

    this.window.canvas = document.getElementById("gamescreen");
    this.window.ctx = canvas.getContext('2d');

    // Set up game screen
    /* canvas.width = 1600;
    canvas.height = 1200; */
    
     canvas.width = 1200;
    canvas.height = 900; 

    const engine = Matter.Engine.create();



    // Function that returns a Promise for the FPS
    const getFPS = () =>
        new Promise(resolve =>
            requestAnimationFrame(t1 =>
                requestAnimationFrame(t2 => resolve(1000 / (t2 - t1)))
            )
        )


    var FPS = 0;

    // Detect monitor Hz then create game using either
    // 60 fps or 144 fps.
    getFPS().then(result => {
        if (result < 120) {
            FPS = 60
        }
        else {
            FPS = 144
        }

        const game = new Game({
            engine: engine,
            fps: FPS,
            width: canvas.width,
            height: canvas.height
        });

        ctx.imageSmoothingEnabled = false;


        animate();


        // Starts the game
        function animate() {
            game.update();
            requestAnimationFrame(animate);
        }


    });

})

