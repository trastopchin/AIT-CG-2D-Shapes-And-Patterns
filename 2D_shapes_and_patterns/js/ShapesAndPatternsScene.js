/*
Tal Rastopchin
September 22, 2019

Adapted from Laszlo Szecsi's homework starter code and
powerpoint slide instructions.
*/

"use strict";
/* exported Scene */
class ShapesAndPatternsScene extends Scene {
	constructor (gl) {
		super(gl);

		this.avatarPosition = {x:0, y:0};
		this.avatarSpeed = 1;
	}

	// create my shader programs here
	initializeShaderPrograms () {
		super.initializeShaderPrograms();
		this.initializeShaderProgram("bullseyeProgram", "idle-vs.glsl", "bullseye-fs.glsl");
		this.initializeShaderProgram("hypnoProgram", "idle-vs.glsl", "hypno-fs.glsl");
		this.initializeShaderProgram("wavingProgram", "waving-vs.glsl", "solid-fs.glsl");
	}

	// create my geometry objects here
	initializeSceneObjects () {
		const gl = this.gl;

		this.serpentineGeometry = new SerpentineGeometry(gl);
		this.heartGeometry = new HeartGeometry(gl);

	}

	// render each of the implemented features
	renderScene(keysPressed) {
		this.renderSerpentine();
		this.renderHeartBullseye();
		this.renderHeartHypno();
		this.renderHeartWaving(keysPressed);
	}

	renderSerpentine () {
		const gl = this.gl;

		let foundUniforms = true;

		const solidProgram = this.shaderPrograms.solidProgram.glProgram;
		
		// serpentine
		gl.useProgram(solidProgram);

		const positionHandle = gl.getUniformLocation(solidProgram, "transform.position");
	  if (positionHandle === null) {
	    console.log("Could not find uniform: transform.position");
	    foundUniforms = false;
	  }

	  const scaleHandle = gl.getUniformLocation(solidProgram, "transform.scale");
	  if (scaleHandle === null) {
	    console.log("Could not find uniform: transform.scale");
	    foundUniforms = false;
	  }

	  gl.uniform3f(scaleHandle, 0.75, 0.75, 0.75);
  	gl.uniform3f(positionHandle, -0.5, 0.5, 0);

    if (foundUniforms) {
	  	this.serpentineGeometry.draw();
		}
	}

	renderHeartBullseye () {
		const gl = this.gl;

		let foundUniforms = true;

		const bullseyeProgram = this.shaderPrograms.bullseyeProgram.glProgram;

		// heart with bullseye
	  gl.useProgram(bullseyeProgram);

	  const positionHandle = gl.getUniformLocation(bullseyeProgram, "transform.position");
	  if (positionHandle === null) {
	    console.log("Could not find uniform: transform.position");
	    foundUniforms = false;
	  }

	  const scaleHandle = gl.getUniformLocation(bullseyeProgram, "transform.scale");
	  if (scaleHandle === null) {
	    console.log("Could not find uniform: transform.scale");
	    foundUniforms = false;
	  }

	  let bullsEyeWidthHandle = gl.getUniformLocation(bullseyeProgram, "params.width");
	  if (bullsEyeWidthHandle === null) {
	    console.log("Could not find uniform: parameters.width");
	    foundUniforms = false;
	  }

	  let bullsEyeFirstColorHandle = gl.getUniformLocation(bullseyeProgram, "params.firstColor");
	  if (bullsEyeFirstColorHandle === null) {
	    console.log("Could not find uniform: parameters.firstColor");
	    foundUniforms = false;
	  }

	  let bullsEyeSecondColorHandle = gl.getUniformLocation(bullseyeProgram, "params.secondColor");
	  if (bullsEyeSecondColorHandle === null) {
	    console.log("Could not find uniform: parameters.secondColor");
	    foundUniforms = false;
	  }

	  if (foundUniforms) {
		  gl.uniform3f(scaleHandle, 0.5, 0.5, 1);

	      // first heart
	    gl.uniform3f(positionHandle, -0.7, 0, 0);

	    gl.uniform1f(bullsEyeWidthHandle, 0.1);
	    gl.uniform4f(bullsEyeFirstColorHandle, 1, 0, 0, 1);
	    gl.uniform4f(bullsEyeSecondColorHandle, 1, 1, 1, 1);

	    this.heartGeometry.draw();

	    // second heart
	    gl.uniform3f(positionHandle, 0.3, 0, 0);

	    gl.uniform1f(bullsEyeWidthHandle, 0.2);
	    gl.uniform4f(bullsEyeFirstColorHandle, 1, 1, 0, 1);
	    gl.uniform4f(bullsEyeSecondColorHandle, 1, 0, 1, 1);

	    this.heartGeometry.draw();
	  }
	}

	renderHeartHypno () {
		const gl = this.gl;

		let foundUniforms = true;

		const hypnoProgram = this.shaderPrograms.hypnoProgram.glProgram;

		// heart with bullseye
	  gl.useProgram(hypnoProgram);

	  const positionHandle = gl.getUniformLocation(hypnoProgram, "transform.position");
	  if (positionHandle === null) {
	    console.log("Could not find uniform: transform.position");
	    foundUniforms = false;
	  }

	  const scaleHandle = gl.getUniformLocation(hypnoProgram, "transform.scale");
	  if (scaleHandle === null) {
	    console.log("Could not find uniform: transform.scale");
	    foundUniforms = false;
	  }

    const timeHandle = gl.getUniformLocation(hypnoProgram, "params.time");
    if (timeHandle === null) {
      console.log("Could not find uniform: params.time");
      foundUniforms = false;
    }

	  let bullsEyeWidthHandle = gl.getUniformLocation(hypnoProgram, "params.width");
	  if (bullsEyeWidthHandle === null) {
	    console.log("Could not find uniform: parameters.width");
	    foundUniforms = false;
	  }

	  let bullsEyeFirstColorHandle = gl.getUniformLocation(hypnoProgram, "params.firstColor");
	  if (bullsEyeFirstColorHandle === null) {
	    console.log("Could not find uniform: parameters.firstColor");
	    foundUniforms = false;
	  }

	  let bullsEyeSecondColorHandle = gl.getUniformLocation(hypnoProgram, "params.secondColor");
	  if (bullsEyeSecondColorHandle === null) {
	    console.log("Could not find uniform: parameters.secondColor");
	    foundUniforms = false;
	  }

	  if (foundUniforms) {
	  	gl.uniform1f(timeHandle, this.t / 2);
		  gl.uniform3f(scaleHandle, 0.5, 0.5, 1);

	      // first heart
	    gl.uniform3f(positionHandle, -0.4, -0.5, 0);

	    gl.uniform1f(bullsEyeWidthHandle, 0.1);
	    gl.uniform4f(bullsEyeFirstColorHandle, 1, 0, 0, 1);
	    gl.uniform4f(bullsEyeSecondColorHandle, 1, 1, 1, 1);

	    this.heartGeometry.draw();

	    // second heart
	    gl.uniform3f(positionHandle, 0.6, -0.5, 0);

	    gl.uniform1f(bullsEyeWidthHandle, 0.2);
	    gl.uniform4f(bullsEyeFirstColorHandle, 1, 1, 0, 1);
	    gl.uniform4f(bullsEyeSecondColorHandle, 1, 0, 1, 1);

	    this.heartGeometry.draw();
	  }
	}

	renderHeartWaving (keysPressed) {
		const gl = this.gl;

    const wavingProgram = this.shaderPrograms.wavingProgram.glProgram;
    gl.useProgram(wavingProgram);

    let foundUniforms = true;

    const positionHandle = gl.getUniformLocation(wavingProgram, "transform.position");
    if (positionHandle === null) {
      console.log("Could not find uniform: transform.position");
      foundUniforms = false;
    }

    const scaleHandle = gl.getUniformLocation(wavingProgram, "transform.scale");
    if (scaleHandle === null) {
      console.log("Could not find uniform: transform.scale");
      foundUniforms = false;
    }

    const timeHandle = gl.getUniformLocation(wavingProgram, "waving.time");
    if (timeHandle === null) {
      console.log("Could not find uniform: params.time");
      foundUniforms = false;
    }

    const radiusHandle = gl.getUniformLocation(wavingProgram, "waving.radius");
    if (radiusHandle === null) {
      console.log("Could not find uniform: params.time");
      foundUniforms = false;
    }

    if (foundUniforms) {

    	// handle WASD keyboard input
			if (keysPressed.UP) {
    		this.avatarPosition.y += this.avatarSpeed * this.dt;
    	}
    	if (keysPressed.DOWN) {
    		this.avatarPosition.y -= this.avatarSpeed * this.dt;
    	}
    	if (keysPressed.RIGHT) {
    		this.avatarPosition.x += this.avatarSpeed * this.dt;
    	}
    	if (keysPressed.LEFT) {
    		this.avatarPosition.x -= this.avatarSpeed * this.dt;
    	}

    	// handle avatar
    	if (this.avatarPosition.y > 1) {
    		this.avatarPosition.y = -1;
    	}
    	else if (this.avatarPosition.y < -1) {
    		this.avatarPosition.y = 1;
    	}
    	else if (this.avatarPosition.x > 1) {
    		this.avatarPosition.x = -1;
    	}
    	else if (this.avatarPosition.x < -1) {
    		this.avatarPosition.x = 1;
    	}

    	gl.uniform3f(scaleHandle, 0.75, 0.75, 0.75);

    	// position parameters
    	gl.uniform3f(positionHandle, this.avatarPosition.x, this.avatarPosition.y, 0);

   		// waving parameters
   		gl.uniform1f(timeHandle, 10 * this.t);
   		gl.uniform1f(radiusHandle, 0.01);

   		this.heartGeometry.draw();
   	}
	}
}