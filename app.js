// const THREE = require("./js/three");

// All distances are in kilometres.
const ORBIT_SPEED = 1;
const RADIUS_SCALE = 1 / 57910000;
const SOLAR_DISTANCE_SCALE = 1 / 57910000;
const PLANET_PROPERTIES = {
    // RADIUS is the real radius (km)
    // NOSCALE_RADIUS is a dramatized radius.
    // SOLAR_DISTANCE is distance from the sun (km).
    // TEXTURE is the location where the texture is found.
    SUN: {
        RADIUS: 695508,
        NOSCALE_RADIUS: 1.2,
        SOLAR_DISTANCE: 0,
        DAYS_PER_ORBIT: 0,
        TEXTURE: 'assets/1K/sun.jpg'
    },
    MERCURY: {
        RADIUS: 2440,
        NOSCALE_RADIUS: 0.15,
        SOLAR_DISTANCE: 57910000,
        DAYS_PER_ORBIT: 87.97,
        TEXTURE: 'assets/1K/mercury.jpg'
    },
    VENUS: {
        RADIUS: 6052,
        NOSCALE_RADIUS: 0.3,
        SOLAR_DISTANCE: 108200000,
        DAYS_PER_ORBIT: 224.70,
        TEXTURE: 'assets/1K/venus_surface.jpg'
    },
    EARTH: {
        RADIUS: 6378,
        NOSCALE_RADIUS: 0.3,
        SOLAR_DISTANCE: 149600000,
        DAYS_PER_ORBIT: 365.26,
        TEXTURE: 'assets/1K/earth_daymap.jpg'
    },
    MARS: {
        RADIUS: 3397,
        NOSCALE_RADIUS: 0.25,
        SOLAR_DISTANCE: 227900000,
        DAYS_PER_ORBIT: 686.98,
        TEXTURE: 'assets/1K/mars.jpg'
    },
    JUPITER: {
        RADIUS: 71492,
        NOSCALE_RADIUS: 1,
        SOLAR_DISTANCE: 778500000,
        DAYS_PER_ORBIT: 4332.82,
        TEXTURE: 'assets/1K/jupiter.jpg'
    },
    SATURN: {
        RADIUS: 60268,
        NOSCALE_RADIUS: 0.9,
        SOLAR_DISTANCE: 1434000000,
        DAYS_PER_ORBIT: 10755.70,
        TEXTURE: 'assets/1K/saturn.jpg'
    },
    URANUS: {
        RADIUS: 25559,
        NOSCALE_RADIUS: 0.6,
        SOLAR_DISTANCE: 2871000000,
        DAYS_PER_ORBIT: 30687.15,
        TEXTURE: 'assets/1K/uranus.jpg'
    },
    NEPTUNE: {
        RADIUS: 24766,
        NOSCALE_RADIUS: 0.6,
        SOLAR_DISTANCE: 4495000000,
        DAYS_PER_ORBIT: 60190.03,
        TEXTURE: 'assets/1K/neptune.jpg'
    }
};

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
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00000);
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.up = new THREE.Vector3(0, 1, 0);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // Initialize planets.
    let planets = {};
    for (let planetName of Object.keys(PLANET_PROPERTIES)) {

        // Create the planet variable.
        planets[planetName.toLowerCase()] = {};
        let planet = planets[planetName.toLowerCase()];
        planet = Object.assign(planet, PLANET_PROPERTIES[planetName]);

        // Define the attributes of the planet variable.
        planet.geometry = new THREE.SphereGeometry(planet.NOSCALE_RADIUS, 32, 32);
        planet.texture = await asyncLoadTexture(new THREE.TextureLoader(), planet.TEXTURE).catch((err) => {
            console.error(err);
        });
        planet.material = new THREE.MeshBasicMaterial({
            map: planet.texture
        });
        planet.mesh = new THREE.Mesh(planet.geometry, planet.material);
        planet.mesh.translateX(planet.SOLAR_DISTANCE * SOLAR_DISTANCE_SCALE);

        // Add the planet.
        scene.add(planet.mesh);
    }

    // camera.position.x = PLANET_PROPERTIES.NEPTUNE.SOLAR_DISTANCE * SOLAR_DISTANCE_SCALE / 2;
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

    // Move to the default camera position.
    camera.position.y = 125;
    camera.position.z = 125;
    camera.position.x = PLANET_PROPERTIES.NEPTUNE.SOLAR_DISTANCE * SOLAR_DISTANCE_SCALE + PLANET_PROPERTIES.NEPTUNE.NOSCALE_RADIUS + 100;
    camera.lookAt(planets.sun.mesh.position);

    // Set animation function.
    function animate() {
        requestAnimationFrame(animate);
        let time = Date.now();
        for (let planetName of Object.keys(planets)) {
            let planet = planets[planetName];
            if (planetName !== "sun") {
                planet.mesh.position.set(Math.cos(time * (ORBIT_SPEED / planet.DAYS_PER_ORBIT) + 10) * (SOLAR_DISTANCE_SCALE * planet.SOLAR_DISTANCE), 0, Math.sin(time * (ORBIT_SPEED / planet.DAYS_PER_ORBIT) + 10) * (SOLAR_DISTANCE_SCALE * planet.SOLAR_DISTANCE));
            }
        }
        // sun.rotation.x += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

main();