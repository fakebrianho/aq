import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh } from './addMeshes'
import { addLight,addLight2 } from './addLights'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './Model'
import gsap from 'gsap'
//import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'




const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true })
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.01,
	1000
)
//pass in camera and renderer dom element
const clock = new THREE.Clock()
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.08
// controls.enablePan = false
// controls.enableZoom = false
const scene = new THREE.Scene()
const meshes = {}
const lights = {}
const mixers = []

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()


// const pc = particlesCursor({
// 	el: document.querySelector('canvas.webgl'),
// 	gpgpuSize: 512,
// 	colors: [0x00ff00, 0x0000ff],
// 	color: 0xff0000,
// 	coordScale: 0.5,
// 	noiseIntensity: 0.001,
// 	noiseTimeCoef: 0.0001,
// 	pointSize: 5,
// 	pointDecay: 0.0025,
// 	sleepRadiusX: 250,
// 	sleepRadiusY: 250,
// 	sleepTimeCoefX: 0.001,
// 	sleepTimeCoefY: 0.002
//   })



let scrollY = 0




const listener = new THREE.AudioListener()
camera.add(listener)
const sound1 = new THREE.PositionalAudio(listener)
const audioLoader = new THREE.AudioLoader()

init()
function init() {
	//set up our renderer default settings, add scene/canvas to webpage
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	// meshes.default = addBoilerPlateMeshes()
	// meshes.standard = addStandardMesh()
	lights.default = addLight()
	lights.standard = addLight2()

	scene.add(sound1)

	scene.add(lights.default)
	scene.add(lights.standard)
	//scene.add(meshes.standard)
	//scene.add(meshes.default)

	scene.background = new THREE.Color('rgb(255, 255, 255)');
	

	const popupcontent = document.querySelector('.popupcontent');
	const startButton = document.querySelector('.startButton');
	
	

	window.addEventListener('scroll',ScrollToChange)



	camera.position.set(0, 0, 5)
	instances()
	initAudio()
	raycast()
	button1()
	button2()
	button3()
	explore()
	end()
	resize()
	animate()

	

	// show the popupwindow when loading
	window.onload,()=>{
		popupcontent.style.display = 'block'
	}
	// when click 'enter'
	startButton.addEventListener('click', function() {
		sound1.play();
		popupcontent.style.display = 'none'
		gsap.to('#scroll',{
			opacity: 1,
			duration:4,
			ease: 'power3.inOut'
		})
	})
}

function ScrollToChange(){
		scrollY = window.scrollY
		console.log(scrollY)
		// const section = Math.round(scrollY/window.innerHeight)
		// console.log(section)

		if (sound1.isPlaying === false) {
			sound1.play();
		}
		
		if (scrollY > 0 && scrollY < 500) {
		  // Turn white
			gsap.to(scene.background, { 
				r: 1, 
				g: 1, 
				b: 1, 
				duration: 4 
			})
			// change back ground to light

			gsap.to(camera.position, { 
				x: 0, 
				y: 0, 
				z: 6, 
				duration: 4, 
				ease: 'power3.inOut' 
			}) 

			gsap.to('#scroll',{
				opacity: 0,
				duration: 2,
			})

			gsap.to(
				meshes.star.children[0].children[0].children[1].children[0].material,
				{
					opacity:0,
					duration:4
				}
			)
			
		}

		if (scrollY > 1000 && scrollY < 1500) {
			// Turn black + move camera closer
			gsap.to(scene.background, { 
				r: 0, 
				g: 0, 
				b: 0, 
				duration: 4 
			})// change background to dark
  
			gsap.to(camera.position, { 
				x: 0, 
				y: 0, 
				z: 3.5, 
				duration: 4, 
				ease: 'power3.inOut' 
			})

			gsap.to(
				meshes.star.children[0].children[0].children[1].children[0].material,
				{
					opacity:0,
					duration:4
				}
			)
		} 

		if (scrollY > 2000 && scrollY < 2500) {
			// Move camera closer
			gsap.to(camera.position, { 
				x: 0,
				y: -4,
				z: 1,
				duration: 4,
				ease: 'power3.inOut' 
			})

			gsap.to(
				meshes.star.children[0].children[0].children[1].children[0].material,
				{
					opacity:1,
					duration:4
				}
			)
			
			gsap.to(meshes.star.position, {
				x: 0,
				y: 0,
				z: -20,
				duration: 4,
				ease: 'power3.inOut',
			})

			gsap.to(meshes.chair.position, {
				x: -2.5,
				y: 0,
				z: 2,
				duration: 4,
				ease: 'power3.inOut',
			})

			gsap.to(meshes.chair2.position, {
				x: -2.5,
				y: -2,
				z: 0,
				duration: 4,
				ease: 'power3.inOut',
			})
		}

		if (scrollY > 3000 && scrollY < 3500) {
			// Move camera closer
			gsap.to(camera.position, {
				x: 0.3,
				y: -3,
				z: 1,
				duration: 6,
				ease: 'power3.inOut',
			})
			gsap.to(meshes.chair.position, {
				x: 0,
				y: 0,
				z: 7,
				duration: 6,
				ease: 'power3.inOut',
			})
			gsap.to(meshes.chair2.position, {
				x: 0,
				y: 0,
				z: 7,
				duration: 6,
				ease: 'power3.inOut',
			})
			gsap.to(meshes.star.position, {
				x: 0,
				y: 0,
				z: 0,
				duration: 6,
				ease: 'power3.inOut',
			})
		}

		if(scrollY>4000){
			gsap.to(camera.position, {
				x: 0,
				y: -3,
				z: 6,
				duration: 6,
				ease: 'power3.inOut',
			})
		}



		
}

function initAudio(){
	audioLoader.load('/Mayday.flac', function (buffer) {
		sound1.setBuffer(buffer)
		sound1.setRefDistance(3)
		sound1.setRolloffFactor(5)
		sound1.setMaxDistance(20)
		sound1.setDistanceModel('exponential')
	})
}


function instances() {
	const blackhole = new Model({
		url: './warpspeed.glb',
		scene: scene,
		meshes: meshes,
		name: 'blackhole',
		mixers: mixers,
		animationState: true,
		position: new THREE.Vector3(0, -122.45, -514.75),
		scale: new THREE.Vector3(3.0, 3.0, 3.0),
		
	})
	blackhole.init()

	const chair = new Model({
		url: './chair.glb',
		scene: scene,
		meshes: meshes,
		name: 'chair',
		mixers: mixers,
		animationState: true,
		position: new THREE.Vector3(-2.5, 0, 2),
		scale: new THREE.Vector3(0.1, 0.1, 0.1),
	})
	chair.init()

	const chair2 = new Model({
		url: './chair.gltf',
		scene: scene,
		meshes: meshes,
		name: 'chair2',
		mixers: mixers,
		animationState: true,
		position: new THREE.Vector3(-2.5, -2, 0),
		scale: new THREE.Vector3(1, 1, 1),
	})
	chair2.init()

	const star = new Model({
		url: './randomness.glb',
		scene: scene,
		meshes: meshes,
		name: 'star',
		mixers: mixers,
		animationState: false,
		position: new THREE.Vector3(0, 0, -20),
		rotation: new THREE.Vector3(0, 0, 10),
		scale: new THREE.Vector3(1, 1, 1),
	})
	star.init()


	window.addEventListener('click',()=>{
		console.log(meshes.star.children[0].children[0].children[1].children[0])
		gsap.to(
			meshes.star.children[0].children[0].children[1].children[0].material,
			{
				opacity:0,
				duration:2
			}
		)
	})

	const photo = new Model({
		url: './photo.glb',
		scene: scene,
		meshes: meshes,
		name: 'photo',
		mixers: mixers,
		animationState: false,
		position: new THREE.Vector3(0, 0, 0),
		rotation: new THREE.Vector3(0, 0, 0),
		scale: new THREE.Vector3(0.001, 0.001, 0.001),
	})
	photo.init()

	const guitar = new Model({
		url: './guitar.glb',
		scene: scene,
		meshes: meshes,
		name: 'guitar',
		mixers: mixers,
		animationState: false,
		position: new THREE.Vector3(0, 0, 0),
		rotation: new THREE.Vector3(0, 0, 0),
		scale: new THREE.Vector3(0.02, 0.02, 0.02),
	})
	guitar.init()

	const horse = new Model({
		url: './horse.glb',
		scene: scene,
		meshes: meshes,
		name: 'horse',
		mixers: mixers,
		animationState: false,
		position: new THREE.Vector3(0, 0, 1),
		rotation: new THREE.Vector3(0, 0, 0),
		scale: new THREE.Vector3(0.08, 0.08, 0.08),
	})
	horse.init()

	const bag = new Model({
		url: './bag.glb',
		scene: scene,
		meshes: meshes,
		name: 'bag',
		mixers: mixers,
		animationState: false,
		position: new THREE.Vector3(-2.5, 0, 2),
		scale: new THREE.Vector3(0.5, 0.5, 0.5),
	})
	bag.init()
}

function raycast(){
	window.addEventListener('click', (event) => {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
		raycaster.setFromCamera(pointer, camera)
		const intersects = raycaster.intersectObjects(scene.children)
		console.log(intersects)
		for (let i = 0; i < intersects.length; i++) {
			//woodchair- camera position inside
			if (intersects[i].object.userData.name == 'Object_3') {
				// gsap.to(intersects[i].object.scale, {
				// 	x: 20,
				// 	y: 20,
				// 	z: 20,
				// 	duration: 2,
				// 	ease: 'power3.inOut',
				// })
				gsap.to(camera.position, {
					x: 0,
					y: 0,
					z: 5,
					duration: 3,
					ease: 'power3.inOut',
				})
			}
			//leather chair
			if (intersects[i].object.userData.name == 'koltuk') {
				gsap.to(camera.position, {
					x: 0.3,
					y: -4.5,
					z: 1,
					duration: 6,
					ease: 'power3.inOut',
				})
			}
		}
	})
}

//button interaction (to be replaced)
function button3(){
	let button = document.querySelector('.btn3')
	button.addEventListener('click', (event) => {
		gsap.to(camera.position, {
			x: 0.3,
			y: -3,
			z: 1,
			duration: 6,
			ease: 'power3.inOut',
		})
		gsap.to(meshes.chair.position, {
			x: 0,
			y: 0,
			z: 7,
			duration: 15,
			ease: 'power3.inOut',
		})
		gsap.to(meshes.chair2.position, {
			x: 0,
			y: 0,
			z: 7,
			duration: 15,
			ease: 'power3.inOut',
		})
		gsap.to(meshes.star.position, {
			x: 0,
			y: 0,
			z: 0,
			duration: 10,
			ease: 'power3.inOut',
		})
	})
}

function button1(){
	let button = document.querySelector('.btn1')
	button.addEventListener('click', (event) => {
		gsap.to(camera.position, {
			x: 0,
			y: 0,
			z: 3.5,
			duration: 5,
			ease: 'power3.inOut',
		})
	})
}

function button2(){
	let button = document.querySelector('.btn2')
	button.addEventListener('click', (event) => {
		gsap.to(camera.position, {
			x: 0,
			y: 0,
			z: 6,
			duration: 7.5,
			ease: 'power3.inOut',
		})
	})
}

function explore(){
	let button = document.querySelector('.explore')
	button.addEventListener('click', (event) => {
		gsap.to(camera.position, {
			x: 0,
			y: -4,
			z: 1,
			duration: 6.5,
			ease: 'power3.inOut',
		})
	})
}

function end(){
	let button = document.querySelector('.Mayday')
	button.addEventListener('click', (event) => {
		gsap.to(camera.position, {
			x: 0,
			y: -5.5,
			z: 5,
			duration: 6.5,
			ease: 'power3.inOut',
		})
	})
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	requestAnimationFrame(animate)
	
	const delta = clock.getDelta()
	controls.update()
	for (const mixer of mixers) {
		mixer.update(delta)
	}
	// meshes.default.rotation.x += 0.01
	// meshes.default.rotation.y -= 0.01
	// meshes.standard.rotation.x -= 0.01
	// meshes.standard.rotation.z -= 0.01

	//ensuring that the rotation code is executed only if meshes.rolex is defined.

	if(meshes.chair){
		const tick = clock.getElapsedTime()
		meshes.chair.rotation.y -= 0.005
		meshes.chair.rotation.z -= 0.005
		meshes.chair.position.x = Math.sin(tick*0.1)* 2
    	meshes.chair.position.y = Math.cos(tick*0.1)* 2 //Math.cos(tick * velocity)* radius
	}

	if(meshes.chair2){
		const tick = clock.getElapsedTime()
		meshes.chair2.rotation.y += 0.005
		meshes.chair2.rotation.z += 0.005
		meshes.chair2.position.x = Math.sin(tick*-0.1)* 2.2
    	meshes.chair2.position.y = Math.cos(tick*-0.1)* 2.2 //Math.cos(tick * velocity)* radius
	}

	if(meshes.star){
		meshes.star.rotation.z += 0.002
	}

	if(meshes.photo){
		const tick = clock.getElapsedTime()
		meshes.photo.rotation.y += 0.005
		meshes.photo.rotation.z += 0.005
		meshes.photo.position.x = Math.sin(tick*-0.1)* 1.5
    	meshes.photo.position.z = Math.sin(tick*-0.1)* 1.5
		meshes.photo.position.y = Math.sin(tick* 0.1)* 1.5 //Math.cos(tick * velocity)* radius
	}

	if(meshes.guitar){
		const tick = clock.getElapsedTime()
		meshes.guitar.rotation.y += 0.005
		meshes.guitar.rotation.z += 0.005
		meshes.guitar.position.x = Math.sin(tick* 0.1)* 2
		meshes.guitar.position.z = Math.sin(tick* -0.15)* 2  
    	meshes.guitar.position.y = Math.sin(tick* -0.15)* 2  //Math.cos(tick * velocity)* radius
	}

	if(meshes.horse){
		const tick = clock.getElapsedTime()
		meshes.horse.rotation.y += 0.005
		meshes.horse.rotation.z += 0.005
		meshes.horse.position.x = Math.cos(tick* 0.1)* 1.5
    	meshes.horse.position.y = Math.cos(tick* 0.1)* 2  //Math.cos(tick * velocity)* radius
	}
	
	if(meshes.bag){
		const tick = clock.getElapsedTime()
		meshes.bag.rotation.y -= 0.005
		meshes.bag.rotation.z -= 0.005
		meshes.bag.position.x = Math.sin(tick*0.1)* 2
    	meshes.bag.position.y = Math.cos(tick*0.1)* 2 //Math.cos(tick * velocity)* radius
	}
	

	renderer.render(scene, camera)
}
