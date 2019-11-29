const ASTEROID_TEXTURES = [
    "assets/1K/asteroid_1.png",
    "assets/1K/asteroid_2.png",
    "assets/1K/asteroid_3.png",
    "assets/1K/asteroid_4.png",
    "assets/1K/asteroid_5.png",
    "assets/1K/asteroid_6.png",
]
const CAMERA_ORBIT_SPEED = 0;

// The entities to be rendered.
let entities = {
    artificialLight: {
        type: "light",
        lightType: "ambient",
        name: "artificialLight",
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
        clickable: false
    },
    sun: {
        type: "sun",
        name: "sun",
        info: {
            info1: "Observation data:",
            info2: "Visual brightness (V): -26.74",
            info3: "Absolute magnitude: 4.83"
        },
        initPosition: {
            x: 0,
            y: 0,
            z: 0
        },
        radius: 1,
        tilt: THREE.Math.degToRad(7.25),
        texture: "assets/1K/sun.jpg",
        textureHD: "assets/HD/sun.jpg",
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
        info: {
            info1: "Physical characteristics:",
            info2: "Mean radius: 2439.7km",
            info3: "Atmosphere:  Surface pressure <0.5 nPA",
            info4: "Average Distance To Sun:  0.387 AU",
            info5: "Sidereal Period: 88 days",
        },
        initPosition: {
            x: 1.5 + 0.25,
            y: 0,
            z: 0
        },
        radius: 0.15,
        tilt: THREE.Math.degToRad(0.03),
        texture: "assets/1K/mercury.jpg",
        textureHD: "assets/HD/mercury.jpg",
        orbits: "sun",
        daysPerOrbit: 87.97,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(3.38))),
        synodicPeriod: 175.940,
        clickable: true
    },
    venus: {
        type: "planet",
        name: "venus",
        info: {
            info1: "Physical characteristics:",
            info2: "Mean radius: 6051.8km",
            info3: "Atmosphere:  Surface pressure 9.2 MPa",
            info4: "Average Distance To Sun: 0.722 Au",
            info5: "Sidereal Period: 225 days"
        },
        initPosition: {
            x: 1.8684 + 0.5,
            y: 0,
            z: 0
        },
        radius: 0.3,
        tilt: THREE.Math.degToRad(2.64),
        texture: "assets/1K/venus_surface.jpg",
        textureHD: "assets/HD/venus_surface.jpg",
        orbits: "sun",
        daysPerOrbit: 224.70,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(3.86))),
        synodicPeriod: -116.750,
        clickable: true
    },
    earth: {
        type: "planet",
        name: "earth",
        info: {
            info1: "Physical characteristics:",
            info2: "Mean radius: 6371km",
            info3: "Atmosphere:  Surface pressure 101.325 kPa",
            info4: "Average Distance To Sun: 1 AU",
            info5: "Sidereal Period: 1 year"
        },
        initPosition: {
            x: 2.5833 + 0.75,
            y: 0,
            z: 0
        },
        radius: 0.3,
        tilt: THREE.Math.degToRad(23.44),
        texture: "assets/1K/earth_daymap.jpg",
        textureHD: "assets/HD/earth_daymap.jpg",
        orbits: "sun",
        daysPerOrbit: 365.26,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(7.155))),
        synodicPeriod: 1,
        clickable: true
    },
    earthMoon1: {
        type: "moon",
        name: "moon",
        info: {
            info1: "Physical characteristics:",
            info2: "Mean radius: 1737.4km",
            info3: "Atmosphere:  Surface pressure <0.5 nPA",
            info4: "Sidereal Month: 27 days"
        },
        initPosition: {
            x: 2.5833 + 0.75 + 0.3 + 0.1,
            y: 0,
            z: 0
        },
        radius: 0.04,
        tilt: THREE.Math.degToRad(6.68),
        texture: "assets/1K/moon.jpg",
        textureHD: "assets/HD/moon.jpg",
        orbits: "earth",
        daysPerOrbit: 27.322,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(5.09))),
        clickable: true
    },
    mars: {
        type: "planet",
        name: "mars",
        info: {
            info1: "Physical characteristics:",
            info2: "Mean radius: 3389.5km",
            info3: "Atmosphere:  Surface pressure 0.636 kPA",
            info4: "Average Distance To Sun: 1.52 AU",
            info5: "Sidereal Period: 1.9 years"
        },
        initPosition: {
            x: 3.9354 + 1,
            y: 0,
            z: 0
        },
        radius: 0.25,
        tilt: THREE.Math.degToRad(25.19),
        texture: "assets/1K/mars.jpg",
        textureHD: "assets/HD/mars.jpg",
        orbits: "sun",
        daysPerOrbit: 686.98,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(5.65))),
        synodicPeriod: 1.027,
        clickable: true
    },
    jupiter: {
        type: "planet",
        name: "jupiter",
        info: {
            info1: "Physical characteristics:",
            info2: "Mean radius: 69911km",
            info3: "Atmosphere:  Surface pressure 20-200 kPA",
            info4: "Average Distance To Sun: 5.20 AU",
            info5: "Sidereal Period: 11.9 years"
        },
        initPosition: {
            x: 13.4433 * 1 + 1,
            y: 0,
            z: 0
        },
        radius: 0.9,
        tilt: THREE.Math.degToRad(3.13),
        texture: "assets/1K/jupiter.jpg",
        textureHD: "assets/HD/jupiter.jpg",
        orbits: "sun",
        daysPerOrbit: 4332.82,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(6.09))),
        synodicPeriod: 0.414,
        clickable: true
    },
    saturn: {
        type: "planet",
        name: "saturn",
        info: {
            info1: "Physical characteristics:",
            info2: "Mean radius: 58232km",
            info3: "Atmosphere:  Surface pressure 140 kPA",
            info4: "Average Distance To Sun: 9.58 AU",
            info5: "Sidereal Period: 29.5 years"
        },
        initPosition: {
            x: 24.7626 * 1 + 1,
            y: 0,
            z: 0
        },
        radius: 0.8,
        tilt: THREE.Math.degToRad(26.73),
        texture: "assets/1K/saturn.jpg",
        textureHD: "assets/HD/saturn.jpg",
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
        orbits: "saturn",
        clickable: false
    },
    uranus: {
        type: "planet",
        name: "uranus",
        info: {
            info1: "Physical characteristics:",
            info2: "Mean radius: 25362km",
            info3: "Atmosphere:  Surface pressure 130 kPA",
            info4: "Average Distance To Sun: 19.2 AU",
            info5: "Sidereal Period: 84 years"
        },
        initPosition: {
            x: 49.5769 * 1 + 1,
            y: 0,
            z: 0
        },
        radius: 0.6,
        tilt: THREE.Math.degToRad(82.23),
        texture: "assets/1K/uranus.jpg",
        textureHD: "assets/HD/uranus.jpg",
        orbits: "sun",
        daysPerOrbit: 30687.15,
        orbitalInclineVector: new THREE.Vector3(0, 1, Math.tan(THREE.Math.degToRad(6.48))),
        synodicPeriod: -0.718,
        clickable: true
    },
    neptune: {
        type: "planet",
        name: "neptune",
        info: {
            info1: "Physical characteristics:",
            info2: "Mean radius: 24622km",
            info3: "Atmosphere:  Surface pressure 130 kPA",
            info4: "Average Distance To Sun: 30.1 AU",
            info5: "Sidereal Period: 164.8 years"
        },
        initPosition: {
            x: 77.6204 * 1 + 1,
            y: 0,
            z: 0
        },
        radius: 0.6,
        tilt: THREE.Math.degToRad(28.32),
        texture: "assets/1K/neptune.jpg",
        textureHD: "assets/HD/neptune.jpg",
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

// The order in which the types should be animated.
let animationOrder = [
    "skybox",
    "sun",
    "planet",
    'ring',
    "moon",
    "asteroid",
    "light",
    "ring",
    "line"
];

// An array of all the entities.
let entitiesArr;

// Load the texture using NodeJS Promises.
async function asyncLoadTexture(textureLoader, url) {
    return new Promise((resolve, reject) => {
        textureLoader.load(url, (texture) => {
            resolve(texture);
        }, undefined, (error) => {
            reject(error);
        });
    });
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

// Generate a requested number of asteroids with random properties from given ranges.
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

// Render the list of entities.
async function renderEntitiesArr(scene, textureLoader) {
    for (let entity of entitiesArr) {
        // Type-dependent rendering.
        switch (entity.type) {
            case ("skybox"): {
                let geometry = new THREE.SphereGeometry(500 / 2, 64, 64)
                let texture = entity.preloadedTexture || await asyncLoadTexture(textureLoader, entity.textureHD)
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
                let texture = entity.preloadedTexture || await asyncLoadTexture(textureLoader, entity.texture)
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
                scene.add(entity.mesh);
                break;
            }
            case ("planet"): {
                // Add an orbital line for this planet.
                let orbitalLine = {
                    type: "line",
                    name: `orbitalLine_${entity.name}`,
                    mesh: new THREE.Line(
                        new THREE.CircleGeometry(entity.initPosition.x, 100),
                        new THREE.MeshBasicMaterial({
                            color: 0xffffff,
                            transparent: true,
                            opacity: .1,
                            side: THREE.BackSide
                        })
                    )
                };
                orbitalLine.mesh.geometry.vertices.shift();
                orbitalLine.mesh.rotation.x = THREE.Math.degToRad(90) + Math.atan(entity.orbitalInclineVector.z);
                scene.add(orbitalLine.mesh);
                entities[`orbitalLine_${entity.name}`] = orbitalLine;

                // Add the planet.
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
                scene.add(entity.mesh);
                break;
            }
            case ("ring"): {
                let geometry = new THREE.RingGeometry(entity.innerRadius, entity.radius, 32);
                let texture = await asyncLoadTexture(textureLoader, entity.texture)
                    .catch((err) => {
                        console.error(err);
                        return undefined;
                    });
                let material = // Ref: https://codepen.io/prisoner849/pen/wvwVMEo?editors=0010
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
                        let geometry = entity.covered ? // Covered lights have no reason to have a high tri count.
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

// The main function.
async function main() {
    // State variables.
    let state = {
        paused: false,
        artificialLightingOn: false,
        orbitalLineOn: true,
        asteroidsOn: true,
        synodicSpeedModifier: 1 * Math.pow(10, 0, 25),
        daysPerMs: 0.1 * Math.pow(10, 0.25),
        selectedPlanetName: "sun",
        simulationSpeed: 1,
        lockedCam: true,
        orbiting: false,
        direction: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        speedMod: 1,
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false
    };

    // Get a textureLoader.
    let textureLoader = new THREE.TextureLoader();

    // X, Z position variable for the mouse location.
    let mouse = new THREE.Vector2();

    // A raycaster to find the object the mouse has clicked.
    let raycaster = new THREE.Raycaster();

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

    // Set up listener to redraw the scene on resize.
    window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    };

    // HUD/UI elements (for displaying floating text in front of scene).
    let hudCanvas = document.createElement('canvas'); // We will use 2D canvas element to render our HUD.  
    hudCanvas.width = window.innerWidth * 2;
    hudCanvas.height = window.innerHeight * 2;

    // Define the formatting for the HUD.
    let hudBitmap = hudCanvas.getContext('2d');
    hudBitmap.font = "Normal 100px Courier New";
    hudBitmap.textAlign = 'left';
    hudBitmap.fillStyle = "rgba(245,245,245,0.95)";
    hudBitmap.fillText('THE SOLAR SYSTEM', window.innerWidth / 12, window.innerHeight / 8);

    // Define the camera for the HUD.
    let cameraHUD = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0, 30);
    hudscene = new THREE.Scene();

    // Create material by using the 2d graphics we just rendered.
    let hudTexture = new THREE.Texture(hudCanvas);
    hudTexture.needsUpdate = true;
    let material = new THREE.MeshBasicMaterial({
        map: hudTexture
    });
    material.transparent = true;
    let planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    let plane = new THREE.Mesh(planeGeometry, material);
    hudscene.add(plane);

    // Update the HUD with the information on a planet.
    function updatehud(entity) {
        state.selectedPlanetName = entity.name;
        guiFunctions.target = entity.mesh;
        hudBitmap.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
        hudBitmap.fillStyle = "rgba(245,245,245,0.95)";
        hudBitmap.font = "Normal 100px Courier New";
        hudBitmap.fillText(entity.name.toUpperCase(), window.innerWidth / 12, window.innerHeight / 10);
        hudBitmap.font = "Normal 60px Courier New";
        hudBitmap.textAlign = 'left';
        count = 0;
        let infos = Object.values(entity.info)
        for (let inf of infos) {
            hudBitmap.fillText(inf, window.innerWidth / 12, (1.6 + (0.8 * count)) * (window.innerHeight / 8));
            count += 1;
        }
        hudTexture.needsUpdate = true;
    }

    // Set up GUI options.
    let gui = new dat.GUI();
    let guiControllers = {};
    let guiFunctions = {
        "Next Planet": () => {
            // Get all clickable entitites, then sort them from closest to the origin to furthest.
            let candidates = entitiesArr.filter((entity) => {
                return entity.clickable;
            });
            candidates.sort((a, b) => {
                return a.initPosition.x - b.initPosition.x;
            });

            // Get the index of the plant currently selected. Default: -1.
            let cpsIndex = candidates.findIndex((entity) => {
                return entity.name == state.selectedPlanetName;
            });

            // Get the next planet.
            cpsIndex = (((cpsIndex + 1) % candidates.length) + candidates.length) % candidates.length;
            updatehud(candidates[cpsIndex]);
            state.selectedPlanetName = candidates[cpsIndex].name;
        },
        "Prev. Planet": () => {
            // Get all clickable entitites, then sort them from closest to the origin to furthest.
            let candidates = entitiesArr.filter((entity) => {
                return entity.clickable;
            });
            candidates.sort((a, b) => {
                return a.initPosition.x - b.initPosition.x;
            });

            // Get the index of the plant currently selected. Default: 1.
            let cpsIndex = candidates.findIndex((entity) => {
                return entity.name == state.selectedPlanetName;
            });
            cpsIndex = cpsIndex == -1 ? 1 : cpsIndex;

            // Get the next planet.
            cpsIndex = (((cpsIndex - 1) % candidates.length) + candidates.length) % candidates.length;
            updatehud(candidates[cpsIndex]);
            state.selectedPlanetName = candidates[cpsIndex].name;
        },
        "Pause": () => {
            if (state.paused) {
                // Overwrite Continue option.
                guiControllers["Pause"].name("Pause");
            } else {
                // Overwrite Pause option.
                guiControllers["Pause"].name("Continue");
            }

            state.paused = !state.paused;

        },
        "Slower": () => {
            state.synodicSpeedModifier /= 2;
            state.daysPerMs /= 2;
            state.simulationSpeed /= 2;
        },
        "Faster": () => {
            state.synodicSpeedModifier *= 2;
            state.daysPerMs *= 2;
            state.simulationSpeed *= 2;
        },
        "Orbit Outline Off": () => {
            if (state.orbitalLineOn) {
                // Overwrite Orbit Outline Off option.
                guiControllers["Orbit Outline Off"].name("Orbit Outline On");
            } else {
                // Overwrite Orbit Outline On option.
                guiControllers["Orbit Outline Off"].name("Orbit Outline Off");
            }
            state.orbitalLineOn = !state.orbitalLineOn;

            // Update the opacity of the orbitals lines.
            for (let line of entitiesArr.filter((entity) => {
                    return entity.type == "line";
                })) {
                line.mesh.visible = state.orbitalLineOn;
            }

            // Render the scene.
            renderer.render(scene, camera);
        },
        "Asteroids Off": () => {
            if (state.asteroidsOn) {
                // Overwrite Asteroids Off option.
                guiControllers["Asteroids Off"].name("Asteroids On");
            } else {
                // Overwrite Asteroids On option.
                guiControllers["Asteroids Off"].name("Asteroids Off");
            }
            state.asteroidsOn = !state.asteroidsOn;

            for (let asteroid of entitiesArr.filter((entity) => {
                    return entity.type == "asteroid";
                })) {
                asteroid.mesh.visible = state.asteroidsOn;
            }

            // Render the scene.
            renderer.render(scene, camera);
        },
        "Artificial Lighting": () => {
            if (state.artificialLightingOn) {
                // Overwrite Realistic Lighting option.
                guiControllers["Artificial Lighting"].name("Artificial Lighting");
            } else {
                // Overwrite Artificial Lighting option.
                guiControllers["Artificial Lighting"].name("Realistic Lighting");
            }

            // Toggle artificial lighting.
            state.artificialLightingOn = !state.artificialLightingOn;
            for (let light of entitiesArr.filter((entity) => {
                    return entity.type === "light";
                })) {
                if (light.name === "artificialLight") {
                    light.light.intensity = state.artificialLightingOn ? light.intensity : 0;
                } else {
                    light.light.intensity = state.artificialLightingOn ? 0 : light.intensity;
                }
            }

            // Render the scene.
            renderer.render(scene, camera);
        }
    }
    guiControllers["Next Planet"] = gui.add(guiFunctions, "Next Planet");
    guiControllers["Prev. Planet"] = gui.add(guiFunctions, "Prev. Planet");
    guiControllers["Pause"] = gui.add(guiFunctions, "Pause");
    guiControllers["Slower"] = gui.add(guiFunctions, "Slower");
    guiControllers["Faster"] = gui.add(guiFunctions, "Faster");
    guiControllers["Orbit Outline Off"] = gui.add(guiFunctions, "Orbit Outline Off");
    guiControllers["Asteroids Off"] = gui.add(guiFunctions, "Asteroids Off");
    guiControllers["Artificial Lighting"] = gui.add(guiFunctions, "Artificial Lighting");

    // Preload all the textures for the asteroids at once.
    let texturePromises = [];
    for (let texture of ASTEROID_TEXTURES) {
        texturePromises.push(asyncLoadTexture(textureLoader, texture));
    }
    let preLoadedTextures = await Promise.all(texturePromises);

    // Randomly generate 75 asteroids.
    generateAsteroids(75, preLoadedTextures, 0.03, 0.005,
        entities.mars.initPosition.x + entities.mars.radius + 0.01,
        entities.jupiter.initPosition.x - entities.jupiter.radius - 0.01,
        100, 1000, -10, 10, 10, 1000);

    // Reorder the entitites for animation.
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

    // Reorder the entitites for animation.
    entitiesArr = Object.values(entities).sort((a, b) => {
        return animationOrder.indexOf(b.type) - animationOrder.indexOf(a.type);
    });

    // Initially turn off artificial lighting.
    entities.artificialLight.light.intensity = 0;

    // Render the scene.
    renderer.render(scene, camera);

    // Set up the camera.
    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;
    orbitControls.autoRotateSpeed = CAMERA_ORBIT_SPEED;
    let pointerControls = new THREE.PointerLockControls(camera, renderer.domElement);
    let blocker = document.getElementById('blocker');
    let instructions = document.getElementById('instructions');
    instructions.addEventListener('click', () => {
        if (state.lockedCam) {
            pointerControls.lock();
        }
    }, false);
    pointerControls.addEventListener('lock', () => {
        if (state.lockedCam) {
            instructions.style.display = 'none';
            blocker.style.display = 'none';
        }
    });
    pointerControls.addEventListener('unlock', () => {
        if (state.lockedCam) {
            blocker.style.display = 'block';
            instructions.style.display = '';
        }
    });
    scene.add(pointerControls.getObject());

    // Listen for keydown events.
    document.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case 38: // Up
            case 87: // W
                if (state.lockedCam)
                    state.moveForward = true;
                break;
            case 37: // Left
            case 65: // A
                if (state.lockedCam)
                    state.moveLeft = true;
                break;
            case 40: // Down
            case 83: // S
                if (state.lockedCam)
                    state.moveBackward = true;
                break;
            case 39: // Right
            case 68: // D
                if (state.lockedCam)
                    state.moveRight = true;
                break;
            case 16: // Shift
                state.speedMod = 3;
                break;
        }
    }, false);

    // Listen for keyup events.
    document.addEventListener('keyup', (event) => {
        switch (event.keyCode) {
            case 38: // Up
            case 87: // W
                if (state.lockedCam)
                    state.moveForward = false;
                break;
            case 37: // Left
            case 65: // A
                if (state.lockedCam)
                    state.moveLeft = false;
                break;
            case 40: // Down
            case 83: // S
                if (state.lockedCam)
                    state.moveBackward = false;
                break;
            case 39: // Right
            case 68: // D
                if (state.lockedCam)
                    state.moveRight = false;
                break;
            case 190: // Period
                state.synodicSpeedModifier *= 2;
                state.daysPerMs *= 2;
                state.simulationSpeed *= 2;
                break;
            case 188: // Comma
                state.synodicSpeedModifier /= 2;
                state.daysPerMs /= 2;
                state.simulationSpeed /= 2;
                break;
            case 16: // Shift
                state.speedMod = 1;
                break;
            case 49: // 1
                pointerControls.lock();
                state.lockedCam = true;
                state.moveForward, state.moveBackward, state.moveLeft, state.moveRight = false;
                state.orbiting = false;
                break;
            case 50: // 2
                pointerControls.unlock();
                state.lockedCam = false;
                state.moveForward, state.moveBackward, state.moveLeft, state.moveRight = false;
                state.orbiting = true;
                state.selectedPlanetName = "sun";
                break;
        }
    }, false);

    // Listen for onclick events.
    window.onclick = (event) => {
        if (!state.lockedCam) {
            // Find the point that was clicked.
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Find which planet the mouse pointer intersected.
            raycaster.setFromCamera(mouse, camera);
            let intersectables = entitiesArr
                .filter((entity) => {
                    return entity.clickable;
                })
                .map((entity) => {
                    return entity.mesh;
                });

            let intersects = raycaster.intersectObjects(intersectables, false);
            if (intersects.length != 0) {
                for (let entity of entitiesArr) {
                    if (entity.mesh != null && entity.clickable === true) {
                        let minPosX = entity.mesh.position.x - entity.radius;
                        let maxPosX = entity.mesh.position.x + entity.radius;
                        let minPosY = entity.mesh.position.y - entity.radius;
                        let maxPosY = entity.mesh.position.y + entity.radius;
                        let minPosZ = entity.mesh.position.z - entity.radius;
                        let maxPosZ = entity.mesh.position.z + entity.radius;
                        if (minPosX <= intersects[0].point.x && maxPosX >= intersects[0].point.x && minPosY <= intersects[0].point.y && maxPosY >= intersects[0].point.y && minPosZ <= intersects[0].point.z && maxPosZ >= intersects[0].point.z) {
                            updatehud(entity);
                            break;
                        }
                    }
                }
            }
        }
    };

    // Move to a position that will get every entity in view.
    let furthestPlanet = entitiesArr
        .filter((e) => {
            return e.type === "planet";
        })
        .sort((a, b) => {
            return b.mesh.position.length() - a.mesh.position.length();
        })[0];
    camera.position.set(furthestPlanet.mesh.position.length() * 2, furthestPlanet.mesh.position.length(), furthestPlanet.mesh.position.length() * 2);

    // Look at the sun.
    camera.lookAt(entities[state.selectedPlanetName].mesh.position);

    // Render the scene.
    renderer.render(scene, camera);

    // Start animating.
    let lastTick = Date.now();
    let lastTickPerformance = performance.now();

    function animate() {
        requestAnimationFrame(animate);

        // Animate the entitiesArr.
        let time = Date.now();
        let daysPassed = (time - lastTick) * state.daysPerMs;
        for (let entity of entitiesArr) {
            // Orbit this entity, if this entity orbits.
            if (entity.orbits !== undefined && entity.daysPerOrbit !== undefined) {
                rotateAboutPivot(entity.mesh, entities[entity.orbits].mesh.position, entity.orbitalInclineVector, 2 * Math.PI * daysPassed * (1 / entity.daysPerOrbit));
                // Orbit every planet that orbits this entity (DFS) appropriately.
                let orbiterStack = [...(entity.orbiters || [])];
                while (orbiterStack.length > 0) {
                    let orbiter = orbiterStack.pop();
                    rotateAboutPivot(orbiter.mesh, entities[entity.orbits].mesh.position, entity.orbitalInclineVector, 2 * Math.PI * daysPassed * (1 / entity.daysPerOrbit));
                    for (orbiter of orbiter.orbiters || []) {
                        orbiterStack.push();
                    }
                }
            }

            // Apply the synodic spin.
            if (entity.synodicPeriod !== undefined) {
                entity.mesh.rotateY(daysPassed * state.synodicSpeedModifier / entity.synodicPeriod);
            }

            // If there is a fixed rotation, apply it.
            if (entity.rotationProperties !== undefined) {
                entity.mesh.rotateX(time / entity.rotationProperties.x);
                entity.mesh.rotateY(time / entity.rotationProperties.y);
                entity.mesh.rotateZ(time / entity.rotationProperties.z);
            }
        }

        if (pointerControls.isLocked && !state.orbiting) {
            let timePerformance = performance.now();
            let deltaTime = (timePerformance - lastTickPerformance) / 1000;

            state.velocity.x = 0;
            state.velocity.y = 0;
            state.velocity.z = 0;

            camera.getWorldDirection(state.direction);

            state.direction.z = Number(state.moveForward) - Number(state.moveBackward);
            state.direction.x = Number(state.moveRight) - Number(state.moveLeft);
            state.direction.normalize(); // This ensures consistent movements in all state.directions

            if (state.moveForward) {
                state.velocity.y -= state.direction.y * 600.0 * state.speedMod * deltaTime;
                state.velocity.z -= state.direction.z * 600.0 * state.speedMod * deltaTime;
            } else if (state.moveBackward) {
                state.velocity.y += state.direction.y * 600.0 * state.speedMod * deltaTime;
                state.velocity.z -= state.direction.z * 600.0 * state.speedMod * deltaTime;
            }
            if (state.moveLeft || state.moveRight) {
                state.velocity.x -= state.direction.x * state.speedMod * 600.0 * deltaTime;
            }
            pointerControls.moveRight(-state.velocity.x * deltaTime);
            pointerControls.moveForward(-state.velocity.z * deltaTime);
            pointerControls.getObject().position.y -= (state.velocity.y * deltaTime);

            lastTickPerformance = timePerformance;

        } else if (state.orbiting) {
            if (state.selectedPlanetName !== null) {
                orbitControls.target = entities[state.selectedPlanetName].mesh.position;
            }
            orbitControls.update();
        }

        // Render the scene and hud scene.
        renderer.render(scene, camera);
        renderer.render(hudscene, cameraHUD);

        // Update the last tick time.
        lastTick = time;
    }
    animate();
}

main();