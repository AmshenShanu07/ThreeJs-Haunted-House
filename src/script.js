import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sound = new Audio('/sound.mp3');
sound.play()
sound.loop = true;
/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

//Door Texture
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnesTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

//Brick Textures
const bricksAmbientTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

//Grass Texture
//Brick Textures
const grassAmbientTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

grassAmbientTexture.repeat.set(8,8)
grassColorTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassAmbientTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassAmbientTexture.wrapT = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */

const houseGrp = new THREE.Group();

const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map:bricksColorTexture,
        aoMap:bricksAmbientTexture,
        transparent:true,
        normalMap: bricksNormalTexture,
        roughnessMap:bricksRoughnessTexture
    })
)
walls.castShadow = true;
walls.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2))
walls.position.y = 2.5 * 0.5
houseGrp.add(walls)

const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(4,1.5,4),
    new THREE.MeshStandardMaterial({color:"#CC816C"})
);
roof.castShadow = true;
roof.position.y = 2 + 1.5 * 0.8
roof.rotation.y = Math.PI * 0.25
houseGrp.add(roof)

const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.5,1.5),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
        alphaMap:doorAlphaTexture,
        aoMap:doorAmbientTexture,
        transparent:true,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnesTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2))
door.position.z = (4 * 0.5) + 0.01
door.position.y = 1.5 * 0.68
door.scale.set(1.5,1.5,1.5)
houseGrp.add(door)

const bushGeometry = new THREE.SphereBufferGeometry(0.4,16,16);
const bushMaterial = new THREE.MeshStandardMaterial({color:'#3F930A'});

const firstBush = new THREE.Mesh(bushGeometry,bushMaterial);
firstBush.castShadow = true;
firstBush.position.set(1.1, 0.15, 4 * 0.55)

const secondBush = new THREE.Mesh(bushGeometry,bushMaterial);
secondBush.scale.set(0.5,0.5,0.5)
secondBush.castShadow = true;
secondBush.position.set(1.55, 0.06, 4 * 0.53)

const thirdBush = new THREE.Mesh(bushGeometry,bushMaterial);
thirdBush.castShadow = true;
thirdBush.scale.set(0.8,0.8,0.8);
thirdBush.position.set(-1.1, 0.15, 4 * 0.55);

const forthBush = new THREE.Mesh(bushGeometry,bushMaterial);
forthBush.scale.set(0.3,0.3,0.3);
forthBush.position.set(-1.3, 0.06, 4 * 0.62)


houseGrp.add(firstBush, secondBush, thirdBush, forthBush);

scene.add(houseGrp)

//Grave
const graveGrp = new THREE.Group()
const graveGeometry = new THREE.BoxBufferGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial({color:'#b2b6b1'})

for(let i = 0; i<50; i++){
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    const graveMesh = new THREE.Mesh(graveGeometry,graveMaterial);
    graveMesh.castShadow = true
    graveMesh.rotation.y = -0.3 + Math.random() * 0.3
    graveMesh.rotation.z = -0.2 + Math.random() * 0.2
    graveMesh.position.set(x,0.8*0.3,z)

    graveGrp.add(graveMesh)
}


scene.add(graveGrp)
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map:grassColorTexture,
        aoMap:grassAmbientTexture,
        transparent:true,
        normalMap: grassNormalTexture,
        roughnessMap:grassRoughnessTexture
    })
)
floor.receiveShadow = true
floor.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2))

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.2)
ambientLight.castShadow = true;
    scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.2)
moonLight.position.set(4, 5, - 2)
moonLight.castShadow = true;
scene.add(moonLight)


const doorLight = new THREE.SpotLight("#ff7d46",1,7,5,5)
doorLight.position.set(0,2.5,2.7)
houseGrp.add(doorLight)



//Ghost
const ghost1 = new THREE.PointLight('#ff00ff',2,3);
const ghost2 = new THREE.PointLight('#00ffff',2,3);
const ghost3 = new THREE.PointLight('#ffff00',2,3);
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
scene.add(ghost1,ghost2,ghost3)

//Fog
const fog = new THREE.Fog('#262837',0,20)
scene.fog = fog;

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 2
camera.position.z = 25
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true


/**
 * Animate
 */




const clock = new THREE.Clock()
let camAnimation = true
const tick = () =>{
    const elapsedTime = clock.getElapsedTime()
    if(camera.position.z > 10 && camAnimation){
        console.log(camera.position.z)
        camera.position.z -= 0.05
    }else{
        camAnimation = false;
    }

    const ghost1Angle = elapsedTime * 0.644
    const ghost2Angle = elapsedTime * 0.4565
    const ghost3Angle = elapsedTime * 0.2

    ghost1.position.x = Math.sin(ghost1Angle) * 5;
    ghost1.position.z = Math.cos(ghost1Angle) * 5
    ghost1.position.y = Math.sin(elapsedTime * 3)

    ghost2.position.x = -Math.sin(ghost2Angle) * 7;
    ghost2.position.z = Math.cos(ghost2Angle) * 7
    ghost2.position.y = -Math.sin(elapsedTime * 3)

    ghost3.position.x = Math.sin(ghost3Angle) * 8;
    ghost3.position.z = Math.cos(ghost3Angle) * 8
    ghost3.position.y = Math.sin(elapsedTime * 3) + Math.sin(elapsedTime * 2.5)

    // camera.position.z -= elapsedTime * 0.05
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()