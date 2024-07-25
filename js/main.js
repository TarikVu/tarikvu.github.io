import { Game } from './game.js'

// Utilize the event listener "load" to load in all assets "image"
window.addEventListener('load', function () {

    // Clear loading header
    const loading = this.document.getElementById('loading');
    loading.style.display = 'none';

    this.window.canvas = document.getElementById("gamescreen");
    this.window.ctx = canvas.getContext('2d');
    var width = 1200;
    var height = 900;  

    canvas.width = width;
    canvas.height = height;
    var Engine = Matter.Engine,
    Render = Matter.Render;

    // Set up game screen
    

    var engine = Engine.create(canvas, {
        options: {
          width: width,
          height: height,                  
      }
    });

    var render = Render.create({
        element: this.document.body,
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false, 
          }
    });

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


        Render.run(render);
        const game = new Game({
            engine: engine,
            fps: FPS,
            ctx:ctx,
            width: 1200,
            height: 900
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

