/*
** Checks if two values are equal (not by reference)
** @param [any] a - First element to be checked for equality
** @param [any] b - Second element to be checked for equality
*/
function equal(a, b) {
	switch (typeof a) {
	case "undefined": case "number": case "string": case "boolean":
		return a === b
	case "function":
		// TODO: Fix this, compare function body only
		return a.toString() === b.toString()
	}

	if (a === null) {
		return b === null
	}

	if (Array.isArray(a)) {
		if (Array.isArray(b)) {
			if (a.length !== b.length) {
				return false
			}
			for (var i = 0; i < a.length; i++) {
				if (!equal(a[i], b[i])) {
					return false
				}
			}
			return true
		} else {
			return false
		}
	}

	const aKeys = Object.keys(a)
	const bKeys = Object.keys(b)
	if (!equal(aKeys, bKeys)) {
		return false
	}

	for (var i = 0; i < aKeys.length; i++) {
		const key = aKeys[i]
		if (!equal(a[key], b[key])) {
			return false
		}
	}
	
	return true
}

console.log(equal.toString())

let tree
let currentNode

let assert

/*
** @param [string] title - Title of the test
** @param [string] description - Short description of the test
** @param [function] fn - Function that runs the test
*/
function test(title, description, fn) {
    let parentNode = currentNode
    let isPrint = false
    currentNode = { title, description, result: true }

    if (!tree) {
        tree = currentNode
        isPrint = true
    }

    if (parentNode) {
        if (parentNode.children) {
            parentNode.children.push(currentNode)
        } else {
            parentNode.children = [currentNode]
        }
    }

    assert = (condition) => {
        if (!condition) {
            currentNode.result = false
        }
    }

    try {
        let result = fn()
        if (result === false) {
            currentNode.result = false
        }
    } catch (error) {
        currentNode.result = false
        currentNode.error = error
    }

    if (!currentNode.result) {
        if (parentNode) {
            parentNode.result = false
        }
    }

    currentNode = parentNode
    if (isPrint) {
        console.log(printTree(tree))
    }
}

function printTree(tree, level = 0) {
    let strBuilder = ""
    let indent = ""
    for (let i = 0; i < level; i++) {
        indent += "  "
    }

    level += 1
    
    strBuilder += indent + "Title: " + tree.title + "\n"
    strBuilder += indent + "Description: " + tree.description  + "\n"
    strBuilder += indent + (tree.result ? "PASS" : "FAIL") + "\n"

    if (tree.children) {
        for (let i = 0; i < tree.children.length; i++) {
            const child = tree.children[i]
            strBuilder += printTree(child, level)
        }
    }

    return strBuilder
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    await sleep(500)

    test(
        "Document in HTML",
        "The document exists",
        () => {
          assert(document !== null)
          test(
            "Title",
            "The title should be 'Hello, World!'",
            () => document.title === "Hello, World!"
          )
          test(
            "Body",
            "Body exists",
            () => {
              assert(document.body !== null)
              test(
                "Background color",
                "The body should have a background color",
                () => document.body.style.backgroundColor !== ""
              )
            }
          )
        }
      )
}

document.addEventListener("DOMContentLoaded", main)
