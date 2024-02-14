export class Sprite {
    constructor(
        {
            image,
            framesHold = 7,
            scale = 1,
            position = { x: 0, y: 0 },
            flipped = false,
            spriteDims = { width: 1, height: 1 },
            ColRow = { cols: 1, rows: 1 },
            offset = { x: 0, y: 0 },
            showDrawBox = false
        }
    ) {

        // Error handling
        if (ColRow.cols < 1 || ColRow.rows < 1 || scale < 0 ) {
            throw new Error("Invalid Spritesheet parameters.")
        }

        // Every Sprite sheet will have these. 
        this.image = image
        this.scale = scale
        this.position = position
        this.spriteDims = spriteDims
        this.ColRow = ColRow
        this.flipped = flipped

        // Offset the dx,dy to match body and sprite animation.
        this.offset = offset

        this.showDrawBox = showDrawBox

        // Logic to split up the rows and collumns evenly depending on 
        // either being provided the sprite dimensions or the rows and collumns
        var dimsProvided = spriteDims.width != 1 || spriteDims.height != 1
        var colRowProvided = ColRow.cols != 1 || ColRow.rows != 1

        if (dimsProvided) {
            this.cols = this.image.width / spriteDims.width
            this.rows = this.image.height / spriteDims.height
            this.spriteDims.width = spriteDims.width
            this.spriteDims.height = spriteDims.height

        }
        else if (colRowProvided) {
            this.spriteDims.width = this.image.width / this.ColRow.cols
            this.spriteDims.height = this.image.height / this.ColRow.rows
            this.cols = (this.image.width / this.spriteDims.width)
            this.rows = (this.image.height / this.spriteDims.height)
        }
        // if neither the dimensions or col and row count were specifed
        // the sprite dimensions are defaulted to the whole sheet, and the total
        // cols and rows are set to {1,1}
        else {
            this.spriteDims = { width: this.image.width, height: this.image.height }
            this.cols = ColRow.cols
            this.rows = ColRow.rows
        }

        // Static Sprite
        this.static = (this.cols == 1 && this.rows == 1)

        // Used to keep track of where we are on the SpriteSheet animation
        this.curCol = 0
        this.curRow = 0
        this.curFrame = 0
        this.curAnimation

        // used for setting up animations in the sheet
        this.startCol = 0
        this.startRow = 0

        // Frame logic, framesHold affects animation cycling speed
        this.totalFrames = this.cols
        this.framesElapsed = 0
        this.framesHold = framesHold
        this.hzScale = 1

        // Logic for Single row Sheet
        this.singleAnimation = (!this.static && this.cols > 1 && this.rows == 1)

        // Dictionary Holding the different animations in a sprite sheet
        this.animations = {}

    }

    // Sets the starting col & row to the saved animation
    // for animateFrames
    setAnimation(name) {

        if (this.curAnimation == name) { return }

        var a = this.animations[name]
        if (a == undefined) { throw new Error("Animation " + name + " has not been set.") }

        this.curAnimation = name

        // Set the current position
        this.curCol = a.start.col
        this.curRow = a.start.row

        // For resetting the animation
        this.curFrame = 0
        this.startCol = a.start.col
        this.startRow = a.start.row

        this.totalFrames = a.totalFrames
        this.framesHold = a.framesHold

    }

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // Ref: README
    draw() {

        // Setup to draw flipped animation
        if (this.flipped) {
            ctx.save();
            ctx.scale(-1, 1);
        }

        // Draw normally
        ctx.drawImage(
            this.image,

            // Crop src sx,sy  
            this.curCol * (this.image.width / this.cols),
            this.curRow * (this.image.height / this.rows),

            // Crop dims of src
            this.spriteDims.width,
            this.spriteDims.height,

            // pos destinations (Flipped : Regular)
            this.flipped ?
                (this.position.x - this.offset.x + this.spriteDims.width * this.scale) * -1 :
                this.position.x - this.offset.x,

            this.position.y - this.offset.y,

            // redraw w/ new dims
            this.spriteDims.width * this.scale,
            this.spriteDims.height * this.scale
        )

        if (this.flipped) {
            ctx.restore();
        }

        // Draw the hitbox (debugging purposes)
        ctx.fillStyle = 'green'

        //ctx.fillRect(0,0,500,500)

        //console.log(this.hitBox)

        if (this.showDrawBox) {
            // dx dy position drawn
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = 'black'
            ctx.fillRect(
                this.position.x,
                this.position.y,
                this.spriteDims.width * this.scale,
                this.spriteDims.height * this.scale,
            )
        }
    }

    // primary animation method.
    // This method will increment the rows for longer animations
    // and reset the animation row/col on the sheet when max frames elapses.
    animateFrames() {
        this.framesElapsed++

        if (this.framesElapsed % (this.framesHold * this.hzScale) === 0) {

            if (this.curFrame < this.totalFrames - 1) {

                if (this.curCol == this.cols - 1) {
                    this.curRow++
                    this.curCol = 0
                }
                else {
                    this.curCol++
                }

                this.curFrame += 1

            } else {

                //console.log("resetting to col" + this.startCol + " row " + this.startRow)

                // reset the animation cycle
                this.curCol = this.startCol
                this.curRow = this.startRow
                this.curFrame = 0

            }
        }
    }

    // Draws the sprite.
    // Static sprites do not need to be animated.
    update() {

        if (!this.static) {
            this.animateFrames()
        }

        /* // update the hitbox
        this.hitBox.min_x = this.position.x
        this.hitBox.min_y = this.position.y
        this.hitBox.max_x = (this.position.x + this.spriteDims.width * this.scale)
        this.hitBox.max_y = (this.position.y + this.spriteDims.height * this.scale) */


        this.draw()
    }



}