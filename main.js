import './style.css'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
const loader = new GLTFLoader()

function addStar() {
    const geometry = new THREE.OctahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
    const star = new THREE.Mesh ( geometry, material );
    // randomly generating x, y, z position value for each star
    // fill Array with 3 values , map each value to the THREEjs random float spread function
    //which is a helper that randomly generate a number between -100 +100
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 300 ) );
    //Take those random numbers and set the position of the star
    star.position.set(x, y, z);
    //add a star to the scene
    scene.add(star)
}
//decide how many start to add ?
// Create an array of 200 values
//each value add star function.
//Scene should be populated with 200 randomly generated stars
Array(500).fill().forEach(addStar)

let court;
loader.load('scene.glb', function(glb){
    console.log(glb)
    court = glb.scene;
    court.scale.set(10,10,10)
    court.position.setX(0)
    court.position.setZ(-4)
    court.position.setY(0)
    scene.add(court);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) +"% loaded")
}, function(error){
    console.log('An error occured')
})

let fish;
loader.load('fish.glb', function(glb){
    console.log(glb)
    fish = glb.scene;
    fish.scale.set(1,1,1)
    fish.position.setX(5);
    fish.position.setZ(0);
    fish.position.setY(25);
    fish.rotateY(1.5);
    scene.add(fish)
})
let racket;
loader.load('koi.glb', function(glb){
    console.log(glb)
    racket = glb.scene;
    racket.scale.set(8,8,8)
    racket.position.setX(5)
    racket.position.setZ(-20)
    racket.position.setY(0)
    scene.add(racket);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) +"% loaded")
}, function(error){
    console.log('An error occured')
})
let koi;
loader.load('koi.glb', function(glb){
    console.log(glb)
    koi = glb.scene;
    koi.scale.set(8,8,8)
    koi.position.setX(2)
    koi.position.setZ(12)
    koi.position.setY(0)
    scene.add(koi);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) +"% loaded")
}, function(error){
    console.log('An error occured')
})



const directlight = new THREE.DirectionalLight(0xffffff , 3)
directlight.position.set(0,20,0 )
const ambientLight = new THREE.AmbientLight( 0xffffff);
const hemisLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//not sure about hemisLight ... do more  research  or import someone elses glb with light
//to be continued ...
scene.add( directlight, hemisLight)

const lightHelper = new THREE.PointLightHelper(directlight)
const gridHelper = new THREE.GridHelper(200,50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);
//fixed bg picture:
const backgroundTexture = new THREE.TextureLoader().load('clouds.jpeg');
scene.background = backgroundTexture;

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setY(55);
camera.position.setZ(0);
camera.position.setX(80);

function animate(){
    requestAnimationFrame( animate );
    koi.rotation.y += -0.02;
    racket.rotation.y += -0.01
    fish.translateX(0.0001);
    fish.rotation.y += 0.018;
    controls.update();
    renderer.render( scene, camera );

}

animate();

