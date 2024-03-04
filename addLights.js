import { DirectionalLight } from 'three'

export const addLight = () => {
	//let light = new DirectionalLight("rgb(204, 58, 0)", 4)
	let light = new DirectionalLight("rgb(255, 255, 255)", 4)
	light.position.set(1, 1, 1)
	return light
}

export const addLight2 = () => {
	let light = new DirectionalLight("rgb(255, 255, 255)", 4)
	light.position.set(-1, 1, 1)
	return light
}