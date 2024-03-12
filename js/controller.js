export class Controller {
    constructor() {
        this.keys = [];
        this.mouse = {
            x: 0,
            y: 0,
            up: false,
            down: false
        }

        window.addEventListener('keydown', e => {
            var key = e.key.toLowerCase();
            if ((key === 'w' ||
                key === 'a' ||
                key === 's' ||
                key === 'd' ||
                key === ' ' ||
                key === 'escape') &&
                this.keys.indexOf(e.key) === -1) {

                this.keys.push(e.key)
            }

            console.log(e.key, this.keys)
        });


        // Remove the key on key up
        window.addEventListener('keyup', e => {
            var key = e.key.toLowerCase()
            if (key === 'w' ||
                key === 'a' ||
                key === 's' ||
                key === 'd' ||
                key === ' ' ||
                key === 'escape') {
                this.keys.splice(this.keys.indexOf(e.key), 1)

            }
            console.log(e.key, this.keys);

        });

        // Mouse Handler
         canvas.addEventListener("mousemove", e => {
            let rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            this.mouse.x = x;
            this.mouse.y = y;


        }); 
        canvas.addEventListener("mousedown", e => {
            this.mouse.down = true;
            this.mouse.up = false;
        });
        canvas.addEventListener("mouseup", e=> {
            this.mouse.down = false; 
            this.mouse.up = true;
        });

    }

}