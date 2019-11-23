/*
Tal Rastopchin
September 22, 2019

Adapted from Laszlo Szecsi's homework starter code and
powerpoint slide instructions.
*/

Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es 
  precision highp float;

  in vec4 color; // received from VS via RS
  in vec4 position; // received from VS via RS

  out vec4 fragmentColor;

  uniform struct {
    float time;
  	float width;
  	vec4 firstColor;
  	vec4 secondColor;
  } params;

  void main(void) {
  	float dist = sqrt(position.x * position.x + position.y * position.y) - params.time;
  	float scaleValue = 2.0 / params.width;

  	if (mod(scaleValue * dist, 2.0) < 1.0) {
    	fragmentColor = params.firstColor;
    }
    else {
    	fragmentColor = params.secondColor;
    }
  }
`;