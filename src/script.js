import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import{ FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//Axes Helper

// const axesHelper = new THREE.AxesHelper()
// axesHelper.scale.z = 2;
// axesHelper.scale.x = 2;
// scene.add(axesHelper);

//

/**
 * Textures
 */
const textureLoaderManager = new THREE.LoadingManager();
textureLoaderManager.onError = (e) => {
console.log("error: ",e );

}
const textureLoader = new THREE.TextureLoader(textureLoaderManager);
const fontTexture = textureLoader.load('/textures/matcaps/6.png');
const donutTexture = textureLoader.load("/textures/matcaps/8.png");
//Fonts

const fontLoader = new FontLoader();
fontLoader.load(
'/fonts/helvetiker_regular.typeface.json',
(font)=>{
    const textGeometry = new TextGeometry(
        'Alexandra Vasinova',
        {
            font: font,
            size: 0.4,
            height: 0.1,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.0,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegment:4
        }
    )

// textGeometry.computeBoundingBox();
// textGeometry.translate(
//   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
//   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
//   -(textGeometry.boundingBox.max.z - 0.03) * 0.5,

// );   

textGeometry.center();

const textMaterial = new THREE.MeshMatcapMaterial({matcap: fontTexture});
textMaterial.wireframe = false;

// gui
//  .add(textMaterial, 'wireframe');



const text = new THREE.Mesh(textGeometry, textMaterial);

const move = {
    spin: ()=>{gsap.to(text.rotation, {duration:1, x: text.rotation.x + Math.PI*2})}
}
gui
.add(move, 'spin')

scene.add(text);

//Objects

console.time('donuts');

for (let i = 0; i < 50; i++){

const donut = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,20,33),
    new THREE.MeshMatcapMaterial({matcap:donutTexture})
)


const timeline = gsap.timeline({duration:0.5});
//donut.position.x = 1;
timeline
  .to(donut.position, {
    delay: 0.3,
    x: (Math.random() - 0.5) * 15,
    y: (Math.random() - 0.5) * 15,
    z:(Math.random() - 0.5) * 15})
  .to(camera.position, { delay: 1,ease: "linear", x: 0, y: -0.5, z: 5.5 });
 
  donut.position.y = -2;
 //donut.position.y = 2;
  donut.position.z = 3; 

donut.rotation.x = (Math.random() * Math.PI);
donut.rotation.y = (Math.random() * Math.PI);

const scale = Math.random();

donut.scale.x = scale + 0.5;
donut.scale.y = scale + 0.5;







scene.add(donut);


}

console.timeEnd('donuts');

}
)



//Position






//

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
camera.position.y = 5
camera.position.z = 11
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

window.addEventListener('dblclick', ()=>{
if (!document.fullscreenElement){

    if(canvas.requestFullscreen){


        console.log(canvas.requestFullscreen);

        canvas.requestFullscreen();

    }else if (canvas.webkitRequestFullScreen){

        canvas.webkitRequestFullScreen();
    }

} else {

    if(document.exitFullscreen){

        document.exitFullscreen();

    }else if (document.webkitExitFullScreen){
    
        document.webkitExitFullScreen();
    
    }
}

})


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //movement
        

    //

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()