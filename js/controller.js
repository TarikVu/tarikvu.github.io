export class Controller {
    constructor() {
        this.keys = []

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
            console.log(e.key, this.keys)

        });

    }

}