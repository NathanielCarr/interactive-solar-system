// const THREE = require("./js/three");

// All distances are in kilometres.
const RADIUS_SCALE = 1 / 57910000;
const SOLAR_DISTANCE_SCALE = 1 / 57910000;
const PLANET_PROPERTIES = {
    SUN: {
        RADIUS: 695508,
        NOSCALE_RADIUS: 1.2,
        SOLAR_DISTANCE: 0,
        COLOR: 0xffff00,
        TEXTURE:'assets/8k_sun.jpg'
    },
    MERCURY: {
        RADIUS: 2440,
        NOSCALE_RADIUS: 0.15,
        SOLAR_DISTANCE: 57910000,
        COLOR: 0xc0c0c0,
        TEXTURE:'assets/8k_mercury.jpg'
    },
    VENUS: {
        RADIUS: 6052,
        NOSCALE_RADIUS: 0.3,
        SOLAR_DISTANCE: 108200000,
        COLOR: 0xffffcc,
        TEXTURE:'assets/8k_venus_surface.jpg'
    },
    EARTH: {
        RADIUS: 6378,
        NOSCALE_RADIUS: 0.3,
        SOLAR_DISTANCE: 149600000,
        COLOR: 0x0080ff,
        TEXTURE:'assets/8k_earth_daymap.jpg'
    },
    MARS: {
        RADIUS: 3397,
        NOSCALE_RADIUS: 0.25,
        SOLAR_DISTANCE: 227900000,
        COLOR: 0x930000,
        TEXTURE:'assets/8k_mars.jpg'
    },
    JUPITER: {
        RADIUS: 71492,
        NOSCALE_RADIUS: 1,
        SOLAR_DISTANCE: 778500000,
        COLOR: 0xfcc92e,
        TEXTURE:'assets/8k_jupiter.jpg'
    },
    SATURN: {
        RADIUS: 60268,
        NOSCALE_RADIUS: 0.9,
        SOLAR_DISTANCE: 1434000000,
        COLOR: 0xc8c800,
        TEXTURE:'assets/8k_saturn.jpg'
    },
    URANUS: {
        RADIUS: 25559,
        NOSCALE_RADIUS: 0.6,
        SOLAR_DISTANCE: 2871000000,
        COLOR: 0xcaffff,
        TEXTURE:'assets/2k_uranus.jpg'
    },
    NEPTUNE: {
        RADIUS: 24766,
        NOSCALE_RADIUS: 0.6,
        SOLAR_DISTANCE: 4495000000,
        COLOR: 0x007fff,
        TEXTURE:'assets/2k_neptune.jpg'
    }
};

function main() {
    // instantiate a loader
    var textureLoader = new THREE.TextureLoader();
    let scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x00000 );
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.up = new THREE.Vector3(0, 1, 0);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Initialize planets.
    let planets = {};
    for (let planetName of Object.keys(PLANET_PROPERTIES)) {
        
        planets[planetName.toLowerCase()] = {};
        let planet = planets[planetName.toLowerCase()];
        // planet.geometry = new THREE.SphereGeometry(PLANET_PROPERTIES[planetName].RADIUS * RADIUS_SCALE, 32, 32);
        planet.geometry = new THREE.SphereGeometry(PLANET_PROPERTIES[planetName].NOSCALE_RADIUS, 32, 32);
        //load texture
        //Bellow is code for loading in a texture, (first  it gets the location, then on a onLoad callback it goes to function(texture), undfined is the onProgress callback which is currently not supported, the last one is a onError callback )
        //this is always calling the error call back for some reason.
        //textureLoader.load(PLANET_PROPERTIES[planetName].TEXTURE,function ( texture ) { var material = new THREE.MeshBasicMaterial({map: texture});},undefined,function ( err ) {
        //    console.error( 'An error happened.' );
        //    console.error( PLANET_PROPERTIES[planetName].TEXTURE);
        //});
        planet.material = new THREE.MeshBasicMaterial({
            color: PLANET_PROPERTIES[planetName].COLOR
        });
        planet.mesh = new THREE.Mesh(planet.geometry, planet.material);
        planet.mesh.translateX(PLANET_PROPERTIES[planetName].SOLAR_DISTANCE * SOLAR_DISTANCE_SCALE);
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

    camera.position.y = 125;
    camera.position.z = 125;
    camera.position.x = PLANET_PROPERTIES.NEPTUNE.SOLAR_DISTANCE * SOLAR_DISTANCE_SCALE + PLANET_PROPERTIES.NEPTUNE.NOSCALE_RADIUS + 100;
    camera.lookAt(planets.sun.mesh.position);
    //    

    renderer.render(scene, camera);

    // function animate() {
    //     requestAnimationFrame(animate);
    //     sun.rotation.x += 0.01;
    //     renderer.render(scene, camera);
    // }
    // animate();
}

main();