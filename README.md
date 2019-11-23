# AIT-CG-2D-Shapes-And-Patterns

Implementing basic 2D shape drawing to draw simple shapes, parametric shapes, animated shapes, patterns, and animated patterns. Created as a first milestone of the 2D project for my Computer Graphics course at the Aquincum Instute of Technology the fall of 2019 with professor László Szécsi.

<p align="center">
  <img src="/resources/screenshot.png" alt="A screenshot of the running project demonstrating each of the completed features." width="800">
</p>

One should be able to download the [2D_shapes_and_patterns](https://github.com/trastopchin/AIT-CG-2D-Shapes-And-Patterns/tree/master/2D_shapes_and_patterns) folder and open up the [index.html](https://github.com/trastopchin/AIT-CG-2D-Shapes-And-Patterns/blob/master/2D_shapes_and_patterns/index.html) file in a web browser to see the project. In the case of google chrome, one might have to open the browser with `open /Applications/Google\ Chrome.app --args --allow-file-access-from-files` in order to load images and textures properly. This project was built upon László Szécsi's starter code and class powerpoint slides.

## Completed Features:

1. **Simple shapes: Serpentine.** Draw a waving strip where triangles span between two sine waves.

2. **Parametric shapes: Heart.** Draw a heart parametrically defined by a [heart-curve formula](http://mathworld.wolfram.com/HeartCurve.html).

3. **Patterns: Bullseye.** Create a vertex shader and fragment shader that use the interpolated model space position to procedurally compute a color. Create a bullseye pattern by drawing parameterizable concentric circular bands.

4. **Animated patterns: Hypno bullseye.** The bullsye concentric circles should change back and forth smoothly.

5. **Animated shapes: Waving.** Use the vertex shader to add some time-changing offest to the original positions of the vertices in order to create a waving effect. Vertices should move around a small-radius circular path around their original positions.

6. **Events: Arrow move.** Use the arrow keys to change the position of an avatar object and warp it around if it leaves the canvas.
