import fs from 'node:fs'

import Node from './tree.js'
/*
* @param {String} dir
* @returns {Node}
*/
function createFileTree(dir) {
	// take the part of the string before last /
	let dirName = ""
	for(let i = dir.length-1; i >= 0; i--) {
		if(dir[i] === "/") {
			break
		} else {
			dirName = dir[i] + dirName
		}
	}
	// pre order recursion
	const parentNode = new Node(dirName)
	const files = fs.readdirSync(dir)
		.filter(value => value.charAt(0) !== "." )
	files.sort()
	for(let i = 0; i < files.length; i++) {
		let childNode
		const file = files[i]
		const filePath = `${dir}/${file}`
		const isDirectory = fs.lstatSync(filePath).isDirectory()
		if(isDirectory) {
			childNode = createFileTree(filePath)
		} else {
			childNode = new Node(file)
		}
		parentNode.appendChild(childNode)
	}
	return parentNode
}

function main() {
	const fileTree = createFileTree(process.cwd())
	console.log(fileTree.diagram())
}

main()