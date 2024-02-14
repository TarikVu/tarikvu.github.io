
// collections of the maps for the game. 
import { Slime } from '/js/models/slime.js'
import { Tile } from '/js/models/tile.js'

var Composite = Matter.Composite;
export class Shop {
    constructor(game) {

        this.background = document.getElementsByClassName('background')[0];
        this.sprites = {};
        this.enemies = [];
        this.tiles = [];

        this.bodies = [];
        this.height = game.height;
        this.width = game.width;
        this.world = game.engine.world;

        

        //slime
        this.slime = new Slime({
            position: { x: 0, y: 0 },
        });

        this.enemies.push(this.slime);
        this.bodies.push(this.slime.body);

        this.slime2 = new Slime({
            position: { x: 550, y: 50 },
        });

        this.enemies.push(this.slime2);
        this.bodies.push(this.slime2.body);


        //floor
        const floorImage = document.getElementById("grass");
        this.floor = new Tile({
            image: floorImage,
            position: { x: 0, y: this.height - floorImage.height },
        });

        this.tiles.push(this.floor);
        this.bodies.push(this.floor.body);



        // Add the bodies to engine
        Composite.add(this.world, this.bodies);
    }


    update() {
        for (var e in this.enemies){
            this.enemies[e].update()
        }

        this.floor.update()
        //this.draw();
    }

    draw() {

    }


}