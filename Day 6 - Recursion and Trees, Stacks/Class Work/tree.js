import fs from 'node:fs'

class Node {
	/*
	* @param {string | number} type
	* @param {*} data
	* @param {Node} parentNode
	* @param {[Node]} children
	*/
	constructor(type, data, parentNode, children = []) {
		this.type = type
		this.data = data
		this.parentNode = parentNode
		this.children = children
	}

	/*
	* @param {Node} node
	*/
	appendChild(node) {
		this.children.push(node)
		node.parentNode = this
	}

	/*
	* @returns {Node}
	*/
	previousSibling() {
		if (this.parentNode) {
			const siblings = this.parentNode.children
			let previousSiblingIndex = 0
			for (var i = 0; i < siblings.length; i++) {
				if (siblings[i] === this) {
					previousSiblingIndex = i - 1;
				}
			}
			// checking if valid index
			if (previousSiblingIndex >= 0) {
				return siblings[previousSiblingIndex]
			}
		}
	}

	/*
	* @returns {Node}
	*/
	nextSibling() {
		if (this.parentNode) {
			const siblings = this.parentNode.children
			let nextSiblingIndex = 0
			for (var i = 0; i < siblings.length; i++) {
				if (siblings[i] === this) {
					nextSiblingIndex = i - 1;
				}
			}
			// checking if valid index
			if (nextSiblingIndex < siblings.length) {
				return siblings[nextSiblingIndex]
			}
		}
	}

	/*
	* @param {"linear" | "conical"} style
	* @returns {string}
	*/
	diagram(style = "linear", indent = 0) {
		let spaces = ""
		for (var i = 0; i < indent; i++) {
			spaces += "    "
		}
		indent += 1
		let stringBuilder = String(this.type)
		for (var i = 0; i < this.children.length; i++) {
			const child = this.children[i]
			const childTreeDiagram = child.diagram("linear", indent)
			stringBuilder += `\n${spaces}└── ${childTreeDiagram}`
		}
		return stringBuilder
	}
}

// Linear Representation
// 1
// |__2
//    |__5
// |__3
// |__4
//    |__6
//    |__7
//       |__9
//    |__8

// Conical Representation
//					1
//				/	|	\
//			 2  3  4
//			 |   / | \
//			 5  6  7  8
//			 			 |
//			 			 9

function exampleTree1 () {
	const node1 = new Node(1)
	const node2 = new Node(2)
	const node3 = new Node(3)
	const node4 = new Node(4)
	const node5 = new Node(5)
	const node6 = new Node(6)
	const node7 = new Node(7)
	const node8 = new Node(8)
	const node9 = new Node(9)

	node1.appendChild(node2)
	node1.appendChild(node3)
	node1.appendChild(node4)

	node2.appendChild(node5)
	node4.appendChild(node6)
	node4.appendChild(node7)
	node4.appendChild(node8)
	node7.appendChild(node9)

	return node1
}

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
	// const tree = exampleTree1()
	// console.log(tree.diagram())

	 const dir = "../.."
	// const files = fs.readdirSync(dir)
	// for (var i = 0; i < files.length; i++) {
	// 	const file = files[i]
	// 	//console.log(file, fs.lstatSync(`${dir}/${file}`).isDirectory())
	// }
	const fileTree = createFileTree(dir)
	console.log(fileTree.diagram())
}

main()