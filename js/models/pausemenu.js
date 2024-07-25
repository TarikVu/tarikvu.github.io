// Note to self, the main point of making this menu is to 
// have a way for users to select a refresh rate.
class Button {
    constructor({
        image,
        text,
        textColor,
        position,
        scale,
        width,
        height,
    }) {
        this.image = image
        this.text = text
        this.textColor = textColor
        this.position = position
        this.textPosition = { x: this.position.x + 120, y: this.position.y + 42 }
        this.scale = scale
        this.width = width
        this.height = height
        this.highlighted = false
    }

    // Records if the button is being hovered.
    highlight(highlighted) {
        this.highlighted = highlighted
    }

    // Handle Mouse position being inside the dimensions. 
    update() {
        this.draw()
    }

    draw() {

        // Setup Style based on highlighted
        ctx.font = "32px cursive";
        let hDiff = 0
        if (this.highlighted) {
            hDiff += 2
            ctx.font = "34px cursive";
        }

        // Draw Button
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width * this.scale + hDiff,
            this.height * this.scale + hDiff)


        // Draw the text
        ctx.fillStyle = this.textColor
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.textPosition.x, this.textPosition.y);
    }
}

class Checkbox {
    constructor({
        image,
        check,
        text,
        textColor,
        position,
        scale,
        width,
        height,
        selected
    }) {

        this.image = image
        this.check = check
        this.selected = selected
        this.text = text
        this.textColor = textColor
        this.position = position
        this.textPosition = { x: this.position.x + 80, y: this.position.y + 30 }
        this.scale = scale
        this.width = width
        this.height = height
        this.highlighted = false
    }

    // Records if the button is being hovered.
    highlight(highlighted) {
        this.highlighted = highlighted
    }

    setSelected(bool) {
        this.selected = bool
    }


    // Handle Mouse position being inside the dimensions. 
    update() {
        this.draw()
    }

    draw() {

        // Setup Style based on highlighted
        ctx.font = "24px cursive";
        let hDiff = 0
        if (this.highlighted) {
            hDiff += 2
            ctx.font = "26px cursive";
        }

        // Draw Button
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width * this.scale + hDiff,
            this.height * this.scale + hDiff)

        // Draw check if selected
        if (this.selected) {
            ctx.drawImage(
                this.check,
                this.position.x + 5,
                this.position.y,
                this.width * this.scale * 0.8 + hDiff,
                this.height * this.scale * 0.8 + hDiff)
        }

        // Draw the text
        ctx.fillStyle = this.textColor
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.textPosition.x, this.textPosition.y);
    }
}

// Pause menu screen.
// Image pre-loading follows the same logic as spritesheet
export class PauseMenu {
    constructor() {

        // Const values for styling the UI
        const scale = 10
        const canvasMid_x = canvas.width / 2

        const mainButtonStyle = {
            x: canvasMid_x - 125,
            y: 300,
            width: 50,
            height: 12,
            scale: 5,
            textColor: 'white'
        }

        const checkBoxStyle = {
            x: canvasMid_x - 125,
            y: 400,
            width: 20,
            height: 20,
            scale: 2,
            textColor: 'black'
        }


        this.image = new Image()
        this.image.src = '././img/menu.png'
        this.width = 48 * scale
        this.height = 65 * scale
        this.position = { x: 0, y: 100 }
        this.position.x = canvasMid_x - this.width / 2

        // Dictionary of images ready to be loaded as a Sprite
        const finishedimages = new Object()

        // All items in the menu
        this.items = {}

        // List of path's to the sprite sheets
        const imageUrls = [
            './img/button1.png',
            './img/checkbox.png',
            './img/check.png'
        ];


        const loadImage = src =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });


        // Loads the Images as a promise and then constructs Sprites
        Promise.all(imageUrls.map(loadImage)).then(images => {

            // Adds to dict. The key of the image file is
            // the full file name within the "img" folder.
            images.forEach((image) =>
                finishedimages[image.src.split('img/').pop()] = image
            );


            // Create the buttons
            const resButton = new Button({
                image: finishedimages['button1.png'],
                text: 'Resume',
                textColor: mainButtonStyle.textColor,
                position: {
                    x: mainButtonStyle.x,
                    y: mainButtonStyle.y
                },
                scale: mainButtonStyle.scale,
                width: mainButtonStyle.width,
                height: mainButtonStyle.height
            })

            // Checkboxes for setting refresh rate, defauled to 144hz
            const hzCheckBox60 = new Checkbox({
                image: finishedimages['checkbox.png'],
                check: finishedimages['check.png'],
                selected: false,
                text: '60hz',
                textColor: checkBoxStyle.textColor,
                position: {
                    x: checkBoxStyle.x,
                    y: checkBoxStyle.y
                },
                scale: checkBoxStyle.scale,
                width: checkBoxStyle.width,
                height: checkBoxStyle.height
            })

            const hzCheckBox144 = new Checkbox({
                image: finishedimages['checkbox.png'],
                check: finishedimages['check.png'],
                selected: true,
                text: '144hz',
                textColor: checkBoxStyle.textColor,
                position: {
                    x: checkBoxStyle.x + 150,
                    y: checkBoxStyle.y
                },
                scale: checkBoxStyle.scale,
                width: checkBoxStyle.width,
                height: checkBoxStyle.height,

            })

            // Push to list of sprites to be drawn. 
            this.items["resButton"] = resButton
            this.items["hz60"] = hzCheckBox60
            this.items["hz144"] = hzCheckBox144

        })


    }

    // Activates a button inside the menu based on the button's text
    activate(item) {
        switch (item.text.toLowerCase()) {
            case 'resume':
                ctrl.pause = false
                break

            // Checkboxes
            case '60hz':
                ctrl.hz60 = true
                ctrl.hz144 = false
                item.setSelected(true)
                this.items['hz144'].setSelected(false)
                break

            case '144hz':
                ctrl.hz60 = false
                ctrl.hz144 = true
                item.setSelected(true)
                this.items['hz60'].setSelected(false)
                break
        }
    }

    // Check's the mouse's position to see if inside an item's boundaries
    inside(mouse, item) {
        var min_x = item.position.x
        var max_x = item.position.x + item.width * item.scale
        var min_y = item.position.y
        var max_y = item.position.y + item.height * item.scale
        return ((mouse.x > min_x && mouse.x < max_x) &&
            (mouse.y > min_y && mouse.y < max_y))
    }

    // Update's the Pause menu UI and it's contents.
    update(ctrl) {

        for (var key in this.items) {
            if (this.inside(ctrl.mouse, this.items[key])) {

                this.items[key].highlight(true)

                if (ctrl.mouse.down) {
                    this.activate(this.items[key])
                }
            }
            else {
                this.items[key].highlight(false)
            }
        }

        this.draw()


    }

    draw() {

        // Draw main menu panel
        ctx.drawImage(
            this.image,
            this.position.x, this.position.y,
            this.width, this.height)


        // "PAUSED" Text
        ctx.font = "52px cursive";
        ctx.fillStyle = "black"
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", canvas.width / 2, this.position.y + 145);

        ctx.font = "16px cursive";
        ctx.fillStyle = "black"
        ctx.textAlign = "center";
        ctx.fillText("*Select your monitor refresh rate*", canvas.width / 2, this.position.y + 370);


        // Draw each item in the panel
        for (var key in this.items) {
            this.items[key].update()
        }

    }
}


