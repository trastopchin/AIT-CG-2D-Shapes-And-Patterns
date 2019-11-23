/*
Tal Rastopchin
September 22, 2019

Adapted from Laszlo Szecsi's homework starter code and
powerpoint slide instructions.
*/

"use strict";
/* exported Scene */
class Scene {
  constructor(gl) {
    // store reference to OpenGl context
    this.gl = gl;
    this.shaderPrograms = {};
    this.initializeShaderPrograms();
    this.initializeSceneObjects();
    this.initializeTimeProperties();
  }

  // initializes relevant time properties
  initializeTimeProperties () {
    this.timeAtThisFrame = new Date().getTime();
    this.timeAtFirstFrame = new Date().getTime();
    this.timeAtLastFrame = this.timeAtFirstFrame;
    this.t = 0;
    this.dt = 0;
  }

  // updates the relevant time properties
  updateTimeProperties () {
    this.timeAtThisFrame = new Date().getTime();

    // divide by 1000 to get it into seconds
    this.t = (this.timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;

    this.dt = (this.timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
    this.timeAtLastFrame = this.timeAtThisFrame;
  }

  // returns whether or not the scene is active; used to give scenes a lifetime
  isActive () {
    if (this.t < 4) {
      return true;
    }
    else {
      return false;
    }
  }

  // creates and compiles all of the shader programs needed for this scene
  // this is what we override in a subclass
  initializeShaderPrograms () {
    this.initializeShaderProgram("solidProgram", "idle-vs.glsl", "solid-fs.glsl");
  }

  // given a program name, vs shader name, and fs name, create and compile
  // a shader program and add it to the shaderPrograms property
  initializeShaderProgram (newProgramName, vertexShaderFilename, fragmentShaderFilename) {
    const gl = this.gl;
    const vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderFilename);
    const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderFilename);
    const newShaderProgram = new Program(gl, vertexShader, fragmentShader);
    this.shaderPrograms[newProgramName] = newShaderProgram;
  }

  // creates all of our scene objects
  // this is what we override in a subclass
  initializeSceneObjects () {
    this.triangleGeometry = new Geometry (this.gl);
  }

  renderScene () {
      // select shader program
      this.gl.useProgram(this.shaderPrograms.solidProgram.glProgram);
      // draw
      this.triangleGeometry.draw();
  }

  // resizes the canvas size
  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  // clear the screen
  clear() {
    const gl = this.gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  // update and render all objects in the scene
  update(gl, keysPressed) {
    //jshint bitwise:false
    //jshint unused:false

    // update our time properties
    this.updateTimeProperties();

    // clear the screen
    this.clear();

    this.renderScene(keysPressed);
  }
}
