/*
Tal Rastopchin
September 22, 2019

Adapted from Laszlo Szecsi's homework starter code and
powerpoint slide instructions.
*/

"use strict";
/* exported Geometry */
class Geometry {
	constructor (gl) {
		this.gl = gl;

		// declare vertex buffer attribute array properties
		this.positionArray = null;
		this.colorArray = null;
		this.indexArray = null;
		this.IDArray = null;

		this.initializeVBAttributes();

		this.createPositionBuffer();
		this.createColorBuffer();
		this.createIndexBuffer();

		this.createAndBindInputLayout();

		this.enablePositionBuffer();
		this.enableColorBuffer();

		/* why do we have to unbind the input layout after creating
		and selecting it if each call to draw() rebinds the vertex
		array object?*/
		this.unbindInputLayout();
	}

	/* intended to be overriden; if not, creates a triangle */
	initializeVBAttributes () {
		// initialize vertex buffer attribute arrays
		this.positionArray = [];
		this.colorArray = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
		this.indexArray = [0, 1, 2];
		this.IDArray = [0, 2, 2];

		for (let i = 0; i < 3; i++) {
			let theta = i / 3 * 2 * Math.PI;
			this.positionArray.push(0.5 * Math.cos(theta), 0.5 * Math.sin(theta), 0.5);
		}
	}

	createPositionBuffer () {
		if (this.positionArray === null) {
			console.log("positionArray uninitialized");
		}

		const gl = this.gl;

		// allocate space for a buffer
		this.positionBuffer = gl.createBuffer();

		// bind current buffer to perform operations on it
    	gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

    	// fill current buffer with vertex information
    	gl.bufferData(gl.ARRAY_BUFFER,
    		new Float32Array(this.positionArray),
    		gl.STATIC_DRAW);
	}

	createColorBuffer () {
		if (this.colorArray === null) {
			console.log("colorArray uninitialized");
		}

		const gl = this.gl;
		this.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,
    		new Float32Array(this.colorArray),
    		gl.STATIC_DRAW);
	}

	createIndexBuffer () {
		if (this.indexArray === null) {
			console.log("indexArray uninitialized");
		}

		const gl = this.gl;
		this.indexBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
	      new Uint16Array(this.indexArray),
	      gl.STATIC_DRAW);
	}

	/* specifies the input layout for the vertex buffer object
	vertex array object (VAO) */
	createAndBindInputLayout () { 
		const gl = this.gl;
    	this.inputLayout = gl.createVertexArray();
    	gl.bindVertexArray(this.inputLayout);
	}

	enablePositionBuffer () {
		const gl = this.gl;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

		// enable the vertex position buffer as the 0th attribute
	    gl.enableVertexAttribArray(0);

	    // explain to OpenGL how to parse the vertex position buffer
	    gl.vertexAttribPointer(0,
	      3, gl.FLOAT, // three pieces of float
	      false, // do not normalize (make unit length)
	      0, // tightly packed
	      0 // data starts at array start
    	);
	}

	enableColorBuffer () {
		const gl = this.gl;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	    gl.enableVertexAttribArray(1);
	    gl.vertexAttribPointer(1,
	      3, gl.FLOAT,
	      false,
	      0,
	      0
	    );
	}

	unbindInputLayout () {
		const gl = this.gl;
		gl.bindVertexArray(null);
	}

	draw() {
		const gl = this.gl;

		// select the current vertex buffer input specification
		gl.bindVertexArray(this.inputLayout);

		// select the index buffer as the current gl.ELEMENT_ARRAY_BUFFer
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);  

    	/* draws our geometry
    	gl.TRIANGLES -> interpret elements as triangles
    	this.newIndices.length -> how many indices comprise our triangles */
    	gl.drawElements(gl.TRIANGLES, this.indexArray.length, gl.UNSIGNED_SHORT, 0);
	}
}