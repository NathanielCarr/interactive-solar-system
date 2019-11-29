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
let csp;
let psp;
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
        color: "0x010102",
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
        color: "0x979392",
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
    "ring",
    "line"
];
let entitiesArr;

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
                // Add an orbital line for this planet.
                entities[`orbitalLine_${entity.name}`] = {
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
                entities[`orbitalLine_${entity.name}`].mesh.geometry.vertices.shift();
                entities[`orbitalLine_${entity.name}`].mesh.rotation.x = THREE.Math.degToRad(90) + Math.atan(entity.orbitalInclineVector.z);
                scene.add(entities[`orbitalLine_${entity.name}`].mesh);

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

function setArtificialLighting(artificialLightingOn) {
    for (let light of entitiesArr.filter((entity) => {
            return entity.type === "light";
        })) {
        if (light.name === "artificialLight") {
            light.light.intensity = artificialLightingOn ? light.intensity : 0;
        } else {
            light.light.intensity = artificialLightingOn ? 0 : light.intensity;
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
    hudBitmap.fillText('The Solar System', window.innerWidth / 12, window.innerHeight / 8);
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

    let paused = false;
    let artificialLightingOn = false;
    let orbitalLineOn = true;
    let asteroidsOn = true;

    // GUI options.
    let gui = new dat.GUI();
    let guiControllers = {};
    let guivars = {
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
                return entity.name == csp;
            });

            // Get the next planet.
            cpsIndex = (((cpsIndex + 1) % candidates.length) + candidates.length) % candidates.length;
            updatehud(candidates[cpsIndex]);
            csp = candidates[cpsIndex].name;
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
                return entity.name == csp;
            });
            cpsIndex = cpsIndex == -1 ? 1 : cpsIndex;

            // Get the next planet.
            cpsIndex = (((cpsIndex - 1) % candidates.length) + candidates.length) % candidates.length;
            updatehud(candidates[cpsIndex]);
            csp = candidates[cpsIndex].name;
        },
        "Pause": () => {
            if (paused) {
                // Update the speed.
                SYNODIC_SPEED_MODIFIER = 1 * Math.pow(10, 0.25);
                DAYS_PER_MS = 0.1 * Math.pow(10, 0.25);
                simspeed = 1;

                // Overwrite Continue option.
                guiControllers["Pause"].name("Pause");
            } else {
                // Update the speed.
                SYNODIC_SPEED_MODIFIER = 0;
                DAYS_PER_MS = 0;
                simspeed = 0;

                // Overwrite Pause option.
                guiControllers["Pause"].name("Continue");
            }

            paused = !paused;

        },
        "Slower": () => {
            SYNODIC_SPEED_MODIFIER /= 2;
            DAYS_PER_MS /= 2;
            simspeed /= 2;
        },
        "Faster": () => {
            SYNODIC_SPEED_MODIFIER *= 2;
            DAYS_PER_MS *= 2;
            simspeed *= 2;
        },
        "Orbit Outline Off": () => {
            if (orbitalLineOn) {
                // Overwrite Orbit Outline Off option.
                guiControllers["Orbit Outline Off"].name("Orbit Outline On");
            } else {
                // Overwrite Orbit Outline On option.
                guiControllers["Orbit Outline Off"].name("Orbit Outline Off");
            }
            orbitalLineOn = !orbitalLineOn;

            // Update the opacity of the orbitals lines.
            for (let line of entitiesArr.filter((entity) => {
                    return entity.type == "line";
                })) {
                line.mesh.visible = orbitalLineOn;
            }

            // Render the scene.
            renderer.render(scene, camera);
        },
        "Asteroids Off": () => {
            if (asteroidsOn) {
                // Overwrite Asteroids Off option.
                guiControllers["Asteroids Off"].name("Asteroids On");
            } else {
                // Overwrite Asteroids On option.
                guiControllers["Asteroids Off"].name("Asteroids Off");
            }
            asteroidsOn = !asteroidsOn;

            for (let asteroid of entitiesArr.filter((entity) => {
                    return entity.type == "asteroid";
                })) {
                asteroid.mesh.visible = asteroidsOn;
            }

            // Render the scene.
            renderer.render(scene, camera);
        },
        "Artificial Lighting": () => {
            if (artificialLightingOn) {
                // Overwrite Realistic Lighting option.
                guiControllers["Artificial Lighting"].name("Artificial Lighting");
            } else {
                // Overwrite Artificial Lighting option.
                guiControllers["Artificial Lighting"].name("Realistic Lighting");
            }

            // Toggle forced illumination.
            artificialLightingOn = !artificialLightingOn;
            setArtificialLighting(artificialLightingOn);

            // Render the scene.
            renderer.render(scene, camera);
        }
    }
    guiControllers["Next Planet"] = gui.add(guivars, "Next Planet");
    guiControllers["Prev. Planet"] = gui.add(guivars, "Prev. Planet");
    guiControllers["Pause"] = gui.add(guivars, "Pause");
    guiControllers["Slower"] = gui.add(guivars, "Slower");
    guiControllers["Faster"] = gui.add(guivars, "Faster");
    guiControllers["Orbit Outline Off"] = gui.add(guivars, "Orbit Outline Off");
    guiControllers["Asteroids Off"] = gui.add(guivars, "Asteroids Off");
    guiControllers["Artificial Lighting"] = gui.add(guivars, "Artificial Lighting");

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

    // Order the entitites for animation.
    entitiesArr = Object.values(entities).sort((a, b) => {
        return animationOrder.indexOf(b.type) - animationOrder.indexOf(a.type);
    });

    // Set forced illumination to false.
    setArtificialLighting(artificialLightingOn);

    // Render the scene.
    renderer.render(scene, camera);

    // Setup camera
    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    let controls = new THREE.PointerLockControls(camera, renderer.domElement);
    let blocker = document.getElementById('blocker');
    let instructions = document.getElementById('instructions');
    let lockedCam = true;
    instructions.addEventListener('click', function () {
        if (lockedCam) {
            controls.lock();
        }
    }, false);

    function updatehud(entity) {
        csp = entity.name;
        guivars.target = entity.mesh;
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

                break;
            case 188:
                SYNODIC_SPEED_MODIFIER /= 2;
                DAYS_PER_MS /= 2;
                simspeed /= 2;

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
            return b.mesh.position.length() - a.mesh.position.length();
        })[0];
    camera.position.set(furthestPlanet.mesh.position.length() * 2, furthestPlanet.mesh.position.length(), furthestPlanet.mesh.position.length() * 2);

    // Look at the sun.
    camera.lookAt(entities.sun.mesh.position);
    // Look at the sun.
    guivars.target = null;
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
            if (guivars.target != null) {
                orbitControls.target = guivars.target.position;
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