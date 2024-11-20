import Node from './tree.js'

class HTMLNode extends Node {
	constructor(type, attributeMap = {}, childNodes) {
        super(type, attributeMap, null, childNodes)
    }

    toHTML() {
        let stringBuilder = ""
        return stringBuilder
    }
}

// Shorthands
function m(type, attributeMap, childNodes) {
    return new HTMLNode(type, attributeMap, childNodes)
}

const p = (attributeMap, childNodes) => m("p", attributeMap, childNodes)
const div = (attributeMap, childNodes) => m("div", attributeMap, childNodes)
const span = (attributeMap, childNodes) => m("span", attributeMap, childNodes)
const li = (attributeMap, childNodes) => m("li", attributeMap, childNodes)
const ul = (attributeMap, childNodes) => m("ul", attributeMap, childNodes)
const body = (attributeMap, childNodes) => m("body", attributeMap, childNodes)

const text = (content) => m("text", {content})

function example() {
    const node = p({style: { color: "red" }, class: "heading"}, [
        text("Here is a list:"),
        ul({},[
            li({}, [ text("List Item 1") ]),
            li({}, [ text("List Item 2") ]),
            li({}, [ text("List Item 3") ])
        ])
    ])

    return node
}

function main() {
    console.log(example().diagram())
}

main()