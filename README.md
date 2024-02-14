# Slime Basher (Pre-Alpha)
Slime Bashr is a basic game composed of HTML5, CANVAS, and JavaScript.
for an in-depth look at my implementation please check out the [Wiki page here](https://github.com/TarikVu/Deepwood/wiki).

## Table of Contents
1. [Features](#feats)
1. [Design](#design)
1. [Planned Feature](#pfeats)
1. [References](#refs)

## <a name="feats"></a> Features
- Custom Spritesheet class
  - Splits a sprite sheet equalatterally into rows and collums for easy access to frames
  - Provides ease of use to animate, scale, and update the sprites


## <a name="design"></a> Design
![diagram](https://cdn.discordapp.com/attachments/1204513288214413352/1204513303695458435/deepwood.PNG?ex=65d5016e&is=65c28c6e&hm=f685046994b119c3fcd3e8721f9da9345e6a1b0b1cf4dad3ec1606a95f07241d&)

## <a name="pfeats"></a> Planned Features
- [ ] Animation cycles adapt to monitor refresh rate
- [ ] In browser level editor
- [ ] Saving local progression data
- [ ] Upload level designs to MONGODB

    
## <a name="refs"></a> References 
### Functionality
Canvas API
- [2D Context drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

60 FPS animation
- [Stackoverflow](https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe)

Preloading images as a "promise"
- [codepen.io](https://codepen.io/isakov/pen/pogvWPY?editors=0010)

Background image scaling to game screen
- [Stackoverflow](https://stackoverflow.com/questions/23104582/scaling-an-image-to-fit-on-canvas)

Sprite animation with matter.js
- [Stackoverflow](https://stackoverflow.com/questions/65207865/matter-js-is-there-any-way-to-animate-my-sprite)

### Free Assets
- [Main Character](https://rvros.itch.io/animated-pixel-hero)
- [Backgrounds](https://free-game-assets.itch.io/free-summer-pixel-art-backgrounds)
- [Enviroment Assets](https://free-game-assets.itch.io/free-summer-pixel-art-backgrounds)
- [Pause Menu](https://srtoasty.itch.io/ui-assets-pack-2)


---
## FOR THE WIKI 
### Things I Learned

- Spritesheet would be a stronger class if sub classes such as mobs,
players, static sprites could all inherit from sprite sheet.  This way we can better focus on specific classes and their needs.
- All Sprites in the future should share 
  - Position
  - image
  - a means to crop a specific part of the sheet. ( this would be done by providing the 
  rows and cols,  then a developer can specify the col, row to crop from and then save those coordinates in a dict with the sprite name as the key and the coordinates as the value.)
  - a boundary (hitbox) the hitbox would differ than the position values.  this would be beneficial for collision detection.  This is also necessary because the starting drawing position for spritesheets often have padding starting at the top right

- inverting sprite animations:
  - This topic took a few days to finally get the sprite to flip properly for canva's draw function.  
  - Simply put, we can keep track of a sprite's flipped state with a simple boolean.
  Then we would save and then scale the context.  Since the whole context is scaled, the coordinates of the top left being the origin is flipped depending on what was used inside of scale(x,y) **Refer spritemodels.js draw function**.  In this case, the x axis is modified,
  - After the context is inverted on the x axis, the position destination will have a formula of:
  **(sprite.position + spritedimensions.width * spritescale) * - 1**
  - Before, if a sprite's animation (run for example) did not have a flipped variant
  and the animation would only run right, creating a copy & flipping the .png file itself would result in the animation being flipped, but also be played in reverse.  (Moonwalk!)
  - for future purposes, instead of manually inputting file paths into an array to be pre loaded, Utilize a method to detect all the img files in a folder and write them into an array, then use that array for the preloading. 

  - It is important to be mindful of artstyles.  Right now all the assests come from different art styles and is noticeable.

  - Hardcoding the position of the objects will not let them resize with the 
  canvas if there were a resolution setting. We must set the scaling and position relative to the size of the game window. **This should be one of the first steps when making the next game!!!!**

  - Development process should start with a canvas and then a single sprite inside that canvas. This sprite along with its animations and hitboxes need to scale appropriately with
  the canas dimensions. 

  - FramesHold is a rudementary fix for frame animations.  There must be a better method for frame timing and the framerate.


[better js practices.](https://www.youtube.com/watch?v=c-1dBd1_G8A)


/////////////////////////// 

refactor

/////////////////////////

- Images:  Since this game is aimed to be ran in a browser (client side) It does not seem possible to utilze [this method with node.js](https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs) in order to pre load images for my sprites.  Therefore, it seems that I'm now left with two choices:
  - Add the images for the game in the html file as scripts and load them using getelement by id or I can use the same method of promises. 


- Drawing Images vs Drawing Bodies w/ matter js.
- Matter.js rects are drawn from the center, whereas ctx.draw draws a rect / sprite image from the top left 
  - to fix this whenever an image is being drawn for an object that has a respective body, the ctx.draw will need some padding. 

- Now that that code base for main has been switched to javascript [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), the code base is now subject to the [CORS Policy](https://stackoverflow.com/questions/52919331/access-to-script-at-from-origin-null-has-been-blocked-by-cors-policy).  Pros include being able to utilze keyterms such as "Export" and "Import" to better track the scripts.  However this limits being able to use the html file without needing to be be hosted on a server. 


- [Github pages 404 issue fix](https://stackoverflow.com/questions/11577147/how-to-fix-http-404-on-github-pages) (add .nojekyll)

- [Static bodies need friction to applied after creation](https://github.com/liabru/matter-js/issues/694)
