/*
Tal Rastopchin
September 22, 2019

Adapted from Laszlo Szecsi's homework starter code and
powerpoint slide instructions.
*/

Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es 
  precision highp float;

  in vec4 color; // received from VS via RS
  out vec4 fragmentColor;

  void main(void) {
    fragmentColor = color;
  }
`;