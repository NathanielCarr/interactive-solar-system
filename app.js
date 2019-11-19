// const THREE = require("./js/three");

// All distances are in kilometres.
const BACKGROUND_TEXTURE = "assets/1K/stars_milky_way.jpg"
const ORBIT_SPEED_MODIFIER = 1 * Math.pow(10, 8);
const SYNODIC_SPEED_MODIFIER = 1 * Math.pow(10, 0);
const SOLAR_DISTANCE_SCALE = 1 / 57910000;
const PLANET_PROPERTIES = {
    // RADIUS is the real radius (km)
    // NOSCALE_RADIUS is a dramatized radius.
    // SOLAR_DISTANCE is distance from the sun (km).
    // DAYS_PER_ORBIT is the number of earth days per one orbit around the sun.
    // SYNODIC_PERIOD is hte number of earth days per one rotation around the planets centre.
    // TEXTURE is the location where the texture is found.
    SUN: {
        RADIUS: 695508,
        NOSCALE_RADIUS: 1.0,
        SOLAR_DISTANCE: 0,
        DAYS_PER_ORBIT: 0,
        SYNODIC_PERIOD: 26.6,
        TEXTURE: 'assets/1K/sun.jpg'
    },
    MERCURY: {
        RADIUS: 2440,
        NOSCALE_RADIUS: 0.15,
        SOLAR_DISTANCE: 57910000 * 1.5, // INCORRECT
        DAYS_PER_ORBIT: 87.97,
        SYNODIC_PERIOD: 175.940,
        TEXTURE: 'assets/1K/mercury.jpg'
    },
    VENUS: {
        RADIUS: 6052,
        NOSCALE_RADIUS: 0.3,
        SOLAR_DISTANCE: 108200000,
        DAYS_PER_ORBIT: 224.70,
        SYNODIC_PERIOD: -116.750,
        TEXTURE: 'assets/1K/venus_surface.jpg'
    },
    EARTH: {
        RADIUS: 6378,
        NOSCALE_RADIUS: 0.3,
        SOLAR_DISTANCE: 149600000,
        DAYS_PER_ORBIT: 365.26,
        SYNODIC_PERIOD: 1,
        TEXTURE: 'assets/1K/earth_daymap.jpg'
    },
    MARS: {
        RADIUS: 3397,
        NOSCALE_RADIUS: 0.25,
        SOLAR_DISTANCE: 227900000,
        DAYS_PER_ORBIT: 686.98,
        SYNODIC_PERIOD: 1.027,
        TEXTURE: 'assets/1K/mars.jpg'
    },
    JUPITER: {
        RADIUS: 71492,
        NOSCALE_RADIUS: 1,
        SOLAR_DISTANCE: 778500000,
        DAYS_PER_ORBIT: 4332.82,
        SYNODIC_PERIOD: 0.414,
        TEXTURE: 'assets/1K/jupiter.jpg'
    },
    SATURN: {
        RADIUS: 60268,
        NOSCALE_RADIUS: 0.9,
        SOLAR_DISTANCE: 1434000000,
        DAYS_PER_ORBIT: 10755.70,
        SYNODIC_PERIOD: 0.439,
        TEXTURE: 'assets/1K/saturn.jpg'
    },
    URANUS: {
        RADIUS: 25559,
        NOSCALE_RADIUS: 0.6,
        SOLAR_DISTANCE: 2871000000,
        DAYS_PER_ORBIT: 30687.15,
        SYNODIC_PERIOD: -0.718,
        TEXTURE: 'assets/1K/uranus.jpg'
    },
    NEPTUNE: {
        RADIUS: 24766,
        NOSCALE_RADIUS: 0.6,
        SOLAR_DISTANCE: 4495000000,
        DAYS_PER_ORBIT: 60190.03,
        SYNODIC_PERIOD: 0.671,
        TEXTURE: 'assets/1K/neptune.jpg'
    }
};
const LIGHT_PROPERTIES = [
    {
        TYPE: "ambient",
        COLOR: 0xffffff,
        INTENSITY: 0.2
    },
    {
        TYPE: "point",
        COLOR: 0xffffff,
        INTENSITY: 1,
        POSITION: {
            X: 0,
            Y: 0,
            Z: 0
        },
        DISTANCE: 100,
        RADIUS: 0.00001 // The radius can be extremely small, because the distance is what actually matters.
    }
];

async function asyncLoadTexture(textureLoader, url) {
    return new Promise((resolve, reject) => {
        textureLoader.load(url, (texture) => {
            resolve(texture);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

async function main() {
    let textureLoader = new THREE.TextureLoader();
    let scene = new THREE.Scene();
    scene.background = await asyncLoadTexture(textureLoader, BACKGROUND_TEXTURE);
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.up = new THREE.Vector3(0, 1, 0);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // Set the scene background.
    

    // Initialize planets.
    let planets = {};
    for (let planetName of Object.keys(PLANET_PROPERTIES)) {

        // Create the planet variable.
        planets[planetName.toLowerCase()] = {};
        let planet = planets[planetName.toLowerCase()];
        planet = Object.assign(planet, PLANET_PROPERTIES[planetName]);

        // Define the attributes of the planet variable.
        planet.geometry = new THREE.SphereGeometry(planet.NOSCALE_RADIUS, 32, 32);
        planet.texture = await asyncLoadTexture(textureLoader, planet.TEXTURE).catch((err) => {
            console.error(err);
        })
        if (planetName == 'SUN') {
            // Ignore lighting if the planet is the sun.
            planet.material = new THREE.MeshBasicMaterial({
                map: planet.texture
            });
        } else {
            planet.material = new THREE.MeshPhongMaterial({
                map: planet.texture
            });
        }
        planet.mesh = new THREE.Mesh(planet.geometry, planet.material);
        planet.mesh.translateX(planet.SOLAR_DISTANCE * SOLAR_DISTANCE_SCALE);

        // Add the planet.
        scene.add(planet.mesh);
    }

    // Initialize lighting.
    for (let lightProperties of LIGHT_PROPERTIES) {
        switch (lightProperties.TYPE) {
            case ("ambient"): {
                scene.add(new THREE.AmbientLight(lightProperties.COLOR, lightProperties.INTENSITY));
                break;
            }
            case ("point"): {
                let light = new THREE.PointLight(lightProperties.COLOR, lightProperties.INTENSITY, lightProperties.DISTANCE);
                light.position.set(lightProperties.POSITION.X, lightProperties.POSITION.Y, lightProperties.POSITION.Z);
                light.add(new THREE.Mesh(
                    new THREE.SphereGeometry(lightProperties.RADIUS, 1, 1),
                    new THREE.MeshBasicMaterial({
                        color: lightProperties.COLOR
                    })
                ));
                scene.add(light);
                break;
            }
            case ("directional"): {
                break;
            }
        }
    };

    // Set up the controls.
    window.onkeydown = (evt) => {
        if (evt.keyCode == 39) { // Right
            camera.position.x++;
            renderer.render(scene, camera);
        } else if (evt.keyCode == 37) { // Left
            camera.position.x--;
            renderer.render(scene, camera);
        } else if (evt.keyCode == 38) { // Up
            camera.position.y++;
            renderer.render(scene, camera);
        } else if (evt.keyCode == 40) { // Down
            camera.position.y--;
            renderer.render(scene, camera);
        }
    };

    // Set up listener to redraw the scene on resize.
    window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Move to the default camera position.
    camera.position.y = 50;
    camera.position.z = 1;
    camera.position.x = PLANET_PROPERTIES.NEPTUNE.SOLAR_DISTANCE * SOLAR_DISTANCE_SCALE + PLANET_PROPERTIES.NEPTUNE.NOSCALE_RADIUS + 100;
    camera.lookAt(planets.sun.mesh.position);

    // Set animation function.
    function animate() {
        requestAnimationFrame(animate);
        let time = Date.now() / (24 * 60 * 60 * 1000);
        for (let planetName of Object.keys(planets)) {
            let planet = planets[planetName];
            if (planetName !== "sun") {
                planet.mesh.position.set(Math.cos(time * ORBIT_SPEED_MODIFIER / planet.DAYS_PER_ORBIT) * (SOLAR_DISTANCE_SCALE * planet.SOLAR_DISTANCE), 0, Math.sin(time * ORBIT_SPEED_MODIFIER / planet.DAYS_PER_ORBIT) * (SOLAR_DISTANCE_SCALE * planet.SOLAR_DISTANCE));
            }
            planet.mesh.rotateY(time * SYNODIC_SPEED_MODIFIER / planet.SYNODIC_PERIOD);
            camera.lookAt(planets.sun.mesh.position);
        }
        renderer.render(scene, camera);
    }
    animate();
}

main();