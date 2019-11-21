// const THREE = require("./js/three");

// All distances are in kilometres.
const ORBIT_SPEED_MODIFIER = 1 * Math.pow(10, 8);
const SYNODIC_SPEED_MODIFIER = 1 * Math.pow(10, 2);
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

async function asyncLoadTexture(textureLoader, url) {
    return new Promise((resolve, reject) => {
        textureLoader.load(url, (texture) => {
            resolve(texture);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

var moveForward = false;

var moveBackward = false;

var moveLeft = false;

var moveRight = false;

var canJump = false;



var prevTime = performance.now();

var velocity = new THREE.Vector3();

var direction = new THREE.Vector3();

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

    //Setup camera
    controls = new THREE.PointerLockControls(camera, renderer.domElement);
    var blocker = document.getElementById('blocker');

    var instructions = document.getElementById('instructions');

    instructions.addEventListener('click', function () {
        controls.lock();
    }, false);
    controls.addEventListener('lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock', function () {
        blocker.style.display = 'block';
        instructions.style.display = '';
    });

    scene.add(controls.getObject());

    var onKeyDown = function (event) {

        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = true;
                break;
            case 37: // left
            case 65: // a
                moveLeft = true;
                break;
            case 40: // down
            case 83: // s
                moveBackward = true;
                break;
            case 39: // right
            case 68: // d
                moveRight = true;
                break;
        }
    };



    var onKeyUp = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = false;
                break;
            case 37: // left
            case 65: // a
                moveLeft = false;
                break;
            case 40: // down
            case 83: // s
                moveBackward = false;
                break;
            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }

    };

    document.addEventListener('keydown', onKeyDown, false);

    document.addEventListener('keyup', onKeyUp, false);

    // Move to the default camera position.
    camera.position.y = 125;
    camera.position.z = 125;
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
        }
        if ( controls.isLocked === true ) {
            time = performance.now();

            var delta = ( time - prevTime ) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;

            velocity.z -= velocity.z * 10.0 * delta;

            direction.z = Number( moveForward ) - Number( moveBackward );

            direction.x = Number( moveRight ) - Number( moveLeft );

            direction.normalize(); // this ensures consistent movements in all directions



            if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;

            if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

            controls.moveRight( - velocity.x * delta );

            controls.moveForward( - velocity.z * delta );

            prevTime = time;
        }

        renderer.render(scene, camera);
    }
    animate();
}

main();