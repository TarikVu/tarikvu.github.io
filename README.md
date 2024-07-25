# Slime Basher (Pre-Alpha) 🎮

![example](https://github.com/TarikVu/imgs/blob/main/SlimeBasher/SlimeBasher_example.PNG?raw=true)

[Game Wiki page➡](https://github.com/TarikVu/Deepwood/wiki)

## Table of Contents
1. [Features](#feats)
1. [Design](#design)
1. [Planned Features](#pfeats)
1. [Development Notes](#devnotes)
1. [Appendix](#apdx)


## <a name="feats"></a> Features
- Custom Spritesheet class
  - Splits a sprite sheet equalatterally into rows and collums for easy access to frame animations.
  - Provides ease of use to animate, scale, and update the sprites.


## <a name="design"></a> Design
![diagram](https://github.com/TarikVu/imgs/blob/main/SlimeBasher/slimebasher_diagram.PNG?raw=true)


## <a name="pfeats"></a> Planned Features
- [x] Animation cycles adapt to monitor refresh rate
- [ ] In browser level editor
- [ ] Saving local progression data
- [ ] Upload level designs to MONGODB


## <a name="devnotes"></a> Misc. Dev Notes:
### Drawing Images vs Drawing Bodies w/ matter js
Matter.js rects are drawn from the center, whereas ctx.draw draws a rect / sprite image from the top left. To fix this: whenever an image is being drawn for an object that has a respective body, the ctx.draw will need some padding. 

### Loading in images  
Since this game is aimed to be ran in a browser (client side) It does not seem possible to utilze [this method with node.js](https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs) in order to pre load images for my sprites.  Therefore, it seems that I'm now left with two choices:

1. Add the images for the game in the html file as scripts and load them using get element by id 
1. Utilize "promises".

### Utilizing JavaScript Modules
Now that that code base for main has been switched to javascript [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), the code base is now subject to the [CORS Policy](https://stackoverflow.com/questions/52919331/access-to-script-at-from-origin-null-has-been-blocked-by-cors-policy).  Pros include being able to utilze keyterms such as "Export" and "Import" to better track the scripts.  However this limits being able to use the html file without needing to be be hosted on a server. 

    
## <a name="apdx"></a> Appendix 
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

- [Github pages deployment not finding .png files fix](https://stackoverflow.com/questions/11577147/how-to-fix-http-404-on-github-pages) (add .nojekyll)

- [Static bodies need friction to applied after creation](https://github.com/liabru/matter-js/issues/694)

- [Detecting monitor hz](https://stackoverflow.com/questions/6131051/is-it-possible-to-find-out-what-is-the-monitor-frame-rate-in-javascript)

- [Using Matter.js' Renderer alongside gamescreen](https://github.com/liabru/matter-js/issues/955)


### Free Assets Credits
- [Main Character](https://rvros.itch.io/animated-pixel-hero)
- [Backgrounds](https://free-game-assets.itch.io/free-summer-pixel-art-backgrounds)
- [Enviroment Assets](https://free-game-assets.itch.io/free-summer-pixel-art-backgrounds)
- [Pause Menu](https://srtoasty.itch.io/ui-assets-pack-2)
