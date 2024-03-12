import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh } from './addMeshes'
import { addLight, addLight2 } from './addLights'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './Model'
import gsap from 'gsap'
import { WheelAdaptor } from 'three-story-controls'
//import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'

const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
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

let scrollY = 0

// const listener = new THREE.AudioListener()
// camera.add(listener)
// const sound1 = new THREE.PositionalAudio(listener)
// const audioLoader = new THREE.AudioLoader()
const music = document.querySelector('.audio')

init()
function init() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	// meshes.default = addBoilerPlateMeshes()
	// meshes.standard = addStandardMesh()
	lights.default = addLight()
	lights.standard = addLight2()

	// scene.add(sound1)

	scene.add(lights.default)
	scene.add(lights.standard)
	//scene.add(meshes.standard)
	//scene.add(meshes.default)

	//scene.background = new THREE.Color('rgb(255, 255, 255)');

	window.addEventListener('scroll', ScrollToChange)

	camera.position.set(0, 0, 5)
	const popupcontent = document.querySelector('.popupcontent')
	const startButton = document.querySelector('.startButton')

	// show the popupwindow when loading
	window.onload,
		() => {
			popupcontent.style.display = 'block'
		}
	// when click 'enter'
	startButton.addEventListener('click', function () {
		// sound1.play()
		music.play()
		popupcontent.style.display = 'none'
		gsap.to('#scroll', {
			opacity: 1,
			duration: 3,
			ease: 'power3.inOut',
		})
	})
	instances()
	// initAudio()
	raycast()
	// button1()
	// button2()
	// button3()
	// explore()
	// end()
	resize()
	animate()

	// const wheelAdaptor = new WheelAdaptor({ type: 'discrete' })
	// const description = document.querySelector('.captionText')
	// let count = 0
	// wheelAdaptor.connect()
	// wheelAdaptor.addEventListener('trigger', (event) => {
	// 	if (count === 0){
	// 		gsap.to('#scroll',{
	// 			opacity: 0,
	// 			duration: 2,
	// 		})
	// 		gsap.to('#scroll2',{
	// 			opacity: 0,
	// 			duration:3,
	// 			ease: 'power3.inOut'
	// 		})
	// 	} else if (count === 1){
	// 		gsap.to('#scroll2',{
	// 			opacity: 1,
	// 			duration:3,
	// 			ease: 'power3.inOut'
	// 		})
	// 		gsap.to('#scroll3',{
	// 			opacity: 0,
	// 			duration:3,
	// 			ease: 'power3.inOut'
	// 		})
	// 	} else if (count === 2) {
	// 		gsap.to('#scroll2',{
	// 			opacity: 0,
	// 			duration:3,
	// 			ease: 'power3.inOut'
	// 		})
	// 		gsap.to('#scroll3',{
	// 			opacity: 1,
	// 			duration:3,
	// 			ease: 'power3.inOut'
	// 		})
	// 		gsap.to('#scroll4',{
	// 			opacity: 0,
	// 			duration:3,
	// 			ease: 'power3.inOut'
	// 		})
	// 	}else if (count === 3){
	// 		gsap.to('#scroll3',{
	// 			opacity: 0,
	// 			duration:3,
	// 			ease: 'power3.inOut'
	// 		})
	// 		gsap.to('#scroll4',{
	// 			opacity: 1,
	// 			duration:3,
	// 			ease: 'power3.inOut'
	// 		})
	// 		gsap.to('#scroll5',{
	// 			opacity: 0,
	// 			duration:3,
	// 			ease: 'power3.inOut'
	// 		})
	// 	}
	// 	count++
	// })
}

function ScrollToChange() {
	scrollY = window.scrollY
	console.log(scrollY)

	// if (sound1.isPlaying === false) {
	// 	sound1.play()
	// }

	//Texts
	//Beginning
	if (scrollY < 390) {
		gsap.to('#scroll', {
			opacity: 0,
			duration: 1,
		})
		//here
		gsap.to('#scroll2', {
			opacity: 0,
			duration: 1,
		})
		gsap.to('body', {
			duration: 3,
			backgroundColor: 'rgb(255,255,255)',
		})
	}

	//old photos
	if (scrollY > 390 && scrollY < 1600) {
		gsap.to('#scroll2', {
			opacity: 1,
			duration: 1,
		})
		gsap.to(meshes.photo.scale, {
			x: 0.002,
			y: 0.002,
			z: 0.002,
			duration: 4,
			ease: 'power3.inOut',
		})
		gsap.to('#scroll3', {
			opacity: 0,
			duration: 1,
		})
		gsap.to('body', {
			duration: 1,
			backgroundColor: 'rgb(71, 58, 36)',
		})
	}

	if (scrollY > 1600 && scrollY < 2200) {
		gsap.to('#scroll2', {
			opacity: 0,
			duration: 1,
		})
		gsap.to('body', {
			duration: 1,
			backgroundColor: 'rgb(94,96,56)',
		})
	}
	//park
	if (scrollY > 2200 && scrollY < 2800) {
		gsap.to('#scroll3', {
			opacity: 1,
			duration: 1,
		})
		gsap.to(meshes.flower.scale, {
			x: 1,
			y: 1,
			z: 1,
			duration: 4,
			ease: 'power3.inOut',
		})
		gsap.to('#scroll4', {
			opacity: 0,
			duration: 1,
		})
	}

	if (scrollY > 2800 && scrollY < 3400) {
		gsap.to('#scroll3', {
			opacity: 0,
			duration: 1,
		})
		gsap.to('body', {
			duration: 1,
			backgroundColor: 'rgb(199, 197, 217)',
		})
	}
	//expensive things
	if (scrollY > 3400 && scrollY < 4000) {
		gsap.to('#scroll4', {
			opacity: 1,
			duration: 1,
		})
		gsap.to(meshes.watch.scale, {
			x: 0.15,
			y: 0.15,
			z: 0.15,
			duration: 4,
			ease: 'power3.inOut',
		})
		gsap.to('#scroll5', {
			opacity: 0,
			duration: 1,
		})
	}

	if (scrollY > 4000 && scrollY < 4600) {
		gsap.to('#scroll4', {
			opacity: 0,
			duration: 1,
		})
		gsap.to('body', {
			duration: 3,
			backgroundColor: 'rgb(163,53,65)',
		})
	}
	//lineage
	if (scrollY > 4600 && scrollY < 5200) {
		gsap.to('#scroll5', {
			opacity: 1,
			duration: 1,
			ease: 'power3.inOut',
		})
		gsap.to(meshes.bag.scale, {
			x: 0.6,
			y: 0.6,
			z: 0.6,
			duration: 4,
			ease: 'power3.inOut',
		})
		gsap.to('#scroll6', {
			opacity: 0,
			duration: 1,
			ease: 'power3.inOut',
		})
	}

	if (scrollY > 5200 && scrollY < 5800) {
		gsap.to('#scroll5', {
			opacity: 0,
			duration: 1,
			ease: 'power3.inOut',
		})
		gsap.to('body', {
			duration: 3,
			backgroundColor: 'rgb(217, 102, 213)',
		})
	}
	//wish,hope
	if (scrollY > 5800 && scrollY < 6400) {
		gsap.to('#scroll6', {
			opacity: 1,
			duration: 1,
		})
		gsap.to(meshes.guitar.scale, {
			x: 0.02,
			y: 0.02,
			z: 0.02,
			duration: 4,
			ease: 'power3.inOut',
		})
		gsap.to('#scroll7', {
			opacity: 0,
			duration: 1,
		})
	}

	if (scrollY > 6400 && scrollY < 7000) {
		gsap.to('#scroll6', {
			opacity: 0,
			duration: 1,
		})
		gsap.to('body', {
			duration: 3,
			backgroundColor: 'rgb(59, 26, 58)',
		})
	}

	//question
	if (scrollY > 7000 && scrollY < 7600) {
		gsap.to('#scroll7', {
			opacity: 1,
			duration: 1,
		})
		gsap.to('#scroll8', {
			opacity: 0,
			duration: 1,
		})
	}

	if (scrollY > 7600 && scrollY < 8200) {
		gsap.to('#scroll7', {
			opacity: 0,
			duration: 1,
		})
		gsap.to('body', {
			duration: 3,
			backgroundColor: 'rgb(0,0,0)',
		})
	}
	//last question
	if (scrollY > 8200 && scrollY < 8800) {
		gsap.to('#scroll8', {
			opacity: 1,
			duration: 1,
		})
		gsap.to('#scroll9', {
			opacity: 0,
			duration: 1,
		})
	}
	if (scrollY > 8800 && scrollY < 9400) {
		gsap.to('#scroll8', {
			opacity: 0,
			duration: 1,
		})
	}
	//finally
	if (scrollY > 9400 && scrollY < 10000) {
		gsap.to('#scroll9', {
			opacity: 1,
			duration: 1,
		})
		gsap.to('#scroll10', {
			opacity: 0,
			duration: 1,
		})
	}
	if (scrollY > 10000 && scrollY < 10600) {
		gsap.to('#scroll9', {
			opacity: 0,
			duration: 1,
		})
	}
	//
	if (scrollY > 10600 && scrollY < 11200) {
		gsap.to('#scroll10', {
			opacity: 1,
			duration: 1,
		})
		gsap.to('#scroll11', {
			opacity: 0,
			duration: 1,
		})
	}
	if (scrollY > 11200 && scrollY < 11800) {
		gsap.to('#scroll10', {
			opacity: 0,
			duration: 1,
		})
	}
	//
	if (scrollY > 11800 && scrollY < 12400) {
		gsap.to('#scroll11', {
			opacity: 1,
			duration: 1,
		})
		gsap.to('#scroll12', {
			opacity: 0,
			duration: 1,
		})
	}
	if (scrollY > 12400 && scrollY < 13000) {
		gsap.to('#scroll11', {
			opacity: 0,
			duration: 1,
		})
	}

	if (scrollY > 13000 && scrollY < 14500) {
		gsap.to('#scroll12', {
			opacity: 1,
			duration: 3,
		})
	}
	if (scrollY > 14500 && scrollY < 14700) {
		gsap.to('#scroll12', {
			opacity: 1,
			duration: 3,
		})
	}
	if (scrollY > 14700 && scrollY < 15000) {
		gsap.to('#scroll12', {
			opacity: 0,
			duration: 3,
		})
		gsap.to('body', {
			duration: 3,
			backgroundColor: 'rgb(255,255,255)',
		})
		gsap.to(
			meshes.star.children[0].children[0].children[1].children[0]
				.material,
			{
				opacity: 0,
				duration: 4,
			}
		)
	}
	if (scrollY > 15000 && scrollY < 15600)
		gsap.to('#Mayday', {
			opacity: 0,
			duration: 3,
		})

	if (scrollY > 15600) {
		gsap.to('#Mayday', {
			opacity: 1,
			duration: 3,
		})
	}

	//////////////////////////////////////////////////////

	if (scrollY > 0 && scrollY < 1000) {
		gsap.to(camera.position, {
			x: 0,
			y: 0,
			z: 6,
			duration: 4,
			ease: 'power3.inOut',
		})
		gsap.to(
			meshes.star.children[0].children[0].children[1].children[0]
				.material,
			{
				opacity: 0,
				duration: 4,
			}
		)
	}

	if (scrollY > 6400 && scrollY < 7600) {
		// Move camera closer, let star opacity = 1
		gsap.to(camera.position, {
			x: 0,
			y: -4,
			z: 1,
			duration: 4,
			ease: 'power3.inOut',
		})
	}

	//move camera
	if (scrollY > 7600 && scrollY < 10600) {
		gsap.to(camera.position, {
			x: 0.3,
			y: -4,
			z: 1,
			duration: 6,
			ease: 'power3.inOut',
		})
	}
	//make stars visible, move camer closer
	if (scrollY > 10600 && scrollY < 11800) {
		gsap.to(camera.position, {
			x: 0.3,
			y: -3,
			z: 1,
			duration: 6,
			ease: 'power3.inOut',
		})
		gsap.to(
			meshes.star.children[0].children[0].children[1].children[0]
				.material,
			{
				opacity: 1,
				duration: 4,
			}
		)
		gsap.to(meshes.star.position, {
			x: 0,
			y: 0,
			z: -20,
			duration: 4,
			ease: 'power3.inOut',
		})
		if (scrollY > 9400) {
			gsap.to(camera.position, {
				x: 0.3,
				y: -2,
				z: 1,
				duration: 6,
				ease: 'power3.inOut',
			})
		}
	}

	// Move other things away
	if (scrollY > 11800 && scrollY < 12000) {
		gsap.to(meshes.bag.scale, {
			x: 0,
			y: 0,
			z: 10,
			duration: 6,
			ease: 'power3.inOut',
		})
		gsap.to(meshes.watch.scale, {
			x: 0,
			y: 0,
			z: 10,
			duration: 6,
			ease: 'power3.inOut',
		})
		gsap.to(meshes.flower.scale, {
			x: 0,
			y: 0,
			z: 10,
			duration: 6,
			ease: 'power3.inOut',
		})
		gsap.to(meshes.photo.scale, {
			x: 0,
			y: 0,
			z: 10,
			duration: 6,
			ease: 'power3.inOut',
		})
		gsap.to(meshes.guitar.scale, {
			x: 0,
			y: 0,
			z: 10,
			duration: 6,
			ease: 'power3.inOut',
		})
	}
	//show stars
	if (scrollY > 12000 && scrollY < 12500) {
		gsap.to(camera.position, {
			x: 0.3,
			y: -4,
			z: 1,
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

	if (scrollY > 12500) {
		gsap.to(camera.position, {
			x: 0,
			y: -3,
			z: 5,
			duration: 6,
			ease: 'power3.inOut',
		})
	}
}

function initAudio() {
	audioLoader.load('/md.mp3', function (buffer) {
		sound1.setBuffer(buffer)
		sound1.setRefDistance(3)
		sound1.setRolloffFactor(5)
		sound1.setMaxDistance(20)
		sound1.setDistanceModel('exponential')
	})
	scene.add(sound1)
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

	const watch = new Model({
		url: './watch.glb',
		scene: scene,
		meshes: meshes,
		name: 'watch',
		mixers: mixers,
		animationState: true,
		position: new THREE.Vector3(-2.5, -2, 0),
		scale: new THREE.Vector3(0.5, 0.5, 0.5),
	})
	watch.init()

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

	window.addEventListener('click', () => {
		console.log(meshes.star.children[0].children[0].children[1].children[0])
		gsap.to(
			meshes.star.children[0].children[0].children[1].children[0]
				.material,
			{
				opacity: 0,
				duration: 2,
			}
		)
	})

	const photo = new Model({
		url: './paint.glb',
		scene: scene,
		meshes: meshes,
		name: 'photo',
		mixers: mixers,
		animationState: false,
		position: new THREE.Vector3(0, 0, 0),
		rotation: new THREE.Vector3(0, 0, 0),
		scale: new THREE.Vector3(0.004, 0.004, 0.004),
	})
	photo.init()

	const guitar = new Model({
		url: './guitar2.glb',
		scene: scene,
		meshes: meshes,
		name: 'guitar',
		mixers: mixers,
		animationState: false,
		position: new THREE.Vector3(0, 0, 0),
		rotation: new THREE.Vector3(0, 0, 0),
		scale: new THREE.Vector3(0.1, 0.1, 0.1),
	})
	guitar.init()

	const flower = new Model({
		url: './flower.glb',
		scene: scene,
		meshes: meshes,
		name: 'flower',
		mixers: mixers,
		animationState: false,
		position: new THREE.Vector3(0, 0, 1),
		rotation: new THREE.Vector3(0, 0, 0),
		scale: new THREE.Vector3(2.5, 2.5, 2.5),
	})
	flower.init()

	const bag = new Model({
		url: './bag.glb',
		scene: scene,
		meshes: meshes,
		name: 'bag',
		mixers: mixers,
		animationState: false,
		position: new THREE.Vector3(-2.5, 0, 2),
		scale: new THREE.Vector3(2, 2, 2),
	})
	bag.init()
}

function raycast() {
	window.addEventListener('click', (event) => {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
		raycaster.setFromCamera(pointer, camera)
		const intersects = raycaster.intersectObjects(scene.children)
		console.log(intersects)
		for (let i = 0; i < intersects.length; i++) {
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
// function button3(){
// 	let button = document.querySelector('.btn3')
// 	button.addEventListener('click', (event) => {
// 		gsap.to(camera.position, {
// 			x: 0.3,
// 			y: -3,
// 			z: 1,
// 			duration: 6,
// 			ease: 'power3.inOut',
// 		})
// 		gsap.to(meshes.flower.position, {
// 			x: 0,
// 			y: 0,
// 			z: 7,
// 			duration: 15,
// 			ease: 'power3.inOut',
// 		})
// 		gsap.to(meshes.watch.position, {
// 			x: 0,
// 			y: 0,
// 			z: 7,
// 			duration: 15,
// 			ease: 'power3.inOut',
// 		})
// 		gsap.to(meshes.star.position, {
// 			x: 0,
// 			y: 0,
// 			z: 0,
// 			duration: 10,
// 			ease: 'power3.inOut',
// 		})
// 	})
// }

// function button1(){
// 	let button = document.querySelector('.btn1')
// 	button.addEventListener('click', (event) => {
// 		gsap.to(camera.position, {
// 			x: 0,
// 			y: 0,
// 			z: 3.5,
// 			duration: 5,
// 			ease: 'power3.inOut',
// 		})
// 	})
// }

// function button2(){
// 	let button = document.querySelector('.btn2')
// 	button.addEventListener('click', (event) => {
// 		gsap.to(camera.position, {
// 			x: 0,
// 			y: 0,
// 			z: 6,
// 			duration: 7.5,
// 			ease: 'power3.inOut',
// 		})
// 	})
// }

// function explore(){
// 	let button = document.querySelector('.explore')
// 	button.addEventListener('click', (event) => {
// 		gsap.to(camera.position, {
// 			x: 0,
// 			y: -4,
// 			z: 1,
// 			duration: 6.5,
// 			ease: 'power3.inOut',
// 		})
// 	})
// }

// function end(){
// 	let button = document.querySelector('.Mayday')
// 	button.addEventListener('click', (event) => {
// 		gsap.to(camera.position, {
// 			x: 0,
// 			y: -5.5,
// 			z: 5,
// 			duration: 6.5,
// 			ease: 'power3.inOut',
// 		})
// 	})
// }

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

	if (meshes.watch) {
		const tick = clock.getElapsedTime()
		meshes.watch.rotation.y += 0.005
		meshes.watch.rotation.z += 0.005
		meshes.watch.position.x = Math.sin(tick * -0.1) * 2.2 - 1
		meshes.watch.position.y = Math.cos(tick * -0.1) * 2.2 - 1
		meshes.watch.position.z = Math.sin(tick * 0.1) * 1.5 //Math.cos(tick * velocity)* radius
	}

	if (meshes.star) {
		meshes.star.rotation.z += 0.002
	}

	if (meshes.photo) {
		const tick = clock.getElapsedTime()
		meshes.photo.rotation.y += 0.005
		meshes.photo.rotation.z += 0.005
		meshes.photo.position.x = Math.sin(tick * -0.2) * 1
		meshes.photo.position.y = Math.sin(tick * 0.1) * 1 //Math.cos(tick * velocity)* radius
	}

	if (meshes.guitar) {
		const tick = clock.getElapsedTime()
		meshes.guitar.rotation.y += 0.005
		meshes.guitar.rotation.z += 0.005
		meshes.guitar.position.x = Math.sin(tick * -0.1) * 2
		meshes.guitar.position.z = Math.sin(tick * -0.15) * 2
		meshes.guitar.position.y = Math.sin(tick * -0.15) * 1 //Math.cos(tick * velocity)* radius
	}

	if (meshes.flower) {
		const tick = clock.getElapsedTime()
		meshes.flower.rotation.y += 0.005
		meshes.flower.rotation.z += 0.005
		meshes.flower.position.x = Math.cos(tick * 0.1) * 1.5
		meshes.flower.position.y = Math.cos(tick * 0.1) * 2 //Math.cos(tick * velocity)* radius
	}

	if (meshes.bag) {
		const tick = clock.getElapsedTime()
		meshes.bag.rotation.y -= 0.005
		meshes.bag.rotation.z -= 0.005
		meshes.bag.position.x = Math.sin(tick * 0.1) * 2
		meshes.bag.position.y = Math.cos(tick * 0.1) * 2 //Math.cos(tick * velocity)* radius
	}

	renderer.render(scene, camera)
}
