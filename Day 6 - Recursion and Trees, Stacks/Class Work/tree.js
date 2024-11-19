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
			spaces += "   "
		}
		indent += 1
		let stringBuilder = String(this.type)
		for (var i = 0; i < this.children.length; i++) {
			const child = this.children[i]
			stringBuilder += `\n${spaces}|__ ${child.diagram("linear", indent)}`
		}
		return stringBuilder
	}
}

// Linear Representation
// 1
// |__ 2
// 		|__ 5
// |__ 3
// |__ 4
// 		|__ 6
// 		|__ 7
// 		|__ 8
// 			|__ 9

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


function main() {
	const tree = exampleTree1()
	console.log(tree.diagram())
}

main()