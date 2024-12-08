import Node from './tree.js'

class HTMLNode extends Node {
	constructor(tag, attributeMap = {}, children = []) {
        super(tag, attributeMap, null, children)
    }

    get tag() {
        return this.type
    }

    get attributeMap() {
        return this.data
    }

    toHTML(isIndent = false, level = 0) {
        if (this.tag === "text") {
            return this.attributeMap.content
        }

        level += 1
        let indent = ""
        let stringBuilder = `<${this.tag}`

        const attributes = Object.keys(this.attributeMap)
        for (let i = 0; i < attributes.length; i++) {
            let attribute = attributes[i]
            let value = this.attributeMap[attribute]
            stringBuilder += " " + AttrtoString(attribute, value)
        }

        stringBuilder += ">"

        if (isIndent) {
            stringBuilder += "\n"
            for (let i = 0; i < level - 1; i++) {
                indent += "  "
            }
        }
        
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i]
            
            if (isIndent) {
                stringBuilder += indent + "  "
            }

            stringBuilder += child.toHTML(isIndent, level)
            
            if (isIndent) {
                stringBuilder += "\n"
            }
        }

        if (isIndent) {
            stringBuilder += indent
        }

        stringBuilder += `</${this.tag}>`
        
        return stringBuilder
    }
}

function toCamelCase(str) {
    let stringBuilder = ""
    for (var i = 0; i < str.length; i++) {
        let char = str[i]
        if (char === char.toUpperCase()) {
            stringBuilder += "-"
        }
        stringBuilder += char.toLowerCase()
    }
    return stringBuilder
}

function AttrtoString(name, value) {
    let stringBuilder = ""
    let updatedName = toCamelCase(name)

    switch(typeof value) {

        case "function":
            updatedName = name.toLowerCase()
            return `${updatedName}="${value.name}()"`

        case "object":
            const keys = Object.keys(value)

            if (Array.isArray(value)) {
                stringBuilder += value.join(", ")
            } else {
                stringBuilder += `${keys[0]}: ${value[keys[0]]}`

                for (let i = 1; i < keys.length; i++) {
                    let key = keys[i]
                    stringBuilder += `; ${toCamelCase(key)}: ${value[key]}`
                }
            }

            stringBuilder = `${updatedName}="${stringBuilder}"`
            return stringBuilder

        default:
            return `${updatedName}="${value}"`
    }
}

// Shorthands
function m(type, attributeMap, children) {
    return new HTMLNode(type, attributeMap, children)
}

const p = (attributeMap, children) => m("p", attributeMap, children)
const div = (attributeMap, children) => m("div", attributeMap, children)
const span = (attributeMap, children) => m("span", attributeMap, children)
const li = (attributeMap, children) => m("li", attributeMap, children)
const ul = (attributeMap, children) => m("ul", attributeMap, children)
const body = (attributeMap, children) => m("body", attributeMap, children)

const text = (content) => m("text", {content})

function example() {
    const node = p({style: 
            { color: "red", backgroundColor: "white" },
            class: "heading",
            dataX: [1, 2, 3],
            onClick: example}, [ // data-x="1, 2, 3"
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
    //     p
    // └── text
    // └── ul
    //     └── li
    //         └── text
    //     └── li
    //         └── text
    //     └── li
    //         └── text
    console.log(example().toHTML(true))
    // <p style="color: red; background-color: white" class="heading" data-x="1, 2, 3" onclick="example()">
    //   Here is a list:
    //   <ul>
    //     <li>
    //       List Item 1
    //     </li>
    //     <li>
    //       List Item 2
    //     </li>
    //     <li>
    //       List Item 3
    //     </li>
    //   </ul>
    // </p>
}

main()