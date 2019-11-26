// All distances are in kilometres.
const DAYS_PER_MS = 0.1;
const SYNODIC_SPEED_MODIFIER = 100 * Math.pow(10, 1);
var objects=[];
var intersects=[];
var target;
let entities = {
    skybox: {
        type: "skybox",
        rotationProperties: {
            x: 2 * Math.pow(10, 16),
            y: 2 * Math.pow(10, 16),
            z: 2 * Math.pow(10, 16)
        },
        texture: "assets/1K/stars_milky_way.jpg",
        textureHD: "assets/HD/stars_milky_way.jpg",
        color: "0x010102"
    },
    sun: {
        type: "sun",
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        radius: 1,
        texture: "assets/1K/sun.jpg",
        textureHD: "assets/HD/sun.jpg",
        color: "0xF18828",
        daysPerOrbit: 0,
        synodicPeriod: 26.6
    },
    mercury: {
        type: "planet",
        solarDistance: 1.5,
        radius: 0.15,
        texture: "assets/1K/mercury.jpg",
        textureHD: "assets/HD/mercury.jpg",
        color: "0x848383",
        orbits: "sun",
        daysPerOrbit: 87.97,
        synodicPeriod: 175.940
    },
    venus: {
        type: "planet",
        solarDistance: 1.8684,
        radius: 0.3,
        texture: "assets/1K/venus_surface.jpg",
        textureHD: "assets/HD/venus_surface.jpg",
        color: "0xC77328",
        orbits: "sun",
        daysPerOrbit: 224.70,
        synodicPeriod: -116.750
    },
    earth: {
        type: "planet",
        solarDistance: 2.5833,
        radius: 0.3,
        texture: "assets/1K/earth_daymap.jpg",
        textureHD: "assets/HD/earth_daymap.jpg",
        color: "0x3D567F",
        orbits: "sun",
        daysPerOrbit: 365.26,
        synodicPeriod: 1
    },
    mars: {
        type: "planet",
        solarDistance: 3.9354,
        radius: 0.25,
        texture: "assets/1K/mars.jpg",
        textureHD: "assets/HD/mars.jpg",
        color: "0xB76247",
        orbits: "sun",
        daysPerOrbit: 686.98,
        synodicPeriod: 1.027
    },
    jupiter: {
        type: "planet",
        solarDistance: 13.4433,
        radius: 0.9,
        texture: "assets/1K/jupiter.jpg",
        textureHD: "assets/HD/jupiter.jpg",
        color: "0xA6A095",
        orbits: "sun",
        daysPerOrbit: 4332.82,
        synodicPeriod: 0.414
    },
    saturn: {
        type: "planet",
        solarDistance: 24.7626,
        radius: 0.8,
        texture: "assets/1K/saturn.jpg",
        textureHD: "assets/HD/saturn.jpg",
        color: "0xCFC0A2",
        orbits: "sun",
        daysPerOrbit: 10755.70,
        synodicPeriod: 0.439
    },
    uranus: {
        type: "planet",
        solarDistance: 49.5769,
        radius: 0.6,
        texture: "assets/1K/uranus.jpg",
        textureHD: "assets/HD/uranus.jpg",
        color: "0x9BCBD2",
        orbits: "sun",
        daysPerOrbit: 30687.15,
        synodicPeriod: -0.718
    },
    neptune: {
        type: "planet",
        solarDistance: 77.6204,
        radius: 0.6,
        texture: "assets/1K/neptune.jpg",
        textureHD: "assets/HD/neptune.jpg",
        color: "0x364FA8",
        daysPerOrbit: 60190.03,
        synodicPeriod: 0.671
    },
    starLight: {
        type: "light",
        lightType: "ambient",
        color: "0xFFFFFF",
        intensity: 0.20
    },
    sunLight: {
        type: "light",
        lightType: "point",
        color: "0xFFFFFF",
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        distance: 100,
        intensity: 1,
        radius: 0.0001,
        covered: true
    }
};
let entitiesArr = Object.values(entities);

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
function rotateAboutPivot(subject, pivot, axis, radians) {
    // Move the subject to the origin.
    subject.position.set(
        subject.position.x - pivot.position.x,
        subject.position.y - pivot.position.y,
        subject.position.z - pivot.position.z
    );

    // Apply the rotation.
    subject.position.applyAxisAngle(axis.normalize(), radians);

    // Move the subject back to its position.
    subject.position.set(
        subject.position.x + pivot.position.x,
        subject.position.y + pivot.position.y,
        subject.position.z + pivot.position.z
    );
}   

async function renderentitiesArr(scene, textureLoader) {
    for (let entity of entitiesArr) {
        switch (entity.type) {
            case ("skybox"): {
                let geometry = new THREE.SphereGeometry(500, 64, 64)
                let texture = await asyncLoadTexture(textureLoader, entity.textureHD)
                    .catch((err) => {
                        console.error(err);
                        return undefined;
                    });
                let material = texture === undefined
                    ? new THREE.MeshBasicMaterial({
                        color: parseInt(entity.color)
                    })
                    : new THREE.MeshBasicMaterial({
                        map: texture,
                        side: THREE.BackSide
                    });
                entity.mesh = new THREE.Mesh(
                    geometry,
                    material
                )
                entity.mesh.position.set(0, 0, 0);
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
                let material = texture === undefined
                    ? new THREE.MeshBasicMaterial({
                        color: parseInt(entity.color)
                    })
                    : new THREE.MeshBasicMaterial({
                        map: texture
                    });
                entity.mesh = new THREE.Mesh(
                    geometry,
                    material
                )
                entity.mesh.position.set(0, 0, 0);
                scene.add(entity.mesh);
                objects.push(entity.mesh)
                break;
            }
            case ("planet"): {
                let geometry = new THREE.SphereGeometry(entity.radius, 32, 32);
                let texture = await asyncLoadTexture(textureLoader, entity.texture)
                    .catch((err) => {
                        console.error(err);
                        return undefined;
                    });
                let material = texture === undefined
                    ? new THREE.MeshBasicMaterial({
                        color: parseInt(entity.color)
                    })
                    : new THREE.MeshPhongMaterial({
                        map: texture
                    });
                entity.mesh = new THREE.Mesh(
                    geometry,
                    material
                )
                entity.mesh.position.set(entity.solarDistance, 0, 0);
                objects.push(entity.mesh)
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
                        entity.light.position.set(entity.position.x, entity.position.y, entity.position.z);
                        let geometry = entity.covered
                            ? new THREE.SphereGeometry(entity.radius, 8, 8)
                            : new THREE.SphereGeometry(entity.radius, 32, 32);
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


    // We will use 2D canvas element to render our HUD.  
	var hudCanvas = document.createElement('canvas');
    hudCanvas.width = window.innerWidth;
    hudCanvas.height = window.innerHeight;
    var hudBitmap = hudCanvas.getContext('2d');
    hudBitmap.font = "Normal 50px Arial";
    hudBitmap.textAlign = 'center';
    hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
    hudBitmap.fillText('SUN', window.innerWidth / 2, window.innerHeight/1.05 );
    var cameraHUD = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2,window.innerHeight/2, -window.innerHeight/2,0, 30);
    hudscene = new THREE.Scene();
    //create meterial by usuing the 2d graphics we just renderd
    var hudTexture = new THREE.Texture(hudCanvas)
    hudTexture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial( {map: hudTexture } );
    material.transparent = true;
    var planeGeometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
    var plane = new THREE.Mesh( planeGeometry, material );
    hudscene.add( plane );


    
    

    // Render the entitiesArr.
    await renderentitiesArr(scene, textureLoader);
    renderer.render(scene, camera);
    



    // Set up the controls.
    window.onkeydown = (evt) => {
        if (evt.keyCode == 39) { // Right
            camera.translateX(1);
            renderer.render(scene, camera);
        } else if (evt.keyCode == 37) { // Left
            camera.translateX(-1);
            renderer.render(scene, camera);
        } else if (evt.keyCode == 38) { // Up
            camera.translateZ(-2);
            renderer.render(scene, camera);
        } else if (evt.keyCode == 40) { // Down
            camera.translateZ(2);
            renderer.render(scene, camera);
        }
    };

    window.onclick = (evt)=>{
        console.log("click");
        //console.log(entities);
        //objects=entities;
        console.log(objects);
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        //find the intererections
        raycaster.setFromCamera( mouse, camera );
        intersects = raycaster.intersectObjects( objects, false );
        console.log(intersects);
        if(intersects.length!=0){
            target=intersects[0].point;
        }
        

    };

    // Set up listener to redraw the scene on resize.
    window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    };

    // Move to a position that will get every entity in view.
    let furthestPlanet = entitiesArr
        .filter((e) => { return e.type === "planet"; })
        .sort((a, b) => { return b.solarDistance - a.solarDistance; })[0];
    camera.position.set(furthestPlanet.solarDistance * 2, furthestPlanet.solarDistance, furthestPlanet.solarDistance * 2);

    // Look at the sun.
    target=entities.sun.mesh.position;
    camera.lookAt(target);
    renderer.render(scene, camera);

    // Start animating.
    let lastTick = Date.now();
    function animate() {
        requestAnimationFrame(animate);

        // Animate the entitiesArr.
        let time = Date.now();
        let daysPassed = (time - lastTick) * DAYS_PER_MS;
        lastTick = time;
        for (let entity of entitiesArr) {
            if (["planet", "skybox", "sun"].includes(entity.type)) {
                if (entity.orbits !== undefined) {
                    rotateAboutPivot(entity.mesh, entities[entity.orbits].mesh, new THREE.Vector3(0,1,0), 2 * Math.PI * daysPassed * (1 / entity.daysPerOrbit));
                }
                if (entity.type !== "skybox") {
                    entity.mesh.rotateY(daysPassed * SYNODIC_SPEED_MODIFIER / entity.synodicPeriod);
                } else {
                    entity.mesh.rotateX(time / entity.rotationProperties.x);
                    entity.mesh.rotateY(time / entity.rotationProperties.y);
                    entity.mesh.rotateZ(time / entity.rotationProperties.z);
                }
            }
        }
       
    

        // Look at the currently selected target
        if(intersects.length!=0){
            target=intersects[0].point;
            //console.log(target);
        }
        camera.lookAt(target);
        renderer.render(scene, camera);
        renderer.render(hudscene, cameraHUD);
    }
    animate();
}

main();