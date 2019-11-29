// All distances are in kilometres.
const ASTEROID_TEXTURES = [
    "assets/1K/asteroid_1.png",
    "assets/1K/asteroid_2.png",
    "assets/1K/asteroid_3.png",
    "assets/1K/asteroid_4.png",
    "assets/1K/asteroid_5.png",
    "assets/1K/asteroid_6.png",
]
let DAYS_PER_MS = (0.1 * Math.pow(10, 0.25));
let SYNODIC_SPEED_MODIFIER = 1 * Math.pow(10, 0.25);
let forceBasicMaterial = true;
let objects = [];
let intersects = [];
let intersected;
let target;
let csp;
let psp;
let entities = {
    forceIlluminateLight: {
        type: "light",
        lightType: "ambient",
        name: "forceIlluminateLight",
        color: "0xFFFFFF",
        intensity: 1,
        clickable: false
    },
    skybox: {
        type: "skybox",
        initPosition: {
            x: 0,
            y: 0,
            z: 0
        },
        rotationProperties: {
            x: 2 * Math.pow(10, 16),
            y: 2 * Math.pow(10, 16),
            z: 2 * Math.pow(10, 16)
        },
        texture: "assets/1K/stars_milky_way.jpg",
        textureHD: "assets/HD/stars_milky_way.jpg",
        color: "0x010102",
        clickable: false
    },
    sun: {
        type: "sun",
        name: "sun",
        info1: "Observation data:",
        info2: "Visual brightness (V): -26.74",
        info3: "Absolute magnitude: 4.83",
        initPosition: {
            x: 0,
            y: 0,
            z: 0
        },
        radius: 1,
        tilt: THREE.Math.degToRad(7.25),
        texture: "assets/1K/sun.jpg",
        textureHD: "assets/HD/sun.jpg",
        color: "0xF18828",
        daysPerOrbit: 0,
        synodicPeriod: 26.6,
        clickable: true
    },
    sunLight: {
        type: "light",
        lightType: "point",
        color: "0xFFFFFF",
        initPosition: {
            x: 0,
            y: 0,
            z: 0
        },
        distance: 100,
        intensity: 1,
        radius: 0.0001,
        covered: true
    },
    mercury: {
        type: "planet",
        name: "mercury",
        info1: "Physical characteristics:",
        info2: "Mean radius: 2439.7km",
        info3: "Atmosphere:  Surface pressure <0.5 nPA",
        initPosition: {
            x: 1.5 + 0.25,
            y: 0,
            z: 0
        },
        radius: 0.15,
        tilt: THREE.Math.degToRad(0.03),
        texture: "assets/1K/mercury.jpg",
        textureHD: "assets/HD/mercury.jpg",
        color: "0x848383",
        orbits: "sun",
        daysPerOrbit: 87.97,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(3.38))),
        synodicPeriod: 175.940,
        clickable: true
    },
    venus: {
        type: "planet",
        name: "venus",
        info1: "Physical characteristics:",
        info2: "Mean radius: 6051.8km",
        info3: "Atmosphere:  Surface pressure 9.2 MPa",
        initPosition: {
            x: 1.8684 + 0.5,
            y: 0,
            z: 0
        },
        radius: 0.3,
        tilt: THREE.Math.degToRad(2.64),
        texture: "assets/1K/venus_surface.jpg",
        textureHD: "assets/HD/venus_surface.jpg",
        color: "0xC77328",
        orbits: "sun",
        daysPerOrbit: 224.70,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(3.86))),
        synodicPeriod: -116.750,
        clickable: true
    },
    earth: {
        type: "planet",
        name: "earth",
        info1: "Physical characteristics:",
        info2: "Mean radius: 6371km",
        info3: "Atmosphere:  Surface pressure 101.325 kPa",
        initPosition: {
            x: 2.5833 + 0.75,
            y: 0,
            z: 0
        },
        radius: 0.3,
        tilt: THREE.Math.degToRad(23.44),
        texture: "assets/1K/earth_daymap.jpg",
        textureHD: "assets/HD/earth_daymap.jpg",
        color: "0x3D567F",
        orbits: "sun",
        daysPerOrbit: 365.26,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(7.155))),
        synodicPeriod: 1,
        clickable: true
    },
    earthMoon1: {
        type: "moon",
        name: "moon",
        info1: "Physical characteristics:",
        info2: "Mean radius: 1737.4km",
        info3: "Atmosphere:  Surface pressure <0.5 nPA",
        initPosition: {
            x: 2.5833 + 0.75 + 0.3 + 0.1,
            y: 0,
            z: 0
        },
        radius: 0.04,
        tilt: THREE.Math.degToRad(6.68),
        texture: "assets/1K/moon.jpg",
        textureHD: "assets/HD/moon.jpg",
        color: "0x979392",
        orbits: "earth",
        daysPerOrbit: 27.322,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(5.09))),
        clickable: true
    },
    mars: {
        type: "planet",
        name: "mars",
        info1: "Physical characteristics:",
        info2: "Mean radius: 3389.5km",
        info3: "Atmosphere:  Surface pressure 0.636 kPA",
        initPosition: {
            x: 3.9354 + 1,
            y: 0,
            z: 0
        },
        radius: 0.25,
        tilt: THREE.Math.degToRad(25.19),
        texture: "assets/1K/mars.jpg",
        textureHD: "assets/HD/mars.jpg",
        color: "0xB76247",
        orbits: "sun",
        daysPerOrbit: 686.98,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(5.65))),
        synodicPeriod: 1.027,
        clickable: true
    },
    jupiter: {
        type: "planet",
        name: "jupiter",
        info1: "Physical characteristics:",
        info2: "Mean radius: 69911km",
        info3: "Atmosphere:  Surface pressure 20-200 kPA",
        initPosition: {
            x: 13.4433 * 1 + 1,
            y: 0,
            z: 0
        },
        radius: 0.9,
        tilt: THREE.Math.degToRad(3.13),
        texture: "assets/1K/jupiter.jpg",
        textureHD: "assets/HD/jupiter.jpg",
        color: "0xA6A095",
        orbits: "sun",
        daysPerOrbit: 4332.82,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(6.09))),
        synodicPeriod: 0.414,
        clickable: true
    },
    saturn: {
        type: "planet",
        name: "saturn",
        info1: "Physical characteristics:",
        info2: "Mean radius: 58232km",
        info3: "Atmosphere:  Surface pressure 140 kPA",
        initPosition: {
            x: 24.7626 * 1 + 1,
            y: 0,
            z: 0
        },
        radius: 0.8,
        tilt: THREE.Math.degToRad(26.73),
        texture: "assets/1K/saturn.jpg",
        textureHD: "assets/HD/saturn.jpg",
        color: "0xCFC0A2",
        orbits: "sun",
        daysPerOrbit: 10755.70,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(5.51))),
        synodicPeriod: 0.439,
        clickable: true
    },
    saturnRing: {
        type: "ring",
        name: "saturnRing",
        initPosition: {
            x: 24.7626 * 1 + 1,
            y: 0,
            z: 0
        },
        innerRadius: (0.8 + 0.6) * 3 / 7,
        radius: 0.8 + 0.6,
        tilt: THREE.Math.degToRad(26.73),
        texture: "assets/1K/saturn_ring.png",
        textureHD: "assets/HD/saturn_ring.png",
        color: "0xCFC0A2",
        orbits: "saturn",
        clickable: false
    },
    uranus: {
        type: "planet",
        name: "uranus",
        info1: "Physical characteristics:",
        info2: "Mean radius: 25362km",
        info3: "Atmosphere:  Surface pressure 130 kPA",
        initPosition: {
            x: 49.5769 * 1 + 1,
            y: 0,
            z: 0
        },
        radius: 0.6,
        tilt: THREE.Math.degToRad(82.23),
        texture: "assets/1K/uranus.jpg",
        textureHD: "assets/HD/uranus.jpg",
        color: "0x9BCBD2",
        orbits: "sun",
        daysPerOrbit: 30687.15,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(6.48))),
        synodicPeriod: -0.718,
        clickable: true
    },
    neptune: {
        type: "planet",
        name: "neptune",
        info1: "Physical characteristics:",
        info2: "Mean radius: 24622km",
        info3: "Atmosphere:  Surface pressure 130 kPA",
        initPosition: {
            x: 77.6204 * 1 + 1,
            y: 0,
            z: 0
        },
        radius: 0.6,
        tilt: THREE.Math.degToRad(28.32),
        texture: "assets/1K/neptune.jpg",
        textureHD: "assets/HD/neptune.jpg",
        color: "0x364FA8",
        orbits: "sun",
        daysPerOrbit: 60190.03,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(6.43))),
        synodicPeriod: 0.671,
        clickable: true
    },
    starLight: {
        type: "light",
        lightType: "ambient",
        color: "0xFFFFFF",
        intensity: 0.20,
        clickable: false
    }
};
let animationOrder = [
    "skybox",
    "sun",
    "planet",
    'ring',
    "moon",
    "asteroid",
    "light",
    "ring"
];
let entitiesArr = Object.values(entities).sort((a, b) => {
    return animationOrder.indexOf(b.type) - animationOrder.indexOf(a.type);
});

//const CAMERA_START_POS = PLANET_PROPERTIES.NEPTUNE.SOLAR_DISTANCE * SOLAR_DISTANCE_SCALE + PLANET_PROPERTIES.NEPTUNE.NOSCALE_RADIUS + 100;

async function asyncLoadTexture(textureLoader, url) {
    return new Promise((resolve, reject) => {
        textureLoader.load(url, (texture) => {
            resolve(texture);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

let orbiting = false;

let moveForward = false;

let moveBackward = false;

let moveLeft = false;

let moveRight = false;

let prevTime = performance.now();

let velocity = new THREE.Vector3();

let direction = new THREE.Vector3();

let cameraOrbitSpeed = 0;
let speedMod = 1;
let simspeed = 1;

function resetCam(camera, targ) {
    camera.position.y = 125;
    camera.position.z = 125;
    camera.position.x = CAMERA_START_POS;
    camera.lookAt(targ);
}

/**
 * Ref: https://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js
 */
function rotateAboutPivot(subjectMesh, pivotPosition, axis, radians) {
    // Move the subject to the origin.
    subjectMesh.position.set(
        subjectMesh.position.x - pivotPosition.x,
        subjectMesh.position.y - pivotPosition.y,
        subjectMesh.position.z - pivotPosition.z
    );

    // Apply the rotation.
    subjectMesh.position.applyAxisAngle(axis.normalize(), radians);

    // Move the subject back to its position.
    subjectMesh.position.set(
        subjectMesh.position.x + pivotPosition.x,
        subjectMesh.position.y + pivotPosition.y,
        subjectMesh.position.z + pivotPosition.z
    );
}

function generateAsteroids(count, textureChoices, minRadius, maxRadius, minDistance, maxDistance, minDaysPerOrbit, maxDaysPerOrbit, minAngle, maxAngle, minSynodicPeriod, maxSynodicPeriod) {
    for (let i = 0; i < count; i++) {
        let textureChoice = Math.round(Math.random() * (textureChoices.length - 1));
        entities[`asteroid_${i}`] = {
            type: "asteroid",
            name: `asteroid_${i}`,
            clickable: false,
            initPosition: {
                x: (Math.random() * (maxDistance - minDistance) + minDistance),
                y: 0,
                z: 0
            },
            radius: Math.random() * (maxRadius - minRadius) + minRadius,
            orbits: "sun",
            daysPerOrbit: Math.random() * (maxDaysPerOrbit - minDaysPerOrbit) + minDaysPerOrbit,
            orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad((Math.random() * (maxAngle - minAngle) + minAngle)))),
            synodicPeriod: Math.random() * (maxSynodicPeriod - minSynodicPeriod) + minSynodicPeriod,
            preloadedTexture: textureChoices[textureChoice],
            color: "0xB76247"
        };
    }
}

async function renderEntitiesArr(scene, textureLoader) {
    for (let entity of entitiesArr) {
        switch (entity.type) {
            case ("skybox"): {
                let geometry = new THREE.SphereGeometry(500 / 2, 64, 64)
                let texture = await asyncLoadTexture(textureLoader, entity.textureHD)
                    .catch((err) => {
                        console.error(err);
                        return undefined;
                    });
                let material = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.BackSide
                });
                entity.mesh = new THREE.Mesh(
                    geometry,
                    material
                )
                entity.mesh.position.set(entity.initPosition.x, entity.initPosition.y, entity.initPosition.z);
                scene.add(entity.mesh);
                break;
            }
            case ("sun"): {
                let geometry = new THREE.SphereGeometry(entity.radius, 32, 32);
                let texture = await asyncLoadTexture(textureLoader, entity.texture)
                    .catch((err) => {
                        console.error(err);
                        return undefined;
                    });
                let material = new THREE.MeshBasicMaterial({
                    map: texture
                });
                entity.mesh = new THREE.Mesh(
                    geometry,
                    material
                )
                entity.mesh.position.set(entity.initPosition.x, entity.initPosition.y, entity.initPosition.z);
                if (entity.tilt !== undefined) {
                    entity.mesh.rotation.x = entity.tilt;
                }
                scene.add(entity.mesh);
                objects.push(entity.mesh)
                break;
            }
            case ("asteroid"):
            case ("moon"): {
                let geometry = new THREE.SphereGeometry(entity.radius, 32, 32);
                let texture = entity.preloadedTexture || await asyncLoadTexture(textureLoader, entity.texture)
                    .catch((err) => {
                        console.error(err);
                        return undefined;
                    });
                let material = new THREE.MeshPhongMaterial({
                    map: texture
                });
                entity.mesh = new THREE.Mesh(
                    geometry,
                    material
                )
                entity.mesh.position.set(entity.initPosition.x, entity.initPosition.y, entity.initPosition.z);
                if (entity.tilt !== undefined) {
                    entity.mesh.rotation.x = entity.tilt;
                }
                objects.push(entity.mesh)
                scene.add(entity.mesh);
                break;
            }
            case ("planet"): {
                let geometry = new THREE.SphereGeometry(entity.radius, 32, 32);
                let texture = entity.preloadedTexture || await asyncLoadTexture(textureLoader, entity.texture)
                    .catch((err) => {
                        console.error(err);
                        return undefined;
                    });
                let material = new THREE.MeshPhongMaterial({
                    map: texture
                });
                entity.mesh = new THREE.Mesh(
                    geometry,
                    material
                )
                entity.mesh.position.set(entity.initPosition.x, entity.initPosition.y, entity.initPosition.z);
                if (entity.tilt !== undefined) {
                    entity.mesh.rotation.x = entity.tilt;
                }
                objects.push(entity.mesh)
                scene.add(entity.mesh);

                // Add an orbital line for this planet.
                let orbitalLine = new THREE.Line(
                    new THREE.CircleGeometry(entity.initPosition.x, 90),
                    new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                        opacity: .1,
                        side: THREE.BackSide
                    })
                );
                orbitalLine.geometry.vertices.shift();
                orbitalLine.rotation.x = THREE.Math.degToRad(90) + Math.atan(entity.orbitalInclineVector.z);
                scene.add(orbitalLine);
                break;
            }
            case ("ring"): {
                let geometry = new THREE.RingGeometry(entity.innerRadius, entity.radius, 32);
                let texture = await asyncLoadTexture(textureLoader, entity.texture)
                    .catch((err) => {
                        console.error(err);
                        return undefined;
                    });
                let material = // Vertex/fragment shader code to place the texture in a ring. Ref: https://codepen.io/prisoner849/pen/wvwVMEo?editors=0010
                    new THREE.ShaderMaterial({
                        side: THREE.DoubleSide,
                        uniforms: {
                            texture: {
                                value: texture
                            },
                            innerRadius: {
                                value: entity.innerRadius
                            },
                            outerRadius: {
                                value: entity.radius
                            }
                        },
                        vertexShader: `
                          varying vec3 vPos;
                          void main() {
                            vPos = position;
                            vec3 viewPosition = (modelViewMatrix * vec4(position, 1.)).xyz;
                            gl_Position = projectionMatrix * vec4(viewPosition, 1.);
                          }
                        `,
                        fragmentShader: `
                          uniform sampler2D texture;
                          uniform float innerRadius;
                          uniform float outerRadius;
                          varying vec3 vPos;
                          vec4 color() {
                            vec2 uv = vec2(0);
                            uv.x = (length(vPos) - innerRadius) / (outerRadius - innerRadius);
                            if (uv.x < 0.0 || uv.x > 1.0) {
                              discard;
                            }
                            vec4 pixel = texture2D(texture, uv);
                            return pixel;
                          }
                          void main() {
                            gl_FragColor = color();
                          }
                        `,
                        transparent: true
                    })
                entity.mesh = new THREE.Mesh(
                    geometry,
                    material
                );
                if (entity.tilt !== undefined) {
                    entity.mesh.rotation.x = Math.PI / 2 + entity.tilt;
                }
                entity.mesh.position.set(entity.initPosition.x, entity.initPosition.y, entity.initPosition.z);
                scene.add(entity.mesh);
                break;
            }
            case ("light"): {
                switch (entity.lightType) {
                    case ("ambient"): {
                        entity.light = new THREE.AmbientLight(parseInt(entity.color), entity.intensity);
                        scene.add(entity.light);
                        break;
                    }
                    case ("point"): {
                        entity.light = new THREE.PointLight(parseInt(entity.color), entity.intensity, entity.distance);
                        entity.light.position.set(entity.initPosition.x, entity.initPosition.y, entity.initPosition.z);
                        let geometry = entity.covered ?
                            new THREE.SphereGeometry(entity.radius, 8, 8) :
                            new THREE.SphereGeometry(entity.radius, 32, 32);
                        let mesh = new THREE.MeshBasicMaterial({
                            color: parseInt(entity.color)
                        })
                        entity.light.add(new THREE.Mesh(geometry, mesh));
                        scene.add(entity.light);
                        break;
                    }
                }
                break;
            }
        }
    }
}

function forceIlluminate(forceIllumination) {
    for (let light of entitiesArr.filter((entity) => { return entity.type === "light"; })) {
        if (light.name === "forceIlluminateLight") {
            light.light.intensity = forceIllumination ? light.intensity : 0;
        } else {
            light.light.intensity = forceIllumination ? 0 : light.intensity;
        }
    }
}

async function main() {
    //vars for the mouse click vector
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    // Set up the textureLoader.
    let textureLoader = new THREE.TextureLoader();

    // Set up the renderer.
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);

    // Set up the camera.
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.up = new THREE.Vector3(0, 1, 0);

    // Set up the scene to show darkness until the entitiesArr are rendered.
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    renderer.render(scene, camera);
    //HUD/UI elements
    let uielements = [];
    // We will use 2D canvas element to render our HUD.  
    let hudCanvas = document.createElement('canvas');
    hudCanvas.width = window.innerWidth * 2;
    hudCanvas.height = window.innerHeight * 2;
    let hudBitmap = hudCanvas.getContext('2d');
    hudBitmap.font = "Normal 100px Courier New";
    hudBitmap.textAlign = 'left';
    hudBitmap.fillStyle = "rgba(245,245,245,0.95)";
    hudBitmap.fillText('The Solar System', window.innerWidth / 12, window.innerHeight / 10);
    //hudBitmap.font = "Normal 50px Courier New";
    //hudBitmap.fillText('Simulation Speed 1', window.innerWidth / 12, 19.5* (window.innerHeight / 10));
    let cameraHUD = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0, 30);
    hudscene = new THREE.Scene();
    //create meterial by usuing the 2d graphics we just renderd
    let hudTexture = new THREE.Texture(hudCanvas);
    hudTexture.needsUpdate = true;
    let material = new THREE.MeshBasicMaterial({
        map: hudTexture
    });
    material.transparent = true;
    let planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    let plane = new THREE.Mesh(planeGeometry, material);
    hudscene.add(plane);
    //dat gui for the demo 

    //TODO replace this with a custom menu, or even just a css button

    // Preload all the textures for the asteroids.
    let texturePromises = [];
    for (let texture of ASTEROID_TEXTURES) {
        texturePromises.push(asyncLoadTexture(textureLoader, texture));
    }
    let preLoadedTextures = await Promise.all(texturePromises);

    // Generate the asteroids.
    generateAsteroids(75, preLoadedTextures, 0.03, 0.005,
        entities.mars.initPosition.x + entities.mars.radius + 0.01,
        entities.jupiter.initPosition.x - entities.jupiter.radius - 0.01,
        100, 1000, -10, 10, 10, 1000);

    // Order the entitites for animation.
    entitiesArr = Object.values(entities).sort((a, b) => {
        return animationOrder.indexOf(b.type) - animationOrder.indexOf(a.type);
    });

    // Render the entitiesArr, and associate the entities with the entities that orbit them.
    await renderEntitiesArr(scene, textureLoader);
    for (let entity of entitiesArr) {
        if (entity.orbits !== undefined) {
            entities[entity.orbits].orbiters = entities[entity.orbits].orbiters || [];
            entities[entity.orbits].orbiters.push(entity);
        }
    }

    // Set forced illumination to false.
    forceIlluminate(false);

    // Render the scene.
    renderer.render(scene, camera);

    // Setup camera
    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    let controls = new THREE.PointerLockControls(camera, renderer.domElement);
    let blocker = document.getElementById('blocker');
    let instructions = document.getElementById('instructions');
    let nextbutton = document.getElementById('next-button');
    let previousbutton = document.getElementById('previous-button');
    let pausebutton = document.getElementById('pause-button');
    let simspeedtext = document.getElementById('simspeed-text');
    let lockedCam = true;

    orbitControls.enablePan = false;

    nextbutton.style.display = "block";
    previousbutton.style.display = "block";
    pausebutton.style.display = "block";
    simspeedtext.style.display = "block";
    instructions.addEventListener('click', function () {
        if (lockedCam) {
            controls.lock();
        }
    }, false);

    function updatehud(entity) {
        csp = entity.name;
        target = entity.mesh;
        hudBitmap.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
        //hudBitmap.fillStyle = "rgba(20,139,224,0.25)";
        //hudBitmap.fillRect((window.innerWidth / 12), (window.innerHeight / 16),window.innerWidth/2,window.innerHeight/5)
        hudBitmap.fillStyle = "rgba(245,245,245,0.95)";
        hudBitmap.font = "Normal 100px Courier New";
        hudBitmap.fillText(entity.name, window.innerWidth / 12, window.innerHeight / 10);
        hudBitmap.font = "Normal 60px Courier New";
        hudBitmap.textAlign = 'left';
        hudBitmap.fillText(entity.info1, window.innerWidth / 12, 1.4 * window.innerHeight / 8);
        hudBitmap.fillText(entity.info2, window.innerWidth / 12, 1.9 * (window.innerHeight / 8));
        hudBitmap.fillText(entity.info3, window.innerWidth / 12, 2.4 * (window.innerHeight / 8));
        //hudBitmap.fillText(entity., window.innerWidth / 12, 4*(window.innerHeight / 8));
        hudTexture.needsUpdate = true;
    }
    nextbutton.addEventListener('click', function () {
        let count = 0;
        for (let entity of entitiesArr) {
            if (entity.mesh != null) {
                if (entity.name == csp) {
                    if (csp == "asteroid") { //if its an asteroid we jump stright to juipter
                        entity = entitiesArr[27];
                        updatehud(entity);
                        break;
                    } else if (csp == "sun") { //if its an asteroid we jump stright to juipter
                        entity = entitiesArr[22];
                        updatehud(entity);
                        break;
                    } else {
                        entity = entitiesArr[count + 1];
                        updatehud(entity);
                        break;
                    }
                }
                count += 1;
            }
        }
    });

    previousbutton.addEventListener('click', function () {
        console.log(entitiesArr);
        let count = 0;
        for (let entity of entitiesArr) {
            if (entity.mesh != null) {
                if (entity.name == csp) {
                    if (csp == "asteroid") { //if its an asteroid we jump stright to mars
                        entity = entitiesArr[25];
                        updatehud(entity);
                        break;
                    } else if (csp == "sun") { //if its the sun we jump stright to neptune
                        entity = entitiesArr[29];
                        updatehud(entity);
                        break;
                    } else {
                        entity = entitiesArr[count - 1];
                        updatehud(entity);
                        break;

                    }
                }
            }
            count += 1;
        }
    });
    pausebutton.addEventListener('click', function () {
        if (simspeed != 0) {
            SYNODIC_SPEED_MODIFIER = 0;
            DAYS_PER_MS = 0;
            simspeed = 0;
        } else {
            SYNODIC_SPEED_MODIFIER = 1 * Math.pow(10, 0.25);
            DAYS_PER_MS = 0.1 * Math.pow(10, 0.25);
            simspeed = 1;
        }

        simspeedtext.innerText = "Sim Speed:" + simspeed;
    });

    controls.addEventListener('lock', function () {
        if (lockedCam) {
            instructions.style.display = 'none';
            blocker.style.display = 'none';
        }
    });

    controls.addEventListener('unlock', function () {
        if (lockedCam) {
            blocker.style.display = 'block';
            instructions.style.display = '';
        }
    });

    scene.add(controls.getObject());

    let onKeyDown = function (event) {

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
            case 16: //shift
                speedMod = 3;
                break;
        }
    };

    let onKeyUp = function (event) {
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
            case 190:
                SYNODIC_SPEED_MODIFIER *= 2;
                DAYS_PER_MS *= 2;
                simspeed *= 2;
                simspeedtext.innerText = "Sim Speed:" + simspeed;
                // hudBitmap.font = "Normal 50px Courier New";
                // hudBitmap.fillText('Simulation Speed '+simspeed, window.innerWidth / 12, 19.5* (window.innerHeight / 10));
                // hudTexture.needsUpdate = true;
                //   if(orbitControls.autoRotateSpeed<1){
                //      if(orbitControls.autoRotateSpeed>=0.5){
                //         orbitControls.autoRotateSpeed=1;
                //    }else if(orbitControls.autoRotateSpeed==0){
                //       orbitControls.autoRotateSpeed=0.125;
                //  }else{
                //     orbitControls.autoRotateSpeed*=2;
                //}  
                // }
                break;
            case 188:
                SYNODIC_SPEED_MODIFIER /= 2;
                DAYS_PER_MS /= 2;
                simspeed /= 2;
                simspeedtext.innerText = "Sim Speed:" + simspeed;
                //  hudBitmap.font = "Normal 50px Courier New";
                //hudBitmap.fillText('Simulation Speed '+simspeed, window.innerWidth / 12, 19.5* (window.innerHeight / 10));
                //  hudTexture.needsUpdate = true;
                //if(orbitControls.autoRotateSpeed<0.125){
                //   orbitControls.autoRotateSpeed=0;
                //}else{
                //   orbitControls.autoRotateSpeed/=2
                // }
                break;
            case 16: //shift
                speedMod = 1;
                break;
            case 49:
                controls.lock();
                lockedCam = true;
                // resetCam(camera, entities.sun.mesh.position);
                moveForward, moveBackward, moveLeft, moveRight = false;
                orbiting = false;
                break;
            case 50:
                controls.unlock();
                lockedCam = false;
                //resetCam(camera, planets[].mesh.position);
                moveForward, moveBackward, moveLeft, moveRight = false;
                orbiting = true;
                csp = entitiesArr[1].name; //set the current selected planet to the sun
                break;
            case 51:
                controls.unlock();
                lockedCam = false;
                moveForward, moveBackward, moveLeft, moveRight = false;
                //resetCam(camera, planets[1].mesh.position);
                orbiting = true;
                break;
        }
    }
    window.onmousemove = (evt) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        if (intersects.length != 0) {
            for (let entity of entitiesArr) {
                if (entity.mesh != null) {
                    let minPosX = entity.mesh.position.x - entity.radius;
                    let maxPosX = entity.mesh.position.x + entity.radius;
                    let minPosY = entity.mesh.position.y - entity.radius;
                    let maxPosY = entity.mesh.position.y + entity.radius;
                    let minPosZ = entity.mesh.position.z - entity.radius;
                    let maxPosZ = entity.mesh.position.z + entity.radius;
                    if (minPosX <= intersects[0].point.x && maxPosX >= intersects[0].point.x && minPosZ <= intersects[0].point.z && maxPosZ >= intersects[0].point.z) {
                        //poutline();
                        break;
                    }
                }
            }
        }
    };

    // function poutline(){
    //     //find the intererections
    //      raycaster.setFromCamera(mouse, camera);
    //      let intersectables = entitiesArr
    //          .filter((entity) => {
    //              return entity.clickable;
    //          })
    //          .map((entity) => { return entity.mesh; });
    //      intersects = raycaster.intersectObjects(intersectables, false);
    //      if (intersects.length != 0) {
    //         for (let entity of entitiesArr) {
    //             if (entity.mesh != null) {
    //                 let minPosX = entity.mesh.position.x - entity.radius;
    //                 let maxPosX = entity.mesh.position.x + entity.radius;
    //                 let minPosY = entity.mesh.position.y - entity.radius;
    //                 let maxPosY = entity.mesh.position.y + entity.radius;
    //                 let minPosZ = entity.mesh.position.z - entity.radius;
    //                 let maxPosZ = entity.mesh.position.z + entity.radius;
    //                 if (minPosX <= intersects[0].point.x && maxPosX >= intersects[0].point.x && minPosZ <= intersects[0].point.z && maxPosZ >= intersects[0].point.z) {
    //                    //if the current selected object is not he currently stored intersectio object
    //                     if(entity!=intersected){
    //                         //restore previous
    //                         if(intersected) intersected.material=intersected.oldmat;
    //                         //store refence to object
    //                         intersected=entity;
    //                         intersected.oldmat=entity.material;
    //                         intersected.material.color.setHex(0xffff00 );

    //                    }else{
    //                         //restore previous
    //                         if(intersected) intersected.material=intersected.oldmat;
    //                         intersected = null;                           
    //                    }
    //                     break;
    //                 }
    //             }
    //         }
    //     }

    // }

    window.onclick = (evt) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        //find the intererections
        raycaster.setFromCamera(mouse, camera);
        let intersectables = entitiesArr
            .filter((entity) => {
                return entity.clickable;
            })
            .map((entity) => {
                return entity.mesh;
            });
        intersects = raycaster.intersectObjects(intersectables, false);
        if (intersects.length != 0) {
            for (let entity of entitiesArr) {
                if (entity.mesh != null && entity.clickable === true) {
                    let minPosX = entity.mesh.position.x - entity.radius;
                    let maxPosX = entity.mesh.position.x + entity.radius;
                    let minPosY = entity.mesh.position.y - entity.radius;
                    let maxPosY = entity.mesh.position.y + entity.radius;
                    let minPosZ = entity.mesh.position.z - entity.radius;
                    let maxPosZ = entity.mesh.position.z + entity.radius;
                    if (minPosX <= intersects[0].point.x && maxPosX >= intersects[0].point.x && minPosZ <= intersects[0].point.z && maxPosZ >= intersects[0].point.z) {
                        console.log("Planet found, it's ", entity.name);
                        updatehud(entity);
                        break;
                    }
                }
            }
        }

    };

    document.addEventListener('keydown', onKeyDown, false);

    document.addEventListener('keyup', onKeyUp, false);

    // Set up listener to redraw the scene on resize.
    window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    };

    // Move to a position that will get every entity in view.
    let furthestPlanet = entitiesArr
        .filter((e) => {
            return e.type === "planet";
        })
        .sort((a, b) => {
            return b.mesh.position.length() - a.mesh.position.length()
        })[0];
    camera.position.set(furthestPlanet.mesh.position.length() * 2, furthestPlanet.mesh.position.length(), furthestPlanet.mesh.position.length() * 2);

    // Look at the sun.
    camera.lookAt(entities.sun.mesh.position);
    // Look at the sun.
    target = null;
    renderer.render(scene, camera);

    orbitControls.autoRotate = false;
    orbitControls.autoRotateSpeed = cameraOrbitSpeed;
    // Start animating.
    let lastTick = Date.now();

    function animate() {
        requestAnimationFrame(animate);

        // Animate the entitiesArr.
        let time = Date.now();
        let daysPassed = (time - lastTick) * DAYS_PER_MS;
        lastTick = time;
        for (let entity of entitiesArr) {
            // Orbit this entity, if this entity orbits.
            if (entity.orbits !== undefined && entity.daysPerOrbit !== undefined) {
                rotateAboutPivot(entity.mesh, entities[entity.orbits].mesh.position, entity.orbitalInclineVector, 2 * Math.PI * daysPassed * (1 / entity.daysPerOrbit));
                // Orbit every planet that orbits this entity (DFS) appropriately.
                let orbiterStack = [...(entity.orbiters || [])];
                while (orbiterStack.length > 0) {
                    let orbiter = orbiterStack.pop();
                    rotateAboutPivot(orbiter.mesh, entities[entity.orbits].mesh.position, entity.orbitalInclineVector, 2 * Math.PI * daysPassed * (1 / entity.daysPerOrbit));
                    // rotateAboutPivot(orbiter.mesh, entities[entity.orbits].mesh.position, new THREE.Vector3(0, 1, 0), 2 * Math.PI * daysPassed * (1 / entity.daysPerOrbit));
                    for (orbiter of orbiter.orbiters || []) {
                        orbiterStack.push();
                    }
                }
            }
            // Apply the synodic spin.
            if (entity.synodicPeriod !== undefined) {
                entity.mesh.rotateY(daysPassed * SYNODIC_SPEED_MODIFIER / entity.synodicPeriod);
            }
            // If there is a fixed rotation, apply it.
            if (entity.rotationProperties !== undefined) {
                entity.mesh.rotateX(time / entity.rotationProperties.x);
                entity.mesh.rotateY(time / entity.rotationProperties.y);
                entity.mesh.rotateZ(time / entity.rotationProperties.z);
            }
        }
        if (controls.isLocked === true && !orbiting) {
            time = performance.now();

            let delta = (time - prevTime) / 1000;

            velocity.x = 0;

            velocity.y = 0;

            velocity.z = 0;

            camera.getWorldDirection(direction);

            direction.z = Number(moveForward) - Number(moveBackward);

            //direction.y = Number(moveForward) - Number(moveBackward);

            direction.x = Number(moveRight) - Number(moveLeft);

            direction.normalize(); // this ensures consistent movements in all directions

            if (moveForward) {
                velocity.y -= direction.y * 600.0 * speedMod * delta;
                velocity.z -= direction.z * 600.0 * speedMod * delta;
            } else if (moveBackward) {
                velocity.y += direction.y * 600.0 * speedMod * delta;
                velocity.z -= direction.z * 600.0 * speedMod * delta;
            }

            if (moveLeft || moveRight) velocity.x -= direction.x * speedMod * 600.0 * delta;

            controls.moveRight(-velocity.x * delta);

            controls.moveForward(-velocity.z * delta);

            controls.getObject().position.y -= (velocity.y * delta);

            prevTime = time;
        } else if (orbiting) {
            if (target != null) {
                orbitControls.target = target.position;
            }
            orbitControls.update();
        }
        //poutline();
        renderer.render(scene, camera);
        renderer.render(hudscene, cameraHUD);

    }
    animate();
}

main();