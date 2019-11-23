/*
Tal Rastopchin
September 22, 2019

Adapted from Laszlo Szecsi's homework starter code and
powerpoint slide instructions.
*/

"use strict";
/* exported App */
class App{
  constructor(canvas, overlay) {
    this.canvas = canvas;
    this.overlay = overlay;
    
    // keep track of keys pressed
    this.keysPressed = {};

    // initialize our movement keys
    this.keysPressed.UP = false;
    this.keysPressed.LEFT = false;
    this.keysPressed.DOWN = false;
    this.keysPressed.RIGHT = false;

    // store a reference to the OpenGL context
    this.gl = canvas.getContext("webgl2");

    // if the reference is null, browser does not support WebGL2
    if (this.gl === null) {
      throw new Error("Browser does not support WebGL2");
    }

    // ???
    this.gl.pendingResources = {};
    
    this.scene = new ShapesAndPatternsScene(this.gl)

    this.resize();
  }

  // match rendering resolution and viewport to the canvas size
  resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    // resize OpenGL context to new window size
    this.scene.resize(this.gl, this.canvas);
  }

  // make sure our pressed keys affect the keysPressed
  registerEventHandlers() {
    document.onkeydown = (event) => {
      //jshint unused:false
    	const keyName = keyNames[event.keyCode];
    	this.keysPressed[keyName] = true;
    };
    document.onkeyup = (event) => {
      //jshint unused:false
     	const keyName = keyNames[event.keyCode];
    	this.keysPressed[keyName] = false;
    };
    this.canvas.onmousedown = (event) => {
      //jshint unused:false
    };
    this.canvas.onmousemove = (event) => {
      //jshint unused:false
    	event.stopPropagation();
    };
    this.canvas.onmouseout = (event) => {
      //jshint unused:false
    };
    this.canvas.onmouseup = (event) => {
      //jshint unused:false
    };
    window.addEventListener('resize', () => this.resize() );
    window.requestAnimationFrame( () => this.update() );
  }

  // animation frame update
  update() {
    // process OpenGL pending resources
  	const pendingResourceNames = Object.keys(this.gl.pendingResources);
    if (pendingResourceNames.length === 0) {
      this.scene.update(this.gl, this.keysPressed);
      this.overlay.innerHTML = "Ready.";
    } else {
      this.overlay.innerHTML =
       `<font color="red">Loading: ${pendingResourceNames}</font>`;
    }

    // refresh window with a call to update
    window.requestAnimationFrame( () => this.update() );
  }
}

// entry point from HTML
window.addEventListener('load', () => {
  const canvas = document.getElementById("canvas");
  const overlay = document.getElementById("overlay");
  overlay.innerHTML = `<font color="red">Hello JavaScript!</font>`;

  const app = new App(canvas, overlay);
  app.registerEventHandlers();
});