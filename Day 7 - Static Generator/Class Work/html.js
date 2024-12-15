import Node from './tree.js'

/**
 * @typedef {number | string | boolean } AttributePrimitive
 * @typedef {AttributePrimitive | AttributePrimitive[] | {string: AttributePrimitive}} AttributeValue
 * @typedef {{ string: AttributeValue }} AttributeMap
 */

/**
 * Represents HTML node
 * Subclass of parent class 'Node'
 * Each node can contain tag, an attribute map containing all the style properties, and a list of child nodes.
 */
class HTMLNode extends Node {
    /**
     * Creates a new HTML node instance
     * @constructor
     * @param {string} tag - HTML tag.
     * @param {AttributeMap} [attributeMap={}] - Attributes of the HTML tag.
     * @param {HTMLNode[]} [children=[]] - List of child nodes.
     */
	constructor(tag, attributeMap = {}, children = []) {
        super(tag, attributeMap, null, children)
    }
    /**
     * Returns the HTML tags
     * @returns {string}
     */
    get tag() {
        return this.type
    }

    /**
     * Returns the attribute map
     * @returns {{AttributeMap}}
     */
    get attributeMap() {
        return this.data
    }

    /**
     * Returns the tags of the HTML nodes in its equivalent string format
     * @param {boolean} [isIndent=false] - Flag to check if the HTML code should be indented
     * @param {number} [level=0] - Indentation level of the HTML code
     * @returns {string} Returns the parent node of an example tree
     */
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

/**
 * Returns the camel case for HTML tags concatenated with '-' i.e. DataX is data-x
 * @param {string} str
 * @returns {string} Returns the html tags converted in its camel case
 */
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

/**
 * Returns the attributes converted to string
 * @param {string} name - The attribute name
 * @param {AttributePrimitive} value - The attribute value
 * @returns {string}
 */
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

/**
 * Shorthand function returning new HTML nodes with type, attribute map and its childrens
 * @param {string} type
 * @param {AttributeMap} attributeMap
 * @param {HTMLNode[]} children
 * @returns {HTMLNode}
 */
function m(type, attributeMap, children) {
    return new HTMLNode(type, attributeMap, children)
}

/**
 * Shorthand for p tag
 * @param {AttributeMap} attributeMap
 * @param {HTMLNode[]} children
 * @returns {HTMLNode}
 */
const p = (attributeMap, children) => m("p", attributeMap, children)
/**
 * Shorthand for div tag
 * @param {AttributeMap} attributeMap
 * @param {HTMLNode[]} children
 * @returns {HTMLNode}
 */
const div = (attributeMap, children) => m("div", attributeMap, children)
/**
 * Shorthand for span tag
 * @param {AttributeMap} attributeMap
 * @param {HTMLNode[]} children
 * @returns {HTMLNode}
 */
const span = (attributeMap, children) => m("span", attributeMap, children)
/**
 * Shorthand for li tag
 * @param {AttributeMap} attributeMap
 * @param {HTMLNode[]} children
 * @returns {HTMLNode}
 */
const li = (attributeMap, children) => m("li", attributeMap, children)
/**
 * Shorthand for ul tag
 * @param {AttributeMap} attributeMap
 * @param {HTMLNode[]} children
 * @returns {HTMLNode}
 */
const ul = (attributeMap, children) => m("ul", attributeMap, children)
/**
 * Shorthand for body tag
 * @param {AttributeMap} attributeMap
 * @param {HTMLNode[]} children
 * @returns {HTMLNode}
 */
const body = (attributeMap, children) => m("body", attributeMap, children)

/**
 * Shorthand for text node
 * @param {string} content - content of text node
 * @returns {HTMLNode}
 */
const text = (content) => m("text", {content})

/**
 * Example
 * @returns {HTMLNode}
 */
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

/**
 * Prints HTML Tree Diagram
 *         p
 *  └── text
 *   └── ul
 *       └── li
 *           └── text
 *       └── li
 *           └── text
 *       └── li
 *           └── text
 * Prints HTML as a string
 *   <p style="color: red; background-color: white" class="heading" data-x="1, 2, 3" onclick="example()">
 *     Here is a list:
 *     <ul>
 *       <li>
 *         List Item 1
 *       </li>
 *       <li>
 *         List Item 2
 *       </li>
 *       <li>
 *         List Item 3
 *       </li>
 *     </ul>
 *   </p>
 */
function main() {
    console.log(example().diagram())
    console.log(example().toHTML(true))
}

// main()