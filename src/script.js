import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Trigger canvas
const canvas = document.querySelector('canvas.webgl')

// Declare a scene
const scene = new THREE.Scene()

// Create raw NormalMaterial
const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh( geometry, material );

scene.add(mesh)


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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
const rotate = () =>
{
    const elapsedTime = ThreeClock.getElapsedTime()

    mesh.rotation.x = elapsedTime - (Math.PI * 0.5);
	mesh.rotation.y = elapsedTime - (Math.PI * 0.5);

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(rotate)
}

rotate()