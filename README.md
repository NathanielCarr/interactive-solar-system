# cp-411-project
The final project (model of the solar system) for CP411

## Authors:
    Brendan Whelan, 160662400
    Nathaniel Carr, 160150170
    Tim McGill, 160805190

## Controls:
    WASD - Move Free Cam
    Mouse - Aim Free Cam
    1 - Switch to Free Cam
    2 -  Switch to Orbit Cam
    Left Click - Select Planet As Orbit Cam Focus
    Shift - Increase Move Speed of Free Camera
    < - Slow Down Simulation
    > - Speed Up Simulation
    Scroll - Zoom in and Out
    ESC - Open Controls Menu

## Project Goal: 
    The goal of the project was to create a simulation of our solar system to aid in the teaching of a 5th grade class.
    In order to do this, we created a simple rendition of the solar system with all planets (excluding Pluto). The rendering is not to proper scale or distance, as this would cause issues with planets being too far apart or being too small to see. However, the planets are in scale relative to one another to maintain an accurate aproximation of size and distance. We chose to only include Earth's moon as it is unlikely a 5th grade class would make use of the other moons, and including them would clutter up the simulation. Additionally, we included a simple asteroid belt between Mars and Jupiter.

    To aid in teaching we included options to speed up, slow down and pause the rotation and revolution of the planets, allowing greater freedom in how they are presented. Additionally, lighting can be toggled between realistic and fully lit, allowing the user to properly view the system from any angle if need be.

## User Guide:
    The user controls the program through two cameras, a freecam and an orbital camera. The freecam is controlled using basic FPS controls (Mouse and WASD) and can be sped up using shift. The Orbital Camera is controlled by clicking on a planet to focus on it. Holding left click while in Orbit Cam allows the user to rotate about the planet. The user may also navigate between planets using UI buttons.