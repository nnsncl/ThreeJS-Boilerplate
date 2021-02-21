import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Debug 
const gui = new dat.GUI();

// Trigger canvas
const canvas = document.querySelector('canvas.webgl')

// Declare a scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/matcaps/1.png')

// Create raw NormalMaterial
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 64, 128)
const material = new THREE.MeshMatcapMaterial()
const mesh = new THREE.Mesh(torusGeometry, material)

material.flatShading = true
material.matcap = matcapTexture

scene.add(mesh)
        
for(let i =0; i < 100; i++) {

    const normalMaterial = new THREE.MeshNormalMaterial()
    const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64)
    const torus = new THREE.Mesh(sphereGeometry, normalMaterial)

    torus.position.x = (Math.random() - 0.5) * 10
    torus.position.y = (Math.random() - 0.5) * 10
    torus.position.z = (Math.random() - 0.5) * 10

    torus.rotation.x = (Math.random() - 0.5) * 10
    torus.rotation.y = (Math.random() - 0.5) * 10

    const randomScale = Math.random()
    torus.scale.set(randomScale, randomScale, randomScale)
    scene.add(torus)
}


// Handle screen resizing
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Listen resize events
window.addEventListener('resize', () => {
    // Set the width/height to the viewport values
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Go fullscreen on double click
window.addEventListener('dblclick', () => {
    // Not supported by Safari
    !document.fullscreenElement
        ? canvas.requestFullscreen()
        : document.exitFullscreen()

})

// Set basic camera
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
camera.position.z = 1
scene.add(camera)

// Allow orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Rotation animation
const ThreeClock = new THREE.Clock()
const rotate = () => {
    const elapsedTime = ThreeClock.getElapsedTime()

    mesh.rotation.x = elapsedTime - (Math.PI * 0.5);
    mesh.rotation.y = elapsedTime - (Math.PI * 0.5);

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(rotate)
}

rotate()