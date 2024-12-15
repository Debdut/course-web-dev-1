/**
 * Represents a tree node.
 * Each node can contain data, a reference to its parent node, and a list of child nodes.
 */
class Node {
    /**
     * Creates a new Node instance.
     * @constructor
     * @param {string | number} type - The type or identifier for the node.
     * @param {*} data - The data stored in the node.
     * @param {Node} [parentNode=undefined] - The parent node of this node.
     * @param {Node[]} [children=[]] - The children nodes of this node.
     */
    constructor(type, data, parentNode = undefined, children = []) {
        this.type = type;
        this.data = data;
        this.parentNode = parentNode;
        this.children = children;
		for (let i = 0; i < children.length; i++) {
			const child = children[i]
			child.parentNode = this
		}
    }

    /**
     * Appends a child node to this node.
     * @param {Node} node - The child node to append.
     * @returns {void}
     */
    appendChild(node) {
        this.children.push(node)
        node.parentNode = this
    }

    /**
     * Returns the previous sibling of this node, if it exists.
     * @returns {Node|undefined} The previous sibling node or undefined if none exists.
     */
    previousSibling() {
        if (this.parentNode) {
            const siblings = this.parentNode.children;
            const index = siblings.indexOf(this);
            return index > 0 ? siblings[index - 1] : undefined;
        }
        return undefined;
    }

    /**
     * Returns the next sibling of this node, if it exists.
     * @returns {Node|undefined} The next sibling node or undefined if none exists.
     */
    nextSibling() {
        if (this.parentNode) {
            const siblings = this.parentNode.children;
            const index = siblings.indexOf(this);
            return index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined;
        }
        return undefined;
    }

    /**
	 * Returns a diagram of the tree rooted at this node as a string, possibly to be printed, there are two styles:
	 * Linear Representation
	 * 1
	 * └── 2
	 *     └── 5
	 * └── 3
	 * └── 4
	 *     └── 6
	 *     └── 7
	 *         └── 9
	 *     └── 8
	 * 
	 * Conical Representation
	 * 				1
	 * 			 /	|  \
	 * 			 2  3  4
	 * 			 |   / | \
	 * 			 5  6  7  8
	 * 			 		  |
	 * 					  9 
     * @param {"linear" | "conical"} [style="linear"] - The style of the diagram.
     * @param {number} [indent=0] - The current indentation level (used internally for recursion).
     * @returns {string} A string representation of the tree.
     */
    diagram(style = "linear", indent = 0) {
        let spaces = "";
        for (let i = 0; i < indent; i++) {
            spaces += "    ";
        }
        indent += 1;
        let stringBuilder = String(this.type);
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            const childTreeDiagram = child.diagram("linear", indent);
            stringBuilder += `\n${spaces}└── ${childTreeDiagram}`;
        }
        return stringBuilder;
    }

    /**
	 * Performs an in-order traversal of the tree rooted at this node.
	 * If no callback is provided,
	 * If a callback function is provided, it will be executed on each node during traversal, it returns an array of results from function applied on the nodes in in-order sequence.
	 * @example
	 * 		1
	 * 	  /	 \
	 * 	 2   3
	 *  /  \  \
	 * 4   5   6
	 * returns [4, 2, 5, 1, 3, 6]
	 * See in-order explanation at: https://media.geeksforgeeks.org/wp-content/uploads/20240429124538/Preorder-Traversal-of-Binary-Tree.webp
	 * @param {(function(Node): any) | undefined} f - A callback function to execute on each node, or undefined.
	 * @returns {Node[] | any[]} If a callback is provided, nothing is returned. If no callback is provided, an array of nodes is returned.
	 */
    inOrder(f) {
		let result = []

		if (this.children.length > 0) {
			const firstChild = this.children[0]
			if (f) {
				result = result.concat(firstChild.inOrder(f))

				result.push(f(this))

				for (let i = 1; i < this.children.length; i++) {
					const child = this.children[i]
					result = result.concat(child.inOrder(f))
				}
			} else {
				result = result.concat(firstChild.inOrder())

				result.push(this)
				
				for (let i = 1; i < this.children.length; i++) {
					const child = this.children[i]
					result = result.concat(child.inOrder())
				}
			}
		} else {
			if (f) {
				result.push(f(this))
			} else {
				result.push(this)
			}
		}
		
		return result
    }

	 /**
	 * Performs an pre-order traversal of the tree rooted at this node.
	 * If no callback is provided,
	 * If a callback function is provided, it will be executed on each node during traversal, it returns an array of results from function applied on the nodes in pre-order sequence.
	 * @example
	 * 		1
	 * 	  /	 \
	 * 	 2   3
	 *  /  \  \
	 * 4   5   6
	 * returns [1, 2, 4, 5, 3, 6]
	 * See in-order explanation at: https://media.geeksforgeeks.org/wp-content/uploads/20240429124832/Inorder-Traversal-of-Binary-Tree.webp
	 * @param {(function(Node): any) | undefined} f - A callback function to execute on each node, or undefined.
	 * @returns {Node[] | any[]} If a callback is provided, nothing is returned. If no callback is provided, an array of nodes is returned.
	 */
	preOrder(f) {
		let result = []

		if (f) {
			result.push(f(this))

			for (let i = 0; i < this.children.length; i++) {
				const child = this.children[i]
				result = result.concat(child.preOrder(f))
			}
		} else {
			result.push(this)
			for (let i = 0; i < this.children.length; i++) {
				const child = this.children[i]
				result = result.concat(child.preOrder())
			}
		}
		
		return result
    }

	/**
	 * Performs an post-order traversal of the tree rooted at this node.
	 * If no callback is provided,
	 * If a callback function is provided, it will be executed on each node during traversal, it returns an array of results from function applied on the nodes in post-order sequence.
	 * @example
	 * 		1
	 * 	  /	 \
	 * 	 2   3
	 *  /  \  \
	 * 4   5   6
	 * returns [4, 5, 2, 6, 3, 1]
	 * See in-order explanation at: https://media.geeksforgeeks.org/wp-content/uploads/20240429125100/Postorder-Traversal-of-Binary-Tree.webp
	 * @param {(function(Node): any) | undefined} f - A callback function to execute on each node, or undefined.
	 * @returns {Node[] | any[]} If a callback is provided, nothing is returned. If no callback is provided, an array of nodes is returned.
	 */
	postOrder(f) {
		let result = []
		
		if (f) {
			for (let i = 0; i < this.children.length; i++) {
				const child = this.children[i]
				result = result.concat(child.postOrder(f))
			}

			result.push(f(this))
		} else {
			for (let i = 0; i < this.children.length; i++) {
				const child = this.children[i]
				result = result.concat(child.postOrder())
			}

			result.push(this)
		}
		
		return result
    }

	/**
	 * Performs an level-order traversal of the tree rooted at this node.
	 * If no callback is provided,
	 * If a callback function is provided, it will be executed on each node during traversal, it returns an array of results from function applied on the nodes in level-order sequence.
	 * @example
	 *      		1
	 * 			  /	 \
	 * 			 2   3
	 *         /  \   \
	 *        4   5   6
	 * returns [1, 2, 3, 4, 5, 6]
	 * See in-order explanation at: https://media.geeksforgeeks.org/wp-content/uploads/20240429134701/Level-Order-Traversal-of-Binary-Tree.webp
	 * @param {(function(Node): any) | undefined} f - A callback function to execute on each node, or undefined.
	 * @returns {Node[] | any[]} If a callback is provided, nothing is returned. If no callback is provided, an array of nodes is returned.
	 */
	levelOrder(f) {
		let result = []
		let parents = []

		if (f) {
			result.push(f(this))
			parents.push(this)

			while (parents.length > 0) {
				let children = []
				for (var i = 0; i < parents.length; i++) {
					const parent = parents[i]
					children.push(...parent.children)
				}
				for (var i = 0; i < children.length; i++) {
					const child = children[i]
					result.push(f(child))
				}
				parents = children
			}
		} else {
			result.push(this)
			parents.push(this)

			while (parents.length > 0) {
				let children = []
				for (var i = 0; i < parents.length; i++) {
					const parent = parents[i]
					children.push(...parent.children)
				}
				result.push(...children)
				parents = children
			}
		}

		return result
    }

	/**
	 * Retrieves the leaves of the tree rooted at this node.
	 * If no callback is provided, it returns an array of leaf nodes.
	 * If a callback function is provided, it will be executed on each leaf node, and it returns an array of results from the function applied on the leaf nodes.
	 * Leaves are the terminal nodes of the tree, meaning they are at the end of each branch and do not branch out further.
	 * @example
	 *  			1
	 * 			 /	|  \
	 * 			 2  3  4
	 * 			 |   / | \
	 * 			 5  6  7  8
	 * 			 	   |
	 * 				   9 
	 * returns [5, 3. 6, 9, 8]
	 * @param {(function(Node): any) | undefined} f - A callback function to execute on each leaf node, or undefined.
	 * @returns {Node[] | any[]} If a callback is provided, an array of results from the function applied on the leaf nodes is returned. If no callback is provided, an array of leaf nodes is returned.
	 */
	leaves(f) {
		const nodes = this.preOrder()
		const leaves = []
		if (f) {
			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i]
				if (node.children.length === 0) {
					leaves.push(f(node))
				}
			}
		} else {
			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i]
				if (node.children.length === 0) {
					leaves.push(node)
				}
			}
		}
	}

	/**
	 * Searches the tree rooted at this node for nodes that satisfy a given condition.
	 * If the count parameter is undefined, the method returns all nodes that satisfy the condition.
	 * If the count parameter is provided, the search terminates after finding the specified number of matching nodes.
	 *
	 * @param {function(Node): boolean} condition - A function that takes a node and returns a boolean indicating whether the node satisfies the condition.
	 * @param {number | undefined} count - The maximum number of matching nodes to return. If undefined, all matching nodes are returned.
	 * * @param {(function(Node): any) | undefined} f - A callback function to execute on each searched node, or undefined.
	 * @returns {Node[]} An array of nodes that satisfy the condition.
	 */
	search(condition, count, f) {
		const nodes = this.preOrder()
		let result = []
		if (count) {
			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i]
				if (condition(node)) {
					result.push(node)
				}
			}
		} else {
			let found = 0
			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i]
				if (condition(node)) {
					result.push(node)
					found++
				}
				if (found === count) {
					break
				}
			}
		}

		if (f) {
			for (let i = 0; i < result.length; i++) {
				f(result[i])
			}
		}
		return result
	}
}

export default Node

/**
 * Creates a tree
 * @returns {Node} Returns the parent node of an example tree
 */

function exampleTree () {
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
	// Creates a tree
	const tree = exampleTree()

	// Prints the diagram
	console.log(tree.diagram())

	// In Order
	expect(tree.inOrder(e => e.type))
		.toBe([5, 2, 1, 3, 6, 4, 9, 7, 8])

	// Pre Order
	expect(
		tree.preOrder(x => x.type**2)
	)
		.toBe([1, 4, 25, 9, 16, 36, 49, 81, 64])
	
	// Post Order
	expect(tree.postOrder(e => e.type))
		.toBe([5, 2, 3, 6, 9, 7, 8, 4, 1])

	
	// Level Order
	expect(tree.levelOrder(e => e.type))
		.toBe([1, 2, 3, 4, 5, 6, 7, 8, 9])
	
	// Leaves
	expect(tree.leaves(e => e.type))
		.toBe([5, 3, 6, 9, 8])

	// Search even nodes
	expect(
		tree.search(x => x.type % 2 === 0, null, x => x.type)
	)
		.toBe([2, 4, 6, 8])
}

function expect(val1) {
	return {
		toBe(val2) {
			let coVal1 = val1
			let coVal2 = val2
			if (typeof val1 === 'object') {
				coVal1 = val1.toString()
			}
			if (typeof val2 === 'object') {
				coVal2 = val2.toString()
			}
			if (coVal1 === coVal2) {
				console.log("Pass")
			} else {
				console.log("Fail")
				console.log("Expected: ", coVal2)
				console.log("Output: ", coVal1)
			}
		}
	}
}

main()